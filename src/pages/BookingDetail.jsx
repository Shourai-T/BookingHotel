import React, { useState } from 'react'
import '../styles/BookingDetail.css'
import picroom from '../assets/phongdoi.jpg'
import CancelPopup from '../components/CancelPopup';
import { roomData } from '../data';
import { useNavigate, useParams } from 'react-router-dom';


const BookingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showCancelPopup, setShowCancelPopup] = useState(false); // State to manage popup visibility
    const [text, setText] = useState('');
    
    // Tìm thông tin phòng tương ứng với ID
    const room = roomData.find((r) => r.id === id); // Tìm phòng dựa trên ID

    if (!room) {
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

    return (
        <div id='booking-detail'>
            <div className="container">
                <h1>CHI TIẾT ĐẶT PHÒNG</h1>
                <div className="room-detail">
                    <img src={picroom} alt="" />
                    <div className='room-info'>
                        <h3>Windsor Room</h3>
                        <p>Loại phòng: {room.roomName}</p>
                    </div>
                </div>
                <div class="info-group">
                    <div class="info-item">
                        <span class="label">Booking ID:</span>
                        <span class="value">{room.id}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Tên khách hàng:</span>
                        <span class="value">Nguyễn Văn A</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Đặt phòng theo:</span>
                        <span class="value">Ngày</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Checkin - Checkout:</span>
                        <span class="value">02/01/2024 06:00:00 - 02/01/2024 12:00:00</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Số khách:</span>
                        <span class="value">2</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Trạng thái:</span>
                        <span class="value">{room.status}</span>
                    </div>
                </div>
                <hr />
                <div className="info-group">
                    <div class="info-item">
                        <span class="label">TỔNG TIỀN</span>
                        <span class="value">{room.totalPrice}</span>
                    </div>
                </div>

                {/* Trạng thái đã đặt phòng */}
                {room.status === 'Đã đặt phòng' && (
                    <div className="btn-container">
                        <button onClick={handleCancelClick}>Hủy đặt phòng</button>
                    </div>
                )}

                {/* Trạng thái đã check-in */}
                {room.status === 'Đã checkin' && (
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
                {room.status === 'Đã hủy' && (
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