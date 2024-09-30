import React, { useState } from "react";
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Header.css';
import ToggleNav from "./ToggleNav";

import { Link } from 'react-router-dom';


const Header = ({ scrolled }) => {
    const [showNav, setShowNav] = useState(false); // Trạng thái cho ToggleNav

    const toggleNav = () => {
        setShowNav(!showNav); // Chuyển đổi trạng thái hiển thị của ToggleNav
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
                <i className="fa-solid fa-bars" onClick={toggleNav} style={{ cursor: 'pointer' }}></i>
            </header>

            {/* Thanh điều hướng xuất hiện từ bên phải */}
            <ToggleNav isOpen={showNav} toggleNav={toggleNav} />
        </>
    );
}

export default Header;