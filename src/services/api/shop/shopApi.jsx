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
