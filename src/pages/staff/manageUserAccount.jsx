import React, { useEffect, useState } from 'react';
import '../../styles/staff/manageUserAccount.css';
import DeleteAccountPopup from '../../components/staff/DeleteAccountPopup';
import 'boxicons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../../redux/ApiRequest/apiRequestUser';
import {  useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { toast, ToastContainer } from 'react-toastify';

const ManageUserAccount = () => {
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null); // State để lưu ID người dùng

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userList = useSelector(state => state.user.getUserList.data);
    const {getUserList} = useSelector((state) => state.user)
    const user = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        if(!user){
            navigate('/loginstaff');
        }
        if (user.user.role !== "Staff") { 
            navigate("/");
        }
        getAllUsers(dispatch);
    }, [dispatch]);

    const handleDeleteClick = (userid) => {
        setSelectedUserId(userid);
        setShowDeletePopup(true);
    };

    const handleClosePopup = () => {
        setShowDeletePopup(false);
        setSelectedUserId(null);
    };

    const handleBack = () => {
        setShowDeletePopup(false);
    };

    const handleConfirmCancel = () => {
        setShowDeletePopup(false);
        deleteUser(selectedUserId, dispatch);
        getAllUsers(dispatch);
        toast.success("Tài khoản xóa thành công.");
    };
    
    return (
        <div id="manageUserAccount-body">
            <h2>DANH SÁCH TÀI KHOẢN NGƯỜI DÙNG</h2>
            {getUserList.isFetching ? (
                <Loading />
            ) : (
                <div className="manageAccount-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên người dùng</th>
                                <th>SĐT</th>
                                <th>Email</th>                
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList && userList.length > 0 ? (
                                userList.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.gender ? "Nữ" : "Nam"}</td>
                                        <td><button onClick={() => handleDeleteClick(user.id)}><i class="fa-solid fa-trash" style={{style: '#0000'}}></i></button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Không có dữ liệu</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            )}

            {showDeletePopup && (
                <DeleteAccountPopup
                    onClose={handleClosePopup}
                    onBack={handleBack}
                    onDelete={handleConfirmCancel}
                />
            )}
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default ManageUserAccount;
