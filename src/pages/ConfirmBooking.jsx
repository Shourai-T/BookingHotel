import React, { useEffect, useState } from 'react'
import '../styles/ConfirmBooking.css'
import PaymentMethodPopup from '../components/PaymentMethodPopup';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getDiscountDetailByCode } from '../redux/ApiRequest/apiRequestDiscount';
import { createBooking } from '../redux/ApiRequest/apiRequestBooking';
import { createPaymentByVnpay, createPaymentByZaloPay } from '../redux/ApiRequest/apiRequestPayment';
import { toast, ToastContainer } from 'react-toastify';
import { discountDetailInit } from '../redux/Slice/discountSlice';


const ConfirmBooking = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State để quản lý trạng thái mở/đóng popup
    const [paymentMethod, setPaymentMethod] = useState(''); // Lưu phương thức thanh toán đã chọn
    const location = useLocation();
    const [discountCode, setDiscountCode] = useState('');
    const { bookingInfo } = location.state || {};
    const user = useSelector(state => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const [discountError, setDiscountError] = useState('');
    const [discountName, setDiscountName] = useState('');
    const payment= useSelector(state=>state.payment.createPayment.data)
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };
    let discountInfo = useSelector(state => state.discount.discountDetail.data)
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

   
    let startTime = '';
    let endTime = '';
    switch (bookingInfo.bookingType) {
        case "Daily":
            startTime = moment(bookingInfo.startTime).format('DD/MM/YYYY');
            endTime = moment(bookingInfo.endTime).format('DD/MM/YYYY');
            break;
        case "Hourly":
            startTime = moment(bookingInfo.startTime).format('DD/MM/YYYY HH:mm');
            endTime = moment(bookingInfo.endTime).format('DD/MM/YYYY HH:mm');
            break;
        default:
            break;
    }

    useEffect(() => {
        if (discountCode) {
            dispatch(discountDetailInit());
            getDiscountDetailByCode(discountCode, dispatch);
        } else {
            // Reset trạng thái khi discountCode bị xóa
            setDiscountName('');
            setDiscountError('');
        }
    }, [discountCode, dispatch]);

    useEffect(() => {
        if (discountInfo && discountInfo?.discountStatus === "Available") {
            setDiscountName(discountInfo?.discountName);
            setDiscountError('');
        } else if (discountCode) {
            setDiscountError("Mã giảm giá không hợp lệ hoặc đã được sử dụng!");
            setDiscountName('');
        }
    }, [discountInfo, discountCode]);

    let finalTotal = discountName ? bookingInfo.total * (1 - discountInfo?.discountPercentage / 100) : bookingInfo.total;
    const handleConfirmPayment =async (method) => {
        
        if(discountError){
            toast.error('Mã giảm giá không hợp lệ hoặc đã được sử dụng!');
            return;
        }
        if(!method){
            toast.error('Vui lòng chọn phương thức thanh toán!');
            return;
        }
        const newBooking={
            startTime: bookingInfo.startTime,
            endTime: bookingInfo.endTime,
            bookingType: bookingInfo.bookingType,
            numberOfGuest: +bookingInfo.numberOfGuest,
            roomId: bookingInfo.roomId,
        }
        const bookingId = await createBooking(newBooking, dispatch);

        if (!bookingId) {
            toast.error('Đặt phòng thất bại!');
            return;
        }
        if(method==='ZaloPay'){
            const bodyZaloPay={
                amount: finalTotal,
                bookingId: bookingId,
                discountCode:discountCode ,
            }
           const paymentUrl=await createPaymentByZaloPay(bodyZaloPay,dispatch)
            window.location.href = paymentUrl
        }
        else if(method==='Vnpay'){
            const bodyVnpay={
                amount: finalTotal,
                bookingId: bookingId,
                discountCode:discountCode ,
            }
            const paymentUrl=await createPaymentByVnpay(bodyVnpay,dispatch)
            window.location.href = paymentUrl
        }
    };

    return (
        <div id='confirm-booking'>
            <div className="container">
                <h2 class="title">THÔNG TIN ĐẶT PHÒNG</h2>
                <div class="info-group">
                    <div class="info-item">
                        <span class="label">Khách hàng</span>
                        <span class="value">{user?.user.name}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Phòng</span>
                        <span class="value">{bookingInfo.roomName}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Đặt theo</span>
                        <span class="value">{bookingInfo.bookingType === "Daily" ? "Ngày" : "Giờ"}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Checkin - Checkout</span>
                        <span class="value">{startTime} - {endTime}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Số lượng khách</span>
                        <span class="value">{bookingInfo.numberOfGuest}</span>
                    </div>
                </div>
                <hr />
                <div className="info-group">
                    <div class="info-item">
                        <span class="label">Tổng tạm tính</span>
                        <span class="value">{bookingInfo.total.toLocaleString()}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Mã giảm giá</span>
                        <div className="input-container">
                            <input
                                type="text"
                                name="discount"
                                id="discount"
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
                        </div>
                    </div>
                    {discountError && <span className="label" style={{ color: 'red' }}>{discountError}</span>}
                    {discountName && <span className="label" style={{ color: 'green' }}>Mã giảm giá: {discountName}</span>}
                </div>
                <div className="checkout-container">
                    <div className="info-checkout-item">
                        <span className='checkout-label'>TỔNG CỘNG</span>
                        <span className='total-price'>{finalTotal.toLocaleString()}</span>
                    </div>
                    <button onClick={handleOpenPopup}>Thanh toán</button>
                </div>
            </div>

            <PaymentMethodPopup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                onConfirm={handleConfirmPayment}
            />
            <ToastContainer  position="top-right" autoClose={5000} />
        </div>
    );
}

export default ConfirmBooking;
