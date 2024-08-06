import { createBrowserRouter } from "react-router-dom";
import ShopRegister from "../../pages/shop/ShopRegister";
import ShopLogin from "../../pages/shop/ShopLogin";
import ShopHome from "../../pages/shop/ShopHome";
import ScrapCategoryList from "../../pages/shop/ScrapCategoryList";
import ScrapAddCategory from "../../pages/shop/ScrapAddCategory";
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

    ]

    }


export default shopRouter;