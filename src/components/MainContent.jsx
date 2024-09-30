import React, { useEffect, useRef, useState } from 'react';

import '../styles/MainContent.css'
import divine from '../assets/divine.png'
import imgAboutUs from '../assets/aboutus.jpg'
import divineWhite from '../assets/divine-white.png'
import img1 from '../assets/datphong1.jpg'
import img2 from '../assets/datphong2.jpg'

const MainContent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ourStoryRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ourStoryRef.current) {
        const ourStory = ourStoryRef.current;
        const rect = ourStory.getBoundingClientRect();

        // Kiểm tra nếu đáy của our-story chạm vào cuối màn hình
        const bottomReached = rect.bottom <= window.innerHeight && rect.bottom > 0;
        // Kiểm tra nếu đáy của our-story đã vượt qua màn hình
        const scrolledPastBottom = rect.bottom < 0 || rect.top >= window.innerHeight;

        if (bottomReached && !isFullscreen) {
          setIsFullscreen(true);
          window.scrollTo({ top: rect.top + window.pageYOffset, behavior: 'smooth' });
        } else if (scrolledPastBottom && isFullscreen) {
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFullscreen]);

  useEffect(() => {
    if (ourStoryRef.current) {
      if (isFullscreen) {
        ourStoryRef.current.classList.add('fullscreen');
      } else {
        ourStoryRef.current.classList.remove('fullscreen');
      }
    }
  }, [isFullscreen]);


  return (
    <body id='main'>
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
            <p>Chào mừng bạn đến với ÉLÉGANCE – nơi vẻ đẹp vượt thời gian và sự thanh lịch tinh tế hòa quyện trong từng chi tiết. Ẩn mình giữa nhịp sống hiện đại, ÉLÉGANCE mang trong mình dấu ấn của sự sang trọng cổ điển, hứa hẹn sẽ biến chuyến đi của bạn trở thành một hành trình đầy cảm hứng. <br />
              Hãy để lòng mình lắng lại trong không gian thanh bình, nơi những nét tinh hoa văn hóa truyền thống gặp gỡ với sự hiện đại đầy nghệ thuật. Ở đây, từng góc nhỏ đều là một câu chuyện, từng chi tiết đều toát lên sự trân quý – nơi những chuẩn mực của sự thoải mái và xa hoa cùng nhau tỏa sáng. <br />
              Đến với ÉLÉGANCE, bạn không chỉ tìm thấy một nơi dừng chân, mà còn chạm đến cảm giác hòa mình vào một trải nghiệm sống đầy cảm xúc, nơi sự thanh nhã trong từng khoảnh khắc sẽ lưu dấu mãi trong tâm trí bạn.</p>
          </div>
          <img src={imgAboutUs} alt="" />
        </div>
      </div>

      <div id="our-story" ref={ourStoryRef}>
        <div className="our-story-container">
          <h1>OUR STORY</h1>
          <p>ÉLÉGANCE không chỉ là một khách sạn, mà còn là một hành trình đầy cảm hứng được khắc ghi qua từng thời kỳ. Từ những ngày đầu thành lập, chúng tôi đã luôn đặt mục tiêu mang đến cho du khách không chỉ sự thoải mái mà còn là một không gian đậm chất nghệ thuật và phong cách sống tinh tế. <br />
            Lấy cảm hứng từ sự hòa quyện giữa nét cổ điển và hiện đại, ÉLÉGANCE được xây dựng trên nền tảng của sự sang trọng thanh lịch, không ngừng phát triển và hoàn thiện qua từng năm tháng. Mỗi góc nhỏ trong khách sạn đều được chăm chút tỉ mỉ, từ kiến trúc đến nội thất, đều phản ánh một tinh thần nghệ thuật riêng biệt, nơi sự tinh tế trong thiết kế gặp gỡ sự ấm cúng trong từng chi tiết. <br />
            Hành trình của chúng tôi không chỉ dừng lại ở việc cung cấp một không gian nghỉ dưỡng đẳng cấp, mà còn là việc tạo nên những khoảnh khắc đáng nhớ cho mỗi du khách. Từ những buổi hoàng hôn trên ban công đến những bữa ăn thịnh soạn dưới ánh nến lung linh, chúng tôi luôn nỗ lực để biến mỗi khoảnh khắc của bạn tại ÉLÉGANCE trở thành một phần của câu chuyện tuyệt đẹp mà chúng tôi đang viết lên cùng bạn. <br />
            Chào mừng bạn đến với ÉLÉGANCE, nơi mà từng câu chuyện đều bắt đầu với một trải nghiệm vượt thời gian.</p>
        </div>
      </div>

      <div id="intro">
        <div className="intro-content">
          <p>Chúng tôi đã sẵn sàng mang đến cho bạn  kì nghỉ dưỡng <br />
            không thể tuyệt vời hơn! </p>
          <img src={divineWhite} alt="divine-white" />
        </div>
        <img className='datphong2' src={img2} alt="datphong2" />
        <img className='datphong1' src={img1} alt="datphong1" />
      </div>
    </body>

  )
}

export default MainContent