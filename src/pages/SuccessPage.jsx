import React from 'react'
import '../styles/SuccessPage.css'
import successGif from '../assets/success-gif.gif'

const SuccessPage = () => {
    return (
        <div id='success-page'>
            <div className="container">
                <img src={successGif} alt="" />
                <hr />
                <div className="success-message">
                    <h1>THANH TOÁN THÀNH CÔNG</h1>
                    <p>
                        Cảm ơn quý khách đã đặt phòng tại Khách sạn The Élégance. <br />
                        Hóa đơn chi tiết đã được gửi đến email của quý khách. <br />
                        Để theo dõi chi tiết đặt phòng: <br />
                        <ul style={{paddingLeft: '30px'}}>
                            <li>Vui lòng kiểm tra <b>email</b> để xem hóa đơn</li>
                            <li>Quý khách có thể theo dõi và quản lý đặt phòng tại mục <b>"Đặt phòng của tôi"</b> trên trang web. </li>
                        </ul>
                    </p>
                </div>
                <div className="btn-container">
                    <button onClick={() => window.location.href = '/'}>Quay lại trang chủ</button>
                    <button>Xem chi tiết đặt phòng</button>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage