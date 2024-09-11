import axiosInstance from "../axiosInstance"

export const registerShop = async (shopData) =>{
    try{
        const response = await axiosInstance.post ('/shop/register/',shopData)
        console.log("the shop response data" , response.data)
        return response.data

    } catch (err) {
        if (!err.response) {
            throw err;
        }
        console.error("Error response data:", err.response.data);
        return Promise.reject(err.response.data);
    }
}


export const loginShop = async (shopData) =>{
    try{
        const response = await axiosInstance.post ('/shop/login/',shopData)
        console.log("the shop login response data",response.data)
        return response.data
    } catch (err) {
        if (!err.response) throw err;
        console.error("Error response data:",err.response.data);
        return Promise.reject(err.response.data)
    }
}

export const shopHome = async () => {
    try {
        const response = await axiosInstance.get ('/shop/home/')
        console.log("the shop home response data", response.data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err;
        }
        console.error("Error response data:",err.response.data);
        return Promise.reject(err.response.data)
    }
}

export const fetchCategoryList = async () => {
    try {
        const response = await axiosInstance.get ('/shop/category-list/')
        console.log("the category list response data", response.data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err;
        }
        console.error("Error response data:",err.response.data);
        return Promise.reject(err.response.data)
    }
}

export const addCategory = async (categoryData) => {
    try {
        console.log('is going to backend', categoryData);
        const response = await axiosInstance.post('/shop/category-creation/', categoryData);
        console.log("the add category response data", response.data);
        return response.data;
    } catch (err) {
        if (!err.response) {
            throw err;
        }
        console.error("Error response data:", err.response.data);
        return Promise.reject(err.response.data);
    }
}

export const getCategoryById = async (id) => {
    try {
        const response = await axiosInstance.get(`/shop/category-detail/${id}/`);
        console.log("the category response data by id", response.data)
        return response.data;
    } catch (err) {
        console.error("Error fetching category data:", err);
        throw err;
    }
};


export const updateCategory = async (id, categoryData, originalImageUrl) => {
    try {
      const formData = new FormData();
      for (const key in categoryData) {
        if (key === 'image') {
          if (categoryData.image && typeof categoryData.image === 'object') {
            formData.append(key, categoryData.image);
          }
        } else {
          formData.append(key, categoryData[key]);
        }
      }
  
      const response = await axiosInstance.put(`/shop/category-update/${id}/`, formData);
      console.log("The update category response data", response.data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      console.error("Error response data:", err.response.data);
      return Promise.reject(err.response.data);
    }
  };
  


export const fetchScrapList = async () => {
    try {
        const response = await axiosInstance.get ('/shop/product-list/')
        console.log("the scrap list response data", response.data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err;
        }
        console.error("Error response data:",err.response.data);
        return Promise.reject(err.response.data)
    }
}

export const addScrap = async (scrapData) => {
    try {
        const response = await axiosInstance.post ('/shop/product-creation/',scrapData)
        console.log("the scrap list response data", response.data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err;
        }
        console.error("Error response data:",err.response.data);
        return Promise.reject(err.response.data)
    }
}

export const getScrapById = async (id) => {
    try {
        const response = await axiosInstance.get(`/shop/product-detail/${id}/`);
        console.log("the scrap response data by id", response.data)
        return response.data;
    } catch (err) {
        console.error("Error fetching scrap data:", err);
        throw err;
    }
};


export const updateScrap = async (id, scrapData, originalImageUrl) => {
    try {
      const formData = new FormData();
      for (const key in scrapData) {
        if (key === 'image') {
          if (scrapData.image && typeof scrapData.image === 'object') {
            formData.append(key, scrapData.image);
          }
        } else {
          formData.append(key, scrapData[key]);
        }
      }
  
      const response = await axiosInstance.put(`/shop/product-update/${id}/`, formData);
      console.log("The scrap list response data", response.data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      console.error("Error response data:", err.response.data);
      return Promise.reject(err.response.data);
    }
  };


export const getScrapRequests = async () => {
    try {
        const response = await axiosInstance.get(`/shop/scrap-requests/`);
        console.log("the scrap request response data", response.data)
        return response.data;
    } catch (err) {
        console.error("Error fetching scrap data:", err);
        throw err;
    }
};


export const getScrapRequestDetails = async (id) => {
    try{
        const response = await axiosInstance.get(`/shop/scrap-request-details/${id}/`);
        console.log("the scrap request details response data",response.data)
        return response.data
    }catch (err){
        console.error("Error fetching request details.",err);
        throw err;
    }
}

export const scheduleRequest = async (id) => {
    try{
        const response = await axiosInstance.post (`/shop/schedule-request/${id}/`);
        return response.data
    }catch (err) {
        console.error("Error while sheduling .",err);
        throw err;
    }
}

export const reScheduleRequest = async (id,date) => {
    try{
        const response = await axiosInstance.post (`/shop/reschedule-request/${id}/`,{ scheduled_date: date });
        return response.data
    }catch (err) {
        console.error("Error while scheduling .",err);
        throw err;
    }
}

export const rejectRequest = async (id,reason) => {
    try {
        const response = await axiosInstance.post(`/shop/reject-request/${id}/`,{reason})
        return response.data
    }catch (err) {
        console.error("Error while rejceting .",err);
        throw err;
    }
}


export const todayPendings = async() => {
    try{
        const response = await axiosInstance.get('/shop/today-pendings/')
        console.log(response.data)
        return response.data
    }catch (err){
        console.error("Error while taking data",err);
        throw err;
    }
}

export const getPendingDetails = async(id) => {
    try{
        const response = await axiosInstance.get(`/shop/pending-details/${id}`)
        console.log(response.data)
        return response.data
    }catch (err){
        console.error("Error while taking data",err);
        throw err;
    }
}

export const scrapCollected = async(id,formData) => {
    try{
        console.log('the data comming',formData)
        const response = await axiosInstance.post(`/shop/scrap-collected/${id}/`,formData)
        console.log(response.data)
        return response.data
    }catch (err) {
        console.error("Error while taking data",err);
        throw err;
    }
}

export const ConfirmCollection = async(id) => {
    try{
        const response = await axiosInstance.get(`/shop/confirm-collection/${id}/`)
        console.log('the response',response.data)
        return response.data
    }catch (err) {
        console.error("Error while taking data",err);
        throw err;
    }
}

export const PaymentCash = async(id) => {
    try{
        const response = await axiosInstance.post(`/shop/payment-cash/${id}/`)
        console.log('the response',response.data)
        return response.data
    }catch (err) {
        console.error("Error while taking data",err);
        throw err;
    }
}

export const PaymentRazorpay = async(id) => {
    try{
        console.log('here is also comming')
        const response = await axiosInstance.post(`/shop/create-razorpay-order/${id}/`)
        console.log('the response',response.data)
        return response.data
    }catch (err) {
        console.error("Error while taking data",err);
        throw err;
    }
}

export const VerifyPayment = async(paymentData) => {
    try{
        console.log('here is also comming',paymentData)
        const response = await axiosInstance.post('/shop/verify-payment/',paymentData)
        console.log('the response',response.data)
        return response.data
    }catch (err) {
        console.error("Error while taking data",err);
        throw err;
    }
}


export const fetchAllUsers = async(searchQuery) => {
    try{
        console.log('here is also comming')
        const response = await axiosInstance.get('/shop/all-users/',{
            params: { search: searchQuery }
        })
        console.log('the response',response.data)
        return response.data
    }catch (err) {
        console.error("Error while taking data",err);
        throw err;
    }
}

export const fetchshopChatRooms = async () => {
    try {
        const response = await axiosInstance.get('/shop/userchatrooms/');
        console.log("the response of fetchshopChatRooms ",response)
        return response.data;
    } catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
};

export const shopCreateOrFetchChatRoom = async (userId) => {
    try {
        const response = await axiosInstance.post(`/shop/userchatroom/${userId}/`);
        console.log('the response of fetchMessages',response.data)

        return response.data;
    } catch (err) {
        console.error("Error while creating or fetching chat room", err);
        throw err;
    }
};

export const fetchShopMessages = async (roomId) => {
    try {
        const response = await axiosInstance.get(`/shop/userchatroom/${roomId}/messages/`);
        console.log('the response of fetchMessages',response.data)
        return response.data;
    } catch (err) {
        console.error("Error while fetching messages", err);
        throw err;
    }
};


export const shopSendMessage = async (formData) => {
    try {
        console.log('the formdata inside the user api',formData)
        const roomId = formData.get('room_id');
        console.log('the formdata inside the user api',roomId)

        const response = await axiosInstance.post(`/shop/userchatroom/${roomId}/messages/`, formData);
        console.log('the response of sendMessage',response.data)
        return response.data;
    } catch (err) {
        console.error("Error while sending message", err);
        throw err;
    }
};


export const fetchShopProfile = async (shop) => {
    try {
        const response = await axiosInstance.get('/shop/shopProfile/',shop);
        // console.log('the response of sendMessage',response.data)
        return response.data;
    } catch (err) {
        console.error("Error while sending message", err);
        throw err;
    }
};