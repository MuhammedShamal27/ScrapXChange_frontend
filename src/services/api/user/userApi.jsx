import axiosInstance from "../axiosInstance";

export const registerUser =(data) => axiosInstance.post('user/register/',data);
export const otpVerification=(data) => axiosInstance.post('user/otp/',data)
