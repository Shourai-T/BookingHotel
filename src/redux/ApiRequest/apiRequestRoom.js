import axios from "axios";
import { getRoomListFailure, getRoomListStart, getRoomListSuccess } from "../Slice/roomSlice";

const API_URL= process.env.REACT_APP_API_URL

export const getRoomByFilter= async (startTime,endTime,numberOfPeople,dispatch) => {
    dispatch( getRoomListStart())
    try{
        const res= await axios.get(`${API_URL}/api/v1/rooms/available/search?startTime=${startTime}&endTime=${endTime}&numberOfPeople=${numberOfPeople}`)
        dispatch(getRoomListSuccess(res.data))
    }
    catch(error){
        console.log(error)
        dispatch(getRoomListFailure())
    }
}