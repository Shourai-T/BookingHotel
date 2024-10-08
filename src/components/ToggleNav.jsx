import React from 'react'
import '../styles/ToggleNav.css'

const ToggleNav = ({ isOpen, toggleNav }) => {
    return (
        <div className={`toggle-nav-container ${isOpen ? 'open' : ''}`}>
            <i class="fa-solid fa-x" onClick={toggleNav}></i>
            <hr className='divider' />
            <ul className="options-nav">
                <li>Đăng nhập</li>
                <li>Đăng kí</li>
            </ul>
        </div>
    )
}

export default ToggleNav