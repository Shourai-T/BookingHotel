import axiosInstance from "../../utility/axios.interceptor";
import { getListSurchargeFailure, getListSurchargeStart, getListSurchargeSuccess } from "../Slice/surchargeSlice";

const API_URL = process.env.REACT_APP_API_URL
export const getAllSurcharge =async (dispatch) => {
    dispatch(getListSurchargeStart());
    try {
        const response = await axiosInstance.get(`${API_URL}/api/v1/surcharge`);
        dispatch(getListSurchargeSuccess(response.data));
    } catch (error) {
        dispatch(getListSurchargeFailure());
    }
}