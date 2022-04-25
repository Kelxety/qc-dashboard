
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import DashboardChart from '../components/DashboardChart'

const Home = () => {
  const [sheetdata, setSheetData] = useState([]);
  const [cong1D, setCong1D] = useState([]);
  const [cong2D, setCong2D] = useState([]);
  const [cong3D, setCong3D] = useState([]);
  const [gData, setGData] = useState([]);
  const [vGData, setVGData] = useState([]);
  const [bM1D, setBM1D] = useState([]);
  const [bM2D, setBM2D] = useState([]);
  const [bM3D, setBM3D] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchData = async () => {
      const req = await fetch('http://localhost:3000/api/sheet');
      const res = await req.json();
      setCong1D(res.Cong1stD)
      setCong2D(res.Cong2ndD)
      setSheetData(res)
      setLoading(true)
    }
    fetchData()
  },[])
  
  
  return(
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { isLoading? <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Quick Count {' '}
          <a className="text-blue-600" href="https://nextjs.org">
             Dashboard
          </a>
        </h1>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <DashboardChart cong1D={cong1D} />
        </div>
      </main>
      :
      <div>Retrieving data! loading... please wait</div> }
      

    </div>
  )
}

export default Home
