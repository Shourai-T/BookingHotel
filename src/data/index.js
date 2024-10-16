import img from '../assets/phongdoi.jpg'

const rooms = [
    {
        id: 1,
        name: "Windsor Room",
        image: img,
        capacity: 2,
        bed: 1,
        area: 31,
        type: "Tiêu chuẩn",
        priceDay: 1100000,
        priceHour: 180000,
    },
    {
        id: 2,
        name: "Victoria Room",
        image: img,
        capacity: 3,
        bed: 2,
        area: 40,
        type: "Tiêu chuẩn",
        priceDay: 1500000,
        priceHour: 250000,
    },
    {
        id: 3,
        name: "Luxury Room",
        image: img,
        capacity: 4,
        bed: 3,
        area: 60,
        type: "Luxury",
        priceDay: 2500000,
        priceHour: 400000,
    },
    {
        id: 4,
        name: "Poor Room",
        image: img,
        capacity: 4,
        bed: 3,
        area: 60,
        type: "Luxury",
        priceDay: 2500000,
        priceHour: 400000,
    },
];

const roomOptions = [
    { label: 'Phòng 1', value: 'r1' },
    { label: 'Phòng 2', value: 'r2' },
    { label: 'Phòng 3', value: 'r3' },
    { label: 'Phòng 4', value: 'r4' },
];

const hoursOptions = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00',
];

const usageHoursOptions = [
    '1 giờ', '2 giờ', '3 giờ', '4 giờ', '5 giờ', '6 giờ', '7 giờ', '8 giờ', '9 giờ', '10 giờ'
];

export {
    rooms,
    roomOptions,
    hoursOptions,
    usageHoursOptions,
};