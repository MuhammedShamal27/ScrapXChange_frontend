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
        shopLoginSuccess(state, action) {
            state.token = action.payload.token;
            state.isAuthenticated = true; 
        },
        updateshop(state, action) {
            state.shop = action.payload.user;
        },
        shopLogout(state) {
            state.shop = null;
            state.token = null;
            state.isAuthenticated = false; 
        }
    }
})

export const { shopLoginSuccess , updateshop , shopLogout } = shopSlice.actions; 
export default shopSlice.reducer;
