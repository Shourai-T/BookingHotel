import React, { useState, useEffect, useRef } from 'react';
import '../styles/LoginSignup.css';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { loginUser, loginUserByFacebook, registerUser } from '../redux/ApiRequest/apiRequestAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { loginInit, loginStart } from '../redux/Slice/authSlice';
const LoginSignup = () => {
    const [isSecondFormVisible, setIsSecondFormVisible] = useState(false);
    const formRef = useRef(null);
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { login, register } = useSelector(state => state.auth);
    useEffect(() => {
        const registerButton = document.getElementById("register");
        const loginButton = document.getElementById("login");
        const container = document.getElementById("container");

        if (registerButton && loginButton && container) {
            registerButton.addEventListener("click", () => {
                container.classList.add("right-panel-active");
            });

            loginButton.addEventListener("click", () => {
                container.classList.remove("right-panel-active");
            });
        }

        return () => {
            if (registerButton && loginButton) {
                registerButton.removeEventListener("click", () => {
                    container.classList.add("right-panel-active");
                });

                loginButton.removeEventListener("click", () => {
                    container.classList.remove("right-panel-active");
                });
            }
        };
    }, []);

    useEffect(() => {
        if (login.error) {
            toast.error("Đăng nhập thất bại!");
            dispatch(loginInit());
        }
        // Thông báo khi đăng ký thành công hoặc thất bại
        if (register.success) {
            toast.success("Đăng ký thành công!");
        } else if (register.error) {
            toast.error("Đăng ký thất bại!");
        }
    }, [login, register]);

    // Hàm xử lý khi nhấn nút "Tiếp theo"
    const handleNextClick = (e) => {
        e.preventDefault(); // Ngăn chặn việc submit form
        setIsSecondFormVisible(true); // Cập nhật trạng thái để hiển thị form thứ hai
    };

    // Hàm reset form và quay về form đầu tiên khi nhấn overlay
    const handleOverlayClick = () => {
        setIsSecondFormVisible(false); // Quay lại form đầu tiên
        if (formRef.current) {
            // Reset tất cả các input về trống
            formRef.current.reset();
        }
    };

    const handlePreviousClick = () => {
        // Quay về form thứ nhất
        setIsSecondFormVisible(false);
    };

    const handleFacebookResolve = ({ provider, data }) => {
        setProvider(provider); // Lưu thông tin nhà cung cấp
        setProfile(data); // Lưu thông tin profile người dùng
        loginUserByFacebook(data.accessToken, dispatch, navigate);
    };

    const handleFacebookReject = (err) => {
        console.log('Đăng nhập thất bại:', err);
    };

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
        loginUser(newUser, dispatch, navigate);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (email === '' || name === '' || phone === '' || address === '' || confirmPassword === '') {
            toast.warn('Vui lòng điền đầy đủ thông tin');
            return;
        }
        if (password.length < 6) {
            toast.warn('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
        if (password !== confirmPassword) {
            toast.warn('Mật khẩu không khớp');
            return;
        }

        const newUser = {
            email: email,
            password: password,
            name: name,
            phoneNumber: phone,
            address: address,
            gender: gender
        }
        registerUser(newUser, dispatch, navigate);
    }
    return (
        <div id="login-body">
            {login.isFetching || register.isFetching ? (
                <div className="loading-container">
                    <ClipLoader color="#BCA992" loading={true} size={50} />
                </div>
            ) : (<div className="container" id="container">
                <div className="form-container login-container">
                    <form ref={formRef} onSubmit={handleLogin}>
                        <h2>ĐĂNG NHẬP</h2>
                        <p>Chào mừng bạn quay trở lại với The Élégance!</p>
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
                        <div className="social-login">
                            <LoginSocialFacebook
                                appId={process.env.REACT_APP_FB_APP_ID || ''}
                                fieldsProfile="id,name,email,picture"
                                onResolve={handleFacebookResolve}
                                onReject={handleFacebookReject}
                            >
                                <FacebookLoginButton />
                            </LoginSocialFacebook>
                        </div>
                        <div className='btn-container'>
                            <button>Đăng nhập</button>
                        </div>
                    </form>
                </div>

                <div className="form-container register-container">
                    <form onSubmit={handleRegister}>
                        <h2>ĐĂNG KÝ</h2>
                        <p>Hoan nghênh bạn đến với The Élégance!</p>

                        {!isSecondFormVisible ? (
                            <div className="form-1">
                                <div className="input-field">
                                    <span>Email</span>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="input-field">
                                    <span>Họ và tên</span>
                                    <input type="text" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="input-field">
                                    <span>Số điện thoại</span>
                                    <input type="text" onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="input-field">
                                    <span>Địa chỉ</span>
                                    <input type="text" onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="input-field">
                                    <span>Giới tính</span>
                                    <div>
                                        <span className="gender-option">
                                            <input type="radio" value="true" name="gender" onChange={(e) => setGender(e.target.value)} /> Nam
                                        </span>
                                        <span className="gender-option">
                                            <input type="radio" value="false" name="gender" onChange={(e) => setGender(e.target.value)} /> Nữ
                                        </span>
                                    </div>
                                </div>
                                <div className="btn-container">
                                    <button type="button" onClick={handleNextClick}>Tiếp theo</button>
                                </div>
                            </div>
                        ) : (
                            <div className="form-2">
                                <div className="input-field">
                                    <span>Mật khẩu</span>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="input-field">
                                    <span>Nhập lại mật khẩu</span>
                                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="btn-container">
                                    <button type="button" onClick={handlePreviousClick}>Quay về</button> {/* Nút Quay về */}
                                    <button type="submit">Đăng ký</button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>


                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <button className="hidden" id="login" style={{ position: 'absolute', right: '0' }} onClick={handleOverlayClick}>ĐĂNG NHẬP</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <button className="hidden" id="register" onClick={handleOverlayClick}>ĐĂNG KÝ</button>
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={5000} />
            </div>)}
        </div>
    );
};

export default LoginSignup;
