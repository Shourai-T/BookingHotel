import { useState, useEffect } from 'react';

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Lấy ngày hiện tại
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng 1 là 0
    const dd = String(today.getDate()).padStart(2, '0');

    // Định dạng ngày theo chuẩn yyyy-mm-dd
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setCurrentDate(formattedDate);
  }, []);

  return currentDate;
};

export default useCurrentDate;
