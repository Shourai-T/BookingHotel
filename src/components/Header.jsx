import React, { useState } from "react";
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Header.css';
import ToggleNav from "./ToggleNav";
import ToggleNavUser from "./ToggleNavUser";
import menuIcon from "../assets/menu-icon.png"

import { Link, useNavigate } from 'react-router-dom';
import WarningPopup from "./WarningPopup";
import { useSelector } from "react-redux";


const Header = ({ scrolled }) => {
    const [showNav, setShowNav] = useState(false); // Trạng thái cho ToggleNav
     // Set trạng thái đăng nhập (Hiện là false)
    const [showPopup, setShowPopup] = useState(false);
    const user = useSelector(state => state.auth.login.currentUser);
    const navigate = useNavigate();

    const toggleNav = () => {
        setShowNav(!showNav); // Chuyển đổi trạng thái hiển thị của ToggleNav
    };

    const handleNavClick = (e, path) => {
        if (!user) {
            e.preventDefault(); // Ngăn không cho điều hướng nếu chưa đăng nhập
            setShowPopup(true); // Hiển thị popup yêu cầu đăng nhập
        } else {
            navigate(path); // Chuyển hướng nếu đã đăng nhập
        }
    };

    const closePopup = () => {
        setShowPopup(false); // Đóng popup
    };

    return (
        <>
            <header className={scrolled ? 'scrolled' : ''}>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="nav">
                    {/* <li><Link to="/">TRANG CHỦ</Link></li>
                    <li><Link to="/overview">TỔNG QUAN</Link></li>
                    <li><Link to="/booking">ĐẶT PHÒNG</Link></li>
                    <li><Link to="/contact-us">CONTACT US</Link></li> */}
                    <li><Link to="/">TRANG CHỦ</Link></li>
                    <li><Link to="/overview">TỔNG QUAN</Link></li>
                    <li><Link to="/booking" onClick={(e) => handleNavClick(e, '/booking')}>ĐẶT PHÒNG</Link></li>
                    <li><Link to="/contact-us">CONTACT US</Link></li>
                </ul>
                {/* Biểu tượng menu */}
                {/* <i className="fa-solid fa-bars" onClick={toggleNav} style={{ cursor: 'pointer' }}></i> */}
                <img src={menuIcon} alt="Menu" onClick={toggleNav} style={{ cursor:"pointer", width: '50px', marginRight: '20px' }}></img>
            </header>

            {/* Điều kiện hiển thị ToggleNav hoặc ToggleNavUser dựa trên trạng thái đăng nhập */}
            {user ? (
                <ToggleNavUser isOpen={showNav} toggleNav={toggleNav} username={user.user.name}
                email={user.user.email} /> // Hiển thị thanh NavUser khi đã đăng nhập
            ) : (
                <ToggleNav isOpen={showNav} toggleNav={toggleNav} />     // Hiển thị thanh Nav khi chưa đăng nhập
            )}

            {/* Hiển thị popup nếu chưa đăng nhập */}
            {showPopup && <WarningPopup closePopup={closePopup} />}
        </>
    );
}

export default Header;