import React from 'react';
import RevenueChart from '../../components/staff/RevenueChart';
import '../../styles/staff/viewRevenue.css';

const RevenuePage = () => {
    // Dữ liệu doanh thu ví dụ
    const revenueData = [
        { month: 'Tháng 1', revenue: 50000000 },
        { month: 'Tháng 2', revenue: 60000000 },
        { month: 'Tháng 3', revenue: 75000000 },
        { month: 'Tháng 4', revenue: 80000000 },
        { month: 'Tháng 5', revenue: 90000000 },
        { month: 'Tháng 6', revenue: 85000000 },
        { month: 'Tháng 7', revenue: 100000000 },
        // Thêm các tháng khác nếu có
    ];

    return (
        <div id='view-revenue'>
            <h2>Biểu Đồ Doanh Thu</h2>
            <div className='revenue-chart'>
                <RevenueChart data={revenueData}  />
            </div>
        </div>
    );
};

export default RevenuePage;
