import React, { useEffect } from 'react'
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const DashboardChart = (props) => {
  const labelForName = [];
  const labelForRslt = [];
  const datas = {
    labels: labelForName,
    datasets: [
      {
        label: '# of Votes',
        data: labelForRslt,
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  }
  useEffect(()=>{
    
  },[])

  props.cong1D?.map((item, i)=>{
    console.log(i)
    labelForName.push(item.name)
    labelForRslt.push(item.result)
  })
  
  return (
    <PolarArea data={datas} />
  )
}

export default DashboardChart