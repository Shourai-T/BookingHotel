import React, { useEffect } from "react";
import Divider from '../assets/divider-middle.png';
import '../styles/RoomTypeDetailPage.css';
import 'boxicons';
import BedIcon from '../assets/bed_icon.png';
import PersonIcon from '../assets/person_icon.png';
import SizeIcon from '../assets/size_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetailTypeRoom } from "../redux/ApiRequest/apiRequestTypeRoom";
import Loading from "../components/Loading";

const RoomTypeDetailPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {   
        getDetailTypeRoom(dispatch, id);
    }, [dispatch, id]);

    // Lấy dữ liệu từ state Redux
    const typeRoomDetail = useSelector(state => state.typeRoom.getDetailTypeRoom.data);
    // Kiểm tra dữ liệu đã được tải chưa
    if (!typeRoomDetail) {
        return <Loading/>; // Hiển thị loading khi dữ liệu chưa sẵn sàng
    }
    const imageUrl = require(`../assets/${typeRoomDetail.image}`);
    const result = typeRoomDetail.name.match(/\(([^)]+)\)/)
    return (
        <div id="roomtypedetail" style={{ minHeight: '1000px' }}>
            <div className="poster">
                <img src={Divider} alt="Divider"/>
                <h1>{typeRoomDetail.name}</h1>
                <h1>{result[1]}</h1>
                <img src={Divider} alt="Divider"/>
            </div>

            <div className="main-roomtypeDetail">
                <div className="room-img">
                    <img src={imageUrl} alt="Room"/>
                </div>
                <button className="return-button" onClick={() => navigate('/overview')}>
                    <box-icon name='chevron-left'></box-icon>
                    Các loại phòng
                </button>
                <div className="roomtype-information">
                    <div className="gioithieuchung">
                        <div className="soluoc">
                            <h2>Giới thiệu chung</h2>
                            <p>{typeRoomDetail.introduction}</p>
                        </div>

                        <div className="detail">
                            <p>Chi tiết</p>
                            <div className="detail-row">
                                <img src={BedIcon} alt="Bed"/>
                                <p>{typeRoomDetail.beds}</p>
                            </div>

                            <div className="detail-row">
                                <img src={PersonIcon} alt="Guests"/>
                                <p>{typeRoomDetail.maxPeople} khách</p>
                            </div>

                            <div className="detail-row">
                                <img src={SizeIcon} alt="Size"/>
                                <p>{typeRoomDetail.sizeRoom} m<sup>2</sup></p>
                            </div>
                        </div>
                    </div>
                    <div className="highlights">
                        <h3>Điểm nổi bật</h3>
                        <ul dangerouslySetInnerHTML={{ __html: typeRoomDetail.highlight }} />
                    </div>
                    <div className="view-button">
                        <button className="viewlistbutton" onClick={() => navigate(`/listroom/${typeRoomDetail.id}`)}>
                            Danh sách {typeRoomDetail.name}
                            <box-icon name='right-arrow-alt' color='white'></box-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomTypeDetailPage;
