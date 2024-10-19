import React from 'react'
import '../styles/ToggleNavUser.css'

const ToggleNavUser = ({ isOpen, toggleNav, username, email }) => {
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
            <hr className='divider' />
            <ul className="options-nav">
                <li>Tài khoản</li>
                <li>Đặt phòng của tôi</li>
                <li>Đăng xuất</li>
            </ul>
        </div>
    )
}

export default ToggleNavUser