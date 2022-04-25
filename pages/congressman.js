
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import MyChart from '../components/MyChart';

const Congressman = () => {
 const [cong1D, setCong1D] = useState([]);
 const [isLoading, setLoading] = useState(false);
 const current = new Date();
 const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
 var today = new Date();
 const time = today.getHours() + ':' + today.getMinutes();

 useEffect(() => {
  const fetchData = async () => {
   const req = await fetch('http://localhost:3000/api/sheet');
   const res = await req.json();
   setCong1D(res.Cong1stD)
   setLoading(true)
  }
  fetchData()
 }, [])


 return (
  <div className="flex min-h-screen flex-col items-center justify-center sm:py-2">

   <Head>
    <title>Quick Count Palawan</title>
    <link rel="icon" href="/favicon.ico" />
   </Head>

   {isLoading ? <main className="flex w-full flex-1 flex-col items-center justify-center sm:px-20 text-center">
    <div className='w-full text-center px-4 sm:py-5 flex flex-col justify-center items-center'>
     <h1 className="text-2xl text-center sm:text-6xl font-bold">
      <a className="text-green-800" href="https://nextjs.org">
       Congressman 
      </a>
     </h1>
     <h1 className="text-2xl text-center sm:text-6xl font-bold">
      {' '} 1st District of Palawan
     </h1>
    </div>
    
    <h2 className="text-lg font-bold">
     Partial, unofficial results as of
    </h2>
    <h2 className="text-4xl font-bold mt-2">
     {time + ' ' + date}
    </h2>

    <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around w-full">
     <MyChart data={cong1D} />
    </div>
   </main>
    :
    <div>Retrieving data! loading... please wait</div>}


  </div>
 )
}

export default Congressman
