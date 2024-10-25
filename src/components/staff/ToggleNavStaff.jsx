import React, { useState, useEffect } from 'react';
import '../../styles/staff/toggleNavStaff.css';
import { useNavigate } from 'react-router-dom';

const ToggleNavStaff = ({ username, email }) => {
    const [selectedOption, setSelectedOption] = useState('booking'); 
    const navigate = useNavigate();

    
    useEffect(() => {
        navigate('/staff/manage-booking');
    }, [navigate]);

    const handleNavigation = (path, option) => {
        setSelectedOption(option);
        navigate(path);
    };

    return (
        <div className='togglenavstaff-container'>
            <div className="user-container">
                <i className="fa-solid fa-user"></i>
                <div className="user-info-container">
                    <h5>Nguyễn Văn A</h5>
                    <p>nguyenvana@gmail.com</p>
                </div>
            </div>
            <hr className= 'user-divider'></hr>
            <ul className="options-nav">
                <li
                    className={selectedOption === 'booking' ? 'selected' : ''}
                    onClick={() => handleNavigation('/staff/manage-booking', 'booking')}
                >
                    Quản lý đặt phòng
                </li>
                <li
                    className={selectedOption === 'account' ? 'selected' : ''}
                    onClick={() => handleNavigation('/staff/account', 'account')}
                >
                    Quản lý tài khoản
                </li>
                <li
                    className={selectedOption === 'revenue' ? 'selected' : ''}
                    onClick={() => handleNavigation('/staff/revenue', 'revenue')}
                >
                    Doanh thu
                </li>
                <li
                    className={selectedOption === 'rooms' ? 'selected' : ''}
                    onClick={() => handleNavigation('/staff/rooms', 'rooms')}
                >
                    Quản lý phòng
                </li>
            </ul>
        </div>
    );
};

export default ToggleNavStaff;
