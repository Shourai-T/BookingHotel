import axios from 'axios';
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from './Slice/authSlice';
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        console.log(user)
        const res = await axios.post('http://localhost:3001/api/v1/auth/login', user)
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
        const res = await axios.post(`http://localhost:3001/api/v1/auth/facebook?access_token=${token}`)
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
        const res = await axios.post('http://localhost:3001/api/v1/auth/register', user)
        console.log(res.data)
        dispatch(registerSuccess())
        window.location.reload();
    } catch (error) {
        console.log(error)
        dispatch(registerFailure())
    }
}