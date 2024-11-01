import React, { useState } from 'react';
import '../../styles/staff/bookingDetailStaff.css';
import CancelPopup from '../../components/CancelPopup';
import { useNavigate } from 'react-router-dom';

const BookingDetailStaff = () => {
    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const navigate = useNavigate();

    const handleCancelClick = () => {
        setShowCancelPopup(true);
    };

    const handleClosePopup = () => {
        setShowCancelPopup(false);
    };

    const handleBack = () => {
        setShowCancelPopup(false);
    };

    const handleConfirmCancel = () => {
        setShowCancelPopup(false);
        alert("Đặt phòng đã bị hủy thành công.");
    };

    const handleCheckin = () => {
        alert("Checkin thành công!");
    };

    const handleCheckout = () => {
        navigate('/staff/booking-invoice')
    };


    return (
        <div id="bookingDetailStaff-body">
            <h2>CHI TIẾT ĐẶT PHÒNG</h2>
            <p className='bookingid'>Booking ID: 1298ry8yfuiwhiqdnoiu91</p>
            <p className="row-info">
                <span className="title">Tên khách hàng</span>
                <span className='value'>Nguyễn Văn A</span>
            </p>
            <p className="row-info">
                <span className="title">SDT khách hàng</span>
                <span className='value'>0123456789</span>
            </p>

            <p className="row-info">
                <span className="title">Phòng</span>
                <span className='value'>Windsor Room</span>
            </p>

            <p className="row-info">
                <span className="title">Đặt theo</span>
                <span className='value'>Ngày</span>
            </p>

            <p className="row-info">
                <span className="title">Số lượng khách</span>
                <span className='value'>2</span>
            </p>

            <p className="row-info">
                <span className="title">Check in - Check out</span>
                <span className='value'>01/02/2023 09:00:00 - 03/02/2023 12:00:00</span>
            </p>

            <p className="row-info">
                <span className="title">Trạng thái</span>
                <span className='value'>Đã thanh toán</span>
            </p>

            <div className='grp-btn'>
                <button className='cancel-booking' onClick={handleCancelClick}>Hủy đặt phòng</button>
                <button className='checkin' onClick={handleCheckin}>Checkin</button>
                <button className='checkout' onClick={handleCheckout}>Checkout</button>
                <button className='return' onClick={() => navigate(-1)}>Quay về</button>
            </div>

            {showCancelPopup && (
                <CancelPopup 
                    onClose={handleClosePopup} 
                    onBack={handleBack} 
                    onCancel={handleConfirmCancel} 
                />
            )}
        </div>
    );
}

export default BookingDetailStaff;
