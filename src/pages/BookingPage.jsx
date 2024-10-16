import React, { useState, useEffect } from 'react';
import '../styles/Booking.css';
import Divider from '../assets/divider-black-twostar.png';
import { roomOptions, hoursOptions, usageHoursOptions } from '../data';
import 'boxicons';
import useCurrentDate from '../hooks/useCurrentDate';
import { useNavigate } from 'react-router-dom';


const BookingPage = () => {
  const navigate = useNavigate();
  // State để quản lý dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Tên phòng');
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedUsageHour, setSelectedUsageHour] = useState(null);
  const [selectedSwitchOption, setSelectedSwitchOption] = useState('theo-gio');
  const currentDate = useCurrentDate();

  // Hàm xử lý click để mở/đóng dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Hàm chọn option
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // Đóng dropdown khi chọn xong
  };

  const handleHourClick = (hour) => {
    setSelectedHour(hour); // Cập nhật giờ được chọn
  };

  const handleUsageHourClick = (usageHour) => {
    setSelectedUsageHour(usageHour); // Cập nhật giờ sử dụng được chọn
  };

  const handleSwitchChange = (event) => {
    setSelectedSwitchOption(event.target.value);
  };

  const handleBookingClick = () => {
    navigate('/confirm-booking');
  };

  // Hàm xử lý click bên ngoài dropdown để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#room-select')) {
        setIsDropdownOpen(false); // Đóng dropdown khi click bên ngoài
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div id='booking'>
      <div className="">
        <div className="col-divide">
          <h2 className="title">ĐẶT PHÒNG</h2>
          <img src={Divider} className='Divider' alt="Divider" />
        </div>
        <div className="room-select-container">
          <label htmlFor="room-select">Phòng</label>
          <div
            id="room-select"
            className={`custom-select ${isDropdownOpen ? 'open' : ''}`}
            onClick={toggleDropdown}
          >
            <div className="selected-option">
              {selectedOption}
              <box-icon name='chevron-down'></box-icon> {/* Không thêm class xoay */}
            </div>
            <div className="options">
              {roomOptions.map((room) => (
                <div key={room.value} onClick={() => handleOptionClick(room.label)}>
                  {room.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="booking-container">
          <div className="switches-toggle">
            <div id="firstFilter" className="filter-switch">
              <input

                checked={selectedSwitchOption === 'theo-gio'}
                id="option1"
                name="options"
                type="radio"
                value="theo-gio"
                onChange={handleSwitchChange}
              />
              <label className="option" htmlFor="option1">Theo giờ</label>

              <input
                checked={selectedSwitchOption === 'theo-ngay'}
                id="option2"
                name="options"
                type="radio"
                value="theo-ngay"
                onChange={handleSwitchChange}
              />
              <label className="option" htmlFor="option2">Theo ngày</label>

              <span className="background"></span>
            </div>
          </div>
          {/* Hiển thị form dựa trên lựa chọn */}
          {selectedSwitchOption === 'theo-gio' ? (
            <div className="hour-form-container">
              {/* Form đặt theo giờ */}
              <div className="choose-date">
                <label htmlFor="date">Ngày checkin</label>
                <div className="date-container">
                  <input type="date" id="date" name="date" min={currentDate} />
                </div>
              </div>
              <div className="choose-hour">
                <label htmlFor="hour">Giờ checkin</label>
                <div className="hour-container">
                  {hoursOptions.map((hour) => (
                    <button
                      key={hour}
                      onClick={() => handleHourClick(hour)}
                      className={selectedHour === hour ? 'active' : ''} // Thêm class 'active' nếu giờ được chọn
                    >
                      {hour}
                    </button>
                  ))}
                </div>
              </div>
              <div className="choose-hour-use">
                <label htmlFor="hour">Số giờ sử dụng</label>
                <div className="hour-use-container">
                  {usageHoursOptions.map((usageHour) => (
                    <button
                      key={usageHour}
                      onClick={() => handleUsageHourClick(usageHour)}
                      className={selectedUsageHour === usageHour ? 'active' : ''} // Thêm class 'active' nếu giờ sử dụng được chọn
                    >
                      {usageHour}
                    </button>
                  ))}
                </div>
              </div>
              <div className="choose-number-guests">
                <label htmlFor="hour">Số khách</label>
                <div className="number-guests-container">
                  <input type="number" id="number-guests" name="number-guests" min="1" />
                </div>
              </div>
            </div>
          ) : (
            <div className="day-form-container">
              {/* Form đặt theo ngày */}
              <div className="choose-date">
                <label htmlFor="date">Ngày checkin</label>
                <div className="date-container">
                  <input type="date" id="date-checkin" name="date" min={currentDate} />
                </div>
              </div>
              <div className="choose-date">
                <label htmlFor="date">Ngày checkout</label>
                <div className="date-container">
                  <input type="date" id="date-checkout" name="date" min={currentDate} />
                </div>
              </div>
              <div className="choose-number-guests">
                <label htmlFor="hour">Số khách</label>
                <div className="number-guests-container">
                  <input type="number" id="number-guests" name="number-guests" min="1" />
                </div>
              </div>
              <p>*Đối với đặt theo ngày, quy định giờ checkin là 09:00 sáng và checkout là trước 24:00 tối*</p>
            </div>
          )}
        </div>
        <div className="btn-container">
          <button className='booking-btn' onClick={handleBookingClick}>ĐẶT PHÒNG</button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
