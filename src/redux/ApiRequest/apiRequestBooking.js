import axiosInstance from "../../utility/axios.interceptor"
import { bookingDetailStart, bookingDetailSuccess, bookingListFailure, bookingListStart, bookingListSuccess, createBookingFailure, createBookingStart, createBookingSuccess, allBookingStart, allBookingSuccess, allBookingFailure, updateBookingStatusStart, updateBookingStatusSuccess, updateBookingStatusFailure } from "../Slice/bookingSlice"

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

export const getBookingByStatus = async ( status,dispatch) => {
    dispatch(allBookingStart())
    try {
        const res = await axiosInstance.get(`${API_URL}/api/v1/booking/findBookingByStatus/`, { params: { status } })
        dispatch(allBookingSuccess(res.data))
    } catch (error) {
        console.error(error)
        dispatch(allBookingFailure())
    }
}

export const getAllBooking = async (dispatch) => {
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
        return res.data.data.bookingId;
    } catch (error) {
        console.error(error)
        dispatch(createBookingFailure())
    }
}

export const createBookingByStaff = async (booking, dispatch) => {
    dispatch(createBookingStart())
    try {
        const res = await axiosInstance.post(`${API_URL}/api/v1/booking`, booking)
        dispatch(createBookingSuccess(res.data))
        return res.data.data.bookingId;
    } catch (error) {
        console.error(error)
        dispatch(createBookingFailure())
    }
}

export const updateBookingStatus = async (bookingId, data, dispatch) => {
    dispatch(updateBookingStatusStart())
    try {
        await axiosInstance.patch(`${API_URL}/api/v1/booking/${bookingId}`, data)
        dispatch(updateBookingStatusSuccess())
    } catch (error) {
        console.error(error)
        dispatch(updateBookingStatusFailure())
    }
}

export const getBookingsToday = async (dispatch) => {
    dispatch(allBookingStart())
    try {
        const res = await axiosInstance.get(`${API_URL}/api/v1/booking/findBookingToday`)
        dispatch(allBookingSuccess(res.data))
    } catch (error) {
        console.error(error)
        dispatch(allBookingFailure())
    }
}