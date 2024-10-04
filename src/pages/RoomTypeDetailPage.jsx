import React from "react";
import Divider from '../assets/divider-middle.png';
import '../styles/RoomTypeDetailPage.css';
import RoomTypeImage from '../assets/phonghangsang.jpg';
import 'boxicons';
import BedIcon from '../assets/bed_icon.png';
import PersonIcon from '../assets/person_icon.png';
import SizeIcon from '../assets/size_icon.png';
import { useNavigate } from 'react-router-dom';

const RoomTypeDetailPage = () => {
    const navigate = useNavigate();

    return (
        <div id="roomtypedetail" style={{ minHeight: '1000px' }}>
            <div className="poster">
                <img src={Divider} alt="Divider"/>
                <h1>Phòng Hạng sang</h1>
                <h1>DELUXE ROOM</h1>
                <img src={Divider} alt="Divider"/>
            </div>

            <div className="main-roomtypeDetail">
                <div className="room-img">
                    <img src={RoomTypeImage} alt="Room"/>
                </div>
                <button className="return-button" onClick={() => navigate('/overview')}>
                    <box-icon name='chevron-left'></box-icon>
                    Các loại phòng
                </button>
                <div className="roomtype-information">
                    <div className="gioithieuchung">
                        <div className="soluoc">
                            <h2>Giới thiệu chung</h2>
                            <p>Phòng Deluxe mang đến một không gian hoàn hảo giữa sự sang trọng và thoải mái...</p>
                        </div>

                        <div className="detail">
                            <p>Chi tiết</p>
                            <div className="detail-row">
                                <img src={BedIcon} alt="Bed"/>
                                <p>2 giường đôi</p>
                            </div>

                            <div className="detail-row">
                                <img src={PersonIcon} alt="Guests"/>
                                <p>3-4 khách</p>
                            </div>

                            <div className="detail-row">
                                <img src={SizeIcon} alt="Size"/>
                                <p>50 m<sup>2</sup></p>
                            </div>
                        </div>
                    </div>
                    <div className="highlights">
                        <h3>Điểm nổi bật</h3>
                        <ul>
                            <li>Wi-Fi miễn phí</li>
                            <li>Minibar với nhiều đồ ăn vặt từ Anh và Pháp</li>
                            <li>Bữa sáng miễn phí</li>
                            <li>Phòng tắm lát đá cẩm thạch</li>
                            <li>Mỹ phẩm, sản phẩm chăm sóc cá nhân</li>
                            <li>Khăn trải giường theo yêu cầu</li>
                            <li>Ipad yêu cầu dịch vụ trong phòng</li>
                            <li>TV độ nét cao</li>
                            <li>Cho phép thú cưng dưới 5kg</li>
                            <li>Dịch vụ giặt là (có tính phí): Cung cấp dịch vụ giặt là cho khách có nhu cầu</li>
                            <li>Dịch vụ lễ tân 24/7: Giải đáp mọi thắc mắc và hỗ trợ khách khi cần thiết</li>
                        </ul>
                    </div>
                    <div className="view-button">
                        <button className="viewlistbutton" onClick={() => navigate('/listroom')}>
                            Danh sách phòng Hạng sang 
                            <box-icon name='right-arrow-alt' color='white'></box-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomTypeDetailPage;
