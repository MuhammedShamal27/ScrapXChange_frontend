import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/userReducer";


const rootReducer = combineReducers({
    auth: authReducer
})


export default rootReducer;