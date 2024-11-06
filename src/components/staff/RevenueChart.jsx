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
import moment from 'moment';

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
    // Lấy ngày gần nhất (giới hạn số lượng ngày nếu là `day`)
    const filteredData = timeRange === 'day' ? data.slice(-7) : data;

    const chartData = {
        labels: filteredData.map(item => {
            if (timeRange === 'day') return moment(item.date).format('DD/MM'); // Định dạng ngày/tháng
            if (timeRange === 'month') return item.month;
            return item.year;
        }), 
        datasets: [
            {
                label: 'Doanh Thu (VND)',
                data: filteredData.map(item => item.totalRevenue),
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
        <div style={{ width: '80%', height:'400px', marginTop:'20px'}}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default RevenueChart;
