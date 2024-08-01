import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
    user: null,
    token: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: userInitialState,
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload.token;
            state.isAuthenticated = true; 
        },
        updateUser(state, action) {
            state.user = action.payload.user;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false; 
        }
    }
})

export const { loginSuccess, logout, updateUser } = authSlice.actions; 
export default authSlice.reducer;
