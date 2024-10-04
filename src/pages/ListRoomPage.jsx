import React, { useState } from 'react';  
import Divider from '../assets/divider-black-twostar.png';
import 'boxicons';
import Phong1 from '../assets/Edelweiss Room.jpg';
import Phong2 from '../assets/Florence Room.jpg';
import Phong3 from '../assets/Windsor Room.jpg';
import '../styles/ListRoomPage.css';
import HinhthoiTrang from '../assets/hinhthoi_trang.png';

const roomData = [
  {
    name: "Edelweiss Room",
    furniture: ["1 giường ngủ cỡ lớn", "Tủ đựng đồ", "Minibar", "Bàn trà"],
    amenities: ["Wifi miễn phí", "Minibar với đồ uống phong phú", "Phòng tắm lát đá cẩm thạch", "Mỹ phẩm cao cấp", "TV độ nét cao", "Ban công nhìn ra biển"],
    priceDay: "1.500.000 / đêm",
    priceHour: "250.000 / giờ"
  },
  {
    name: "Florence Room",
    furniture: ["1 giường ngủ tiêu chuẩn", "Tủ đựng đồ", "Minibar", "Bàn trà"],
    amenities: ["Wifi miễn phí", "Minibar với đồ ăn vặt từ Anh - Pháp", "Phòng tắm lát đá cẩm thạch", "Mỹ phẩm, sản phẩm chăm sóc cá nhân", "TV độ nét cao", "Gần thang máy", "Cho phép thú cưng dưới 5kg"],
    priceDay: "1.200.000 / đêm",
    priceHour: "200.000 / giờ"
  },
  {
    name: "Windsor Room",
    furniture: ["2 giường đôi", "Tủ đựng đồ", "Minibar", "Bàn trà"],
    amenities: ["Wifi miễn phí", "Minibar với đồ uống từ khắp nơi", "Phòng tắm lát đá cẩm thạch", "Sản phẩm chăm sóc cao cấp", "TV màn hình rộng", "Phòng cách âm", "Cho phép thú cưng dưới 10kg"],
    priceDay: "1.800.000 / đêm",
    priceHour: "300.000 / giờ"
  }
];

const ListRoomPage = () => {
  const [activeImage, setActiveImage] = useState(0); 

  const handleImageClick = (index) => {
    setActiveImage(index); 
  };

  const room = roomData[activeImage];

  return (
    <div>
      <div id="posterlistphong">
        <div className="content-listroom">
          <h1>Danh sách phòng Tiêu Chuẩn</h1>
        </div>
      </div>

      <div id='main-listroom'>
        <button><box-icon name='chevron-left'></box-icon>Các loại phòng</button>

        <div className='list-of-image'>
          <div className={activeImage === 0 ? 'image-container active' : 'image-container inactive'}>
            <img src={Phong1} onClick={() => handleImageClick(0)} alt="Edelweiss Room" />
          </div>
          <div className={activeImage === 1 ? 'image-container active' : 'image-container inactive'}>
            <img src={Phong2} onClick={() => handleImageClick(1)} alt="Florence Room" />
          </div>
          <div className={activeImage === 2 ? 'image-container active' : 'image-container inactive'}>
            <img src={Phong3} onClick={() => handleImageClick(2)} alt="Windsor Room" />
          </div>
        </div>

        <p className='note'>*Nhấn vào từng ảnh để xem chi tiết phòng*</p>

        <div className='room-description'>
          <div className='room-name'>
            <p className='RoomName'>{room.name}</p>
            <img src={Divider} className='Divider' alt="Divider" />
          </div>

          <div className='room-information'>
            <h2>Nội thất</h2>
            <ul>
              {room.furniture.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2>Tiện nghi</h2>
            <ul>
              {room.amenities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className='room-price'>
            <h2>Giá phòng</h2>
            <p>Theo ngày:</p>
            <p>{room.priceDay}</p>
            <p>Theo giờ:</p>
            <p>{room.priceHour}</p>
            <img src={HinhthoiTrang} className='thoitrang' alt="Decoration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRoomPage;
