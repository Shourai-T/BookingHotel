import React from 'react'
import '../styles/ToggleNavUser.css'
import { logOut } from '../redux/ApiRequest/apiRequestAuth'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ToggleNavUser = ({ isOpen, toggleNav, username, email }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogOut = () => {
        logOut(dispatch, navigate);
    }

    const handleClickGoBooking = () => {
        navigate('/booking-list');
    }

    const handleAccountClick = () => {
        navigate('/account');
    }

    return (
        <div className={`toggle-nav-container ${isOpen ? 'open' : ''}`}>
            <i class="fa-solid fa-x" onClick={toggleNav}></i>
            <div className="user-container">
                <i class="fa-solid fa-user" style={{style: '#0000'}}></i>
                <div className="user-info-container">
                    <h5>{username}</h5>
                    <p>{email}</p>
                </div>
            </div>
            <ul className="options-nav">
                <li onClick={handleAccountClick}>Tài khoản</li>
                <li onClick={handleClickGoBooking}>Đặt phòng của tôi</li>
                <li onClick={handleLogOut}>Đăng xuất</li>
            </ul>
        </div>
    )
}

export default ToggleNavUser