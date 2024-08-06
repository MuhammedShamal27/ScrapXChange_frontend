import AdminLogin from "../../pages/admin/AdminLogin";
import AdminHome from "../../pages/admin/AdminHome";
import UserList from "../../pages/admin/UserList";
import UserDetails from "../../pages/admin/UserDetails";
import ShopList from "../../pages/admin/ShopList";
import ShopDetails from "../../pages/admin/ShopDetails";
import ShopRequestList from "../../pages/admin/ShopRequestList";
import RequestDeatils from "../../pages/admin/RequestDeatils";
import { createBrowserRouter } from "react-router-dom";
import App from "../../App";


const adminRouter = 
    {
        path : '/admin',
        element: <App/>,

        // errorElement : <Error message = "Something went wrong"/>,

        children: [
            { path : 'login' , element: <AdminLogin/> },
            { path : 'home' , element:<AdminHome/> },
            { path : 'userlist' , element:<UserList/> },
            { path : 'userdetails/:id' , element:<UserDetails/>},
            { path : 'shoplist' , element:<ShopList/> },
            { path : 'shoprequestlist' , element:<ShopRequestList/> },
            { path : 'shoprequestdetails/:id' , element:<RequestDeatils/> },
        ]
    }
export default adminRouter;