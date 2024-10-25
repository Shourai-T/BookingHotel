import React, { useEffect, useState } from 'react'
import '../styles/BookingDetail.css'
import picroom from '../assets/phongdoi.jpg'
import CancelPopup from '../components/CancelPopup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingDetail } from '../redux/ApiRequest/apiRequestBooking';
import moment from 'moment-timezone';
import Loading from '../components/Loading';


const BookingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showCancelPopup, setShowCancelPopup] = useState(false); // State to manage popup visibility
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.login.currentUser);
    useEffect(() => {
        if(!user){
            navigate('/login'); 
        }
        getBookingDetail(id, dispatch);
    }, [id, dispatch ]);
    // Tìm thông tin phòng tương ứng với ID
    const booking= useSelector(state => state.booking.bookingDetail.data);
    
    if (!booking) {
        return <div>Không tìm thấy thông tin đặt phòng.</div>; // Thông báo nếu không tìm thấy
    }

    // Function to open popup
    const handleCancelClick = () => {
        setShowCancelPopup(true);
    };

    // Function to close popup
    const handleClosePopup = () => {
        setShowCancelPopup(false);
    };

    // Function to handle back action
    const handleBack = () => {
        setShowCancelPopup(false); // Just close the popup
        // You can add other logic if needed, e.g., navigate back
    };

    // Function to handle cancellation logic
    const handleCancel = () => {
        // Here, you can add logic to actually cancel the booking
        alert("Đặt phòng đã bị hủy.");
        setShowCancelPopup(false); // Close the popup after cancellation
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleGoToBooking = () => {
        navigate('/booking'); // Điều hướng tới trang đặt phòng
    };
    let status = ''
    switch (booking.bookingStatus) {
        case 'Paid':
          status = 'Đã thanh toán'
          break;
        case 'Unpaid':
          status = 'Chưa thanh toán'
          break;
        case 'CheckedIn':
          status = 'Đã nhận phòng'
          break;
        case 'CheckedIn':
          status = 'Đã nhận phòng'
          break; 
        case 'CheckedOut':
          status = 'Đã trả phòng'
          break;
        case 'Cancelled':
          status = 'Đã hủy'
          break;
        default:
          status = 'Đã đánh giá'
          break;
      }
      let startTime='';
      let endTime='';
      let bookingType='';
      let total=0
      switch (booking.bookingType) {
        case "Daily":
          startTime = moment.tz(booking.startTime,"UTC").format('DD/MM/YYYY')
          endTime = moment.tz(booking.endTime,"UTC").format('DD/MM/YYYY')
          bookingType = 'Ngày'
        total = moment.tz(booking.endTime,"UTC").diff(moment.tz(booking.startTime,"UTC"), 'days') * booking.room.pricePerDay
          break;
        case "Hourly":
          startTime = moment.tz(booking.startTime,"UTC").format('DD/MM/YYYY HH:mm')
          endTime = moment.tz(booking.endTime,"UTC").format('DD/MM/YYYY HH:mm')
        bookingType = 'Giờ'
            total = moment.tz(booking.endTime,"UTC").diff(moment.tz(booking.startTime,"UTC"), 'hours') * booking.room.pricePerHour
          break;
        default:
            console.log('Error')
          break;
      }
      let imageUrl;
            switch (booking.room.typeRoom.id) {
              case '1c72ac2a-0aa6-4bc1-bf50-15575be18683':
                imageUrl = require(`../assets/phongdon/${booking.room.image}`);
                break;
              case '3f3d4386-791e-409b-85a8-78afbbc596d2':
                imageUrl = require(`../assets/phonggiadinh/${booking.room.image}`);
                break;
              case '4fb24ae1-acb4-420b-b5a2-2dd674fcd899':
                imageUrl = require(`../assets/phonghangsang/${booking.room.image}`);
                break;
              case '2fd36d7a-65e1-43e1-b571-9279696dfe5d':
                imageUrl = require(`../assets/phongdoi/${booking.room.image}`);
                break;
              default:
                imageUrl = require(`../assets/${booking.room.image}`);
                break;
            }

    if(!booking){
        return <Loading/>
    }
    return (
        <div id='booking-detail'>
            <div className="container">
                <h1>CHI TIẾT ĐẶT PHÒNG</h1>
                <div className="room-detail">
                    <img src={imageUrl} alt="" />
                    <div className='room-info'>
                        <h3>{booking.room.name}</h3>
                        <p>Loại phòng: {booking.room.typeRoom.name}</p>
                    </div>
                </div>
                <div class="info-group">
                    <div class="info-item">
                        <span class="label">Booking ID:</span>
                        <span class="value">{booking.bookingId}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Tên khách hàng:</span>
                        <span class="value">{booking.user.name}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Đặt phòng theo:</span>
                        <span class="value">{bookingType}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Checkin - Checkout:</span>
                        <span class="value">{startTime} - {endTime}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Số khách:</span>
                        <span class="value">{booking.numberOfGuest}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Trạng thái:</span>
                        <span class="value">{status}</span>
                    </div>
                </div>
                <hr />
                <div className="info-group">
                    <div class="info-item">
                        <span class="label">TỔNG TIỀN</span>
                        <span class="value">{total.toLocaleString()}</span>
                    </div>
                </div>

                {/* Trạng thái đã đặt phòng */}
                {/* {(booking.bookingStatus === 'Paid') && (
                    <div className="btn-container">
                        <button onClick={handleCancelClick}>Hủy đặt phòng</button>
                    </div>
                )} */}

                {/* Trạng thái đã check-in */}
                {booking.bookingStatus === 'CheckedIn' && (
                    <div className="rating-container">
                        <h2>Đánh giá</h2>
                        <div className="rating-body">
                            <div className="rating">
                                <input value="5" name="rating" id="star5" type="radio" />
                                <label htmlFor="star5"></label>
                                <input value="4" name="rating" id="star4" type="radio" />
                                <label htmlFor="star4"></label>
                                <input value="3" name="rating" id="star3" type="radio" />
                                <label htmlFor="star3"></label>
                                <input value="2" name="rating" id="star2" type="radio" />
                                <label htmlFor="star2"></label>
                                <input value="1" name="rating" id="star1" type="radio" />
                                <label htmlFor="star1"></label>
                            </div>
                            <textarea
                                id="long-input"
                                value={text}
                                onChange={handleChange}
                                rows="4" // Số hàng hiển thị
                                cols="50" // Số cột
                                placeholder="Nhận xét ở đây"
                            />
                            <div className="btn-container">
                                <button>Đánh giá</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Trạng thái đã hủy đặt phòng */}
                {booking.bookingStatus === 'Cancelled' && (
                    <div className="btn-container">
                        <button onClick={handleGoToBooking}>Đi tới đặt phòng</button>
                    </div>
                )}
            </div>

            {showCancelPopup && (
                <CancelPopup
                    onClose={handleClosePopup}
                    onBack={handleBack}
                    onCancel={handleCancel}
                />
            )}
        </div>
    )
}

export default BookingDetail