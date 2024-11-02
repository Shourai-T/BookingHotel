import { createSlice } from "@reduxjs/toolkit";

const utilitySlice = createSlice({
    name:"utility",
    initialState:{
        getListUtility:{
            data:null,
            isFetching:false,
            error:false,
        },
    },
    reducers:{
        getListUtilityStart:(state)=>{
            state.getListUtility.isFetching = true;
            state.getListUtility.error = false;
        },
        getListUtilitySuccess:(state,action)=>{
            state.getListUtility.isFetching = false;
            state.getListUtility.data = action.payload.data.utilities;
        },
        getListUtilityFailure:(state)=>{
            state.getListUtility.isFetching = false;
            state.getListUtility.error = true;
        },
    }
});

export const {
    getListUtilityStart,
    getListUtilitySuccess,
    getListUtilityFailure
} = utilitySlice.actions;

export default utilitySlice.reducer;