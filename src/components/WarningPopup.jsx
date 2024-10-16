import React from 'react'
import '../styles/WarningPopup.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';


const WarningPopup = ({ closePopup }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className='popup-overlay'>
            <div className="popup-content">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>Cần đăng nhập để thực hiện hành động này!</p>
                <div className="popup-btn-container">
                    <button className="popup-login-btn" onClick={handleLogin}>Đăng nhập</button>
                    <button className="popup-cancel-btn" onClick={closePopup}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default WarningPopup