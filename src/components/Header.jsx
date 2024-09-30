import React, { useState } from "react";
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Header.css';
import ToggleNav from "./ToggleNav";

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
                    <li><a href="">TRANG CHỦ</a></li>
                    <li><a href="">TỔNG QUAN</a></li>
                    <li><a href="">ĐẶT PHÒNG</a></li>
                    <li><a href="">CONTACT US</a></li>
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