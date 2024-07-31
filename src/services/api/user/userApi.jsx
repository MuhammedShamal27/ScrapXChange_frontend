import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/register/', userData);
            console.log("the response data",response.data)
            return response.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

export const verifyOtp = async (otpData) =>{
    const response = await axiosInstance.post('/user/verify-otp/',otpData);
    return response.data;
}

export const resendOtp = async (email) =>{
    const response = await axiosInstance.post('/user/resend-otp/',{ email });
    return response.data;
}

export const getUserHomeData = async () =>{
    const response = await axiosInstance.get('/user/');
    return response.data
};