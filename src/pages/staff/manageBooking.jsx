import React, { useEffect } from "react";
import "../../styles/staff/manage-booking.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/ApiRequest/apiRequestBooking";
import Loading from "../../components/Loading";
import moment from 'moment';


const ManageBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    getAllBookings(dispatch);
  }, [dispatch]);

  const handleRowClick = () => {
    
    navigate("/staff/booking-detail-staff");
  };

  const handleCreateClick = () => {
    navigate("/staff/create-booking");
  };
  return (
    <div id="managebooking-container">
      <h2>DANH SÁCH ĐẶT PHÒNG</h2>
      <div className="managebooking-filter">
        <button className="create-booking" onClick={handleCreateClick}>
          <i class="fa-solid fa-plus" style={{ style: "#0000" }}></i>Tạo đặt
          phòng
        </button>
        <select className="managebooking-options">
          <option value="all-booking">Tất cả</option>
          <option value="checked-out">Hôm nay</option>
          <option value="payment-success">Đã thanh toán</option>
          <option value="checked-in">Đã checkin</option>
          <option value="checked-out">Đã checkout</option>
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
                      onClick={() => handleRowClick()}
                      key={booking.bookingid}
                    >
                      <td>{booking.user.name}</td>
                      <td>{booking.user.phoneNumber}</td>
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