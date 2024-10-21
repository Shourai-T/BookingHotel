import React, { useState } from 'react'
import '../styles/AccountUser.css'
import DeleteAccountPopup from '../components/DeleteAccountPopup';
import { useNavigate } from 'react-router-dom';

const AccountUser = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/account/edit');
    };

    const handleDeleteClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const confirmDelete = () => {
        // Xử lý logic xóa tài khoản
        console.log('Tài khoản đã được xóa');
        setShowPopup(false);
    };

    return (
        <div id='account'>
            <div className="container">
                <div className="row-info">
                    <div className="col-1">
                        <div className='info-user'>
                            <i class="fa-solid fa-user" style={{ style: '#0000' }}></i>
                            <p>Nguyễn Văn Á</p>
                        </div>
                        <p style={{
                            marginLeft: '28px',
                            textDecoration: 'underline',
                            color: '#1E1E1EBD'
                        }}>
                            NguyenVanA@gmail.com
                        </p>
                        <hr />
                        <b>Khách hàng</b>
                    </div>
                    <div className="col-2">
                        <div class="info-group">
                            <div class="info-item">
                                <span class="label">Họ tên</span>
                                <span class="value">Nguyễn Văn A</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Số điện thoại</span>
                                <span class="value">666666666</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Địa chỉ</span>
                                <span class="value">2 Võ Oanh, Bình Thạnh</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-row">
                    <button onClick={handleEditClick}>Chỉnh sửa tài khoản</button>
                    <button onClick={handleDeleteClick}>Xóa tải khoản</button>
                </div>
            </div>
            {showPopup && <DeleteAccountPopup closePopup={closePopup} confirmDelete={confirmDelete} />}
        </div>
    )
}

export default AccountUser