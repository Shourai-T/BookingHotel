import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
    name:"review",
    initialState:{
        createReview:{
            isFetching:false,
            error:false,
            success:false
        },
    },
    reducers:{
        createReviewInit:(state)=>{
            state.createReview.isFetching = false;
            state.createReview.error = false;
            state.createReview.success = false;
        },
        createReviewStart:(state)=>{
            state.createReview.isFetching = true;
            state.createReview.error = false;
            state.createReview.success = false;
        },
        createReviewSuccess:(state)=>{
            state.createReview.isFetching = false;
            state.createReview.success = true;
        },
        createReviewFailure:(state)=>{
            state.createReview.isFetching = false;
            state.createReview.error = true;
            state.createReview.success = false;
        }
    }
})

export const {
    createReviewInit,
    createReviewStart,
    createReviewSuccess,
    createReviewFailure
} = reviewSlice.actions;

export default reviewSlice.reducer;