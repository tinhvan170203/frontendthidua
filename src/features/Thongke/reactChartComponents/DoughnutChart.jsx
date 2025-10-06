import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const DoughnutChart =  ({text, dataHTNV, dataHTXSNV, dataKHTNV, dataHTTNV, dataNotValue, total}) => {

  let arr = [];
  if(total !== 0){
   arr = [(dataHTXSNV/total * 100).toFixed(2), (dataHTTNV/total * 100).toFixed(2),
     (dataHTNV/total * 100).toFixed(2), (dataKHTNV/total* 100).toFixed(2), (dataNotValue/total * 100).toFixed(2)]
  };
  
  return <Doughnut data={
    {
  labels: ['Hoàn thành xuất sắc nhiệm vụ', 'Hoàn thành tốt nhiệm vụ', 'Hoàn thành nhiệm vụ', 'Không hoàn thành nhiệm vụ', 'Chưa có dữ liệu'],
  datasets: [
    {
      label: 'Chiếm % tỉ lệ',
      data: arr,
      backgroundColor: [
        'rgba(255, 0, 0, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderColor: [
            'rgba(255, 0, 0, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}
  }
  
  options={{
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text,
            },
        },
    }}/>;
};

export default DoughnutChart
