import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        getUser:{
            data:null,
            isFetching:false,
            error:false,
        },
        updateUser:{
            msg:'',
            isFetching:false,
            error:false,
        }
    },
    reducers:{
        getUserStart:(state)=>{
            state.getUser.isFetching = true;
            state.getUser.error = false;
        },
        getUserSuccess:(state,action)=>{
            state.getUser.isFetching = false;
            state.getUser.data = action.payload.data;
        },
        getUserFailure:(state)=>{
            state.getUser.isFetching = false;
            state.getUser.error = true;
        },
        updateUserStart:(state)=>{
            state.updateUser.isFetching = true;
            state.updateUser.error = false;
        },
        updateUserSuccess:(state,action)=>{
            state.updateUser.isFetching = false;
            state.updateUser.msg = 'Update user success';
        },
        updateUserFailure:(state)=>{
            state.updateUser.isFetching = false;
            state.updateUser.error = true;
            state.updateUser.msg = 'Update user failed';
        }
    }
})

export const {
    getUserStart,
    getUserSuccess,
    getUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
} = userSlice.actions;

export default userSlice.reducer;