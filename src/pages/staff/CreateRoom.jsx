import React, { useState } from 'react';
import '../../styles/staff/createRoom.css';

const CreateRoom = () => {
    const [interiors, setInteriors] = useState([]); // Mảng lưu trữ danh sách nội thất
    const [currentInterior, setCurrentInterior] = useState(''); // Nội thất hiện tại
    const [facilities, setFacilities] = useState([]); // Mảng lưu trữ danh sách tiện nghi
    const [currentFacility, setCurrentFacility] = useState(''); // Tiện nghi hiện tại
    const [roomImage, setRoomImage] = useState(null); // Hình ảnh phòng

    // Hàm xử lý khi nhấn nút "OK" để thêm nội thất vào danh sách
    const handleAddInterior = () => {
        if (currentInterior.trim()) {
            setInteriors([...interiors, currentInterior.trim()]);
            setCurrentInterior('');
        }
    };

    // Hàm xử lý khi nhấn nút "OK" để thêm tiện nghi vào danh sách
    const handleAddFacility = () => {
        if (currentFacility.trim()) {
            setFacilities([...facilities, currentFacility.trim()]);
            setCurrentFacility('');
        }
    };

    // Hàm xử lý khi thay đổi input nội thất
    const handleInteriorChange = (e) => {
        setCurrentInterior(e.target.value);
    };

    // Hàm xử lý khi thay đổi input tiện nghi
    const handleFacilityChange = (e) => {
        setCurrentFacility(e.target.value);
    };

    // Hàm xử lý khi xóa một mục nội thất
    const handleDeleteInterior = (index) => {
        setInteriors(interiors.filter((_, i) => i !== index));
    };

    // Hàm xử lý khi xóa một mục tiện nghi
    const handleDeleteFacility = (index) => {
        setFacilities(facilities.filter((_, i) => i !== index));
    };

    // Hàm xử lý khi chọn hình ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setRoomImage(URL.createObjectURL(file)); // Tạo URL cho hình ảnh
        }
    };

    return (
        <div id='createRoom-body'>
            <form className='createRoom-container'>
                <div className="form-group">
                    <label htmlFor="roomName">Tên phòng</label>
                    <input type="text" className="form-control" id="roomName" placeholder="Nhập tên phòng" />
                </div>

                <div className="form-group">
                    <label htmlFor="roomType">Loại phòng</label>
                    <select>
                        <option value="">Chọn loại phòng</option>
                        <option value="standard">Phòng Tiêu chuẩn</option>
                        <option value="couple">Phòng Đôi</option>
                        <option value="family">Phòng Gia đình</option>
                        <option value="deluxe">Phòng hạng sang</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="roomPrice">Giá phòng theo ngày (VNĐ)</label>
                    <input type="number" className="form-control" id="roomPrice" placeholder="Nhập giá phòng" />
                </div>

                <div className="form-group">
                    <label htmlFor="roomPricePerHour">Giá phòng theo giờ (VNĐ)</label>
                    <input type="number" className="form-control" id="roomPricePerHour" placeholder="Nhập giá phòng" />
                </div>

                {/* Phần nhập nội thất */}
                <div className="form-group">
                    <label htmlFor="interior">Nội thất</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                            type="text"
                            className="form-control"
                            id="interior"
                            value={currentInterior}
                            onChange={handleInteriorChange}
                            placeholder="Nhập nội thất"
                        />
                        <button type="button" onClick={handleAddInterior} className='buttonOK'>OK</button>
                    </div>
                </div>

                {/* Danh sách nội thất đã thêm */}
                <div className="interior-list">
                    {interiors.map((interior, index) => (
                        <div key={index}>
                            <span>{interior}</span>
                            <button type="button" onClick={() => handleDeleteInterior(index)} className='delete-interior'>
                                <box-icon name='x'></box-icon>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Phần nhập tiện nghi */}
                <div className="form-group">
                    <label htmlFor="facility">Tiện nghi</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                            type="text"
                            className="form-control"
                            id="facility"
                            value={currentFacility}
                            onChange={handleFacilityChange}
                            placeholder="Nhập tiện nghi"
                        />
                        <button type="button" onClick={handleAddFacility} className='buttonOK'>OK</button>
                    </div>
                </div>

                <div className="facilities-list">
                    {facilities.map((facility, index) => (
                        <div key={index}>
                            <span>{facility}</span>
                            <button type="button" onClick={() => handleDeleteFacility(index)} className='delete-facilities'>
                                <box-icon name='x'></box-icon>
                            </button>
                        </div>
                    ))}
                </div>
                <div className='grp-btns'>
                    <button type="submit" className='submit-btn'>Tạo phòng</button>
                </div>
            </form>
            <div className='imgandbutton'>
                <div className="upload-image">
                        <p htmlFor="roomImage">Hình ảnh</p>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            className="form-control" 
                        />
                </div>
                <div className='showImage'>
                    {roomImage && (
                        <div className="image-preview">
                            <img src={roomImage} alt="Room" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
};

export default CreateRoom;
