import React from 'react'
import '../styles/CancelPopup.css'
import 'boxicons'

const CancelPopup = ({ onClose, onBack, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-header">
                    <box-icon name='x' onClick={onClose} style={{ cursor: 'pointer', position: 'absolute', right: '0' }}></box-icon>
                    <b style={{marginTop: '25px'}}>Xác nhận Hủy đặt phòng</b>
                </div>
                <div className="popup-body">
                    <p>Đặt phòng đã bị hủy thì không thể hoàn tác.</p>
                </div>
                <div className="popup-footer">
                    <button onClick={onBack} className="back-btn">Quay về</button>
                    <button onClick={onCancel} className="cancel-btn">Hủy</button>
                </div>
            </div>
        </div>

    )
}

export default CancelPopup