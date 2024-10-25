import React, { useState } from 'react'
import '../styles/AccountUser.css'
import DeleteAccountPopup from '../components/DeleteAccountPopup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getProfile } from '../redux/ApiRequest/apiRequestUser';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
const AccountUser = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        getProfile(dispatch);
    }, [dispatch]);
    const { getUser } = useSelector(state => state.user)
    
    const handleEditClick = () => {
        navigate('/account/edit');
    };
    const user = getUser.data
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
<<<<<<< HEAD
            <div className="container">
                <div className="row-info">
                    <div className="col-1">
                        <div className='info-user'>
                            <i class="fa-solid fa-user" style={{ style: '#0000' }}></i>
                            <p>Nguyễn Văn A</p>
                        </div>
                        <p style={{
                            marginLeft: '28px',
                            marginTop: '20px',
                            textDecoration: 'underline',
                            color: '#1E1E1EBD',
                            fontSize: 12
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
=======
            {getUser.isFetching ? (
                <Loading />
            )
                : (<div className="container">
                    <div className="row-info">
                        <div className="col-1">
                            <div className='info-user'>
                                <i class="fa-solid fa-user" style={{ style: '#0000' }}></i>
                                <p>{user?.name}</p>
                            </div>
                            <p style={{
                                marginLeft: '28px',
                                textDecoration: 'underline',
                                color: '#1E1E1EBD'
                            }}>
                                {user?.email}
                            </p>
                            <hr />
                            <b>Khách hàng</b>
                        </div>
                        <div className="col-2">
                            <div class="info-group">
                                <div class="info-item">
                                    <span class="label">Họ tên</span>
                                    <span class="value">{user?.name}</span>
                                </div>
                                <div class="info-item">
                                    <span class="label">Số điện thoại</span>
                                    <span class="value">{user?.phoneNumber}</span>
                                </div>
                                <div class="info-item">
                                    <span class="label">Địa chỉ</span>
                                    <span class="value">{user?.address}</span>
                                </div>
>>>>>>> 313e9cd93a3a443d614aaa40d11e5f4fcf7ae8cc
                            </div>
                        </div>
                    </div>
                    <div className="btn-row">
                        <button onClick={handleEditClick}>Chỉnh sửa tài khoản</button>
                    </div>
                </div>)}
        </div>
    )
}

export default AccountUser