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



const userRoutes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        // errorElement: <Error message="Something Went Wrong." />,
        children: [

            {
                element: <ProtectedRoute><UserProfile /></ProtectedRoute>,
                path: '/profile',
            },
            {
                element: <ProtectedRoute><EditProfile /></ProtectedRoute>,
                path: '/editProfile',
            },
            {
                element: <ProtectedRoute><Shops /></ProtectedRoute>,
                path: '/shops',
            },
            {
                element: <ProtectedRoute><ScrapList /></ProtectedRoute>,
                path: '/scraplist/:id',
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



// const userRoutes = createBrowserRouter ([
//     {
//         path :'/',
//         element:<App/>,
//         errorElement:<Error message="Something Went Wrong."/>,
//         children : [
//             { path: '/' , element : <Home/> },
//             { path: '/register' , element : <Register/>},
//             { path: '/otp' , element : <OTP/>},
//             { path: '/login' , element : <Login/>},
//             { path: '/email' , element : <EmailForPasswordReset/>},
//             { path: '/resetPassword' , element : <ResetPassword/>},
//             { path: '/profile' , element : <UserProfile/>},
//             { path: '/editProfile' , element : <EditProfile/>},
//             { path: '/shops' , element : <Shops/>},
//             { path: '/scraplist/:id' , element : <ScrapList/>},
//             { path: "*" , element : <Error message = "Page Not Found"/>},
//         ],
//     },
//     shopRouter,
//     adminRouter,
// ]);

// export default userRoutes