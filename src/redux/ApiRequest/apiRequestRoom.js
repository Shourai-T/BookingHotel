import { getRoomListFailure, getRoomListStart, getRoomListSuccess,
    deleteRoomFailure, deleteRoomStart, deleteRoomSuccess,
    createRoomFailure, createRoomStart, createRoomSuccess
 } from "../Slice/roomSlice";
import axiosInstance from "../../utility/axios.interceptor";
import { storage } from "../../utility/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

const handleUpload = async (roomImage) => {
    if (!roomImage) return null;
  
    const imageRef = ref(storage, `/upload/${roomImage.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, roomImage);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };
export const createNewRoom= async (dispatch,room,roomImage) => {
    dispatch(createRoomStart())
    try{
        const downloadURL = await handleUpload(roomImage);
        if (!downloadURL) {
            dispatch(createRoomFailure())
            return false;
        }   
        room.image=downloadURL;
        await axiosInstance.post(`${API_URL}/api/v1/rooms`,room)
        dispatch(createRoomSuccess())
        return true;
    }
    catch(error){
        console.log(error)
        return false;
    }
}