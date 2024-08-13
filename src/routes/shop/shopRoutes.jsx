import { createBrowserRouter } from "react-router-dom";
import ShopRegister from "../../pages/shop/ShopRegister";
import ShopLogin from "../../pages/shop/ShopLogin";
import ShopHome from "../../pages/shop/ShopHome";
import CategoryList from "../../pages/shop/CategoryList";
import AddCategory from "../../pages/shop/AddCategory";
import ScrapList from "../../pages/shop/ScrapList";
import AddScrap from "../../pages/shop/AddScrap"; 
import App from "../../App";
import EditCategory from "../../pages/shop/EditCategory";
import EditScrap from "../../pages/shop/EditScrap";
import ProtectedRoute from "../ProtectedRoute";


const shopRouter = 


{
    path: '/shop',
    element: <App />,
    errorElement: <Error message="Something went wrong" />,
    children: [
        { path: 'register', element: <ShopRegister /> },
        { path: 'login', element: <ShopLogin /> },
        {
            path: 'home',
            element: <ProtectedRoute shop><ShopHome /></ProtectedRoute>
        },
        {
            path: 'categorylist',
            element: <ProtectedRoute shop><CategoryList /></ProtectedRoute>
        },
        {
            path: 'addCategory',
            element: <ProtectedRoute shop><AddCategory /></ProtectedRoute>
        },
        {
            path: 'editCategory/:id',
            element: <ProtectedRoute shop><EditCategory /></ProtectedRoute>
        },
        {
            path: 'scraplist',
            element: <ProtectedRoute shop><ScrapList /></ProtectedRoute>
        },
        {
            path: 'addScrap',
            element: <ProtectedRoute shop><AddScrap /></ProtectedRoute>
        },
        {
            path: 'editScrap/:id',
            element: <ProtectedRoute shop><EditScrap /></ProtectedRoute>
        },
    ]
};

    // {
    //     path: '/shop',
    //     element: <App/>,

    //     errorElement: <Error message="Something went wrong"/>,
    
    // children: [
    //     { path: 'register' , element: <ShopRegister/> },
    //     { path: 'login' , element: <ShopLogin/> },
    //     { path: 'home' , element: <ShopHome/> },
    //     { path: 'categorylist' , element: <CategoryList/> },
    //     { path: 'addCategory' , element: <AddCategory/> },
    //     { path: 'editCategory/:id' , element: <EditCategory/> },
    //     { path: 'scraplist' , element: <ScrapList/> },
    //     { path: 'addScrap' , element: <AddScrap/> },
    //     { path: 'editScrap/:id' , element: <EditScrap/> },
    // ]

    // }


export default shopRouter;