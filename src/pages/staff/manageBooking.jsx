import React from 'react';
import '../../styles/staff/manage-booking.css';
import { useNavigate } from 'react-router-dom';


const ManageBooking = () => {
    const navigate = useNavigate();
    const handleRowClick = () => {
        navigate('/staff/booking-detail-staff');
    };

    const handleCreateClick = () => {
        navigate('/staff/create-booking')
    };
    return (
            <div id='managebooking-container'>
                <h2>DANH SÁCH ĐẶT PHÒNG</h2>
                <div className='managebooking-filter'>
                    <button className='create-booking' onClick={handleCreateClick}><i class="fa-solid fa-plus" style={{style: '#0000'}}></i>Tạo đặt phòng</button>
                    <select className='managebooking-options'>
                        <option value="all-booking">Tất cả</option>
                        <option value="payment-success">Đã chuyển khoản</option>
                        <option value="checked-in">Đã checkin</option>
                        <option value="checked-out">Đã checkout</option>
                    </select>
                </div>
                <div className = 'managebooking-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Khách hàng</th>
                                <th>SĐT</th>
                                <th>Phòng</th>
                                <th>Checkin-Checkout</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr onClick={() => handleRowClick()}>
                                <td>Nguyễn Văn A</td>
                                <td>0123456789</td>
                                <td>Windsor Room</td>
                                <td>01/01/2020 09:00:00 - 02/01/2020 12:00:00 </td>
                                <td>Đã thanh toán</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr onClick={() => handleRowClick()}>
                                <td>Nguyễn Văn A</td>
                                <td>0123456789</td>
                                <td>Windsor Room</td>
                                <td>01/01/2020 09:00:00 - 02/01/2020 12:00:00 </td>
                                <td>Đã thanh toán</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr onClick={() => handleRowClick()}>
                                <td>Nguyễn Văn A</td>
                                <td>0123456789</td>
                                <td>Windsor Room</td>
                                <td>01/01/2020 09:00:00 - 02/01/2020 12:00:00 </td>
                                <td>Đã thanh toán</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr onClick={() => handleRowClick()}>
                                <td>Nguyễn Văn A</td>
                                <td>0123456789</td>
                                <td>Windsor Room</td>
                                <td>01/01/2020 09:00:00 - 02/01/2020 12:00:00 </td>
                                <td>Đã thanh toán</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default ManageBooking;
