import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        createPayment:{
            isFetching: false,
            data: null,
            error: false,
        },
        refund:{
            isFetching:false,
            success:false,
            error:false,
        },
        revenue:{
            isFetching:false,
            data:[],
            error:false,
        }
    },
    reducers: {
        createPaymentStart: (state) => {
            state.createPayment.isFetching = true;
            state.createPayment.error = false;
        },
        createPaymentSuccess: (state, action) => {
            state.createPayment.isFetching = false;
            state.createPayment.data = action.payload.data;
            state.createPayment.error = false;
        },
        createPaymentFailure: (state) => {
            state.createPayment.isFetching = false;
            state.createPayment.error = true;
            state.createPayment.data = null;
        },
        refundInit:(state)=>{
            state.refund.isFetching=false;
            state.refund.success=false;
            state.refund.error=false;
        },
        refundStart:(state)=>{
            state.refund.isFetching=true;
            state.refund.success=false;
            state.refund.error=false;
        },
        refundSuccess:(state)=>{
            state.refund.isFetching=false
            state.refund.success=true;
            state.refund.error=false;
        },
        refundFailure:(state)=>{
            state.refund.isFetching=false;
            state.refund.success=false;
            state.refund.error=true;
        },
        getRevenueStart:(state)=>{
            state.revenue.isFetching=true;
            state.revenue.error=false;
        },
        getRevenueSuccess:(state,action)=>{
            state.revenue.isFetching=false;
            state.revenue.data=action.payload.data;
            state.revenue.error=false;
        },
        getRevenueFailure:(state)=>{
            state.revenue.isFetching=false;
            state.revenue.error=true;
        }
    }
});

export const{
    createPaymentStart,
    createPaymentSuccess,
    createPaymentFailure,
    refundInit,
    refundStart,
    refundSuccess,
    refundFailure,

    getRevenueStart,
    getRevenueSuccess,
    getRevenueFailure
}=paymentSlice.actions;

export default paymentSlice.reducer;