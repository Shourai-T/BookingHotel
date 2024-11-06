import React, { useEffect, useState } from "react";
import "../../styles/staff/createRoom.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../../redux/ApiRequest/apiRequestRoom";
import { toast, ToastContainer } from "react-toastify";
import { storage } from "../../utility/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAllTypeRoom } from "../../redux/ApiRequest/apiRequestTypeRoom";
const CreateRoom = () => {
  const [interiors, setInteriors] = useState([]); // Mảng lưu trữ danh sách nội thất
  const [currentInterior, setCurrentInterior] = useState(""); // Nội thất hiện tại
  const [facilities, setFacilities] = useState([]); // Mảng lưu trữ danh sách tiện nghi
  const [currentFacility, setCurrentFacility] = useState(""); // Tiện nghi hiện tại
  const [roomImage, setRoomImage] = useState(null); // Hình ảnh phòng
  const [imageDisplay, setImageDisplay] = useState(null);
  const [roomName, setRoomName] = useState(""); // Tên phòng
  const [roomType, setRoomType] = useState(""); // Loại phòng
  const [roomPrice, setRoomPrice] = useState(""); // Giá phòng theo ngày
  const [roomPricePerHour, setRoomPricePerHour] = useState(""); // Giá phòng theo giờ
  const [roomNumber, setRoomNumber] = useState(""); // Số phòng
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const typeRoomList = useSelector(
    (state) => state.typeRoom.getTypeRoomList.data
  );

  useEffect(() => {
    if (!user) {
      navigate("/loginstaff");
    }
    if (user.user.role !== "Staff") {
      navigate("/");
    }
    getAllTypeRoom(dispatch);
  }, [user, navigate, dispatch]);
  // Hàm xử lý khi nhấn nút "OK" để thêm nội thất vào danh sách
  const handleAddInterior = () => {
    if (currentInterior.trim()) {
      setInteriors([...interiors, currentInterior.trim()]);
      setCurrentInterior("");
    }
  };

  // Hàm xử lý khi nhấn nút "OK" để thêm tiện nghi vào danh sách
  const handleAddFacility = () => {
    if (currentFacility.trim()) {
      setFacilities([...facilities, currentFacility.trim()]);
      setCurrentFacility("");
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
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setRoomImage(file); 
      setImageDisplay(URL.createObjectURL(file))// Tạo URL cho hình ảnh
    }
  };

  const handleUpload = async () => {
    if (!roomImage) return null;
  
    const imageRef = ref(storage, `/upload/${roomImage.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, roomImage);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File available at", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const downloadURL = await handleUpload();
    if (!downloadURL) {
      toast.error("Upload hình ảnh thất bại.");
      return;
    }
  
    const formattedInteriors = interiors
      .map((item) => `<li>${item}</li>`)
      .join("\r\n");
    const formattedFacilities = facilities
      .map((item) => `<li>${item}</li>`)
      .join("\r\n");
  
    const roomData = {
      id: roomNumber,
      pricePerDay: roomPrice,
      pricePerHour: roomPricePerHour,
      interior: formattedFacilities,
      name: roomName,
      image: downloadURL,
      facilities: formattedInteriors,
      typeRoomId: roomType,
    };
  
    const newRoom = await createRoom(dispatch, roomData);
    if (newRoom) {
      toast.success("Tạo phòng thành công.");
      navigate("/staff/manage-room");
    } else {
      toast.error("Tạo phòng thất bại.");
    }
  };
  return (
    <div id="createRoom-body">
      <ToastContainer />
      <form className="createRoom-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomNumber">Số phòng</label>
          <input
            type="text"
            className="form-control"
            id="roomNumber"
            placeholder="Nhập số phòng"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="roomName">Tên phòng</label>
          <input
            type="text"
            className="form-control"
            id="roomName"
            placeholder="Nhập tên phòng"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="roomType">Loại phòng</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">Chọn loại phòng</option>
            {typeRoomList.map((typeRoom) => (
              <option key={typeRoom.id} value={typeRoom.id}>
                {typeRoom.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="roomPrice">Giá phòng theo ngày (VNĐ)</label>
          <input
            type="number"
            className="form-control"
            id="roomPrice"
            placeholder="Nhập giá phòng"
            value={roomPrice}
            onChange={(e) => setRoomPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="roomPricePerHour">Giá phòng theo giờ (VNĐ)</label>
          <input
            type="number"
            className="form-control"
            id="roomPricePerHour"
            placeholder="Nhập giá phòng"
            value={roomPricePerHour}
            onChange={(e) => setRoomPricePerHour(e.target.value)}
          />
        </div>

        {/* Phần nhập nội thất */}
        <div className="form-group">
          <label htmlFor="interior">Nội thất</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="text"
              className="form-control"
              id="interior"
              value={currentInterior}
              onChange={handleInteriorChange}
              placeholder="Nhập nội thất"
            />
            <button
              type="button"
              onClick={handleAddInterior}
              className="buttonOK"
            >
              OK
            </button>
          </div>
        </div>

        {/* Danh sách nội thất đã thêm */}
        <div className="interior-list">
          {interiors.map((interior, index) => (
            <div key={index}>
              <span>{interior}</span>
              <button
                type="button"
                onClick={() => handleDeleteInterior(index)}
                className="delete-interior"
              >
                <box-icon name="x"></box-icon>
              </button>
            </div>
          ))}
        </div>

        {/* Phần nhập tiện nghi */}
        <div className="form-group">
          <label htmlFor="facility">Tiện nghi</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="text"
              className="form-control"
              id="facility"
              value={currentFacility}
              onChange={handleFacilityChange}
              placeholder="Nhập tiện nghi"
            />
            <button
              type="button"
              onClick={handleAddFacility}
              className="buttonOK"
            >
              OK
            </button>
          </div>
        </div>

        <div className="facilities-list">
          {facilities.map((facility, index) => (
            <div key={index}>
              <span>{facility}</span>
              <button
                type="button"
                onClick={() => handleDeleteFacility(index)}
                className="delete-facilities"
              >
                <box-icon name="x"></box-icon>
              </button>
            </div>
          ))}
        </div>
        <div className="grp-btns">
          <button type="submit" className="submit-btn">
            Tạo phòng
          </button>
        </div>
      </form>
      <div className="imgandbutton">
        <div className="upload-image">
          <p htmlFor="roomImage">Hình ảnh</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>
        <div className="showImage">
          {imageDisplay && (
            <div className="image-preview">
              <img
                src={imageDisplay}
                alt="Room"
                style={{ width: "300px", height: "200px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
