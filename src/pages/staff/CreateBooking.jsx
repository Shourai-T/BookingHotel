import '../../styles/staff/CreateBooking.css'
import React, { useState, useEffect } from 'react';
import { hoursOptions, usageHoursOptions } from '../../data';
import 'boxicons';
import useCurrentDate from '../../hooks/useCurrentDate';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const CreateBooking = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Tên phòng');
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedUsageHour, setSelectedUsageHour] = useState(null);
  const [selectedSwitchOption, setSelectedSwitchOption] = useState('Hourly');
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [numberGuests, setNumberGuests] = useState(1);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const currentDate = useCurrentDate();
  const roomList = useSelector((state) => state.room.getRoomList.data);
  
  const toggleDropdown = () => {
    if (selectedSwitchOption === 'Hourly') {
      if (!checkinDate || !selectedHour || !selectedUsageHour || !numberGuests || numberGuests <= 0) {
        toast.error('Vui lòng chọn đầy đủ thông tin trước khi chọn phòng.');
        return;
      }
    } else if (selectedSwitchOption === 'Daily') {
      if (!checkinDate || !checkoutDate || !numberGuests || numberGuests <= 0) {
        toast.error('Vui lòng chọn đầy đủ thông tin trước khi chọn phòng.');
        return;
      }
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option, id) => {
    setSelectedOption(option);
    setSelectedRoomId(id);
    setIsDropdownOpen(false);
  };

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
  };

  const handleUsageHourClick = (usageHour) => {
    setSelectedUsageHour(usageHour);
  };

  const handleSwitchChange = (event) => {
    setSelectedSwitchOption(event.target.value);
  };

  const handleBookingClick = () => {
    let startTime = '';
    let endTime = '';
    let total = 0;
    const selectedRoom = roomList.find(room => room.id === selectedRoomId);
    
    if (selectedSwitchOption === 'Hourly') {
      if (!checkinDate || !selectedHour || !selectedUsageHour || !numberGuests || numberGuests <= 0 || !selectedRoomId) {
        toast.error('Vui lòng chọn đầy đủ thông tin trước khi chọn phòng.');
        return;
      }
      startTime = `${checkinDate} ${selectedHour}:00:00`;
      endTime = `${checkinDate} ${(parseInt(selectedHour) + parseInt(selectedUsageHour))}:00:00`;
      total = selectedRoom.pricePerHour * parseInt(selectedUsageHour);
    } else if (selectedSwitchOption === 'Daily') {
      if (!checkinDate || !checkoutDate || !numberGuests || numberGuests <= 0 || !selectedRoomId) {
        toast.error('Vui lòng chọn đầy đủ thông tin trước khi chọn phòng.');
        return;
      }
      startTime = checkinDate;
      endTime = checkoutDate;
      total = selectedRoom.pricePerDay * moment(checkoutDate).diff(moment(checkinDate), 'days');
    }

    const bookingInfo = {
      startTime,
      endTime,
      bookingType: selectedSwitchOption,
      numberOfGuest: numberGuests,
      roomId: selectedRoomId,
      roomName: selectedOption,
      total,
    };
    
    navigate('/confirm-booking', { state: { bookingInfo } });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#room-select')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div id='create-booking'>
      <div className="booking-container">
        <div className="switches-toggle">
          <div id="firstFilter" className="filter-switch">
            <input
              checked={selectedSwitchOption === 'Hourly'}
              id="option1"
              name="options"
              type="radio"
              value="Hourly"
              onChange={handleSwitchChange}
            />
            <label className="option" htmlFor="option1">Theo giờ</label>

            <input
              checked={selectedSwitchOption === 'Daily'}
              id="option2"
              name="options"
              type="radio"
              value="Daily"
              onChange={handleSwitchChange}
            />
            <label className="option" htmlFor="option2">Theo ngày</label>
            <span className="background"></span>
          </div>
        </div>

        {selectedSwitchOption === 'Hourly' ? (
          <div className="hour-form-container">
            <div className="choose-date">
              <label htmlFor="date">Ngày checkin</label>
              <div className="date-container">
                <input type="date" id="date" name="date" min={currentDate} value={checkinDate} onChange={(e) => setCheckinDate(e.target.value)} />
              </div>
            </div>
            <div className="choose-hour">
              <label htmlFor="hour">Giờ checkin</label>
              <div className="hour-container">
                {hoursOptions.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => handleHourClick(hour)}
                    className={selectedHour === hour ? 'active' : ''}
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
                    className={selectedUsageHour === usageHour ? 'active' : ''}
                  >
                    {usageHour} giờ
                  </button>
                ))}
              </div>
            </div>

            <div className="choose-number-guests">
              <label htmlFor="hour">Số khách</label>
              <div className="number-guests-container">
                <input type="number" id="number-guests" name="number-guests" min="1" onChange={(e) => setNumberGuests(e.target.value)} />
              </div>
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
                  <box-icon name='chevron-down'></box-icon>
                </div>
                <div className="options">
                  {roomList.length > 0 ? (
                    roomList.map((room) => (
                      <div key={room.id} onClick={() => handleOptionClick(room.name, room.id)}>
                        {room.name}
                      </div>
                    ))
                  ) : (
                    <div className="no-options">Không có phòng nào khả dụng</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="day-form-container">
            <div className="choose-date">
              <label htmlFor="date">Ngày checkin</label>
              <div className="date-container">
                <input type="date" id="date-checkin" name="date" min={currentDate} value={checkinDate} onChange={(e) => setCheckinDate(e.target.value)} />
              </div>
            </div>
            <div className="choose-date">
              <label htmlFor="date">Ngày checkout</label>
              <div className="date-container">
                <input type="date" id="date-checkout" name="date" min={checkinDate} value={checkoutDate} onChange={(e) => setCheckoutDate(e.target.value)} />
              </div>
            </div>

            <div className="choose-number-guests">
              <label htmlFor="hour">Số khách</label>
              <div className="number-guests-container">
                <input type="number" id="number-guests" name="number-guests" min="1" onChange={(e) => setNumberGuests(e.target.value)} />
              </div>
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
                  <box-icon name='chevron-down'></box-icon>
                </div>
                <div className="options">
                  {roomList.length > 0 ? (
                    roomList.map((room) => (
                      <div key={room.id} onClick={() => handleOptionClick(room.name, room.id)}>
                        {room.name}
                      </div>
                    ))
                  ) : (
                    <div className="no-options">Không có phòng nào khả dụng</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="btn-container">
          <button className='booking-btn' onClick={handleBookingClick}>ĐẶT PHÒNG</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateBooking;
