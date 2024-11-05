import React, { useEffect, useState } from 'react'
import '../styles/filterRoom.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { getRoomByFilter } from '../redux/ApiRequest/apiRequestRoom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../components/Loading';

const FilterRoomPage = () => {

  const navigate = useNavigate();
  const [priceFilter, setPriceFilter] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  // Tạo một instance của URLSearchParams để lấy các query parameters
  const queryParams = new URLSearchParams(location.search);

  // Lấy các giá trị từ query parameters
  const checkIn = queryParams.get('checkIn');
  const checkOut = queryParams.get('checkOut');
  const guests = queryParams.get('guests');
  const roomList = useSelector(state => state.room.getRoomList.data);
  const [filteredRooms, setFilteredRooms] = useState(roomList);
  const [checkInDate, setCheckInDate] = useState(checkIn || '');
  const [checkOutDate, setCheckOutDate] = useState(checkOut || '');
  const [guestsInput, setGuests] = useState(guests || 1);
  const nagivate=useNavigate();
  useEffect(() => {
    getRoomByFilter(checkIn, checkOut, guests,dispatch);
  },[checkIn, checkOut, guests, dispatch])
  const {getRoomList}=useSelector(state=>state.room)
  useEffect(() => {
    setFilteredRooms(roomList);
  }, [roomList]);
  const handleCheckRoom = () => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    // Kiểm tra nếu trường check-in trống
    if (!checkInDate) {
      toast.warn("Vui lòng chọn ngày check-in.");
      return;
    }
  
    // Kiểm tra nếu trường check-out trống
    if (!checkOutDate) {
      toast.warn("Vui lòng chọn ngày check-out.");
      return;
    }
  
    // Kiểm tra nếu số khách trống hoặc nhỏ hơn 1
    if (!guestsInput || guestsInput <= 0) {
      toast.warn("Vui lòng chọn số lượng khách lớn hơn 0.");
      return;
    }
  
    // Kiểm tra nếu checkInDate lớn hơn hoặc bằng hôm nay
    if (checkIn < today) {
      toast.warn("Ngày check-in phải lớn hơn hoặc bằng hôm nay.");
      return;
    }
  
    // Kiểm tra nếu checkOutDate lớn hơn checkInDate
    if (checkOut <= checkIn) {
      toast.warn("Ngày check-out phải lớn hơn ngày check-in.");
      return;
    }
  
    // Nếu tất cả điều kiện đều hợp lệ, điều hướng sang trang filter
    navigate(`/filter?checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${guestsInput}`);
  };

  const handlePriceFilterChange = (e) => {
    const selectedPrice = e.target.value;
    setPriceFilter(selectedPrice);

    let sortedRooms = [...roomList]; // Tạo bản sao của roomList
    
    // Sắp xếp theo giá
    if (selectedPrice === 'lowToHigh') {
      sortedRooms = sortedRooms.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (selectedPrice === 'highToLow') {
      sortedRooms = sortedRooms.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    
    // Cập nhật danh sách phòng đã sắp xếp
    setFilteredRooms(sortedRooms);
  };

  return (

    <div id='filter'>
      <div className="container">
        <div className="booking-section">
          <ul>
            <li>Check in
              <input type="date" 
              value={checkInDate} 
              onChange={(e) => setCheckInDate(e.target.value)} 
              />
            </li>
            <li>Check out
              <input type="date" 
              value={checkOutDate} 
              onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </li>
            <li style={{ border: 'none', }}>Khách
              <input type="number" min="1" defaultValue={"1"} style={{ width: '100px', }} 
              value={guestsInput} 
              onChange={(e) => setGuests(e.target.value)}
              />
            </li>
            <button onClick={handleCheckRoom}>
              Kiểm tra phòng trống
            </button>
          </ul>
        </div>
        {getRoomList.isFetching?(<Loading/>):(<div className="body-container">
          <div className="filter-price">
            <p>Giá tiền</p>
            <hr className='divider' />
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="price-filter"
                  value="lowToHigh"
                  checked={priceFilter === 'lowToHigh'}
                  onChange={handlePriceFilterChange}
                />
                Từ thấp đến cao
              </li>
              <li>
                <input
                  type="checkbox"
                  name="price-filter"
                  value="highToLow"
                  checked={priceFilter === 'highToLow'}
                  onChange={handlePriceFilterChange}
                />
                Từ cao đến thấp
              </li>
            </ul>
          </div>
          <div className="room-items">
            {filteredRooms.map((room) => {
          
              return(
              <div className="room-item" key={room.id}>
                <img src={room.image} alt="pic-room" />
                <div className="item-container">
                  <div className="item-content">
                    <h2>{room.name}</h2>
                    <div className="list">
                      <ul className='list-detail'>
                        <li>{room.typeRoom.maxPeople} khách</li>
                        <li>{room.typeRoom.beds}</li>
                        <li>{room.typeRoom.sizeRoom} m²</li>
                        <li>Loại phòng: {room.typeRoom.name}</li>
                      </ul>
                      <ul className='list-price'>
                        <li>Giá theo ngày <br />
                          {room.pricePerDay.toLocaleString()} VNĐ/đêm
                        </li>
                        <li>
                          Giá theo giờ <br />
                          {room.pricePerHour.toLocaleString()} VNĐ/giờ
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="btn-container">
                    <button className="booking-btn">Đặt phòng này</button>
                    <button className="detail-btn" onClick={(e)=>nagivate(`/listroom/${room.typeRoom.id}`)}>Xem chi tiết</button>
                  </div>
                </div>
              </div>
            )})}
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
        </div>)}
        
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>

  )
}

export default FilterRoomPage