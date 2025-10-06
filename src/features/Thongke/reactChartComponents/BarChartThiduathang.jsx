import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import { useEffect } from 'react';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

const BarChartThiduathang = ({ text, dataRed, dataBlue, dataYellow, dataNotValue }) => {

    return <Bar options={{
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text,
            },
        },
    }}
        data={{
             labels,
             datasets: [
            {
                label: 'Cờ đỏ',
                data: dataRed,
                backgroundColor: 'rgba(255, 0, 0, 1)',
            },
            {
                label: 'Cờ xanh',
                data: dataBlue,
                backgroundColor: 'rgba(0, 82, 255, 1)',
            },
            {
                label: 'Cờ vàng',
                data: dataYellow,
                backgroundColor: 'rgba(230, 228, 22, 1)',
            },
            {
                label: 'Chưa có dữ liệu',
                data: dataNotValue,
                backgroundColor: 'rgba(0, 224, 151, 0.8)',
            }]} 
        }
        width={1400}
        height={500}
    />;
};

export default BarChartThiduathang
