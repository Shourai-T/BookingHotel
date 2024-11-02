import axiosInstance from "../../utility/axios.interceptor";
import { getListUtilityFailure, getListUtilityStart, getListUtilitySuccess } from "../Slice/utilitySlice";

const API_URL = process.env.REACT_APP_API_URL
export const getAllUtilities =  async (dispatch) => {
    dispatch(getListUtilityStart());
    try {
        const response = await axiosInstance.get(`${API_URL}/api/v1/utility`);
        dispatch(getListUtilitySuccess(response.data));
    } catch (error) {
        dispatch(getListUtilityFailure());
    }
}