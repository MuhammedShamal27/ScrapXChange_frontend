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
        console.log('the error in the catch',err.response.data)
        return Promise.reject(err.response.data);
    }
};



export const editUserProfile = async (formData) =>{
    try{
        console.log('here');
        
        const response = await axiosInstance.put('/user/edit-profile/',formData );
        console.log("the response api of editProfile",response)
        return response.data
    }catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const fetchshops = async (shopsList) => {
    try {
        const response = await axiosInstance.get('/user/shops/',shopsList)
        console.log("the response of shops ",response)
        return response.data
    }catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const shopScrapList = async (id) => {
    try {
        const response = await axiosInstance.get(`/user/shops/${id}/products/`)
        console.log("the response of shops ",response)
        return response.data
    }catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const collectionRequest = async (formData) => {
    try {
        const response = await axiosInstance.post('/user/scrap-collection-request/',formData)
        console.log("the response of scrap collection  shops ",response)
        return response.data
    }catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}