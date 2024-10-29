import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import
import RoomImage from '../../assets/Windsor Room.jpg';
import 'boxicons';
import DeleteRoomPopup from '../../components/staff/DeleteRoomPopup';
import '../../styles/staff/ManageRoom.css';

const ManageRoom = () => {
    const navigate = useNavigate();  // Corrected navigation hook
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleDeleteClick = () => {
        setShowDeletePopup(true);
    };

    const handleClosePopup = () => {
        setShowDeletePopup(false);
    };

    const handleBack = () => {
        setShowDeletePopup(false);
    };

    const handleConfirmCancel = () => {
        setShowDeletePopup(false);
        alert("Xóa phòng thành công.");
    };

    return (
        <div id='manageRoom-body'>
            <h2>DANH SÁCH PHÒNG</h2>
            <button className='createRoom-btn' onClick={() => navigate('/staff/create-room')}>
                <box-icon name='plus' ></box-icon>Tạo phòng
            </button>
            <div className='manageRoom-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Tên phòng</th>
                            <th>Loại phòng</th>
                            <th>Trạng thái</th>
                            <th>Hình ảnh</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Windsor Room</td>
                            <td>Tiêu chuẩn</td>
                            <td>Trống</td>
                            <td>
                                <img src={RoomImage} alt="Room" width="100" height="70" />
                            </td>
                            <td>
                                <button onClick={handleDeleteClick}>Xóa</button>
                            </td>
                        </tr>
                        {/* Thêm các hàng khác tại đây nếu cần */}
                    </tbody>
                </table>
            </div>
            {showDeletePopup && (
                <DeleteRoomPopup
                    onClose={handleClosePopup}
                    onBack={handleBack}
                    onDelete={handleConfirmCancel}
                />
            )}
        </div>
    );
};

export default ManageRoom;
