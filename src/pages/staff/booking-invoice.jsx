import React, { useState } from 'react';
import '../../styles/staff/booking-invoice.css';
import PaymentPopup from '../../components/staff/PaymentPopup';
import { useNavigate } from 'react-router-dom';

const BookingInvoice = () => {
    const [showServices, setShowServices] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [showSurcharge, setShowSurcharge] = useState(false);
    const [selectedSurcharge, setSelectedSurcharge] = useState([]);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const navigate = useNavigate();

    const handlePaymentClick = () => {
        setShowPaymentPopup(true);
    };

    const handleClosePopup = () => {
        setShowPaymentPopup(false);
    };

    const handleBack = () => {
        setShowPaymentPopup(false);
    };

    const handleConfirmCancel = () => {
        setShowPaymentPopup(false);
        alert("Thanh toán thành công.");
    };

    const services = [
        { id: 1, name: 'Dịch vụ 1' },
        { id: 2, name: 'Dịch vụ 2' },
        { id: 3, name: 'Dịch vụ 3' },
        { id: 4, name: 'Dịch vụ 4' },
        { id: 5, name: 'Dịch vụ 5' },
    ];

    const surcharges = [
        { id: 1, name: 'Phụ phí 1' },
        { id: 2, name: 'Phụ phí 2' },
        { id: 3, name: 'Phụ phí 3' },
        { id: 4, name: 'Phụ phí 4' },
        { id: 5, name: 'Phụ phí 5' },
    ];

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

    return (
        <div id='bookingInvoice-staff'>
            <h2>HÓA ĐƠN</h2>
            <div className="bookingInvoice-info">
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
                    <span className="title">Checkin - Checkout</span>
                    <span className='value'>26/10/2024 09:00:00 - 28/10/2024 09:00:00</span>
                </p>
                
                <div className="service">
                    <span className='title'>Chọn dịch vụ</span>
                    <div className="service-dropdown" onClick={toggleServiceDropdown}>
                        <span className='selected-services'>
                            {selectedServices.length > 0 ? 
                                selectedServices.map(id => services.find(service => service.id === id).name).join(', ') 
                                : 'Không có dịch vụ nào'}
                        </span>
                    </div>
                    {showServices && (
                        <div className="service-dropdown">
                            {services.map(service => (
                                <label key={service.id}>
                                    <input
                                        type="checkbox"
                                        checked={selectedServices.includes(service.id)}
                                        onChange={() => handleServiceSelect(service.id)}
                                    />
                                    {service.name}
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
                                selectedSurcharge.map(id => surcharges.find(surcharge => surcharge.id === id).name).join(', ') 
                                : 'Không có phụ phí nào'}
                        </span>
                    </div>
                    {showSurcharge && (
                        <div className="surcharge-dropdown">
                            {surcharges.map(surcharge => (
                                <label key={surcharge.id}>
                                    <input
                                        type="checkbox"
                                        checked={selectedSurcharge.includes(surcharge.id)}
                                        onChange={() => handleSurchargeSelect(surcharge.id)}
                                    />
                                    {surcharge.name}
                                </label>
                            ))}
                            <button onClick={handleSurchargeOkClick}>OK</button>
                        </div>
                    )}
                </div>

                <p className="row-info">
                    <span className="title">Tổng tiền</span>
                    <span className='value'>2.000.000 VND</span>
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
