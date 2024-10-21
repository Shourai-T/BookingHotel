import axios from 'axios';
import { loginSuccess } from '../redux/Slice/authSlice';
import { store } from '../redux/store';

// Tạo instance axios
const axiosInstance = axios.create();
const API_URL = process.env.REACT_APP_API_URL;

// Function lấy token mới
const refreshAccessToken = async () => {
    try {
        console.log('Refresh token');
        const response = await axios.get(`${API_URL}/api/v1/auth/refresh`, {
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
        const state = store.getState();
        const token = state.auth.login.currentUser?.access_token;
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

            // Gọi dispatch để cập nhật state với token mới
            const dispatch = store.dispatch; // Lấy dispatch từ store
            if (res) {
                dispatch(loginSuccess(res)); // Cập nhật state
            }

            const newAccessToken = res?.data.access_token;

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
