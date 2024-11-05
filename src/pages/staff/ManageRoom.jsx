import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import
import "boxicons";
import DeleteRoomPopup from "../../components/staff/DeleteRoomPopup";
import "../../styles/staff/ManageRoom.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, getRoomList } from "../../redux/ApiRequest/apiRequestRoom";
import Loading from "../../components/Loading";

const ManageRoom = () => {
  const navigate = useNavigate(); // Corrected navigation hook
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const roomList = useSelector((state) => state.room.getRoomList.data);
  const user = useSelector((state) => state.auth.login.currentUser);
  const isFetching = useSelector((state) => state.room.getRoomList.isFetching);

  useEffect(() => {
    if (!user) {
      navigate("/loginstaff");
    } else if (user.user.role !== "Staff") {
      navigate("/");
    }       
    getRoomList(dispatch);

  }, [dispatch, user, navigate]);
// console.log(roomList)
  const handleDeleteClick = (id) => {
    setSelectedRoomId(id);
    setShowDeletePopup(true);
  };

  const handleClosePopup = () => {
    setShowDeletePopup(false);
  };

  const handleBack = () => {
    setShowDeletePopup(false);
  };

  const handleConfirmCancel = () => {
    deleteRoom(dispatch, selectedRoomId);
    setShowDeletePopup(false);
    getRoomList(dispatch);
    alert("Xóa phòng thành công.");
  };
  return (
    <div id="manageRoom-body">
      <h2>DANH SÁCH PHÒNG</h2>
      <button
        className="createRoom-btn"
        onClick={() => navigate("/staff/create-room")}
      >
        <box-icon name="plus"></box-icon>Tạo phòng
      </button>
        <div className="manageRoom-table">
          <table>
            <thead>
              <tr>
                <th>Tên phòng</th>
                <th>Loại phòng</th>
                <th>Trạng thái</th>
                <th>Hình ảnh</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {roomList && roomList.length > 0 ? (
                roomList.map((room, index) => {
                  return (
                    <tr key={index}>
                      <td>{room.name}</td>
                      <td>{room.typeRoom.name}</td>
                      <td>
                        {room.isBooked ? "Phòng đã được đặt" : "Phòng trống"}
                      </td>{" "}
                      <td>
                        <img
                          src={room.image}
                          alt="Room"
                          width="100"
                          height="70"
                        />
                      </td>
                      <td>
                        <button onClick={() => handleDeleteClick(room.id)}>Xóa</button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">Không có dữ liệu</td>
                </tr>
              )}
              {/* <tr>
                            <td>Windsor Room</td>
                            <td>Tiêu chuẩn</td>
                            <td>Trống</td>
                            <td>
                                <img src={RoomImage} alt="Room" width="100" height="70" />
                            </td>
                            <td>
                                <button onClick={handleDeleteClick}>Xóa</button>
                            </td>
                        </tr> */}
              {/* Thêm các hàng khác tại đây nếu cần */}
            </tbody>
          </table>
        </div>
      
      {showDeletePopup && (
        <DeleteRoomPopup
          onClose={handleClosePopup}
          onBack={handleBack}
          onDelete={handleConfirmCancel}
        />
      )}
    </div>
  );
};

export default ManageRoom;
