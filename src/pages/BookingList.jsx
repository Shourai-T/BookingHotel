import React, { useEffect } from 'react'
import '../styles/BookingList.css'
import divider from '../assets/divider-middle.png'
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom'
import { getMyBookings } from '../redux/ApiRequest/apiRequestBooking'
import { useDispatch, useSelector } from 'react-redux'

const BookingList = () => {
  const dispatch= useDispatch()
  const navigate = useNavigate()
  const bookingList = useSelector((state) => state.booking.bookingList.data)
  const user = useSelector((state) => state.auth.login.currentUser)
  useEffect(() => {
    if(!user){
      navigate("/login")
    }
    getMyBookings(dispatch)
  },[dispatch])
  console.log(bookingList)
  return (
    <div id='booking-list'>
      <div className="header-container">
        <img src={divider} alt="" />
        <h1>ĐẶT PHÒNG CỦA TÔI</h1>
        <img src={divider} alt="" />
      </div>
      <div className="list-container">
        {bookingList.map((booking) => {
          let status = ''
          switch (booking.bookingStatus) {
            case 'Paid':
              status = 'Đã thanh toán'
              break;
            case 'Unpaid':
              status = 'Chưa thanh toán'
              break;
            case 'CheckedIn':
              status = 'Đã nhận phòng'
              break;
            case 'CheckedIn':
              status = 'Đã nhận phòng'
              break; 
            case 'CheckedOut':
              status = 'Đã trả phòng'
              break;
            case 'Cancelled':
              status = 'Đã hủy'
              break;
            default:
              status = 'Đã đánh giá'
              break;
          }
          let startTime='';
          let endTime='';
          let total=0
          switch (booking.bookingType) {
            case "Daily":
              startTime = moment(booking.startTime).format('DD/MM/YYYY')
              endTime = moment(booking.endTime).format('DD/MM/YYYY')
              total = moment(booking.endTime).diff(moment(booking.startTime), 'days') * booking.room.pricePerDay
              break;
            case "Hourlyy":
              startTime = moment(booking.startTime).format('DD/MM/YYYY HH:mm')
              endTime = moment(booking.endTime).format('DD/MM/YYYY HH:mm')
              total = moment(booking.endTime).diff(moment(booking.startTime), 'hours') * booking.room.pricePerHour
              break;
            default:
              break;
          }
          return(
          <div className="list-item" key={booking.bookingId}>
            <h3>Booking ID: {booking.bookingId}</h3>
            <hr />
            <span>{startTime} - {endTime}</span>
            <div className='room-detail'>
              <span>Phòng: {booking.room.name}</span>
              <span>Trạng thái: {status}</span>
            </div>
            <p className="total-price">
              <span>TỔNG TIỀN</span>
              <span>{total.toLocaleString()}</span>
            </p>
            <Link
              to={`/booking-list/${booking.bookingId}`} // Sử dụng Link để chuyển đến chi tiết
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
        )})}
      </div>
    </div>
  )
}

export default BookingList