import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import App from "../../App"
import Register from "../../pages/user/Register"
import OTP from "../../pages/user/Otp"
import EmailForPasswordReset from "../../pages/user/EmailForPasswordReset"
import ResetPassword from "../../pages/user/ResetPassword"
import Login from "../../pages/user/Login"
import Home from "../../pages/user/Home"

const userRoutes = createBrowserRouter ([
    {
        path :'/',
        element:<App/>,
        errorElement:<Error message="Something Went Wrong."/>,
        children : [
            { path: '/' , element : <Home/> },
            { path: '/register' , element : <Register/>},
            { path: '/otp' , element : <OTP/>},
            { path: '/login' , element : <Login/>},
            { path: '/email' , element : <EmailForPasswordReset/>},
            { path: "/resetPassword" , element : <ResetPassword/>},
            { path: "*" , element : <Error message = "Page Not Found"/>},
        ]
    }
]);

export default userRoutes