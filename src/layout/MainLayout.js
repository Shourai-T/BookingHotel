import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';

const MainLayout = () => {
    const [scrolled, setScrolled] = useState(false);
    const { logout } = useSelector((state) => state.auth);
    
    useEffect(() => {
        const handleScroll = () => {
            const mainContentSection = document.getElementById('main');
            const mainContentTop = mainContentSection?.getBoundingClientRect().top;

            if (mainContentTop === 0) {
                setScrolled(false); // Khi top = 0
            } else {
                setScrolled(true); // Khi cuộn
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (logout.isFetching) {
        return <Loading />;
    }

    return (
        <div>
            <Header scrolled={scrolled} />
            <Outlet /> {/* Đây là nơi các trang con sẽ được render */}
            <Footer />
        </div>
    );
};

export default MainLayout;
