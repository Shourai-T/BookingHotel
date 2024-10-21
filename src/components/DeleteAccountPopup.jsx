import React from 'react';
import '../styles/DeleteAccountPopup.css';

const DeleteAccountPopup = ({ closePopup, confirmDelete }) => {
    return (
        <div className='popup-overlay'>
            <div className="popup-content">
                <b>Xác nhận xóa tài khoản</b>
                <p>Mọi thông tin bao gồm thông tin cá nhân
                    và lịch sử đặt phòng đều sẽ bị xóa </p>
                <div className="popup-btn-container">
                    <button className="popup-delete-btn" onClick={confirmDelete}>Xóa</button>
                    <button className="popup-cancel-btn" onClick={closePopup}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccountPopup;
