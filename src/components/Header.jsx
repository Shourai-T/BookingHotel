import React, { useState } from "react";
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Header.css';
import ToggleNav from "./ToggleNav";
import ToggleNavUser from "./ToggleNavUser";
import menuIcon from "../assets/menu-icon.png"

import { Link } from 'react-router-dom';


const Header = ({ scrolled }) => {
    const [showNav, setShowNav] = useState(false); // Trạng thái cho ToggleNav
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav); // Chuyển đổi trạng thái hiển thị của ToggleNav
    };

    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn); // Tạm thời thêm chức năng toggle đăng nhập
    };

    return (
        <>
            <header className={scrolled ? 'scrolled' : ''}>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="nav">
                    {/* <li><a href="">TRANG CHỦ</a></li>
                    <li><a href="">TỔNG QUAN</a></li> */}
                    <li><Link to="/">TRANG CHỦ</Link></li>
                    <li><Link to="/overview">TỔNG QUAN</Link></li>
                    <li><Link to="/booking">ĐẶT PHÒNG</Link></li>
                    <li><Link to="/contact-us">CONTACT US</Link></li>
                </ul>
                {/* Biểu tượng menu */}
                {/* <i className="fa-solid fa-bars" onClick={toggleNav} style={{ cursor: 'pointer' }}></i> */}
                <img src={menuIcon} alt="Menu" onClick={toggleNav} style={{ cursor:"pointer", width: '50px', marginRight: '20px' }}></img>
            </header>

            {/* Điều kiện hiển thị ToggleNav hoặc ToggleNavUser dựa trên trạng thái đăng nhập */}
            {isLoggedIn ? (
                <ToggleNavUser isOpen={showNav} toggleNav={toggleNav} /> // Hiển thị thanh NavUser khi đã đăng nhập
            ) : (
                <ToggleNav isOpen={showNav} toggleNav={toggleNav} />     // Hiển thị thanh Nav khi chưa đăng nhập
            )}
        </>
    );
}

export default Header;