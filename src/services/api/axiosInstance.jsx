import axios from 'axios'
import { store } from '../../redux/store/store';

const axiosInstance = axios.create({
    baseURL: import.meta.env.SCRAPXCHANGE_API_URL || "http://127.0.0.1:8000",
    timeout: 10000,
    headers:{
        'Content-Type' : 'application/json'
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const state = store.getState()
        const token = state.auth.token
        // const token = localStorage.getItem('token');
        console.log('pol',token)
        const noAuthRequired = ['/user/register/' , '/user/verify-otp/' ,'/user/login/', '/user/password-reset-request/', '/user/password-reset']
        if (token && !noAuthRequired.some((url) => config.url.includes(url))){
            console.log('authsensured')
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {

        return Promise.reject(error);
    }
);


export default axiosInstance