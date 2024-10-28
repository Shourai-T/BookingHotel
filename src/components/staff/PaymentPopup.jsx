import React from 'react'
import '../../styles/staff/paymentPopup.css'
import 'boxicons'
import '../../components/staff/PaymentPopup'

const PaymentPopup = ({ onClose, onBack, onPay}) => {
    return (
        <div id="paymentPopup-body">
            <div className="popup-content">
                <div className="popup-header">
                    <box-icon name='x' onClick={onClose} style={{ cursor: 'pointer', position: 'absolute', right: '0' }}></box-icon>
                    <b style={{marginTop: '25px'}}>XBạn muốn thanh toán hóa đơn này?</b>
                </div>
                <div className="popup-body">
                    <p>Hành động này không thể hoàn tác</p>
                </div>
                <div className="popup-footer">
                    <button onClick={onBack} className="back-btn">Quay về</button>
                    <button onClick={onPay} className="pay-btn">Thanh toán</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentPopup