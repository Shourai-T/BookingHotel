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

const RevenueChart = ({ data, timeRange }) => {
    const chartData = {
        labels: data.map(item => item.period), // Sử dụng period thay vì chỉ month để linh hoạt với các loại dữ liệu
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
                text: `Biểu Đồ Doanh Thu Theo ${timeRange === 'day' ? 'Ngày' : timeRange === 'month' ? 'Tháng' : 'Năm'}`,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: timeRange === 'day' ? 'Ngày' : timeRange === 'month' ? 'Tháng' : 'Năm',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Doanh Thu (VND)'
                }
            }
        }
    };

    return (
        <div style={{ width: '80%', height:'400px', marginTop:'180px'}}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default RevenueChart;
