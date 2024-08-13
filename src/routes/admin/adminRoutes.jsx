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
import ProtectedRoute from "../ProtectedRoute";


const adminRouter = 
{
    path: '/admin',
    element: <App/>,
  
    children: [
      { path: 'login', element: <AdminLogin/> },
      {
        path: 'home',
        element: (<ProtectedRoute admin> <AdminHome/></ProtectedRoute>),},
      {
        path: 'userlist',
        element: (<ProtectedRoute admin><UserList/> </ProtectedRoute> ),},
      {
        path: 'userdetails/:id',
        element: (<ProtectedRoute admin><UserDetails/></ProtectedRoute> ),},
      {
        path: 'shoplist',
        element: (<ProtectedRoute admin> <ShopList/></ProtectedRoute>),},
      {
        path: 'shopdetails/:id',
        element: (  <ProtectedRoute admin><ShopDetails/></ProtectedRoute>),},
      {
        path: 'shoprequestlist',
        element: ( <ProtectedRoute admin> <ShopRequestList/></ProtectedRoute>),},
      {
        path: 'shoprequestdetails/:id',
        element: (<ProtectedRoute admin><RequestDeatils/> </ProtectedRoute>),},
    ],
  };
    // {
    //     path : '/admin',
    //     element: <App/>,

    //     // errorElement : <Error message = "Something went wrong"/>,

    //     children: [
    //         { path : 'login' , element: <AdminLogin/> },
    //         { path : 'home' , element:<AdminHome/> },
    //         { path : 'userlist' , element:<UserList/> },
    //         { path : 'userdetails/:id' , element:<UserDetails/>},
    //         { path : 'shoplist' , element:<ShopList/> },
    //         { path : 'shopdetails/:id' , element:<ShopDetails/> },
    //         { path : 'shoprequestlist' , element:<ShopRequestList/> },
    //         { path : 'shoprequestdetails/:id' , element:<RequestDeatils/> },
    //     ]
    // }
export default adminRouter;