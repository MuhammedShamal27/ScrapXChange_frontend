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
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await axiosInstance.post ('/shop/category-creation/',categoryData,config)
        console.log("the add category  response data", response.data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err;
        }
        console.error("Error response data:",err.response.data);
        return Promise.reject(err.response.data)
    }
}


export const updateCategory = async (id,categoryData) => {
    try {
        const response = await axiosInstance.post (`/shop/category-update/${id}/`,categoryData)
        console.log("the update category  response data", response.data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err;
        }
        console.error("Error response data:",err.response.data);
        return Promise.reject(err.response.data)
    }
}


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
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await axiosInstance.post ('/shop/product-creation/',scrapData,config)
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

export const updateScrap = async (id,scrapData) => {
    try {
        const response = await axiosInstance.post (`/shop/product-update/${id}/`,scrapData)
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
