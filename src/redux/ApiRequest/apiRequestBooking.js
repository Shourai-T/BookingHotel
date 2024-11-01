import axiosInstance from "../../utility/axios.interceptor"
import { bookingDetailStart, bookingDetailSuccess, bookingListFailure, bookingListStart, bookingListSuccess, createBookingFailure, createBookingStart, createBookingSuccess, allBookingStart, allBookingSuccess, allBookingFailure } from "../Slice/bookingSlice"

const API_URL= process.env.REACT_APP_API_URL

export const getMyBookings = async (dispatch) => {
    dispatch(bookingListStart())
    try {
        const res = await axiosInstance.get(`${API_URL}/api/v1/booking/findMyBooking`)
        dispatch(bookingListSuccess(res.data))
    } catch (error) {
        console.error(error)
        dispatch(bookingListFailure())
    }
}

export const getAllBookings = async (dispatch) => {
    dispatch(allBookingStart())
    try {
        const res = await axiosInstance.get(`${API_URL}/api/v1/booking/findAll`)
        dispatch(allBookingSuccess(res.data))
    } catch (error) {
        console.error(error)
        dispatch(allBookingFailure())
    }
}

export const getBookingDetail = async (id, dispatch) => {
    dispatch(bookingDetailStart())
    try {
        const res = await axiosInstance.get(`${API_URL}/api/v1/booking/findById/${id}`)
        console.log(res.data)
        dispatch(bookingDetailSuccess(res.data))
    } catch (error) {
        console.error(error)
        dispatch(bookingListFailure())
    }
}

export const createBooking = async (booking, dispatch) => {
    dispatch(createBookingStart())
    try {
        const res = await axiosInstance.post(`${API_URL}/api/v1/booking/my-booking`, booking)
        dispatch(createBookingSuccess(res.data))
        console.log(res.data)
        return res.data.data.bookingId;
    } catch (error) {
        console.error(error)
        dispatch(createBookingFailure())
    }
}