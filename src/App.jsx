import React, {useState} from 'react';
import Lottie from 'react-lottie-player';
import student from './animations/student.json';
import axios from 'axios';
import useSwr from 'swr';


import { Container } from './components/Container';
import { Bursary } from './components/Bursary';

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
}

const month = new Date().getMonth()

function App() {
  const devURL = 'http://localhost:4000/bursaries/?search=';
  const prodURL = 'https://bursary-findr.herokuapp.com/bursaries/?search=';
  const env = process.env.NODE_ENV !== 'production' ? devURL : prodURL;
  const [search, setSearch] = useState('');
  const { data, error, mutate } = useSwr(`${env}${search}`, fetcher);
  const currentMonth = new Date().getMonth();



  const months = [
    {
      month: 'January',
      available: false,
    },
    {
      month: 'February',
      available: false,
    },
    {
      month: 'March',
      available: false,
    },
    {
      month: 'April',
      available: false,
    },
    {
      month: 'May',
      available: false,
    },
    {
      month: 'June',
      available: true,
    },
    {
      month: 'July',
      available: true,
    },
    {
      month: 'August',
      available: true,
    },
    {
      month: 'September',
      available: true,
    },
    {
      month: 'October',
      available: true,
    },
    {
      month: 'November',
      available: true,
    },
    {
      month: 'December',
      available: true,
    },
  ];

  const handlePinSearch = (month) => {
    if (month === '') {
      return;
    }
    setSearch(month);
  }

  return (
    <React.Fragment>
      <Container>
          <Lottie
            className=" w-52 h-52 sm:w-72 sm:h-72"
            loop
            animationData={student}
            play
          />
          <div className="grid place-items-center space-y-2 w-full">            
            <p className="text-lg text-black font-semibold text-center">✨What's New✨</p>
            <p className="text-sm text-center font-medium opacity-80">🔔 New bursaries for the year 2022!</p>        
            <input className="hover:shadow text-sm border px-3 w-80 h-10 sm:w-1/2 sm:h-12 rounded-full focus:outline-none" 
              type="search" 
              placeholder={`Try searching 'Bursaries closing in ${months[month].month} 2022'...`}
              onChange={(e) => setSearch(e.currentTarget.value)}
              />
          </div>
      </Container>
      <section className="mt-3">
        <div className="flex flex-row overflow-x-scroll space-x-5 py-2 px-2 md:flex md:flex-row md:justify-evenly">
          {months.map((m, i) => (
            <div key={i} id={m.month}>
              <button
              onClick={() => handlePinSearch(m.month)}
              type='button'
              disabled={m.available === false ? true : false}
              className={ m.available === false ? 'bg-green-100 px-3 py-1 rounded-full text-gray-400 text-center cursor-not-allowed'
             : currentMonth === i ? 'bg-black px-3 py-1 rounded-full text-white text-center': 'bg-green-300 px-3 py-1 rounded-full text-gray-800 text-center'}>
                {m.month}
              </button> 
            </div>
          ))}
        </div>
      </section>
      <Bursary data={data} error={error} search={search} />
    </React.Fragment>
  )
}

export default App
