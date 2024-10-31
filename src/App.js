import './App.css';
import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './routes';

function App() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className="App">
      {/* <Header scrolled={scrolled} />
        <MainContent />
      <Footer /> */}
      <Header scrolled={scrolled} />
        <Routes />
      <Footer />
    </div>
  );
}

export default App;
