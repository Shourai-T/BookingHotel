import React, { useState } from 'react';
import '../../styles/staff/manageUserAccount.css';
import DeleteAccountPopup from '../../components/staff/DeleteAccountPopup';
import 'boxicons';

const ManageUserAccount = () => {
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleDeleteClick = () => {
        setShowDeletePopup(true);
    };

    const handleClosePopup = () => {
        setShowDeletePopup(false);
    };

    const handleBack = () => {
        setShowDeletePopup(false);
    };

    const handleConfirmCancel = () => {
        setShowDeletePopup(false);
        alert("Tài khoản xóa thành công.");
    };

    return (
        <div id="manageUserAccount-body">
            <h2>DANH SÁCH TÀI KHOẢN NGƯỜI DÙNG</h2>
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
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>0987654321</td>
                            <td>user1@example.com</td>
                            <td>123 Main St, City</td>
                            <td>Nam</td>
                            <td><button onClick={handleDeleteClick}><i class="fa-solid fa-trash" style={{style: '#0000'}}></i></button></td>
                        </tr>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>0987654321</td>
                            <td>user1@example.com</td>
                            <td>123 Main St, City</td>
                            <td>Nam</td>
                            <td><button onClick={handleDeleteClick}><i class="fa-solid fa-trash" style={{style: '#0000'}}></i></button></td>
                        </tr>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>0987654321</td>
                            <td>user1@example.com</td>
                            <td>123 Main St, City</td>
                            <td>Nam</td>
                            <td><button onClick={handleDeleteClick}><i class="fa-solid fa-trash" style={{style: '#0000'}}></i></button></td>
                        </tr>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>0987654321</td>
                            <td>user1@example.com</td>
                            <td>123 Main St, City</td>
                            <td>Nam</td>
                            <td><button onClick={handleDeleteClick}><i class="fa-solid fa-trash" style={{style: '#0000'}}></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {showDeletePopup && (
                <DeleteAccountPopup
                    onClose={handleClosePopup}
                    onBack={handleBack}
                    onDelete={handleConfirmCancel}
                />
            )}
        </div>
    );
};

export default ManageUserAccount;
