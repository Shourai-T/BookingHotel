import React from 'react'
import '../../styles/staff/DeleteRoomPopup.css'
import 'boxicons'

const DeleteRoomPopup = ({ onClose, onBack, onDelete }) => {
    return (
        <div id="deleteRoomPopup-body">
            <div className="popup-content">
                <div className="popup-header">
                    <box-icon name='x' onClick={onClose} style={{ cursor: 'pointer', position: 'absolute', right: '0' }}></box-icon>
                    <b style={{marginTop: '25px'}}>Xác nhận Xóa phòng</b>
                </div>
                <div className="popup-body">
                    <p>Phòng đã bị xóa sẽ không thể hoàn tác.</p>
                </div>
                <div className="popup-footer">
                    <button onClick={onBack} className="back-btn">Quay về</button>
                    <button onClick={onDelete} className="delete-btn">Xóa phòng</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteRoomPopup