import { createSlice } from '@reduxjs/toolkit';

const adminInitialState = {
    admin: null,
    token: null,
    isAuthenticated: false,
}

const adminSlice = createSlice({
    name: "admin",
    initialState: adminInitialState,
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload.token;
            state.isAuthenticated = true; 
        },
        updateAdmin(state, action) {
            state.admin = action.payload.user;
        },
        logout(state) {
            state.admin = null;
            state.token = null;
            state.isAuthenticated = false; 
        }
    }
})

export const { loginSuccess: adminLoginSuccess, logout: adminLogout, updateAdmin } = adminSlice.actions; 
export default adminSlice.reducer;
