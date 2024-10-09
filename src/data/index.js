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

export {
    rooms,
};