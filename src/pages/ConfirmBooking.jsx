import React, { useState } from 'react'
import '../styles/ConfirmBooking.css'
import PaymentMethodPopup from '../components/PaymentMethodPopup';


const ConfirmBooking = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State để quản lý trạng thái mở/đóng popup
    const [paymentMethod, setPaymentMethod] = useState(''); // Lưu phương thức thanh toán đã chọn

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleConfirmPayment = (method) => {
        setPaymentMethod(method);
        // Logic xử lý khi chọn phương thức thanh toán
        console.log("Phương thức thanh toán:", method);
    };

    return (
        <div id='confirm-booking'>
            <div className="container">
                <h2 class="title">THÔNG TIN ĐẶT PHÒNG</h2>
                <div class="info-group">
                    <div class="info-item">
                        <span class="label">Khách hàng</span>
                        <span class="value">Nguyễn Văn A</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Phòng</span>
                        <span class="value">Windsor Room</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Đặt theo</span>
                        <span class="value">Giờ</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Checkin - Checkout</span>
                        <span class="value">02/01/2024 06:00:00 - 02/01/2024 12:00:00</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Số lượng khách</span>
                        <span class="value">2</span>
                    </div>
                </div>
                <hr />
                <div className="info-group">
                    <div class="info-item">
                        <span class="label">Tổng tạm tính</span>
                        <span class="value">2.000.000</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Mã giảm giá</span>
                        <div class="input-container">
                            <input type="text" name="discount" id="discount" />
                        </div>
                    </div>
                </div>
                <div className="checkout-container">
                    <div className="info-checkout-item">
                        <span className='checkout-label'>TỔNG CỘNG</span>
                        <span className='total-price'>1.950.000 VND</span>
                    </div>
                    <button onClick={handleOpenPopup}>Thanh toán</button>
                </div>
            </div>

            <PaymentMethodPopup
                isOpen={isPopupOpen} 
                onClose={handleClosePopup} 
                onConfirm={handleConfirmPayment} 
            />
        </div>
    )
}

export default ConfirmBooking