import axiosInstance from "./axiosInstance";


export const saveFcmToken = async(token) =>{
    try{
        console.log('the request sending ',token,)
        const response = await axiosInstance.post('/notification/save-fcm-token/',{ token });
        console.log('save fcm token',response.data)
        return response.data
    }catch(error){
        console.error("Error while fecthing.",error);
        throw error;
    }
}

export const sendNotificationToShop = async (shopId) => {
    try {
        const response = await axiosInstance.post('/notification/send-notification-shop/', { shop_id: shopId });
        console.log("Notification sent to shop:", response.data);
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};