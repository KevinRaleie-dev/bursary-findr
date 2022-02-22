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



  const months = [
    {
      month: 'January',
      available: true,
    },
    {
      month: 'February',
      available: true,
    },
    {
      month: 'March',
      available: true,
    },
    {
      month: 'April',
      available: true,
    },
    {
      month: 'May',
      available: false,
    },
    {
      month: 'June',
      available: false,
    },
    {
      month: 'July',
      available: false,
    },
    {
      month: 'August',
      available: false,
    },
    {
      month: 'September',
      available: false,
    },
    {
      month: 'October',
      available: false,
    },
    {
      month: 'November',
      available: false,
    },
    {
      month: 'December',
      available: false,
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
            {/* <p className="text-sm text-gray-500 text-center">Search and find bursaries in South Africa by the month they'll be closing.</p> */}
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
        <div className="grid grid-flow-col grid-cols-3 grid-rows-4 gap-2 px-2 sm:flex sm:flex-row sm:justify-evenly">
          {months.map((m, i) => (
            <div key={i}>
              <button
              onClick={() => handlePinSearch(m.month)}
              type='button'
              disabled={m.available === false ? true : false}
              className={ m.available === false ? 'bg-green-300 px-3 py-1 rounded-full text-gray-800 text-center cursor-not-allowed'
             : 'bg-green-300 px-3 py-1 rounded-full text-gray-800 text-center'}>
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
