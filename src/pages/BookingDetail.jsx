import React, { useEffect, useState } from 'react'
import '../styles/BookingDetail.css'
import picroom from '../assets/phongdoi.jpg'
import CancelPopup from '../components/CancelPopup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking, getBookingDetail } from '../redux/ApiRequest/apiRequestBooking';
import moment from 'moment-timezone';
import Loading from '../components/Loading';
import { createNewReview, createReview } from '../redux/ApiRequest/apiRequestReview';
import { toast, ToastContainer } from 'react-toastify';
import { createReviewInit } from '../redux/Slice/reviewSlice';
import { refund } from '../redux/ApiRequest/apiRequestPayment';


const BookingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showCancelPopup, setShowCancelPopup] = useState(false); // State to manage popup visibility
    const [text, setText] = useState('');
    const [rating, setRating] = useState(null)
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.login.currentUser);
    const {createReview}= useSelector(state => state.review)
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        getBookingDetail(id, dispatch);
    }, [id, dispatch]);
    // Tìm thông tin phòng tương ứng với ID
    const booking = useSelector(state => state.booking.bookingDetail.data);

    useEffect(()=>{
        if(createReview.succes){
            toast.success('Tạo đánh giá thành công !')
            dispatch(createReviewInit())
            getBookingDetail(id, dispatch);
        }
        else if(createReview.error){
            toast.error('Tạo đánh giá thất bại !')
            dispatch(createReviewInit())
        }
    },[createReview])
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
    const handleCancel = async () => {
        try {
            await refund(id,dispatch)
            getBookingDetail(id, dispatch);
        } catch (error) {
            console.error(error)
            toast.error('Hủy đặt phòng có lỗi xảy ra !')
        }
        setShowCancelPopup(false); // Close the popup after cancellation
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
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
    let startTime = '';
    let endTime = '';
    let bookingType = '';
    let total = 0
    switch (booking.bookingType) {
        case "Daily":
            startTime = moment.tz(booking.startTime, "UTC").format('DD/MM/YYYY')
            endTime = moment.tz(booking.endTime, "UTC").format('DD/MM/YYYY')
            bookingType = 'Ngày'
            total = moment.tz(booking.endTime, "UTC").diff(moment.tz(booking.startTime, "UTC"), 'days') * booking.room.pricePerDay
            break;
        case "Hourly":
            startTime = moment.tz(booking.startTime, "UTC").format('DD/MM/YYYY HH:mm')
            endTime = moment.tz(booking.endTime, "UTC").format('DD/MM/YYYY HH:mm')
            bookingType = 'Giờ'
            total = moment.tz(booking.endTime, "UTC").diff(moment.tz(booking.startTime, "UTC"), 'hours') * booking.room.pricePerHour
            break;
        default:
            console.log('Error')
            break;
    }

    const handleCreateReview = () => {
        if (!rating || !text) {
            toast.warn('Vui lòng nhập đủ mục đánh giá')
            return
        }
        const newReview = {
            rating: rating,
            comment: text,
            bookingId: id,
        }
        try {
            createNewReview(newReview, dispatch)
        } catch (error) {
            console.log(error)
            toast.error('Đã có lỗi xảy ra !')
        }
    }

    if (!booking) {
        return <Loading />
    }
    return (
        <div id='booking-detail'>
            {createReview.isFetching?
            (<Loading/>)
            :
            (<div className="container">
                <h1>CHI TIẾT ĐẶT PHÒNG</h1>
                <div className="room-detail">
                    <img src={booking.room.image} alt="" />
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
                        <span class="label">Check in - Check out:</span>
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
                        <span class="value">{booking.payments[0].amount?(booking.payments[0].amount).toLocaleString():total.toLocaleString()}</span>
                    </div>
                </div>

                {/* Trạng thái đã đặt phòng */}
                {(booking.bookingStatus === 'Paid') && (
                    <div className="btn-container">
                        <button onClick={handleCancelClick}>Hủy đặt phòng</button>
                    </div>
                )}

                {/* Trạng thái đã check-in */}
                {booking.bookingStatus === 'CheckedOut' && (
                    <div className="rating-container">
                        <h2>Đánh giá</h2>
                        <div className="rating-body">
                            <div className="rating" onChange={handleRatingChange}>
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
                                <button onClick={handleCreateReview}>Đánh giá</button>
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
        )
        }

            {showCancelPopup && (
                <CancelPopup
                    onClose={handleClosePopup}
                    onBack={handleBack}
                    onCancel={handleCancel}
                />
            )}
            <ToastContainer position="top-right" autoClose={5000} />

        </div>
    )
}

export default BookingDetail