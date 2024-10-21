import React from 'react'
import '../styles/Contact.css'
import logo from '../assets/logo-nentrang.png'

const ContactPage = () => {
  return (
    <div id='contact-us'>
      <div className="container">
        <div className="content-container">
          <h2>Liên hệ chúng tôi</h2>
          <p>Cảm ơn bạn đã ghé thăm trang web của The Élégance! <br />
            Chúng tôi vô cùng vui mừng khi có cơ hội được phục vụ bạn. Nếu bạn có bất kỳ thắc mắc, góp ý hay yêu cầu hỗ trợ nào, đừng ngần ngại liên hệ với chúng tôi. Đội ngũ của The Élégance luôn sẵn sàng lắng nghe và hỗ trợ bạn trong thời gian sớm nhất có thể. <br />
            <span style={{textDecoration: 'underline'}}>Thông Tin Liên Hệ:</span> <br />
            <ul style={{paddingLeft: '30px', fontWeight: 'bold'}}>
              <li>Email: elegancehotel.info@gmail.com</li>
              <li>Điện thoại: (01)23456789</li>
            </ul>
            Một lần nữa, xin chân thành cảm ơn sự tin tưởng và lựa chọn của bạn đối với The Élégance. Chúng tôi mong sớm được chào đón bạn và mang đến cho bạn những trải nghiệm tuyệt vời. <br />
            Trân trọng, <br />
            The Élégance – Đội ngũ của chúng tôi luôn đồng hành cùng bạn! <br />
            </p>
        </div>
        <img src={logo} alt="" />
      </div>
    </div>
  )
}

export default ContactPage