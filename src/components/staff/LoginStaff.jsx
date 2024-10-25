import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser} from '../../redux/ApiRequest/apiRequestAuth'; 
import '../../styles/staff/LoginStaff.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {logoImage} from '../../assets/logo-nentrang.png'

const LoginStaff = () => {
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login = useSelector(state => state.auth.login);

    useEffect(() => {
        if (login.error) {
            toast.error("Đăng nhập thất bại!"); // Hiển thị thông báo lỗi nếu đăng nhập thất bại
        } else if (login.success) {
            toast.success("Đăng nhập thành công!"); // Hiển thị thông báo nếu đăng nhập thành công
        }
    }, [login]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }
        const newUser = {
            email: email,
            password: password,
        }
        navigate("/staff/manage-booking")
    }


    return (
        <div id = "loginStaffbody">
            <div id="loginStaffcontainer">
                <div className='login-form'>
                    <div className='logo'>
                        
                    </div>
                    <hr></hr>
                    <h2>ĐĂNG NHẬP</h2>
                    <form ref={formRef} onSubmit={handleLogin}>
                        <div className="input-field">
                            <span>Email</span>
                            <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div className="input-field">
                            <span>Mật khẩu</span>
                            <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='login-btn'>
                            <button>Đăng nhập</button>
                        </div>
                    </form>
                </div>
                <div className='right-img'>
                    {/* Thêm hình ảnh nếu cần */}
                </div>
            </div>

        </div>
    );
};

export default LoginStaff;
