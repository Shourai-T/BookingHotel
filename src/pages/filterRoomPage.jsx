import React from 'react'
import '../styles/filterRoom.css'
import { useNavigate } from 'react-router-dom';

const FilterRoomPage = () => {

  const navigate = useNavigate();

  const handleCheckRoom = () => {
    // Điều hướng sang trang filter
    navigate('/filter');
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
                <li><input type="checkbox" /> Dưới 2 triệu</li>
                <li></li>
                <li></li>
              </ul>
            </div>  
        </div>
      </div>
    </div>

  )
}

export default FilterRoomPage