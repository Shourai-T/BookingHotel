import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            msg: ''
        },
        register:{
            isFetching: false,
            error: false,
            success:false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
            state.login.error = false;
            state.login.msg = '';
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload.data;
            state.login.msg = 'Login Success';
        },
        loginFailure: (state,action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.login.msg = action.payload;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
            state.register.error = false;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
        },
        registerFailure: (state,action) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.login.msg = action.payload
        },
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure

} = authSlice.actions;

export default authSlice.reducer;