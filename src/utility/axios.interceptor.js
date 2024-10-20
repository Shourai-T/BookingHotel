import axios from 'axios';
import { loginSuccess } from '../redux/Slice/authSlice';
import { useSelector } from 'react-redux';


const user = useSelector(state => state.auth.login.currentUser);
// Tạo instance axios
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`, // Địa chỉ API của bạn
    headers: {
        'Content-Type': 'application/json',
    }
});

// Function lấy token mới
const refreshAccessToken = async () => {
    try {
        const response = await axiosInstance.post('/v1/auth/refresh', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Refresh token failed', error);
        return null;
    }
};

// Axios request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = user?.access_token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Axios response interceptor để kiểm tra lỗi 401 (Unauthorized)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const res = await refreshAccessToken();
            loginSuccess(res);
            const newAccessToken = res?.access_token;
            if (newAccessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest); // Retry lại request ban đầu
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
