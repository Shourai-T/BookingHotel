import axiosInstance from "../../utility/axios.interceptor"
import { getUserFailure, getUserStart, getUserSuccess, getUserListStart, getUserListSuccess, getUserListFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from "../Slice/userSlice"

const API_URL = process.env.REACT_APP_API_URL
export const getProfile = async (dispatch) => {
    dispatch(getUserStart())
    try {
        const res = await axiosInstance.get(`${API_URL}/api/v1/auth/profile`)
        dispatch(getUserSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(getUserFailure())
    }
}

export const updateUser=async (id,data,dispatch,navigate)=>{
    dispatch(getUserStart())
    try {
        const res = await axiosInstance.patch(`${API_URL}/api/v1/users/${id}`,data)
        dispatch(getUserSuccess(res.data))
        navigate('/account')
    } catch (error) {
        console.log(error)
        dispatch(getUserFailure())
    }
}

export const getAllUsers = async (dispatch) => {
    dispatch(getUserListStart())
    try {
        const res = await axiosInstance.get(`${API_URL}/api/v1/users`)
        dispatch(getUserListSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(getUserListFailure())
    }
}

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart())
    try {
        await axiosInstance.delete(`${API_URL}/api/v1/users/${id}`)
        dispatch(deleteUserSuccess())
    } catch (error) {
        console.log("deleteUser ",error)
        dispatch(deleteUserFailure())
    }
}