import React, { useEffect, useState } from 'react'
import '../styles/EditUser.css'
import EditUserPopup from '../components/EditUserPopup';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateUser } from '../redux/ApiRequest/apiRequestUser';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';

const EditUser = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if(!user){
            navigate('/login');
        }
        getProfile(dispatch);
    }, [dispatch]);
    const { getUser } = useSelector(state => state.user)
    const user = getUser.data
    const [name, setName] = useState(user?.name);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [address, setAddress] = useState(user?.address);
    const handleEditClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const confirmEdit = () => {
        const updateInfo = {
            name: name,
            phoneNumber: phoneNumber,
            email: user.email,
            role: user.role,
            address: address,
            gender: user.gender

        }
        updateUser(user?.id, updateInfo , dispatch,navigate);
    };

    const handleCancelClick = () => {
        navigate('/account');
    };
    if(!user){
        return <Loading/>
    }
    return (
        <div id='edit-account'>
            <div className="container">
                <div className="row-info">
                    <div className="col-1">
                        <div className='info-user'>
                            <i class="fa-solid fa-user" style={{ style: '#0000' }}></i>
                            <p>{user?.name}</p>
                        </div>
                        <p style={{
                            marginLeft: '28px',
                            textDecoration: 'underline',
                            color: '#1E1E1EBD'
                        }}>
                            {user?.email}
                        </p>
                        <hr />
                        <b>Khách hàng</b>
                    </div>
                    <div className="col-2">
                        <div class="info-group">
                            <div class="info-item">
                                <span class="label">Họ tên</span>
                                <div className="input-container">
                                    <input type="text" class="value" name="" id="" placeholder={user?.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="info-item">
                                <span class="label">Số điện thoại</span>
                                <div className="input-container">
                                    <input type="text" class="value" name="" id="" placeholder={user?.phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                            </div>
                            <div class="info-item">
                                <span class="label">Địa chỉ</span>
                                <div className="input-container">
                                    <input type="text" class="value" name="" id="" placeholder={user?.address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-row">
                    <button onClick={handleCancelClick}>Hủy</button>
                    <button onClick={handleEditClick}>Thay đổi thông tin</button>
                </div>
            </div>
            {showPopup && <EditUserPopup closePopup={closePopup} confirmEdit={confirmEdit} />}
        </div>
    )
}

export default EditUser