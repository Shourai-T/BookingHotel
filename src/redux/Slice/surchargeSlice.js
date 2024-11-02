import { createSlice } from "@reduxjs/toolkit";

const surchargeSlice = createSlice({
    name: "surcharge",
    initialState:{
        getListSurcharge: {
            isFetching: false,
            data: [],
            error: null,
        },
    },
    reducers:{
        getListSurchargeStart: (state) => {
            state.getListSurcharge.isFetching = true;
            state.getListSurcharge.error = null;
        },
        getListSurchargeSuccess: (state, action) => {
            state.getListSurcharge.isFetching = false;
            state.getListSurcharge.data = action.payload.data.surcharges;
        },
        getListSurchargeFailure: (state, action) => {
            state.getListSurcharge.isFetching = false;
            state.getListSurcharge.error = action.payload.error;
        },
    }
})

export const {
    getListSurchargeStart,
    getListSurchargeSuccess,
    getListSurchargeFailure,
} = surchargeSlice.actions;

export default surchargeSlice.reducer;