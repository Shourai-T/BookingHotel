import React, { useState } from 'react'
import '../styles/EditUser.css'
import EditUserPopup from '../components/EditUserPopup';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleEditClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const confirmEdit = () => {
        // Xử lý logic xóa tài khoản
        console.log('Tài khoản đã được edit');
        setShowPopup(false);
    };

    const handleCancelClick = () => {
        navigate('/account');
    };
    
    return (
        <div id='edit-account'>
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
                                <div className="input-container">
                                    <input type="text" class="value" name="" id="" placeholder='Nguyễn Văn A' />
                                </div>
                            </div>
                            <div class="info-item">
                                <span class="label">Số điện thoại</span>
                                <div className="input-container">
                                    <input type="text" class="value" name="" id="" placeholder='66666666' />
                                </div>
                            </div>
                            <div class="info-item">
                                <span class="label">Địa chỉ</span>
                                <div className="input-container">
                                    <input type="text" class="value" name="" id="" placeholder='2 Võ Oanh, Bình Thạnh' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-row">
                    <button onClick={handleCancelClick}>Hủy</button>
                    <button onClick={handleEditClick}>Thay đổi thông tin</button>
                </div>
            </div>
            {showPopup && <EditUserPopup closePopup={closePopup} confirmEdit={confirmEdit} />}
        </div>
    )
}

export default EditUser