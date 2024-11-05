import { createSlice } from "@reduxjs/toolkit";
import { createRoom } from "../ApiRequest/apiRequestRoom";

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
        },
        createRoom:{
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
        },
        createRoomStart:(state)=>{
            state.createRoom.isFetching=true;
            state.createRoom.error=false;
            state.createRoom.success=false;
        },
        createRoomSuccess:(state)=>{
            state.createRoom.isFetching=false;
            state.createRoom.error=false;
            state.createRoom.success=true;
        },
        createRoomFailure:(state)=>{
            state.createRoom.isFetching=false;
            state.createRoom.error=true;
            state.createRoom.success=false;
        }
    }
})

export const {
    getRoomListStart,
    getRoomListSuccess,
    getRoomListFailure,

    deleteRoomStart,
    deleteRoomSuccess,
    deleteRoomFailure,

    createRoomStart,
    createRoomSuccess,
    createRoomFailure
} = roomSlice.actions;

export default roomSlice.reducer;