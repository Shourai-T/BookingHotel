import React from 'react'
import '../../styles/staff/deleteAccountPopup.css'
import 'boxicons'

const DeleteAccountPopup = ({ onClose, onBack, onDelete }) => {
    return (
        <div id="deleteAccountPopup-body">
            <div className="popup-content">
                <div className="popup-header">
                    <box-icon name='x' onClick={onClose} style={{ cursor: 'pointer', position: 'absolute', right: '0' }}></box-icon>
                    <b style={{marginTop: '25px'}}>Xác nhận Xóa tài khoản</b>
                </div>
                <div className="popup-body">
                    <p>Tài khoản đã bị xóa sẽ không thể hoàn tác.</p>
                </div>
                <div className="popup-footer">
                    <button onClick={onBack} className="back-btn">Quay về</button>
                    <button onClick={onDelete} className="delete-btn">Xóa tài khoản</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountPopup