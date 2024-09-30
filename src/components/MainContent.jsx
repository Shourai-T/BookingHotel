import React from 'react'
import '../styles/MainContent.css'
import divine from '../assets/divine.png'
import imgAboutUs from '../assets/aboutus.jpg'
const MainContent = () => {
  return (
    <body>
      <div id='poster'>
        <div className="container">
          <div className="content">
            <h1>THE ÉLÉGANCE</h1>
            <p>Vẻ đẹp thanh lịch, nghỉ dưỡng trọn vẹn</p>
          </div>
          <button className='booking-btn'>Booking now</button>
        </div>
        <div className="booking-section">
          <ul>
            <li>Check in
              <input type="date" />
            </li>
            <li>Check out
              <input type="date" />
            </li>
            <li style={{ border: 'none', }}>Khách
              <input type="number" min="1" defaultValue={"1"} style={{ width: '100px', }} />
            </li>
            <button>
              Kiểm tra phòng trống
            </button>
          </ul>
        </div>
      </div>

      <div id="about-us">
        <div className="about-container">
          <div className="about-content">
            <div className="about-content-header">
              <h1>ABOUT US</h1>
              <img src={divine} alt="divine" />
            </div>
            <p>Chào mừng bạn đến với ÉLÉGANCE – nơi vẻ đẹp vượt thời gian và sự thanh lịch tinh tế hòa quyện trong từng chi tiết. Ẩn mình giữa nhịp sống hiện đại, ÉLÉGANCE mang trong mình dấu ấn của sự sang trọng cổ điển, hứa hẹn sẽ biến chuyến đi của bạn trở thành một hành trình đầy cảm hứng.
              Hãy để lòng mình lắng lại trong không gian thanh bình, nơi những nét tinh hoa văn hóa truyền thống gặp gỡ với sự hiện đại đầy nghệ thuật. Ở đây, từng góc nhỏ đều là một câu chuyện, từng chi tiết đều toát lên sự trân quý – nơi những chuẩn mực của sự thoải mái và xa hoa cùng nhau tỏa sáng.
              Đến với ÉLÉGANCE, bạn không chỉ tìm thấy một nơi dừng chân, mà còn chạm đến cảm giác hòa mình vào một trải nghiệm sống đầy cảm xúc, nơi sự thanh nhã trong từng khoảnh khắc sẽ lưu dấu mãi trong tâm trí bạn.</p>
          </div>
          <img src={imgAboutUs} alt="" />
        </div>
      </div>
    </body>

  )
}

export default MainContent