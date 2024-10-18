import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/ToggleNav.css'

const ToggleNav = ({ isOpen, toggleNav }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        toggleNav(); // Đóng nav khi người dùng nhấn
        navigate('/login');
    };

    const handleSignupClick = () => {
        toggleNav(); // Đóng nav khi người dùng nhấn
        navigate('/login')
    };

    return (
        <div className={`toggle-nav-container ${isOpen ? 'open' : ''}`}>
            <i class="fa-solid fa-x" onClick={toggleNav}></i>
            <hr className='divider' />
            <ul className="options-nav">
                <li onClick={handleLoginClick}>Đăng nhập</li>
                <li onClick={handleSignupClick}>Đăng kí</li>
            </ul>
        </div>
    )
}

export default ToggleNav