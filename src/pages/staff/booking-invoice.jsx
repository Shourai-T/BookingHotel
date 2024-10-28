import React, { useState} from 'react';
import '../../styles/staff/booking-invoice.css';
import PaymentPopup from '../../components/staff/PaymentPopup';
import { useNavigate } from 'react-router-dom';

const BookingInvoice = () => {
    const [showServices, setShowServices] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
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

    // Available services for selection
    const services = [
        { id: 1, name: 'Dịch vụ 1' },
        { id: 2, name: 'Dịch vụ 2' },
        { id: 3, name: 'Dịch vụ 3' },
        { id: 4, name: 'Dịch vụ 4' },
        { id: 5, name: 'Dịch vụ 5' },
    ];

    const toggleServiceDropdown = () => {
        setShowServices(!showServices);
    };

    const handleServiceSelect = (serviceId) => {
        setSelectedServices((prevSelected) => 
            prevSelected.includes(serviceId)
                ? prevSelected.filter((id) => id !== serviceId) // Remove if already selected
                : [...prevSelected, serviceId] // Add if not selected
        );
    };

    const handleOkClick = () => {
        setShowServices(false);
    };

    const handleCancelClick = () => {
        setShowServices(false);
        setSelectedServices([]); // Clear selection on cancel
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
                            <div className="service-rows">
                                {services.map(service => (
                                    <div className="service-row" key={service.id}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={service.id}
                                                checked={selectedServices.includes(service.id)}
                                                onChange={() => handleServiceSelect(service.id)}
                                            />
                                            {service.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="buttons">
                                <button className="ok-button" onClick={handleOkClick}>OK</button>
                                <button className="cancel-button" onClick={handleCancelClick}>Hủy</button>
                            </div>
                        </div>
                    )}
                </div>

                <p className="row-info">
                    <span className="title">Phụ phí</span>
                    <span className='value'>10%</span>
                </p>

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
