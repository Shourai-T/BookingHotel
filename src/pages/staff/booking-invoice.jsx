import React, { useEffect, useState } from 'react';
import '../../styles/staff/booking-invoice.css';
import PaymentPopup from '../../components/staff/PaymentPopup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllSurcharge } from '../../redux/ApiRequest/apiRequestSurcharge';
import { getAllUtilities } from '../../redux/ApiRequest/apiRequestUtility';
import Loading from '../../components/Loading';
import { updateBookingStatus } from '../../redux/ApiRequest/apiRequestBooking';
import { createPaymentByCash } from '../../redux/ApiRequest/apiRequestPayment';

const BookingInvoice = () => {
    const [showServices, setShowServices] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [showSurcharge, setShowSurcharge] = useState(false);
    const [selectedSurcharge, setSelectedSurcharge] = useState([]);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [total, setTotal] = useState(0);
    const booking = useSelector(state => state.booking.bookingDetail.data);
    const services = useSelector(state => state.utility.getListUtility.data);
    const surcharges = useSelector(state => state.surcharge.getListSurcharge.data);
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let sum = 0;
        if (booking.payments[0].paymentStatus === 'Success') {
            sum = 0;
        }
        else {
            sum = booking.payments[0].amount;
        }
        if (selectedServices.length > 0) {
            selectedServices.forEach(id => {
                const service = services.find(service => service.utilityId === id);
                if (service) sum += Math.round(service.utilityPrice);  // Ensure integer
            });
        }

        if (selectedSurcharge.length > 0) {
            selectedSurcharge.forEach(id => {
                const surcharge = surcharges.find(surcharge => surcharge.surchargeId === id);
                if (surcharge) {
                    const surchargeAmount = surcharge.surchargePercentage / 100 * booking.payments[0].amount;
                    sum += Math.round(surchargeAmount);  // Ensure integer
                }
            });
        }

        setTotal(Math.round(sum));  // Set total as an integer
    }, [selectedServices, selectedSurcharge, services, surcharges, booking.payments]);



    useEffect(() => {
        if (!user) {
            navigate("/loginstaff");
        }
        if (user.user.role !== "Staff") {
            navigate("/");
        }
        getAllUtilities(dispatch);
        getAllSurcharge(dispatch);
    }, []);

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
        navigate("/staff/manage-booking" )
        return
    };

    const updateStatusAndUtilities = async () => {
        const transformedArray = selectedServices.map(id => ({
            utilityId: id,
            quantity: 1
        }));
        const data = {
            bookingStatus: "CheckedOut",
            utilities: transformedArray
        }
        await updateBookingStatus(booking.bookingId, data, dispatch);
    }

    const createPayment = async () => {
        const data = {
            amount: total,
            paymentMethod: "Cash",
            bookingId: booking.bookingId
        }
        await createPaymentByCash(data, dispatch);
    }
    const toggleServiceDropdown = () => {
        setShowServices(!showServices);
    };

    const toggleSurchargeDropdown = () => {
        setShowSurcharge(!showSurcharge);
    };

    const handleServiceSelect = (serviceId) => {
        setSelectedServices((prevSelected) =>
            prevSelected.includes(serviceId)
                ? prevSelected.filter((id) => id !== serviceId)
                : [...prevSelected, serviceId]
        );
    };

    const handleSurchargeSelect = (surchargeId) => {
        setSelectedSurcharge((prevSelected) =>
            prevSelected.includes(surchargeId)
                ? prevSelected.filter((id) => id !== surchargeId)
                : [...prevSelected, surchargeId]
        );
    };

    const handleOkClick = () => {
        setShowServices(false);
    };

    const handleSurchargeOkClick = () => {
        setShowSurcharge(false);
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
                    <span className='value'>{booking.user.name}</span>
                </p>

                <p className="row-info">
                    <span className="title">SDT khách hàng</span>
                    <span className='value'>{booking.user.phoneNumber}</span>
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

                <div className="service">
                    <span className='title'>Chọn dịch vụ</span>
                    <div className="service-dropdown" onClick={toggleServiceDropdown}>
                        <span className='selected-services'>
                            {selectedServices.length > 0 ?
                                selectedServices.map(id => services.find(service => service.utilityId === id).utilityName).join(', ')
                                : 'Không có dịch vụ nào'}
                        </span>
                    </div>
                    {showServices && (
                        <div className="service-dropdown">
                            {services.map(service => (
                                <label key={service.utilityId}>
                                    <input
                                        type="checkbox"
                                        checked={selectedServices.includes(service.utilityId)}
                                        onChange={() => handleServiceSelect(service.utilityId)}
                                    />
                                    {service.utilityName}
                                </label>
                            ))}
                            <button onClick={handleOkClick}>OK</button>
                        </div>
                    )}
                </div>

                <div className="surcharge">
                    <span className='title'>Chọn phụ phí</span>
                    <div className="surcharge-dropdown" onClick={toggleSurchargeDropdown}>
                        <span className='selected-surcharge'>
                            {selectedSurcharge.length > 0 ?
                                selectedSurcharge.map(id => surcharges.find(surcharge => surcharge.surchargeId === id).surchargeName).join(', ')
                                : 'Không có phụ phí nào'}
                        </span>
                    </div>
                    {showSurcharge && (
                        <div className="surcharge-dropdown">
                            {surcharges.map(surcharge => (
                                <label key={surcharge.surchargeId}>
                                    <input
                                        type="checkbox"
                                        checked={selectedSurcharge.includes(surcharge.surchargeId)}
                                        onChange={() => handleSurchargeSelect(surcharge.surchargeId)}
                                    />
                                    {surcharge.surchargeName}
                                </label>
                            ))}
                            <button onClick={handleSurchargeOkClick}>OK</button>
                        </div>
                    )}
                </div>

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
