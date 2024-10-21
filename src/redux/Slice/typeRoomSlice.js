import { createSlice } from "@reduxjs/toolkit";

const typeRoomSlice= createSlice({
    name:"typeRoom",
    initialState:{
        getTypeRoomList:{
            data:[],
            isFetching:false,
            error:false,
            success:false
        },
        getDetailTypeRoom:{
            data:null,
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
        },
        getDetailTypeRoomStart:(state)=>{
            state.getDetailTypeRoom.isFetching=true;
            state.getDetailTypeRoom.error=false;
            state.getDetailTypeRoom.success=false;
        },
        getDetailTypeRoomSuccess:(state,action)=>{
            state.getDetailTypeRoom.isFetching=false;
            state.getDetailTypeRoom.data=action.payload.data;
            state.getDetailTypeRoom.success=true;
        },
        getDetailTypeRoomFailure:(state,action)=>{
            state.getDetailTypeRoom.isFetching=false;
            state.getDetailTypeRoom.error=true;
        }
    }
})

export const {
    getTypeRoomListStart,
    getTypeRoomListSuccess,
    getTypeRoomListFailure,
    getDetailTypeRoomStart,
    getDetailTypeRoomSuccess,
    getDetailTypeRoomFailure
}=typeRoomSlice.actions;

export default typeRoomSlice.reducer;