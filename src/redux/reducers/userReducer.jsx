import { createSlice } from '@reduxjs/toolkit'

const userInitialState = {
    user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token : localStorage.getItem('accessToken') || null,
    isAuthenticated : !!localStorage.getItem('accessToken'),

};

const userSlice = createSlice ({
    name : "auth",
    initialState :userInitialState,
    reducers : {
        loginSuccess : (state,action) =>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('user',JSON.stringify(action.payload.user));
            localStorage.setItem('accessToken',action.payload.token)
        },
        updateUser:(state,action) =>{
            state.user = action.payload.user;
        },
        logout : (state) => {
            state.user = null ;
            state.token = null ;
            state.isAuthenticated = false ;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        },


    },
});

export const {loginSuccess,logout,updateUser} = userSlice.actions;
export default userSlice.reducer;


