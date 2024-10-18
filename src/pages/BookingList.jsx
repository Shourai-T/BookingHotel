import React from 'react'
import '../styles/BookingList.css'
import divider from '../assets/divider-middle.png'
import { roomData } from '../data'
import { Link } from 'react-router-dom'

const BookingList = () => {
  return (
    <div id='booking-list'>
      <div className="header-container">
        <img src={divider} alt="" />
        <h1>ĐẶT PHÒNG CỦA TÔI</h1>
        <img src={divider} alt="" />
      </div>
      <div className="list-container">
        {roomData.map((room) => (
          <div className="list-item" key={room.id}>
            <h3>Booking ID: {room.id}</h3>
            <hr />
            <span>{room.date}</span>
            <div className='room-detail'>
              <span>Phòng: {room.roomName}</span>
              <span>Trạng thái: {room.status}</span>
            </div>
            <p className="total-price">
              <span>TỔNG TIỀN</span>
              <span>{room.totalPrice}</span>
            </p>
            <Link
              to={`/booking-list/${room.id}`} // Sử dụng Link để chuyển đến chi tiết
              style={{
                position: 'absolute',
                right: '40px',
                bottom: '15px',
                textDecoration: 'underline',
                cursor: 'pointer',
                color: '#000',
                fontWeight: 'bold',
              }}
            >
              Xem chi tiết {'>>'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingList