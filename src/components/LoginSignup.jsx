import React, { useState, useEffect, useRef } from 'react';
import '../styles/LoginSignup.css';

const LoginSignup = () => {
    const [isSecondFormVisible, setIsSecondFormVisible] = useState(false); 
    const formRef = useRef(null);

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

    return (
        <div id="login-body">
            <div className="container" id="container">
                <div className="form-container login-container">
                    <form ref={formRef}>
                        <h2>ĐĂNG NHẬP</h2>
                        <p>Chào mừng bạn quay trở lại với The Élégance!</p>
                        <div className="input-field">
                            <span>Email</span>
                            <input type="email" />
                        </div>
                        <div className="input-field">
                            <span>Mật khẩu</span>
                            <input type="password" />
                        </div>
                        <div className='btn-container'>
                            <button>Đăng nhập</button>
                        </div>
                    </form>
                </div>

                <div className="form-container register-container">
                    <form ref={formRef}>
                        <h2>ĐĂNG KÝ</h2>
                        <p>Hoan nghênh bạn đến với The Élégance!</p>
                        
                        {!isSecondFormVisible ? ( // Hiển thị form đầu tiên
                            <div className="form-1">
                                <div className="input-field">
                                    <span>Email</span>
                                    <input type="email" />
                                </div>
                                <div className="input-field">
                                    <span>Họ và tên</span>
                                    <input type="text" />
                                </div>
                                <div className="input-field">
                                    <span>Số điện thoại</span>
                                    <input type="text" />
                                </div>
                                <div className="input-field">
                                    <span>Địa chỉ</span>
                                    <input type="text" />
                                </div>
                                <div className="btn-container">
                                    <button onClick={handleNextClick}>Tiếp theo</button>
                                </div>
                            </div>
                        ) : ( // Hiển thị form thứ hai nếu đã nhấn "Tiếp theo"
                            <div className="form-2">
                                <div className="input-field">
                                    <span>Mật khẩu</span>
                                    <input type="password" />
                                </div>
                                <div className="input-field">
                                    <span>Nhập lại mật khẩu</span>
                                    <input type="password" />
                                </div>
                                <div className="btn-container">
                                    <button>Đăng ký</button>
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
            </div>
        </div>
    );
};

export default LoginSignup;
