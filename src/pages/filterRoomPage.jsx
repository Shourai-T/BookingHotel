import React, {useState} from 'react'
import '../styles/filterRoom.css'
import { useNavigate } from 'react-router-dom';
import picRoom from '../assets/phongdoi.jpg'

import { rooms } from '../data';

const FilterRoomPage = () => {

  const navigate = useNavigate();
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [priceFilter, setPriceFilter] = useState('');

  const handleCheckRoom = () => {
    // Điều hướng sang trang filter
    navigate('/filter');
  };

  const handlePriceFilterChange = (e) => {
    const selectedPrice = e.target.value;
    setPriceFilter(selectedPrice);
    const filteredRooms = rooms.filter((room) => {
      if (selectedPrice === 'all') {
        return true;
      } else if (selectedPrice === 'under2m') {
        return room.priceDay < 2000000;
      } else if (selectedPrice === 'under5m') {
        return room.priceDay < 5000000;
      }
      return false;
    });
    setFilteredRooms(filteredRooms);
  };

  return (

    <div id='filter'>
      <div className="container">
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
            <button onClick={handleCheckRoom}>
              Kiểm tra phòng trống
            </button>
          </ul>
        </div>
        <div className="body-container">
          <div className="filter-price">
            <p>Giá tiền</p>
            <hr className='divider' />
            <ul>
            <li>
                <input
                  type="checkbox"
                  name="price-filter"
                  value="under2m"
                  checked={priceFilter === 'under2m'}
                  onChange={handlePriceFilterChange}
                />
                Dưới 2 triệu
              </li>
              <li>
                <input
                  type="checkbox"
                  name="price-filter"
                  value="under5m"
                  checked={priceFilter === 'under5m'}
                  onChange={handlePriceFilterChange}
                />
                Dưới 5 triệu
              </li>
              <li>
                <input
                  type="checkbox"
                  name="price-filter"
                  value="all"
                  checked={priceFilter === 'all'}
                  onChange={handlePriceFilterChange}
                />
                Tất cả
              </li>
            </ul>
          </div>
          <div className="room-items">
            {filteredRooms.map((room) => (
              <div className="room-item" key={room.id}>
                <img src={room.image} alt="pic-room" />
                <div className="item-container">
                  <div className="item-content">
                    <h2>{room.name}</h2>
                    <div className="list">
                      <ul className='list-detail'>
                        <li>{room.capacity} khách</li>
                        <li>{room.bed} giường</li>
                        <li>{room.area} m²</li>
                        <li>Loại phòng: {room.type}</li>
                      </ul>
                      <ul className='list-price'>
                        <li>Giá theo ngày <br />
                          {room.priceDay.toLocaleString()} VNĐ/đêm
                        </li>
                        <li>
                          Giá theo giờ <br />
                          {room.priceHour.toLocaleString()} VNĐ/giờ
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="btn-container">
                    <button className="booking-btn">Đặt phòng này</button>
                    <button className="detail-btn">Xem chi tiết</button>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="room-item">
              <img src={picRoom} alt="pic-room" />
              <div className="item-container">
                <div className="item-content">
                  <h2>Windsor Room</h2>
                  <div className="list">
                    <ul className='list-detail'>
                      <li>2 khách</li>
                      <li>1 giường</li>
                      <li>31 m²</li>
                      <li>Loại phòng: tiêu chuẩn</li>
                    </ul>
                    <ul className='list-price'>
                      <li>Giá theo ngày <br />
                        1.100.000 VNĐ/đêm
                      </li>
                      <li>
                        Giá theo giờ <br />
                        180,000 VNĐ/giờ
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="btn-container">
                  <button className="booking-btn">Đặt phòng này</button>
                  <button className="detail-btn">Xem chi tiết</button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>

  )
}

export default FilterRoomPage