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
            }

            
        ],
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
]);

export default router;
