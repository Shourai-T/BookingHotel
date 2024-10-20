import { createSlice } from "@reduxjs/toolkit";

const typeRoomSlice= createSlice({
    name:"typeRoom",
    initialState:{
        getTypeRoomList:{
            data:[],
            isFetching:false,
            error:false,
            success:false
        }
    },
    reducers:{
        getTypeRoomListStart:(state)=>{
            state.getTypeRoomList.isFetching=true;
            state.getTypeRoomList.error=false;
            state.getTypeRoomList.success=false;
        },
        getTypeRoomListSuccess:(state,action)=>{
            console.log(action.payload.data)
            state.getTypeRoomList.isFetching=false;
            state.getTypeRoomList.data=action.payload.data.typeRooms;
            state.getTypeRoomList.success=true;
        },
        getTypeRoomListFailure:(state,action)=>{
            state.getTypeRoomList.isFetching=false;
            state.getTypeRoomList.error=true;
        }
    }
})

export const {
    getTypeRoomListStart,
    getTypeRoomListSuccess,
    getTypeRoomListFailure
}=typeRoomSlice.actions;

export default typeRoomSlice.reducer;