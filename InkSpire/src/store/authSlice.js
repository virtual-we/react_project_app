import {createSlice } from '@reduxjs/toolkit';


const initialState={
    status: false,
    userData: null
}

const authSlice=createSlice({
    name: "auth",
    initialState,
    reducers: {
        // for log in details
        login:(state, action)=>{
            state.status=true,
            state.userData=action.payload.userData;
        },
        // for log out details
        logout: (state) =>{
            state.status=false,
            state.userData=null
        }

    }

});

export const {login, logout} =authSlice.actions;

export default authSlice.reducer;