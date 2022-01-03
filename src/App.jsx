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

function App() {
  const devURL = 'http://localhost:4000/bursaries/?search=';
  const prodURL = 'https://bursary-findr.herokuapp.com/bursaries/?search=';
  const env = process.env.NODE_ENV !== 'production' ? devURL : prodURL;
  const [search, setSearch] = useState('');
  const { data, error, mutate } = useSwr(`${env}${search}`, fetcher);

  const months = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'
  ];

  const handlePinSearch = (month) => {
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
            <p className="text-sm text-center font-medium opacity-80">👉 New bursaries for the year 2022!</p>
            <p className="text-sm text-center font-medium opacity-80">Click on January and February or search 🤫 Don't say we didn't tell you.</p>
            <input className="hover:shadow text-sm border px-3 w-80 h-10 sm:w-1/2 sm:h-12 rounded-full focus:outline-none" 
              type="search" 
              placeholder="Try searching 'Bursaries closing in January 2022'..."
              onChange={(e) => setSearch(e.currentTarget.value)}
              />
          </div>
      </Container>
      <section className="mt-3">
        <div className="grid grid-flow-col grid-cols-3 grid-rows-4 gap-2 px-2 sm:flex sm:flex-row sm:justify-evenly">
          {months.map((month, i) => (
            <div key={i} onClick={() => handlePinSearch(month)} >
              <p className='bg-green-300 px-3 py-1 rounded-full text-gray-800 cursor-pointer text-center'>
                {month}
              </p> 
            </div>
          ))}
        </div>
      </section>
      <Bursary data={data} error={error} search={search} />
    </React.Fragment>
  )
}

export default App
