import React, { useEffect, useState } from "react";
import "../../styles/staff/manage-booking.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getBookingByStatus, getAllBooking } from "../../redux/ApiRequest/apiRequestBooking";
import Loading from "../../components/Loading";
import moment from 'moment';


const ManageBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState('all-booking');
  const bookingList = useSelector((state) => state.booking.allBooking.data);
  const { allBooking } = useSelector((state) => state.booking);
  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    if (!user) {
      navigate("/loginstaff");
    }
    if (user.user.role !== "Staff") {
      navigate("/login");
    }
    getAllBooking(dispatch);
  }, [dispatch]);

  const handleRowClick = (bookingId) => {
    navigate(`/staff/booking-detail-staff/${bookingId}`);
  };

  const handleCreateClick = () => {
    navigate("/staff/create-booking");
  };

  const handleFilterChange = (event) => {
    const status = event.target.value;
    setSelectedFilter(status);
    console.log(status);
    if (status === 'all-booking') {
      getAllBooking(dispatch);
    } else {
      getBookingByStatus(status, dispatch);
    }
  };

  return (
    <div id="managebooking-container">
      <h2>DANH SÁCH ĐẶT PHÒNG</h2>
      <div className="managebooking-filter">
        <button className="create-booking" onClick={handleCreateClick}>
          <i class="fa-solid fa-plus" style={{ style: "#0000" }}></i>Tạo đặt
          phòng
        </button>
        <select className="managebooking-options" value={selectedFilter} onChange={handleFilterChange}>
          <option value="all-booking">Tất cả</option>
          <option value='Unpaid'>Chưa thanh toán</option>
          <option value='Paid'>Đã thanh toán</option>
          <option value='CheckedIn'>Đã checkin</option>
          <option value='CheckedOut'>Đã checkout</option>
          <option value='Cancelled'>Đã hủy</option>
          <option value='Reviewed'>Đã đánh giá</option>
        </select>
      </div>
      {allBooking.isFetching ? (
        <Loading />
      ) : (
        <div className="managebooking-table">
          <table>
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>SĐT</th>
                <th>Phòng</th>
                <th>Checkin-Checkout</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {bookingList && bookingList.length > 0 ? (
                bookingList.map((booking) => {
                  let status = "";
                  switch (booking.bookingStatus) {
                    case "Paid":
                      status = "Đã thanh toán";
                      break;
                    case "Unpaid":
                      status = "Chưa thanh toán";
                      break;
                    case "CheckedIn":
                      status = "Đã nhận phòng";
                      break;
                    case "CheckedOut":
                      status = "Đã trả phòng";
                      break;
                    case "Cancelled":
                      status = "Đã hủy";
                      break;
                    default:
                      status = "Đã đánh giá";
                      break;
                  }
                  let startTime = "";
                  let endTime = "";
                  switch (booking.bookingType) {
                    case "Daily":
                      startTime = moment
                        .tz(booking.startTime, "UTC")
                        .format("DD/MM/YYYY");
                      endTime = moment
                        .tz(booking.endTime, "UTC")
                        .format("DD/MM/YYYY");
                      break;
                    case "Hourly":
                      startTime = moment
                        .tz(booking.startTime, "UTC")
                        .format("DD/MM/YYYY HH:mm");
                      endTime = moment
                        .tz(booking.endTime, "UTC")
                        .format("DD/MM/YYYY HH:mm");
                      break;
                    default:
                      break;
                  }
                  return (
                    <tr
                      onClick={() => handleRowClick(booking.bookingId)}
                      key={booking.bookingId}
                    >
                      <td>{booking.user?.name}</td>
                      <td>{booking.user?.phoneNumber}</td>
                      <td>{booking.room.id}</td>
                      <td>
                        {startTime} - {endTime}
                      </td>
                      <td>{status}</td>
                    </tr>
                  );
                })
              ) : (
                <p>Không có đặt phòng nào.</p>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBooking;