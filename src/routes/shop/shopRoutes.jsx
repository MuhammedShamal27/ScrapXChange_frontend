import { createBrowserRouter } from "react-router-dom";
import ShopRegister from "../../pages/shop/ShopRegister";
import ShopLogin from "../../pages/shop/ShopLogin";
import ShopHome from "../../pages/shop/ShopHome";
import CategoryList from "../../pages/shop/CategoryList";
import AddCategory from "../../pages/shop/AddCategory";
import ScrapList from "../../pages/shop/ScrapList";
import AddScrap from "../../pages/shop/AddScrap"; 
import App from "../../App";



const shopRouter = 
    {
        path: '/shop',
        element: <App/>,

        errorElement: <Error message="Something went wrong"/>,
    
    children: [
        { path: 'register' , element: <ShopRegister/> },
        { path: 'login' , element: <ShopLogin/> },
        { path: 'home' , element: <ShopHome/> },
        { path: 'categorylist' , element: <CategoryList/> },
        { path: 'addCategory' , element: <AddCategory/> },
        { path: 'scraplist' , element: <ScrapList/> },
        { path: 'addScrap' , element: <AddScrap/> },
    ]

    }


export default shopRouter;