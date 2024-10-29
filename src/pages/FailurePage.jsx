import React, { useEffect } from 'react'
import '../styles/FailurePage.css'
import failedGif from '../assets/failed-gif.gif'
import { useNavigate } from 'react-router-dom';

const FailurePage = () => {
    const navigate = useNavigate();
  return (
    <div id='failure-page'>
            <div className="container">
                <img src={failedGif} alt="" />
                <hr />
                <div className="failure-message">
                    <h1>THANH TOÁN THẤT BẠI</h1>
                    <p>
                        Rất tiếc, quá trình thanh toán của quý khách không thành công. <br />
                        Quý khách có thể: <br />
                        <ul style={{paddingLeft: '30px'}}>
                            <li>Kiểm tra lại thông tin tài khoản ngân hàng hoặc số tiền chuyển khoản.</li>
                            <li>Thử lại phương thức thanh toán khác.</li>
                        </ul>
                        Nếu cần hỗ trợ, vui lòng liên hệ với chúng tôi qua: <br />
                        <ul style={{paddingLeft: '30px'}}>
                            <li><b>Số điện thoại:</b> 0123 456 789</li>
                            <li><b>Email:</b> theelegance@gmail.com</li>
                        </ul>
                    </p>
                </div>
                <div className="btn-container">
                    <button onClick={() => navigate("/")}>Quay lại trang chủ</button>
                </div>
            </div>
        </div>
  )
}

export default FailurePage