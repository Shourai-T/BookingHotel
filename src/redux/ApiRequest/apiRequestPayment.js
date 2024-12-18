import axiosInstance from "../../utility/axios.interceptor";
import {
  createPaymentFailure,
  createPaymentStart,
  createPaymentSuccess,
  refundFailure,
  refundStart,
  refundSuccess,
  getRevenueStart,
  getRevenueSuccess,
  getRevenueFailure,
} from "../Slice/paymentSlice";

const API_URL = process.env.REACT_APP_API_URL;
export const createPaymentByZaloPay = async (data, dispatch) => {
  dispatch(createPaymentStart());
  try {
    const response = await axiosInstance.post(
      `${API_URL}/api/v1/zalopay-payment`,
      data
    );
    dispatch(createPaymentSuccess(response.data));
    return response.data.data.order_url;
  } catch (error) {
    dispatch(createPaymentFailure());
  }
};

export const createPaymentByVnpay = async (data, dispatch) => {
  dispatch(createPaymentStart());
  try {
    const response = await axiosInstance.post(`${API_URL}/api/v1/vnpay`, data);
    dispatch(createPaymentSuccess(response.data));
    return response.data.data.paymentUrl;
  } catch (error) {
    console.error(error);
    dispatch(createPaymentFailure());
  }
};

export const refund = async (bookingId, dispatch) => {
  dispatch(refundStart());
  try {
    await axiosInstance.patch(`${API_URL}/api/v1/payment/${bookingId}`);
    dispatch(refundSuccess());
  } catch (error) {
    console.error(error);
    dispatch(refundFailure());
  }
};

export const createPaymentByCash = async (data, dispatch) => {
  dispatch(createPaymentStart());
  try {
    const response = await axiosInstance.post(
      `${API_URL}/api/v1/payment`,
      data
    );
    dispatch(createPaymentSuccess(response.data));
  } catch (error) {
    console.error(error);
    dispatch(createPaymentFailure());
  }
};

export const getRevenueDaily = async (dispatch,startDate) => {
    dispatch(getRevenueStart());
    try {
        const res=await axiosInstance.get(`${API_URL}/api/v1/payment/revenue/daily?startDate=${startDate}`);
        dispatch(getRevenueSuccess(res.data));
    } catch (error) {
        console.error(error);
        dispatch(getRevenueFailure());
    }
};

export const getRevenueMonthly = async (dispatch, year) => {
    dispatch(getRevenueStart());
    try {
      const res=await axiosInstance.get(`${API_URL}/api/v1/payment/revenue/monthly?year=${year}`);
        dispatch(getRevenueSuccess(res.data));
    } catch (error) {
        console.error(error);
        dispatch(getRevenueFailure());
    }
};

export const getRevenueYearly = async (dispatch) => {
    dispatch(getRevenueStart());
    try {
      const res= await axiosInstance.get(`${API_URL}/api/v1/payment/revenue/yearly`);
      dispatch(getRevenueSuccess(res.data));
    } catch (error) {
        console.error(error);
        dispatch(getRevenueFailure());
    }
};
