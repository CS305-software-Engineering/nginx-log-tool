import React from 'react'
import { Line } from 'react-chartjs-2'





const LineChart = (props) => {

  const data = {
    labels:  props.x,
    datasets: [
      {
        label: props.data,
        data: props.y,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  // console.log(props.x)
  // console.log(props.y)
  
  return(
  <>
    <div className='header'>
      <h1 className='title'>{props.data}</h1>
      
    </div>
    <Line data={data} options={options} />
  </>
  );
  }

export default LineChart