import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name:"room",
    initialState:{
        getRoomList:{
            data:[],
            isFetching:false,
            error:false,
            success:false
        }
    },

    reducers:{
        getRoomListStart:(state)=>{
            state.getRoomList.isFetching=true;
            state.getRoomList.error=false;
            state.getRoomList.success=false;
        },
        getRoomListSuccess:(state,action)=>{
            state.getRoomList.isFetching=false;
            state.getRoomList.data=action.payload.data.rooms;
            state.getRoomList.success=true;
        },
        getRoomListFailure:(state)=>{
            state.getRoomList.isFetching=false;
            state.getRoomList.error=true;
        }
    }
})

export const {
    getRoomListStart,
    getRoomListSuccess,
    getRoomListFailure
} = roomSlice.actions;

export default roomSlice.reducer;