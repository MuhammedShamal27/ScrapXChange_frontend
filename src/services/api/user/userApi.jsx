import axiosInstance from "../axiosInstance";

export const registerUser = async (userData) => {
        try {
            const response = await axiosInstance.post('/user/register/', userData);
            console.log("the register response data",response.data)
            return response.data;
        } catch (err) {
            if (!err.response) 
                throw err;
            return Promise.reject(err.response.data);
        }
    }

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
    try{
        const response = await axiosInstance.post('/user/resend-otp/',{ email });
        return response.data;
    }catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
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

export const passwordOtp = async (otpData) =>{
    try{
        const response = await axiosInstance.post('/user/password-otp/',otpData);
        console.log("Api passwordOtp",response.data)
        return response.data
    }
    catch (err) {
        if (! err.response) throw err;
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

export const getUserHomeData = async () =>{
    try {
        const response = await axiosInstance.get('/user/');
        return response.data
    } catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
};


export const userProfile = async () =>{
    try {
        const response = await axiosInstance.get('/user/profile/');
        console.log("userProfile",response)
        return response.data
    }catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
};



export const editProfile = async (formData) =>{
    try{
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await axiosInstance.put('/user/edit-profile/',formData,config );
        console.log("the response api of editProfile",response)
        return response.data
    }catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}