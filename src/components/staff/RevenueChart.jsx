import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Đăng ký các thành phần cần thiết
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const RevenueChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
            {
                label: 'Doanh Thu (VND)',
                data: data.map(item => item.revenue),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.4)',
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Doanh Thu Theo Tháng',
            },
        },
    };

    return (
        <div style={{ width: '100%'}}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default RevenueChart;
