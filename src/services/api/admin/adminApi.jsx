import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance"

export const adminLogin = async (formData) =>{
    try{
        const response = await axiosInstance.post('/api/scrapxchange_admin/login/',formData);
        console.log('api adminlogin',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}


export const adminHome = async (userData) =>{
    try{
        const response = await axiosInstance.get('/api/scrapxchange_admin/admin_home/',userData);
        console.log('api adminhome',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const fetchUserList = async (userData) =>{
    try{
        const response = await axiosInstance.get('/api/scrapxchange_admin/user-list/',{ params: userData });
        console.log('api userlist',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}


export const blockedUserList = async (userData) =>{
    try{
        const response = await axiosInstance.get('/api/scrapxchange_admin/user-list/blocked-user',{ params: userData });
        console.log('api blocked userlist',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const unblockedUserList = async (userData) =>{
    try{
        const response = await axiosInstance.get('/api/scrapxchange_admin/user-list/unblocked-user',{ params: userData });
        console.log('api unblocked userlist',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const fetchUserDetails = async (id) =>{
    try{
        const response = await axiosInstance.get(`/api/scrapxchange_admin/user-details/${id}/`);
        console.log('api UserDetails',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const UserBlockUnblock = async (id , actionPerformed) =>{
    try{
        const response = await axiosInstance.post(`/api/scrapxchange_admin/user-list/${id}/block-unblock/` , {actionPerformed});
        console.log('api UserBlockUnblock',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}


export const ShopRequestList = async (shopData) =>{
    try{
        const response = await axiosInstance.get('/api/scrapxchange_admin/shop-request-list/',shopData);
        console.log('api ShopRequestList',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const ShopRequestDetails = async (id) =>{
    try{
        const response = await axiosInstance.get(`/api/scrapxchange_admin/shop-request-list/${id}/`);
        console.log('api ShopRequestDetails',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}


export const ShopRequestaccept = async (id) =>{
    try{
        const response = await axiosInstance.post(`/api/scrapxchange_admin/shop-request-list/${id}/accept/`);
        console.log('api ShopRequestDetailsaccept',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const ShopRequestreject = async (id) =>{
    try{
        const response = await axiosInstance.post(`/api/scrapxchange_admin/shop-request-list/${id}/reject/`);
        console.log('api ShopRequestDetailsreject',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}



export const fetchShopList = async (shopData) =>{
    try{
        const response = await axiosInstance.get('/api/scrapxchange_admin/shop-list/',{ params: shopData });
        console.log('api shoplist',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const fetchBlockedShopList = async (shopData) =>{
    try{
        const response = await axiosInstance.get('/api/scrapxchange_admin/shop-list/blocked-shop',{ params: shopData });
        console.log('api blocked shoplist',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const fetchUnblockedShopList = async (shopData) =>{
    try{
        const response = await axiosInstance.get('/api/scrapxchange_admin/shop-list/unblocked-shop',{ params: shopData });
        console.log('api unblocked shoplist',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}


export const fetchShopDetails = async (id) =>{
    try{
        const response = await axiosInstance.get(`/api/scrapxchange_admin/shop-details/${id}/`);
        console.log('api shoplist',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}


export const ShopBlockUnblock = async (id , actionPerformed) =>{
    try{
        const response = await axiosInstance.post(`/api/scrapxchange_admin/shop-details/${id}/block-unblock/` , {actionPerformed});
        console.log('api shopBlockUnblock',response.data)
        return response.data

    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}


export const Reports = async () =>{
    try{
        const response = await axiosInstance.get(`/api/scrapxchange_admin/reports/`);
        console.log('api report',response.data)
        return response.data
    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const DetailOfReport = async (report_id) =>{
    try{
        const response = await axiosInstance.get(`/api/scrapxchange_admin/report-details/${report_id}/`);
        console.log('ReportDetails api response',response.data)
        return response.data
    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const ReportReasons = async (receiver) =>{
    try{
        const response = await axiosInstance.get(`/api/scrapxchange_admin/report-reason/${receiver}/`);
        console.log('ReportReasons api response',response.data)
        return response.data
    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const ReportBlockUnblock = async (receiverId ,request) =>{
    try{
        const response = await axiosInstance.patch(`/api/scrapxchange_admin/report-block-unblock/${receiverId}/`,request);
        console.log('api report',response.data)
        return response.data
    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}


export const DashboardData = async () =>{
    try{
        const response = await axiosInstance.get(`/api/scrapxchange_admin/dashboard-data/`);
        console.log('api dashboard',response.data)
        return response.data
    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const fetchAdminNotification = async () =>{
    try{
        const response = await axiosInstance.get(`/api/scrapxchange_admin/notification/`);
        console.log('api dashboard',response.data)
        return response.data
    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}

export const markNotificationRead = async (id) =>{
    try{
        const response = await axiosInstance.post(`/api/scrapxchange_admin/notifications/read/${id}/`);
        console.log('api dashboard',response.data)
        return response.data
    }
    catch (err) {
        if (!err.response) throw err;
        return Promise.reject(err.response.data);
    }
}