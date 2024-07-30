import AdminLogin from "../../pages/admin/AdminLogin";
import AdminHome from "../../pages/admin/AdminHome";
import UserList from "../../pages/admin/UserList";
import UserDetails from "../../pages/admin/UserDetails";
import ShopList from "../../pages/admin/ShopList";
import ShopDetails from "../../pages/admin/ShopDetails";
import ShopRequestList from "../../pages/admin/ShopRequestList";
import RequestDeatils from "../../pages/admin/RequestDeatils";
import { Children } from "react";

export const adminRouter ={
    path:"/admin",
    element:<AdminHome/>,

    Children:[
        {
            path:"/admin/",
            element
        }
    ]
}