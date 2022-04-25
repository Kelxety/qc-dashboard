import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MyChart({ data }) {
 const current = new Date();
 const [isLoading, setLoading] = useState(false)
 const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
 var today = new Date();
 const time = today.getHours() + ':' + today.getMinutes();


 const thisData = [];
 const voteRslt = []

 const [series, setSeries] = useState([{
  data: voteRslt
 }]);

 useEffect(() => {
  let sortedDescending = data.sort((a, b) => {
    return b.result - a.result;
  })
  data = sortedDescending
  const fetchData = () => {
    data?.map((item, index) => {
     thisData.push(item.name)
     voteRslt.push(item.result)
    })
    setLoading(true)
  }
  fetchData()
 }, [])
 
 
 
 const [options, setOptions] = useState({
  chart: {
   type: 'bar',
   height: 380,
  },
  grid: {
   row: {
     colors: ['#61615d',]
   },
 },
  plotOptions: {
   bar: {
    barHeight: '100%',
    distributed: true,
    horizontal: true,
    dataLabels: {
     position: 'bottom'
    },
   }
  },
  //colors green:#126c32 // red:#c40808
  colors: [  '#126c32', '#2282f9',
   '#f48024', '#c40808','#f48024', '#c40808'
  ],
  dataLabels: {
   enabled: true,
   textAnchor: 'start',
   style: {
    colors: ['#fff'],
    fontSize: "30px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold"
   },
   formatter: function (val, opt) {
    return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
   },
   offsetX: 0,
   dropShadow: {
    enabled: true
   }
  },
  stroke: {
   width: 1,
   colors: ['#fff']
  },
  xaxis: {
   categories: thisData,
  },
  yaxis: {
   labels: {
    show: false
   }
  },
  title: {
   text: 'Bar Chart',
   align: 'center',
   floating: true,
  },
  subtitle: {
   text: 'Province of Palawan',
   align: 'center',
  },
  tooltip: {
   theme: 'dark',
   x: {
    show: false
   },
   y: {
    title: {
     formatter: function () {
      return ''
     }
    }
   }
  }
 });

 return (
  <div className='w-full mx-auto'>
   {
    isLoading ?
     <Chart options={options} series={series} type="bar" height={600} />
     :
     <div></div>
   }

  </div>
 );
}