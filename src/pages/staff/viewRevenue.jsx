import React, { useEffect, useState } from "react";
import RevenueChart from "../../components/staff/RevenueChart";
import "../../styles/staff/viewRevenue.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRevenueDaily,getRevenueMonthly,getRevenueYearly } from "../../redux/ApiRequest/apiRequestPayment";
import Loading from "../../components/Loading";
const RevenuePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const startDate = new Date();
  startDate.setDate(1);
  startDate.setMonth(9);
  const formatDate = new Date(startDate).toISOString().split("T")[0];
  console.log(startDate);
  const { revenue } = useSelector((state) => state.payment);
  const [timeRange, setTimeRange] = useState("month");
  
  useEffect(() => {
    if (!user) {
      navigate("/loginstaff");
    }
    if (user.user.role !== "Staff") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    // // Gọi API lấy dữ liệu doanh thu theo ngày
    // getRevenueDaily(dispatch, startDate);
    // // Gọi API lấy dữ liệu doanh thu theo tháng
    // getRevenueMonthly(dispatch, startDate.getFullYear());
    // // Gọi API lấy dữ liệu doanh thu theo năm
    // getRevenueYearly(dispatch);
    filterRevenueData();
  }, [timeRange]);
  // Dữ liệu doanh thu ví dụ



  // Hàm để lọc dữ liệu theo lựa chọn
  const filterRevenueData = () => {
    // const currentDate = new Date();

    switch (timeRange) {
      case "year": {
        getRevenueYearly(dispatch);
        break;
      }
      case "month": {
        getRevenueMonthly(dispatch, startDate.getFullYear())
        break;
      }
      case "day": {
        getRevenueDaily(dispatch, startDate);
        break;
      }
      default:
        getRevenueMonthly(dispatch, startDate.getFullYear())
        break;
    }
  };

  // Dữ liệu đã lọc theo lựa chọn
  
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

      {revenue.isFetching?(<Loading/>):(
        <div className="viewRevenue-body">
        <div className="revenue-chart">
          <RevenueChart data={revenue.data} timeRange={timeRange} />
        </div>
      </div>)}
    </div>
  );
};

export default RevenuePage;
