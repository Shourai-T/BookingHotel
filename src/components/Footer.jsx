import React from 'react'
import logo from '../assets/logo.png'
import '../styles/Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <img src={logo} alt="logo" />
                <div className='col-2'>
                    <p>(01)23456789</p>
                    <p><a href="">theelegance@gmail.com</a></p>
                </div>
                <div className='col-3'>
                    <p>The Élélégance Hotel</p>
                    <p>02 Võ Oanh</p>
                    <p>Bình Thạnh</p>
                    <p>Hồ Chí Minh</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer