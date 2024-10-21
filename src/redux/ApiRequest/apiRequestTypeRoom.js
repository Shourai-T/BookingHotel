import axios from "axios"
import { getDetailTypeRoomFailure, getDetailTypeRoomStart, getDetailTypeRoomSuccess, getTypeRoomListFailure, getTypeRoomListStart, getTypeRoomListSuccess } from "../Slice/typeRoomSlice"

const API_URL= process.env.REACT_APP_API_URL

export const getAllTypeRoom= async (dispatch) => {
    dispatch( getTypeRoomListStart())
    try{
        const res= await axios.get(`${API_URL}/api/v1/type-rooms`)
        console.log(res.data)
        dispatch(getTypeRoomListSuccess(res.data))
    }
    catch(error){
        console.log(error)
        dispatch(getTypeRoomListFailure())
    }
}

export const getDetailTypeRoom= async (dispatch,id) => {
    dispatch(getDetailTypeRoomStart())
    try{
        const res= await axios.get(`${API_URL}/api/v1/type-rooms/${id}`)
        console.log(res.data)
        dispatch(getDetailTypeRoomSuccess(res.data))
    }
    catch(error){
        console.log(error)
        dispatch(getDetailTypeRoomFailure())
    }
}

