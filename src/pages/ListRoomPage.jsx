import React, { useEffect, useState } from 'react';  
import Divider from '../assets/divider-black-twostar.png';
import 'boxicons';
import '../styles/ListRoomPage.css';
import HinhthoiTrang from '../assets/hinhthoi_trang.png';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomByType } from '../redux/ApiRequest/apiRequestRoom';

const ListRoomPage = () => {
  const [activeImage, setActiveImage] = useState(0); 
  const { typeId } = useParams();
  const dispatch = useDispatch();
  
  // Lấy danh sách phòng từ API
  const roomList = useSelector(state => state.room.getRoomList.data);

  useEffect(() => {
    getRoomByType(dispatch, typeId);
  }, [typeId, dispatch]);

  const handleImageClick = (index) => {
    setActiveImage(index); 
  };

  // Kiểm tra nếu roomList tồn tại và không rỗng
  const room = roomList && roomList.length > 0 ? roomList[activeImage] : null;

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
          {roomList && roomList.map((room, index) => (
            <div key={index} className={activeImage === index ? 'image-container active' : 'image-container inactive'}>
              <img src={room.imageUrl} onClick={() => handleImageClick(index)} alt={room.name} />
            </div>
          ))}
        </div>

        <p className='note'>*Nhấn vào từng ảnh để xem chi tiết phòng*</p>

        {room && (
          <div className='room-description'>
            <div className='room-name'>
              <p className='RoomName'>{room.name}</p>
              <img src={Divider} className='Divider' alt="Divider" />
            </div>

            <div className='room-information'>
              <h2>Nội thất</h2>
              <ul dangerouslySetInnerHTML={{ __html: room.interior }} />

              <h2>Tiện nghi</h2>
              <ul dangerouslySetInnerHTML={{ __html: room.facilities }} />
            </div>

            <div className='room-price'>
              <h2>Giá phòng</h2>
              <p>Theo ngày:</p>
              <p>{room.pricePerDay.toLocaleString()}</p>
              <p>Theo giờ:</p>
              <p>{room.pricePerHour.toLocaleString()}</p>
              <img src={HinhthoiTrang} className='thoitrang' alt="Decoration" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListRoomPage;
