import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ToggleNavStaff from '../components/staff/ToggleNavStaff'; // Assuming this is the correct path for the component

const MainLayoutStaff = () => {
    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar is always on the left and fixed */}
            <ToggleNavStaff />
            {/* Main content adjusted with left margin to not overlap the nav */}
            <div id="main" style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                <Outlet /> {/* This is where child routes will be rendered */}
            </div>
        </div>
    );
};

export default MainLayoutStaff;
