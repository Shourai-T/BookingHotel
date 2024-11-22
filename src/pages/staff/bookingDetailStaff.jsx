import React, { useEffect, useState } from "react";
import "../../styles/staff/bookingDetailStaff.css";
import CancelPopup from "../../components/CancelPopup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingDetail,
  updateBookingStatus,
} from "../../redux/ApiRequest/apiRequestBooking";
import moment from "moment";
import Loading from "../../components/Loading";
import { refund } from "../../redux/ApiRequest/apiRequestPayment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingDetailStaff = () => {
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    if (!user) {
      navigate("/loginstaff");
    }
    if (user.user.role !== "Staff") {
      navigate("/");
    }
    getBookingDetail(bookingId, dispatch);
  }, [bookingId, dispatch]);

  const booking = useSelector((state) => state.booking.bookingDetail.data);
  const fetching = useSelector(
    (state) => state.booking.bookingDetail.isFetching
  );

  const handleCancelClick = () => {
    setShowCancelPopup(true);
  };

  const handleClosePopup = () => {
    setShowCancelPopup(false);
  };

  const handleBack = () => {
    setShowCancelPopup(false);
  };

  const handleConfirmCancel = async () => {
    try {
      if (booking.bookingStatus === "Paid") {
        await refund(bookingId, dispatch);
      } else if (booking.bookingStatus === "Unpaid") {
        const data = {
          bookingStatus: "Cancelled",
          utilities: [],
        };
        await updateBookingStatus(bookingId, data, dispatch);
      }
      getBookingDetail(bookingId, dispatch);
      toast.success("Đặt phòng đã bị hủy thành công.");
    } catch (error) {
      console.error(error);
      toast.error("Hủy đặt phòng có lỗi xảy ra!");
    }
    setShowCancelPopup(false);
  };

  const handleCheckin = async () => {
    try {
      const data = {
        bookingStatus: "CheckedIn",
        utilities: [],
      };
      await updateBookingStatus(bookingId, data, dispatch);
      getBookingDetail(bookingId, dispatch);
      toast.success("CheckedIn thành công.");
    } catch (error) {
      console.error(error);
      toast.error("CheckedIn có lỗi xảy ra!");
    }
  };

  const handleCheckout = () => {
    navigate(`/staff/booking-invoice/${bookingId}`);
  };

  if (fetching || !booking) {
    return <Loading />;
  }

  let status = "";
  switch (booking?.bookingStatus) {
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
  let bookingType = "";
  // switch (booking?.bookingType) {
  //   case "Daily":
  //     startTime = moment.tz(booking.startTime, "UTC").format("DD/MM/YYYY");
  //     endTime = moment.tz(booking.endTime, "UTC").format("DD/MM/YYYY");
  //     bookingType = "Ngày";
  //     break;
  //   case "Hourly":
  //     startTime = moment
  //       .tz(booking.startTime, "UTC")
  //       .format("DD/MM/YYYY HH:mm");
  //     endTime = moment.tz(booking.endTime, "UTC").format("DD/MM/YYYY HH:mm");
  //     bookingType = "Giờ";
  //     break;
  //   default:
  //     console.log("Error");
  //     break;
  // }
  switch (booking.bookingType) {
    case "Daily":
      // Sử dụng moment mà không có múi giờ
      startTime = moment(booking.startTime).format('DD/MM/YYYY');
      endTime = moment(booking.endTime).format('DD/MM/YYYY');
      break;
    case "Hourly":
      // Sử dụng moment mà không có múi giờ
      startTime = moment(booking.startTime).format('DD/MM/YYYY HH:mm');
      endTime = moment(booking.endTime).format('DD/MM/YYYY HH:mm');
      break;
    default:
      console.log('Error');
      break;
  }
  
  return (
    <div id="bookingDetailStaff-body">
      <h2>CHI TIẾT ĐẶT PHÒNG</h2>
      <p className="bookingid">Booking ID: {booking.bookingId}</p>
      <p className="row-info">
        <span className="title">Tên khách hàng</span>
        <span className="value">
          {booking.user?.name ? booking.user.name : "Khách đặt tại chỗ"}
        </span>
      </p>
      <p className="row-info">
        <span className="title">SDT khách hàng</span>
        <span className="value">
          {booking.user?.phoneNumber ? booking.user.phoneNumber : "Không có"}
        </span>
      </p>

      <p className="row-info">
        <span className="title">Phòng</span>
        <span className="value">{booking.room.name}</span>
      </p>

      <p className="row-info">
        <span className="title">Đặt theo</span>
        <span className="value">{bookingType}</span>
      </p>

      <p className="row-info">
        <span className="title">Số lượng khách</span>
        <span className="value">{booking.numberOfGuest}</span>
      </p>

      <p className="row-info">
        <span className="title">Check in - Check out</span>
        <span className="value">
          {startTime} - {endTime}
        </span>
      </p>

      <p className="row-info">
        <span className="title">Trạng thái</span>
        <span className="value">{status}</span>
      </p>

      {
        <div className="grp-btn">
          <button
            className="cancel-booking"
            onClick={handleCancelClick}
            disabled={
              booking?.bookingStatus === "Cancelled" ||
              booking?.bookingStatus === "CheckedIn" ||
              booking?.bookingStatus === "CheckedOut"
            }
          >
            Hủy đặt phòng
          </button>
          <button
            className="checkin"
            onClick={handleCheckin}
            disabled={booking?.bookingStatus === "Cancelled" || booking?.bookingStatus === "CheckedIn" || booking?.bookingStatus === "CheckedOut"}
          >
            Checkin
          </button>
          <button
            className="checkout"
            onClick={handleCheckout}
            disabled={booking?.bookingStatus === "Cancelled" || booking?.bookingStatus === "CheckedOut"||booking?.bookingStatus !== "CheckedIn"}
          >
            Checkout
          </button>
          <button className="return" onClick={() => navigate(-1)}>
            Quay về
          </button>
        </div>
      }

      {showCancelPopup && (
        <CancelPopup
          onClose={handleClosePopup}
          onBack={handleBack}
          onCancel={handleConfirmCancel}
        />
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default BookingDetailStaff;
