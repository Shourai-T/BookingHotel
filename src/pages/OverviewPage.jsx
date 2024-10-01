import React from 'react'
import '../styles/OverviewPage.css'
import divine from '../assets/divine-white.png'
import room1 from '../assets/phongdon1.jpg'
import room2 from '../assets/phongdoi.jpg'
import room3 from '../assets/phonggiadinh.jpg'
import room4 from '../assets/phonghangsang.jpg'

const OverviewPage = () => {
  return (
    <body id='overview' style={{ minHeight: '1000px' }}>
      <div style={{ backgroundColor: '#000', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="overview-title">
          <img src={divine} alt="divine1" style={{ transform: 'rotate(180deg)' }} />
          <h1>CÁC LOẠI PHÒNG</h1>
          <img src={divine} alt="divine2" />
        </div>
      </div>
      <div>
        <div className="room-item">
          <img src={room2} alt="phongdon" />
          <div className="room-item-content">
            <h3>Phòng tiêu chuẩn ( Standard room)</h3>
            <p>Phòng nghỉ được thiết kế tinh tế, có TV và 1 giường với bộ ga trải giường cao cấp, mang đến cho quý khách giấc ngủ thư thái. Quý khách có thể tận hưởng minibar đầy ắp các món ăn nhẹ đặc sản từ Anh, Pháp. Phòng tắm lát đá cẩm thạch, kết hợp với các sản phẩm sang trọng mang hương thơm độc quyền đặc trưng của chúng tôi, tạo nên trải nghiệm đẳng cấp và thoải mái.</p>
            <a href="">Xem chi tiết</a>
          </div>
        </div>
        <div className="room-item">
          <img src={room1} alt="phongdon" />
          <div className="room-item-content">
            <h3>Phòng đôi ( Double room)</h3>
            <p>Giường đôi, nhiều tiện nghi hơn và không gian rộng rãi hơn cho kỳ nghỉ dưỡng của bạn. Phòng được thiết kế tinh tế, gam màu trung tính, kết hợp hài hòa giữa nét hiện đại và truyền thống lâu đời, tất cả tạo nên một không gian tuyệt vời hơn bao giờ hết cho cặp đôi/ bạn bè/ người thân.</p>
            <a href="">Xem chi tiết</a>
          </div>
        </div>
        <div className="room-item">
          <img src={room3} alt="phongdon" />
          <div className="room-item-content">
            <h3>Phòng gia đình ( Family Room)</h3>
            <p>Giường đôi kingsize, bàn trà, bàn trang điểm, 2 phòng tắm và thêm nhiều tiện nghi khác. Đảm bảo gia đình, nhóm bạn của bạn có 1 kỳ nghỉ thật thoải mái, những giấc ngủ ngon. Thiết kế dựa theo nét cổ điển của quý tộc châu Âu, chúng tôi hứa hẹn sẽ mang tới cho bạn những trải nghiệm chưa từng có!</p>
            <a href="">Xem chi tiết</a>
          </div>
        </div>
        <div className="room-item">
          <img src={room4} alt="phongdon" />
          <div className="room-item-content">
            <h3>Phòng hạng sang ( Deluxe Room)</h3>
            <p>Phòng Deluxe mang đến một không gian hoàn hảo giữa sự sang trọng và thoải mái, lý tưởng cho kỳ nghỉ của bạn tại Élégance. Với diện tích rộng rãi, phòng được trang trí tinh tế với những tác phẩm nghệ thuật ấn tượng, tạo nên một bầu không khí độc đáo và lôi cuốn.</p>
            <a href="">Xem chi tiết</a>
          </div>
        </div>
        <button className="booking-now-btn">
          ĐẶT PHÒNG NGAY
        </button>
      </div>
    </body>
  )
}

export default OverviewPage