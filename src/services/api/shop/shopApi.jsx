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
        const response = await axiosInstance.post ('/shop/category-creation/',categoryData)
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
