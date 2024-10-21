import axios from 'axios';
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, registerFailure, registerStart, registerSuccess } from '../Slice/authSlice';
import axiosInstance from '../../utility/axios.interceptor';
const API_URL = process.env.REACT_APP_API_URL
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        console.log(user)
        const res = await axios.post(`${API_URL}/api/v1/auth/login`, user, {
            withCredentials: true, // Bật để gửi cookie
        })
        console.log(res.data)
        dispatch(loginSuccess(res.data))
        navigate('/')
    } catch (error) {
        console.log(error)
        dispatch(loginFailure())
        navigate('/login')
    }
}

export const loginUserByFacebook = async (token, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${API_URL}/api/v1/auth/facebook?access_token=${token}`,{},{withCredentials: true})
        console.log(res.data)
        dispatch(loginSuccess(res.data))
        navigate('/')
    } catch (error) {
        console.log(error)
        dispatch(loginFailure())
        navigate('/login')
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        const res = await axios.post(`${API_URL}/api/v1/auth/register`, user)
        console.log(res.data)
        dispatch(registerSuccess())
        window.location.reload();
    } catch (error) {
        console.log(error)
        dispatch(registerFailure())
    }
}

export const logOut = async (dispatch, navigate) => {
    dispatch(logoutStart())
    try {
        await axiosInstance.post(`${API_URL}/api/v1/auth/logout`, {})
        dispatch(logoutSuccess())
        navigate('/login')
    } catch (error) {
        console.log(error)
        dispatch(logoutFailure())
    }
}