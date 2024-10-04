import { createBrowserRouter } from 'react-router-dom';
import MainContent from '../pages/MainContent';
import OverviewPage from '../pages/OverviewPage';
import MainLayout from '../layout/MainLayout';
import BookingPage from '../pages/BookingPage';
import ContactPage from '../pages/ContactPage';
import ListRoomPage from '../pages/ListRoomPage';
import RoomTypeDetail from '../pages/RoomTypeDetailPage'

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
                path: 'listroom',
                element: <ListRoomPage />, // Trang danh sách phòng
            },

            {
                path:'roomtypedetail',
                element:<RoomTypeDetail/>
            }
        ],
    },
]);

export default router;
