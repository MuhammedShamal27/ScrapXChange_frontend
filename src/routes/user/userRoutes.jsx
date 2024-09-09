import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import App from "../../App"
import Register from "../../pages/user/Register"
import OTP from "../../pages/user/Otp"
import EmailForPasswordReset from "../../pages/user/EmailForPasswordReset"
import ResetPassword from "../../pages/user/ResetPassword"
import Login from "../../pages/user/Login"
import Home from "../../pages/user/Home"
import UserProfile from '../../pages/user/UserProfile';
import EditProfile from '../../pages/user/EditProfile';
import shopRouter from '../shop/shopRoutes';
import adminRouter from '../admin/adminRoutes';
import Shops from '../../pages/user/Shops';
import ScrapList from '../../pages/user/ScrapList';
import ProtectedRoute from '../ProtectedRoute';
import UserChat from '../../pages/user/UserChat';
import UserMessageBox from '../../componets/user/UserMessageBox';
import UserAudioCall from '../../componets/user/UserAudioCall';



const userRoutes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        // errorElement: <Error message="Something Went Wrong." />,
        children: [

            {
                path: '/profile',
                element: <ProtectedRoute><UserProfile /></ProtectedRoute>,
            },
            {
                path: '/editProfile',
                element: <ProtectedRoute><EditProfile /></ProtectedRoute>,
            },
            {
                path: '/shops',
                element: <ProtectedRoute><Shops /></ProtectedRoute>,
            },
            {
                path: '/scraplist/:id',
                element: <ProtectedRoute><ScrapList /></ProtectedRoute>,
            },
            {
                path: '/userChat',
                element: <ProtectedRoute><UserChat /></ProtectedRoute>,
                children: [
                    {
                        path: 'messages/:roomId',
                        element: <ProtectedRoute><UserMessageBox /></ProtectedRoute>,
                    },
                    {
                        path: 'audioCall/:roomId',
                        element: <ProtectedRoute><UserAudioCall /></ProtectedRoute>,
                    },
                ],
            },
            {   path: '/' , 
                element : <Home/> },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/otp',
                element: <OTP />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/email',
                element: <EmailForPasswordReset />,
            },
            {
                path: '/resetPassword',
                element: <ResetPassword />,
            },
            
        ],
    },
    shopRouter,
    adminRouter,
]);

export default userRoutes;

