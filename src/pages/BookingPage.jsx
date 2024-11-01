import React, { useState, useEffect } from 'react';
import '../styles/Booking.css';
import { hoursOptions, usageHoursOptions } from '../data';
import 'boxicons';
import useCurrentDate from '../hooks/useCurrentDate';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRoomByFilter } from '../redux/ApiRequest/apiRequestRoom';
import moment from 'moment';
import Divider from '../assets/divider-black-twostar.png'


const BookingPage = () => {
  const navigate = useNavigate();
  // State để quản lý dropdown
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
  const user = useSelector((state) => state.auth.login.currentUser);
  const roomList = useSelector((state) => state.room.getRoomList.data);
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    // Kiểm tra điều kiện cho form theo giờ
    if (selectedSwitchOption === 'Hourly') {
      if (!checkinDate || !selectedHour || !selectedUsageHour || !numberGuests || numberGuests <= 0) {
        toast.error('Vui lòng chọn đầy đủ thông tin trước khi chọn phòng.');
        return; // Không mở dropdown
      } else {
        const startTime = checkinDate + ' ' + selectedHour + ':00:00';
        const endTime = checkinDate + ' ' + (parseInt(selectedHour) + parseInt(selectedUsageHour)) + ':00:00';
        getRoomByFilter(startTime, endTime, numberGuests, dispatch);
      }
    }

    // Kiểm tra điều kiện cho form theo ngày
    if (selectedSwitchOption === 'Daily') {
      if (!checkinDate || !checkoutDate || !numberGuests || numberGuests <= 0) {
        toast.error('Vui lòng chọn đầy đủ thông tin trước khi chọn phòng.');
        return; // Không mở dropdown
      }
      else {
        getRoomByFilter(checkinDate, checkoutDate, numberGuests, dispatch);
      }
    }
    console.log(checkinDate, checkoutDate, numberGuests);
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Hàm chọn option
  const handleOptionClick = (option, id) => {
    setSelectedOption(option);
    setSelectedRoomId(id)
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
    let startTime = '';
    let endTime = '';
    let total = 0;
    const selectedRoom = roomList.find(room => room.id === selectedRoomId);
    // Kiểm tra điều kiện cho form theo giờ
    if (selectedSwitchOption === 'Hourly') {
      if (!checkinDate || !selectedHour || !selectedUsageHour || !numberGuests || numberGuests <= 0||!selectedRoomId) {
        toast.error('Vui lòng chọn đầy đủ thông tin trước khi chọn phòng.');
        return; // Không mở dropdown
      } else {
        startTime = checkinDate + ' ' + selectedHour + ':00:00';
        endTime = checkinDate + ' ' + (parseInt(selectedHour) + parseInt(selectedUsageHour)) + ':00:00';
        total = selectedRoom.pricePerHour * parseInt(selectedUsageHour);
      }
    }

    // Kiểm tra điều kiện cho form theo ngày
    if (selectedSwitchOption === 'Daily') {
      if (!checkinDate || !checkoutDate || !numberGuests || numberGuests <= 0||!selectedRoomId) {
        toast.error('Vui lòng chọn đầy đủ thông tin trước khi chọn phòng.');
        return; // Không mở dropdown
      }
      else {
        startTime = checkinDate;
        endTime = checkoutDate
        total = selectedRoom.pricePerDay * moment(checkoutDate).diff(moment(checkinDate), 'days');
      }
    }

    const bookingInfo = {
      startTime: startTime,
      endTime: endTime,
      bookingType: selectedSwitchOption,
      numberOfGuest: numberGuests,
      roomId: selectedRoomId,
      roomName: selectedOption,
      total:total
    }
    navigate('/confirm-booking', { state: { bookingInfo } });
  };

  // Hàm xử lý click bên ngoài dropdown để đóng dropdown
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
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

  // const canSelectRoomHourly = checkinDate && selectedHour && selectedUsageHour; // Chọn theo giờ
  // const canSelectRoomDaily = checkinDate && checkoutDate; // Chọn theo ngày


  return (
    <div id='booking'>
      <div className="">
        <div className="col-divide">
          <h2 className="title">ĐẶT PHÒNG</h2>
          <img src ={Divider} className='dividerofh2'></img>
        </div>
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
          {/* Hiển thị form dựa trên lựa chọn */}
          {selectedSwitchOption === 'Hourly' ? (
            <div className="hour-form-container">
              {/* Form đặt theo giờ */}
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
                    <box-icon name='chevron-down'></box-icon> {/* Không thêm class xoay */}
                  </div>
                  <div className="options">
                    {roomList.length > 0 ? (
                      roomList.map((room) => (
                        <div key={room.id} onClick={() => handleOptionClick(room.name, room.id)}>
                          {room.name}
                        </div>
                      ))
                    ) : (
                      <div className="no-options">Không có phòng nào khả dụng</div> // Thông báo nếu không có phòng
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="day-form-container">
              {/* Form đặt theo ngày */}
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
                    <box-icon name='chevron-down'></box-icon> {/* Không thêm class xoay */}
                  </div>
                  <div className="options">
                    {roomList.length > 0 ? (
                      roomList.map((room) => (
                        <div key={room.id} onClick={() => handleOptionClick(room.name, room.id)}>
                          {room.name}
                        </div>
                      ))
                    ) : (
                      <div className="no-options">Không có phòng nào khả dụng</div> // Thông báo nếu không có phòng
                    )}
                  </div>
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
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default BookingPage;
