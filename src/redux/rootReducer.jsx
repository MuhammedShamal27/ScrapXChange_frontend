import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/userReducer";
import shopReducer from "./reducers/shopReducer";
import adminReducer from "./reducers/adminReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    shop: shopReducer,
    admin:adminReducer,
})


export default rootReducer;