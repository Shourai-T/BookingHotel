import React, { useState } from 'react';
import '../styles/PaymentMethodPopup.css';
import 'boxicons'
import ZaloPay from '../assets/zalopay.png'
import VnPay from '../assets/vnpay.jpg'

const PaymentMethodPopup = ({ isOpen, onClose, onConfirm }) => {
    const [selectedMethod, setSelectedMethod] = useState(''); // State để lưu phương thức được chọn

    const handleConfirm = () => {
        onConfirm(selectedMethod);
        onClose(); // Đóng popup sau khi xác nhận
    };

    if (!isOpen) return null; // Không hiển thị nếu không mở

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-header">
                <box-icon name='x' onClick={onClose} style={{ cursor: 'pointer' }}></box-icon>
                    <h2>Hình thức thức thanh toán</h2>
                </div>
                <div className="popup-body">
                    <label>
                        <input 
                            type="checkbox" 
                            value="ZaloPay" 
                            checked={selectedMethod === 'ZaloPay'} 
                            onChange={() => setSelectedMethod('ZaloPay')} 
                        />
                        <img src={ZaloPay} className='payment-logo'></img>Thanh toán bằng ZaloPay
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            value="Vnpay" 
                            checked={selectedMethod === 'Vnpay'} 
                            onChange={() => setSelectedMethod('Vnpay')} 
                        />
                        <img src={VnPay} className='payment-logo'></img>Thanh toán bằng VNPay
                    </label>
                </div>
                <div className="popup-footer">
                    <button onClick={onClose} className="cancel-btn">Hủy</button>
                    <button onClick={handleConfirm} className="confirm-btn">Thanh toán</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodPopup;