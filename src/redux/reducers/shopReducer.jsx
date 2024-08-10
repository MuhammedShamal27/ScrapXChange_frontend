import { createSlice } from '@reduxjs/toolkit';

const shopInitialState = {
    shop: null,
    token: null,
    isAuthenticated: false,
}

const shopSlice = createSlice({
    name: "shop",
    initialState: shopInitialState,
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload.token;
            state.isAuthenticated = true; 
        },
        updateShop(state, action) {
            state.shop = action.payload.user;
        },
        logout(state) {
            state.shop = null;
            state.token = null;
            state.isAuthenticated = false; 
        }
    }
})

export const { loginSuccess : shopLoginSuccess, logout : shopLogout, updateshop } = shopSlice.actions; 
export default shopSlice.reducer;
