import { createSlice } from "@reduxjs/toolkit";

const discountSlice= createSlice({
    name:"discount",
    initialState:{
        discountDetail:{
            data:null,
            isFetching:false,
            error:false,
            success:false,
        },
    },
    reducers:{
        discountDetailInit: (state) => {
            state.discountDetail.data = null;
            state.discountDetail.isFetching = false;
            state.discountDetail.error = false;
            state.discountDetail.success = false;
        },
        discountDetailStart: (state) => {
            state.discountDetail.isFetching = true;
            state.discountDetail.error = false;
        },
        discountDetailSuccess: (state, action) => {
            state.discountDetail.isFetching = false;
            state.discountDetail.data = action.payload.data;
            state.discountDetail.success = true;
        },
        discountDetailFailure: (state) => {
            state.discountDetail.isFetching = false;
            state.discountDetail.data = null;
            state.discountDetail.error = true;
        },
    }
});

export const {
    discountDetailInit,
    discountDetailStart,
    discountDetailSuccess,
    discountDetailFailure,
}= discountSlice.actions;

export default discountSlice.reducer;