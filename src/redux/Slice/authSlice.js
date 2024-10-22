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
        register: {
            isFetching: false,
            error: false,
            success: false
        },
        logout: {
            isFetching: false,
            error: false,
            success: false
        }
    },
    reducers: {
        loginInit:(state)=>{
            state.login.isFetching = false;
            state.login.error = false;
            state.login.msg = '';
        },
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
        loginFailure: (state, action) => {
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
        registerFailure: (state, action) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.login.msg = action.payload
        },
        logoutStart: (state) => {
            if (!state.logout) {
                console.error("State 'logout' is undefined or revoked!");
                return;
            }
            console.log("Current state before logoutStart:", state);
            state.logout.isFetching = true;
            state.logout.error = false;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.logout.success = true;
            state.login.currentUser = null;
        },
        logoutFailure: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        }

    }
})

export const {
    loginInit,
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure

} = authSlice.actions;

export default authSlice.reducer;