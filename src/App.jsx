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
  const URL = 'http://localhost:5000/bursaries/?search=';
  const [search, setSearch] = useState('');
  const { data, error, mutate } = useSwr(`${URL}${search}`, fetcher);

  console.log(Date.now().toLocaleString())

  const months = [
    'january', 
    'february', 
    'march', 
    'april', 
    'may', 
    'june', 
    'july', 
    'august', 
    'september', 
    'october', 
    'november', 
    'december'
  ];

  const handlePinSearch = (month) => {
    setSearch(month);
  }

  const handleSearch = async () => {
    await mutate(`${URL}${search}`);
  }

  return (
    <React.Fragment>
      <Container>
          <Lottie
            loop
            animationData={student}
            play
            style={{
              width: 300,
              height: 300
            }}
          />
          <form onSubmit={handleSearch} className="grid place-items-center space-y-2 w-full">
            <p className="text-sm text-gray-500">Search and find bursaries in South Africa by the month they'll be closing.</p>
            <input className="hover:shadow text-sm border px-3 w-1/2 h-12 rounded-full focus:outline-none" 
              type="text" 
              placeholder="Try searching 'Bursaries closing in october'..."
              onChange={(e) => setSearch(e.currentTarget.value)}
              />
          </form>
      </Container>
      <section className="mt-3">
        <div className="flex flex-row justify-evenly">
          {months.map((month, i) => (
            <div key={i} onClick={() => handlePinSearch(month)} >
              <p className="bg-green-300 px-2 rounded-full text-gray-800 cursor-pointer">
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
