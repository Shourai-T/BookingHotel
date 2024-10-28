import { createBrowserRouter } from 'react-router-dom';
import MainContent from '../pages/MainContent';
import OverviewPage from '../pages/OverviewPage';
import MainLayout from '../layout/MainLayout';
import BookingPage from '../pages/BookingPage';
import ContactPage from '../pages/ContactPage';
import ListRoomPage from '../pages/ListRoomPage';
import RoomTypeDetail from '../pages/RoomTypeDetailPage';
import FilterRoomPage from '../pages/filterRoomPage';
import LoginSignup from '../components/LoginSignup';
import ConfirmBooking from '../pages/ConfirmBooking';
import SuccessPage from '../pages/SuccessPage';
import FailurePage from '../pages/FailurePage';
import BookingList from '../pages/BookingList';
import BookingDetail from '../pages/BookingDetail';
import AccountUser from '../pages/AccountUser';
import EditUser from '../pages/EditUser';
import ViewRevenue from '../pages/staff/viewRevenue';
import LoginStaff from '../components/staff/LoginStaff';
import ManageBooking from '../pages/staff/manageBooking';
import MainLayoutStaff from '../layout/MainLayoutStaff';
import BookingDetailStaff from '../pages/staff/bookingDetailStaff';
import CreateBooking from '../pages/staff/createBooking';
import ManageAccount from '../pages/staff/manageUserAccount';
import BookingInvoice from '../pages/staff/booking-invoice';
import ManageRoom from '../pages/staff/ManageRoom';
import CreateRoom from '../pages/staff/CreateRoom'

import PaymentReturn from '../pages/PaymentReturn';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />, // Sử dụng Layout cho các route
        children: [
            {
                index: true, // Trang chủ
                element: <MainContent />,
            },
            {
                path: 'overview',
                element: <OverviewPage />, // Trang Overview
            },
            {
                path: 'booking',
                element: <BookingPage />, // Trang Booking
            },

            {
                path: 'contact-us',
                element: <ContactPage />, // Trang Contact
            },

            {
                path: 'listroom/:typeId',
                element: <ListRoomPage />, // Trang danh sách phòng
            },

            {
                path:'roomtypedetail/:id',
                element:<RoomTypeDetail/>,
            },

            {
                path:'filter',
                element: <FilterRoomPage />,
            },

            {
                path: 'confirm-booking',
                element: <ConfirmBooking />,
            },
            {
                path: 'booking-list',
                element: <BookingList />,
            },
            {
                path: 'booking-list/:id',
                element: <BookingDetail />,
            },
            {
                path: 'account',
                element: <AccountUser />,
            },
            {
                path: 'account/edit',
                element: <EditUser />,
            },

            
        ],

        

        
    },

    {
        path: '/staff/',
        element: <MainLayoutStaff/>,
        children :[
            {
                
                path: 'manage-booking',
                element: <ManageBooking />,
            },

            {
                path:"booking-detail-staff",
                element:<BookingDetailStaff/>
            },

            {
                path:"create-booking",
                element:<CreateBooking/>
            },

            {
                path:'manage-account',
                element:<ManageAccount/>
            },

            {
                path:'view-revenue',
                element:<ViewRevenue/>
            },

            {
                path:'booking-invoice',
                element:<BookingInvoice/>
            },

            {
                path:'manage-room',
                element:<ManageRoom/>
            },

            {
                path:'create-room',
                element:<CreateRoom/>
            },

        ]
    },
    {
        path: '/login',
        element: <LoginSignup />,
    },
    {
        path: '/success',
        element: <SuccessPage />,
    },
    {
        path: '/failure',
        element: <FailurePage />,
    },


    {
        path:'/loginstaff',
        element: <LoginStaff/>,
    },


    {
        path:"/payment-return",
        element:<PaymentReturn/>
    },


]);

export default router;
