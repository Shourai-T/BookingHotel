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
        },
        getUserList:{
            data:[],
            isFetching:false,
            error:false,
        },
        deleteUser:{
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
        },
        getUserListStart:(state)=>{
            state.getUserList.isFetching = true;
            state.getUserList.error = false;
        },
        getUserListSuccess:(state,action)=>{
            state.getUserList.isFetching = false;
            state.getUserList.data = action.payload.data;
        },
        getUserListFailure:(state)=>{
            state.getUserList.isFetching = false;
            state.getUserList.error = true;
        },
        deleteUserStart:(state)=>{
            state.deleteUser.isFetching = true;
            state.deleteUser.error = false;
        },
        deleteUserSuccess:(state)=>{
            state.deleteUser.isFetching = false;
            state.deleteUser.error = false;
            state.deleteUser.msg = 'Delete user success';
        },
        deleteUserFailure:(state)=>{
            state.deleteUser.isFetching = false;
            state.deleteUser.error = true;
            state.deleteUser.msg = 'Delete user failed';
        }
    }
})

export const {
    getUserStart,
    getUserSuccess,
    getUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    getUserListStart,
    getUserListSuccess,
    getUserListFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} = userSlice.actions;

export default userSlice.reducer;