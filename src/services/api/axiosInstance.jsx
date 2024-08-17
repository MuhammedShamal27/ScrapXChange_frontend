import axios from 'axios'
import { store } from '../../redux/store/store';
import { adminLoginSuccess, adminLogout } from '../../redux/reducers/adminReducer';
import { shopLoginSuccess, shopLogout } from '../../redux/reducers/shopReducer';
import { loginSuccess, logout } from '../../redux/reducers/userReducer';

const axiosInstance = axios.create({
    baseURL: import.meta.env.SCRAPXCHANGE_API_URL || "http://127.0.0.1:8000",
    timeout: 10000,
    headers:{
        'Content-Type' : 'application/json',
        'Content-Type': 'multipart/form-data',
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const state = store.getState()
        const { auth , admin , shop} = state;
        // const token = state.admin.token;
        console.log('Token admin:',admin)
        console.log('Token shop:',shop)
        console.log('Token auth:',auth)

        const noAuthRequired = ['/user/register/' , '/user/verify-otp/' ,'/user/login/', '/user/password-reset-request/',
            '/user/password-otp/', '/user/password-reset','/shop/register/','/shop/login/','/scrapxchange_admin/login/']
            

        const requiresAuth = !noAuthRequired.some(url => config.url.includes(url));

        if (requiresAuth){
            let token;
            if (config.url.includes('/scrapxchange_admin/')) {
                token = admin.token;
                console.log('token inside admin',admin)
            } else if (config.url.includes('/shop/')) {
                token = shop.token;
                console.log('token inside shop',shop)
            } else if (config.url.includes('/user/')) {
                token = auth.token;
                console.log('token inside auth',auth)
            }
            console.log('Token:',token)

            if (token){

                console.log('Authorization ensured')
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const state = store.getState();
        const { auth, admin, shop } = state;
        let refreshToken;
        let refreshEndpoint;
        let loginSuccessAction;
        let logoutAction;

        if (originalRequest.url.includes('/scrapxchange_admin/')) {
            refreshToken = admin.token;
            refreshEndpoint = '/scrapxchange_admin/token/refresh/';
            loginSuccessAction = adminLoginSuccess;
            logoutAction = adminLogout;
        } else if (originalRequest.url.includes('/shop/')) {
            refreshToken = shop.token;
            refreshEndpoint = '/shop/token/refresh/';
            loginSuccessAction = shopLoginSuccess;
            logoutAction = shopLogout;
        } else if (originalRequest.url.includes('/user/')) {
            refreshToken = auth.token;
            refreshEndpoint = '/user/token/refresh/';
            loginSuccessAction = loginSuccess;
            logoutAction = logout;
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axiosInstance.post(refreshEndpoint, {
                    refresh: refreshToken
                });

                const newAccessToken = response.data.access;

                store.dispatch(loginSuccessAction({ token: newAccessToken }));

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (err) {
                store.dispatch(logoutAction());
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;