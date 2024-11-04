import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name:"room",
    initialState:{
        getRoomList:{
            data:[],
            isFetching:false,
            error:false,
            success:false
        },
        deleteRoom:{
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
        },
        deleteRoomStart:(state)=>{
            state.deleteRoom.isFetching=true;
            state.deleteRoom.error=false;
            state.deleteRoom.success=false;
        },
        deleteRoomSuccess:(state)=>{
            state.deleteRoom.isFetching=false;
            state.deleteRoom.error=false;
            state.deleteRoom.success=true;
        },
        deleteRoomFailure:(state)=>{
            state.deleteRoom.isFetching=false;
            state.deleteRoom.error=true;
            state.deleteRoom.success=false;
        }
    }
})

export const {
    getRoomListStart,
    getRoomListSuccess,
    getRoomListFailure,

    deleteRoomStart,
    deleteRoomSuccess,
    deleteRoomFailure
} = roomSlice.actions;

export default roomSlice.reducer;