import React, { useEffect, useState } from 'react';
import '../../styles/staff/booking-invoice.css';
import PaymentPopup from '../../components/staff/PaymentPopup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllSurcharge } from '../../redux/ApiRequest/apiRequestSurcharge';
import { getAllUtilities } from '../../redux/ApiRequest/apiRequestUtility';
import Loading from '../../components/Loading';
import { getBookingDetail, updateBookingStatus } from '../../redux/ApiRequest/apiRequestBooking';
import { createPaymentByCash } from '../../redux/ApiRequest/apiRequestPayment';

const BookingInvoice = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedSurcharge, setSelectedSurcharge] = useState([]);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [total, setTotal] = useState(0);
    const { bookingId } = useParams();
    const booking = useSelector(state => state.booking.bookingDetail.data);
    const services = useSelector(state => state.utility.getListUtility.data);
    const surcharges = useSelector(state => state.surcharge.getListSurcharge.data);
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        if (!user) {
            navigate("/loginstaff");
        }
        if (user.user.role !== "Staff") {
            navigate("/");
        }
        getBookingDetail(bookingId, dispatch);
        getAllUtilities(dispatch);
        getAllSurcharge(dispatch);
    }, [bookingId, dispatch,user]);

    useEffect(() => {
        let sum = 0;
        let totalNotPayment = 0;
        if (booking && booking.payments && booking.payments[0]) {
            if (booking.payments[0].paymentStatus === 'Success') {
                sum = 0;
            }
        }
        else {
            switch (booking.bookingType) {
                case "Daily":
                    sum = booking.room.pricePerDay * moment(booking.endTime).diff(moment(booking.startTime), 'days');
                    break;
                default:
                    sum = booking.room.pricePerHour * moment(booking.endTime).diff(moment(booking.startTime), 'hours');
                    break;
            }
        }
        if (selectedServices.length > 0 && services) {
            selectedServices.forEach(item => {
                const service = services.find(service => service.utilityId === item.utilityId);
                if (service) sum += Math.round(service.utilityPrice * item.quantity);
            });
        }
        if (selectedSurcharge.length > 0 && surcharges) {
            selectedSurcharge.forEach(id => {
                const surcharge = surcharges.find(surcharge => surcharge.surchargeId === id);
                if (surcharge && booking && booking.payments && booking.payments[0]) {
                    const surchargeAmount = surcharge.surchargePercentage / 100 * booking.payments[0].amount;
                    sum += Math.round(surchargeAmount);
                }
                else{
                    switch (booking.bookingType) {
                        case "Daily":
                            totalNotPayment = booking.room.pricePerDay * moment(booking.endTime).diff(moment(booking.startTime), 'days');
                            break;
                        default:
                            totalNotPayment =  booking.room.pricePerHour * moment(booking.endTime).diff(moment(booking.startTime), 'hours');
                            break;
                    }
                    const surchargeAmount = surcharge.surchargePercentage / 100 * totalNotPayment;
                    sum += Math.round(surchargeAmount);
                }
            });
        }
        setTotal(Math.round(sum));
    }, [selectedServices, selectedSurcharge, services, surcharges, booking]);

    if (!booking) {
        return <Loading />
    }
    const handlePaymentClick = () => {
        setShowPaymentPopup(true);
    };

    const handleClosePopup = () => {
        setShowPaymentPopup(false);
    };

    const handleBack = () => {
        setShowPaymentPopup(false);
    };

    const handleConfirmCancel = async () => {
        if (total === 0) {
            await updateStatusAndUtilities();
            navigate("/staff/manage-booking")
            return;
        }
        await createPayment();
        await updateStatusAndUtilities();
        navigate("/staff/manage-booking")
        return
    };

    const updateStatusAndUtilities = async () => {
        try {
            const data = {
                bookingStatus: "CheckedOut",
                utilities: selectedServices
            };
            await updateBookingStatus(booking.bookingId, data, dispatch);
        } catch (error) {
            console.error("Error updating booking status:", error);
        }
    };

    const createPayment = async () => {
        try {
            const data = {
                amount: total,
                paymentMethod: "Cash",
                bookingId: booking.bookingId
            };
            await createPaymentByCash(data, dispatch);
        } catch (error) {
            console.error("Error creating payment:", error);
        }
    };

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
    let startTime = '';
    let endTime = '';
    switch (booking.bookingType) {
        case "Daily":
            startTime = moment.tz(booking.startTime, "UTC").format('DD/MM/YYYY')
            endTime = moment.tz(booking.endTime, "UTC").format('DD/MM/YYYY')
            break;
        case "Hourly":
            startTime = moment.tz(booking.startTime, "UTC").format('DD/MM/YYYY HH:mm')
            endTime = moment.tz(booking.endTime, "UTC").format('DD/MM/YYYY HH:mm')
            break;
        default:
            console.log('Error')
            break;
    }
    return (
        <div id='bookingInvoice-staff'>
            <h2>HÓA ĐƠN</h2>
            <div className="bookingInvoice-info">
                <p className='bookingid'>Booking ID: {booking.bookingId}</p>
                <p className="row-info">
                    <span className="title">Tên khách hàng</span>
                    <span className='value'>{booking.user?.name ? booking.user.name : "Khách đặt tại chỗ"}</span>
                </p>

                <p className="row-info">
                    <span className="title">SDT khách hàng</span>
                    <span className='value'>{booking.user?.phoneNumber ? booking.user.phoneNumber : "Không có"}</span>
                </p>
                <p className="row-info">
                    <span className="title">Phòng</span>
                    <span className='value'>{booking.room.name}</span>
                </p>
                <p className="row-info">
                    <span className="title">Đặt theo</span>
                    <span className='value'>{status}</span>
                </p>
                <p className="row-info">
                    <span className="title">Số lượng khách</span>
                    <span className='value'>{booking.numberOfGuest}</span>
                </p>
                <p className="row-info">
                    <span className="title">Checkin - Checkout</span>
                    <span className='value'>{startTime} - {endTime}</span>
                </p>

                <p className='row-info'>
                    <span className="title">Dịch vụ dùng thêm</span>
                    <span className='value'>
                        {services && services.map(service => {
                            return (
                                <div className="service-item">
                                    <label> {service.utilityName} ({service.utilityPrice.toLocaleString()})</label>
                                    <input
                                        type="number"
                                        min="0"
                                        onChange={(e) => {
                                            const quantity = parseInt(e.target.value, 10);
                                            setSelectedServices(prevServices => {
                                                if (quantity > 0) {
                                                    return [
                                                        ...prevServices.filter(item => item.utilityId !== service.utilityId),
                                                        { utilityId: service.utilityId, quantity }
                                                    ];
                                                } else {
                                                    return prevServices.filter(item => item.utilityId !== service.utilityId);
                                                }
                                            });
                                        }}
                                    />
                                </div>

                            )
                        })}

                    </span>
                </p>

                <p className='row-info'>
                    <span className="title">Phụ phí</span>
                    <span className='value'>
                        {surcharges.map(surcharge => {
                            return (
                                <div className="surcharge-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setSelectedSurcharge(prevSurcharge => {
                                                    if (isChecked) {
                                                        return [...prevSurcharge, surcharge.surchargeId];
                                                    } else {
                                                        return prevSurcharge.filter(item => item !== surcharge.surchargeId);
                                                    }
                                                });
                                            }}
                                        />
                                        {surcharge.surchargeName} ({surcharge.surchargePercentage}%)
                                    </label>
                                </div>
                            )
                        })}

                    </span>
                </p>





                <p className="row-info">
                    <span className="title">Số tiền còn phải trả còn lại:</span>
                    <span className='value'>{total.toLocaleString()}</span>
                </p>
            </div>

            <div className='grp-btns'>
                <button className='payment' onClick={handlePaymentClick}>Thanh toán</button>
                <button className='return' onClick={() => navigate(-1)}> Quay về</button>
            </div>

            {showPaymentPopup && (
                <PaymentPopup
                    onClose={handleClosePopup}
                    onBack={handleBack}
                    onPay={handleConfirmCancel}
                />
            )}
        </div>
    );
};

export default BookingInvoice;
