import React from 'react'
import '../styles/EditUserPopup.css'

const EditUserPopup = ({ closePopup, confirmEdit }) => {
    return (
        <div className='popup-overlay'>
            <div className="popup-content">
                <b>Thay đổi thông tin tài khoản</b>
                <p>Mọi thông tin sau khi đã thay đổi sẽ
                    không được hoàn tác </p>
                <div className="popup-btn-container">
                    <button className="popup-edit-btn" onClick={confirmEdit}>Thay đổi</button>
                    <button className="popup-cancel-btn" onClick={closePopup}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default EditUserPopup