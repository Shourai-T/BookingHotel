import { getRoomListFailure, getRoomListStart, getRoomListSuccess,
    deleteRoomFailure, deleteRoomStart, deleteRoomSuccess,
    createRoomFailure, createRoomStart, createRoomSuccess
 } from "../Slice/roomSlice";
import axiosInstance from "../../utility/axios.interceptor";

const API_URL= process.env.REACT_APP_API_URL

export const getRoomByFilter= async (startTime,endTime,numberOfPeople,dispatch) => {
    dispatch( getRoomListStart())
    try{
        const res= await axiosInstance.get(`${API_URL}/api/v1/rooms/available/search?startTime=${startTime}&endTime=${endTime}&numberOfPeople=${numberOfPeople}`)
        dispatch(getRoomListSuccess(res.data))
    }
    catch(error){
        console.log(error)
        dispatch(getRoomListFailure())
    }
}
export const getRoomByType= async (dispatch,id) => {
    dispatch( getRoomListStart())

    try{
        const res= await axiosInstance.get(`${API_URL}/api/v1/rooms/type-room/${id}`)
        console.log(res.data)
        dispatch(getRoomListSuccess(res.data))
    }
    catch(error){
        console.log(error)
        dispatch(getRoomListFailure())
    }
}

export const getRoomList= async (dispatch) => {
    dispatch( getRoomListStart())
    try{
        const res= await axiosInstance.get(`${API_URL}/api/v1/rooms`)
        dispatch(getRoomListSuccess(res.data))
    }
    catch(error){
        console.log(error)
        dispatch(getRoomListFailure())
    }
}

export const deleteRoom= async (dispatch,room) => {
    dispatch(deleteRoomStart())
    try{
        await axiosInstance.delete(`${API_URL}/api/v1/rooms/${room}`)
        dispatch(deleteRoomSuccess())
    }
    catch(error){
        console.log(error)
        dispatch(deleteRoomFailure())
    }
}

export const createRoom= async (dispatch,room) => {
    dispatch(createRoomStart())
    try{
        await axiosInstance.post(`${API_URL}/api/v1/rooms`,room)
        dispatch(createRoomSuccess())
        return true;
    }
    catch(error){
        console.log(error)
        dispatch(createRoomFailure())
        return false;
    }
}