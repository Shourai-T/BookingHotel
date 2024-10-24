import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        createPayment:{
            isFetching: false,
            data: null,
            error: false,
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
        }
    }
});

export const{
    createPaymentStart,
    createPaymentSuccess,
    createPaymentFailure
}=paymentSlice.actions;

export default paymentSlice.reducer;