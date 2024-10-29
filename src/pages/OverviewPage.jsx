import React, { useEffect } from 'react'
import '../styles/OverviewPage.css'
import divine from '../assets/divine-white.png'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTypeRoom } from '../redux/ApiRequest/apiRequestTypeRoom'

import { useNavigate } from 'react-router-dom'; 

import Loading from '../components/Loading'


const OverviewPage = () => {
  const dispatch = useDispatch()
  const typeRoomList = useSelector(state => state.typeRoom.getTypeRoomList.data)

  const navigate = useNavigate()
  const handleGotoBooking = () => {
    navigate('/booking'); 
  };

  const { getTypeRoomList } = useSelector(state => state.typeRoom)

  useEffect(() => {
    getAllTypeRoom(dispatch)
  }, [])

  const handleGotoRoomTypeDetail = (id) => {
    navigate(`/roomtypedetail/${id}`);
  };

  return (
    <body id='overview' style={{ minHeight: '1000px' }}>
      <div style={{ backgroundColor: '#000', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="overview-title">
          <img src={divine} alt="divine1" style={{ transform: 'rotate(180deg)' }} />
          <h1>CÁC LOẠI PHÒNG</h1>
          <img src={divine} alt="divine2" />
        </div>
      </div>
      {getTypeRoomList.isFetching ? (<Loading/>) : (<div>
        {typeRoomList.map((typeRoom) => {
          const imageUrl = require(`../assets/${typeRoom.image}`)
          return (
            <div className="room-item">
              <img src={imageUrl} alt="phongdon" />
              <div className="room-item-content">
                <h3>{typeRoom.name}</h3>
                <p>{typeRoom.introduction}</p>
                <button onClick={() => handleGotoRoomTypeDetail(typeRoom.id)}>Xem chi tiết</button>
              </div>
            </div>
          )
        })}
        <button onClick={handleGotoBooking} className="booking-now-btn">
          ĐẶT PHÒNG NGAY
        </button>
      </div>)}
    </body>
  )
}

export default OverviewPage