import axiosInstance from "../../utility/axios.interceptor"
import { createPaymentFailure, createPaymentStart, createPaymentSuccess } from "../Slice/paymentSlice"

const API_URL = process.env.REACT_APP_API_URL
export const createPaymentByZaloPay = async (data,dispatch) => {
    dispatch(createPaymentStart())
    try {
        const response = await axiosInstance.post(`${API_URL}/api/v1/zalopay-payment`, data)
        dispatch(createPaymentSuccess(response.data))
        return response.data.data.order_url
    } catch (error) {
        dispatch(createPaymentFailure())
    }
}

export const createPaymentByVnpay = async (data,dispatch) => {
    dispatch(createPaymentStart())
    try {
        const response = await axiosInstance.post(`${API_URL}/api/v1/vnpay`, data)
        dispatch(createPaymentSuccess(response.data))
        return response.data.data.paymentUrl
    } catch (error) {
        console.error(error)
        dispatch(createPaymentFailure())
    }
}