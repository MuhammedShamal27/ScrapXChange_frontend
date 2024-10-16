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
        // console.log("userProfile",response)
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

export const fetchshops = async (params) => {
    try {
        console.log('going request',params)
        const response = await axiosInstance.get('/user/shops/',{params:params})
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

        
        console.log('the data sending ',formData)
        const response = await axiosInstance.post('/user/scrap-collection-request/',formData)
        console.log("the response of scrap collection  shops ",response)
        return response.data
    }catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const fetchAllShop = async (searchQuery) => {
    try {
        console.log('the data sending ')
        const response = await axiosInstance.get('/user/all-shop/',{
            params: { search: searchQuery }
        })
        console.log("the response of scrap collection  shops ",response)
        return response.data
    }catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}



export const fetchUserChatRooms = async () => {
    try {
        const response = await axiosInstance.get('/user/chatrooms/');
        console.log("the response of fetchUserChatRooms ",response)
        return response.data;
    } catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
};


export const createOrFetchChatRoom = async (shopId) => {
    try {
        const response = await axiosInstance.post(`/user/chatroom/${shopId}/`);
        console.log('the response of fetchMessages',response.data)

        return response.data;
    } catch (err) {
        console.error("Error while creating or fetching chat room", err);
        throw err;
    }
};


export const fetchMessages = async (roomId) => {
    try {
        const response = await axiosInstance.get(`/user/chatroom/${roomId}/messages/`);
        console.log('the response of fetchMessages',response.data)
        return response.data;
    } catch (err) {
        console.error("Error while fetching messages", err);
        throw err;
    }
};

export const sendMessage = async (formData) => {
    try {
        console.log('the formdata inside the user api',formData)
        const roomId = formData.get('room_id');
        console.log('the formdata inside the user api',roomId)

        const response = await axiosInstance.post(`/user/chatroom/${roomId}/messages/`, formData);
        console.log('the response of sendMessage',response.data)
        return response.data;
    } catch (err) {
        console.error("Error while sending message", err);
        throw err;
    }
};


export const sendNotification = async () => {
    try{
        const response = await axiosInstance.post ('/user/notification/create/')
        console.log('the reponse of sendNotification',response.data)
        return response.data;
    } catch (err) {
        console.error("Error while sending Notification",err);
        throw err;
    }
}


export const reportUser = async ({ receiver, reason , description }) => {
    try {
        const response = await axiosInstance.post('/user/report/',{ receiver, reason , description })
        console.log('the response of reportUser',response)
        return response.data;
    } catch (err) {
        console.error("Error while reporting ",err)
        throw err;
    }
}

export const userTransactions = async () => {
    try {
        const response = await axiosInstance.get('/user/transactions/')
        console.log('the response of transactions',response)
        return response.data;
    } catch (err) {
        console.error("Error while reporting ",err)
        throw err;
    }
}


export const fecthUserNotification = async() => {
    try{
        const response = await axiosInstance.get('/user/notifications/')
        console.log('the response of fecthUserNotification',response)
        return response.data;
    }catch(error){ 
        console.error("Error while fecthing .",err)
        throw error;
    }
}

export const markReadNotification = async(id) => {
    try{
        const response = await axiosInstance.patch(`/user/notifications/${id}/read/`)
        console.log('the response of markReadNotification',response)
        return response.data;
    }catch(error){ 
        console.error("Error while fecthing .",err)
        throw error;
    }
}

export const fetchUserDashboard = async() => {
    try{
        const response = await axiosInstance.get(`/user/dashboard/`)
        console.log('the response of fetchUserDashboard',response)
        return response.data;
    }catch(error){ 
        console.error("Error while fecthing .",err)
        throw error;
    }
}