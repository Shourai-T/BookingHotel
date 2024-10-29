import { createReviewFailure, createReviewStart, createReviewSuccess } from "../Slice/reviewSlice"
import axiosInstance from "../../utility/axios.interceptor"

const API_URL = process.env.REACT_APP_API_URL

export const createNewReview = async (data,dispatch) => {
    dispatch(createReviewStart())
    try{
        const res= await axiosInstance.post(`${API_URL}/api/v1/reviews`,data)
        dispatch(createReviewSuccess(res.data))
    }
    catch(error){
        console.error(error)
        dispatch(createReviewFailure())
    }
}