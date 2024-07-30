import axiosInstance from "../axiosInstance";

export const registerUser =(data) => axiosInstance.post('/user/login/',data);
