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
    try{
        const response = await axiosInstance.post('/user/verify-otp/',otpData);
        return response.data;
    }catch (err){
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const resendOtp = async (email) =>{
    const response = await axiosInstance.post('/user/resend-otp/',{ email });
    return response.data;
}


export const loginUser = async (userData) =>{
    try{
        const response = await axiosInstance.post('/user/login/',userData);
        console.log('loginuser api response',response.data)
        return response.data
    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const emailForResetPassword = async (userData) =>{
    try{
        const response = await axiosInstance.post('/user/password-reset-request/',userData);
        console.log('Api emailForResetPassword',response.data)
        return response.data
    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const resetPassword = async (userData) =>{
    try{
        const response = await axiosInstance.post('/user/password-reset/',userData);
        console.log('Api password-reset',response.data)
        return response.data
    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}
// export const loginUser = createAsyncThunk(
//     'user/login',
//     async (userData, { rejectWithValue }) => {
//         try {
//             const response = await axiosInstance.post('/user/login/', userData);
//             console.log("API response data:", response.data);
//             return response.data;
//         } catch (err) {
//             console.error('Login error:', err);

//             if (err.response) {
//                 console.error("Error response data:", err.response.data);
//                 return rejectWithValue(err.response.data);
//             } else {
//                 return rejectWithValue({ detail: "An unexpected error occurred." });
//             }
//         }
//     }
// );

export const getUserHomeData = async () =>{
    try {
        const response = await axiosInstance.get('/user/');
        return response.data
    } catch (error) {
        console.error('Error fetching user home data:' ,error);
        throw error;
    }
};