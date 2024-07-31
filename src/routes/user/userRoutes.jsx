import { createBrowserRouter } from "react-router-dom";
import App from "../../App"
import Register from "../../pages/user/Register"
import OTP from "../../pages/user/Otp"
import EmailForPasswordReset from "../../pages/user/EmailForPasswordReset"
import ResetPassword from "../../pages/user/ResetPassword"
import Login from "../../pages/user/Login"
import Home from "../../pages/user/Home"
// import shopRouter from "../shop/shopRoutes";

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:(

                <App/>
  
        ),
        errorElement:<Error message="Something Went Wrong." />,
        children:[
            {
                path:"/home",
                element:<Home/>
            },
            {
                path:"*",
                element:<Error message="Page Not Found" />
            }

        ],
        
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/otp",
        element:<OTP/>
    },
    {
        path:"/home",
        element:<Home/>
    },
    {
        path:"/Forget-password",
        element:<EmailForPasswordReset/>
    },
    {
        path:"/Reset-password",
        element:<ResetPassword/>
    },
    {
        path:"/Login",
        element:<Login/>
    },

])

export default appRouter;