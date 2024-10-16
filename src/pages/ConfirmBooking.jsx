import React from 'react'
import '../styles/ConfirmBooking.css'

const ConfirmBooking = () => {
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
            </div>
        </div>
    )
}

export default ConfirmBooking