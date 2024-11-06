import React, { useEffect, useState } from "react";
import RevenueChart from "../../components/staff/RevenueChart";
import "../../styles/staff/viewRevenue.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RevenuePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const startDate = new Date();
  startDate.setDate(1);
  const formatDate = new Date(startDate).toISOString().split("T")[0];
  console.log(formatDate);
  console.log(startDate);

  useEffect(() => {
    if (!user) {
      navigate("/loginstaff");
    }
    if (user.user.role !== "Staff") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Gọi API lấy dữ liệu doanh thu theo ngày
    // getRevenueDaily(dispatch, startDate);
    // Gọi API lấy dữ liệu doanh thu theo tháng
    // getRevenueMonthly(dispatch, year);
    // Gọi API lấy dữ liệu doanh thu theo năm
    // getRevenueYearly(dispatch);
  }, []);
  // Dữ liệu doanh thu ví dụ
  const revenueDataDay = [
    { period: "2024-10-22", revenue: 2000000 },
    { period: "2024-10-23", revenue: 2200000 },
    { period: "2024-10-24", revenue: 2100000 },
    { period: "2024-10-25", revenue: 2300000 },
    { period: "2024-10-26", revenue: 2400000 },
    { period: "2024-10-27", revenue: 2500000 },
    { period: "2024-10-28", revenue: 2600000 },
  ];

  const revenueDataMonth = [
    { period: "2024-10", revenue: 52000000 },
    { period: "2024-09", revenue: 61000000 },
    { period: "2024-08", revenue: 77000000 },
    { period: "2024-07", revenue: 82000000 },
    { period: "2024-06", revenue: 91000000 },
    { period: "2024-05", revenue: 86000000 },
    { period: "2024-04", revenue: 102000000 },
    { period: "2024-03", revenue: 94000000 },
    { period: "2024-02", revenue: 88000000 },
    { period: "2024-01", revenue: 90000000 },
    { period: "2023-12", revenue: 72000000 },
    { period: "2023-11", revenue: 69000000 },
  ];

  const revenueDataYear = [
    { period: "2024", revenue: 950000000 },
    { period: "2023", revenue: 870000000 },
    { period: "2022", revenue: 820000000 },
    { period: "2021", revenue: 780000000 },
    { period: "2020", revenue: 800000000 },
    { period: "2019", revenue: 750000000 },
    { period: "2018", revenue: 710000000 },
    { period: "2017", revenue: 680000000 },
    { period: "2016", revenue: 670000000 },
    { period: "2015", revenue: 640000000 },
  ];

  const [timeRange, setTimeRange] = useState("month");

  // Hàm để lọc dữ liệu theo lựa chọn
  const filterRevenueData = () => {
    const currentDate = new Date();

    switch (timeRange) {
      case "year": {
        const startYear = currentDate.getFullYear() - 9;
        return revenueDataYear.filter((data) => {
          const year = parseInt(data.period, 10);
          return year >= startYear;
        });
      }
      case "month": {
        const startDate = new Date(currentDate);
        startDate.setMonth(currentDate.getMonth() - 11);
        return revenueDataMonth.filter((data) => {
          const [year, month] = data.period.split("-").map(Number);
          const dataDate = new Date(year, month - 1);
          return dataDate >= startDate;
        });
      }
      case "day": {
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 6);
        return revenueDataDay.filter((data) => {
          const dataDate = new Date(data.period);
          return dataDate >= startDate;
        });
      }
      default:
        return revenueDataMonth; // Mặc định là dữ liệu theo tháng
    }
  };

  // Dữ liệu đã lọc theo lựa chọn
  const filteredData = filterRevenueData();

  return (
    <div id="view-revenue">
      <h2>Biểu Đồ Doanh Thu</h2>
      <div className="revenue-options">
        <select
          onChange={(e) => setTimeRange(e.target.value)}
          value={timeRange}
        >
          <option value="month">Theo tháng</option>
          <option value="year">Theo năm</option>
          <option value="day">Theo ngày</option>
        </select>
      </div>

      <div className="viewRevenue-body">
        <div className="revenue-chart">
          <RevenueChart data={filteredData} timeRange={timeRange} />
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
