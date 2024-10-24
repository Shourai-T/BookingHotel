import axiosInstance from "../../utility/axios.interceptor"
import { discountDetailFailure, discountDetailStart, discountDetailSuccess } from "../Slice/discountSlice"

const API_URL = process.env.REACT_APP_API_URL

export const getDiscountDetailByCode = async (code,dispatch) => {
    dispatch(discountDetailStart())
    try {
        const res = await axiosInstance.get(`${API_URL}/api/v1/discount/${code}`)
        dispatch(discountDetailSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(discountDetailFailure())
    }
}