import React from "react";
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Header.css';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <ul className="nav">
                <li><a href="">TRANG CHỦ</a></li>
                <li><a href="">TỔNG QUAN</a></li>
                <li><a href="">ĐẶT PHÒNG</a></li>
                <li><a href="">CONTACT US</a></li>
            </ul>
            <i className="fa-solid fa-bars"></i>
        </header>
    );
}

export default Header;