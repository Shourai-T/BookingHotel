import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ToggleNavStaff from '../components/staff/ToggleNavStaff'; // Assuming this is the correct path for the component
import { useSelector } from 'react-redux';

const MainLayoutStaff = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/loginstaff');
        }
    }, [user, navigate]);
    if (!user) {
        return null;
    }
    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar is always on the left and fixed */}
            <ToggleNavStaff username={user?.user?.name} email={user?.user?.email}/>
            {/* Main content adjusted with left margin to not overlap the nav */}
            <div id="main" style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                <Outlet /> {/* This is where child routes will be rendered */}
            </div>
        </div>
    );
};

export default MainLayoutStaff;
