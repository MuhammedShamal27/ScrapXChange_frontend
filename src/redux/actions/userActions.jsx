import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axiosInstance";
import { setUser, setToken, logout } from "../reducers/userReducer";


export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(userData,{rejectWithValue}) =>{
        try {
            const response = await axiosInstance.post('/user/register/',userData);
            return response.data;
        }catch(err){
            return rejectWithValue(err.response.data)
        }
    }
)

// export const registerUser = (userData) => async (dispatch) => {
//     try {
//         const response = await axiosInstance.post('user/register/',userData);
//         console.log(response.data);
//     }
//     catch(error){
//         console.error(error.response?.data);
//     }
// };