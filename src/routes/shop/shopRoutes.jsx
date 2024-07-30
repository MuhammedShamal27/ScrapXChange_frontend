import { createBrowserRouter } from "react-router-dom";
import ShopRegister from "../../pages/shop/ShopRegister";
import ShopLogin from "../../pages/shop/ShopLogin";
import ShopHome from "../../pages/shop/ShopHome";
import ScrapCategoryList from "../../pages/shop/ScrapCategoryList";
import ScrapAddCategory from "../../pages/shop/ScrapAddCategory";
import ScrapList from "../../pages/shop/ScrapList";
import AddScrap from "../../pages/shop/AddScrap"; 


const shopRouter = createBrowserRouter([
    {
        path:"/ShopRegister",
        element: <ShopRegister/>,
        errorElement : <Error message = "Something Went Wrong"/>,
        children: [
            {
                path:"/ShopLogin",
                element:<ShopLogin/>
            },
            {
                path:"/",
                element:<ShopHome/>
            },
            {
                path:"/ScrapCategoryList",
                element:<ScrapCategoryList/>
            },
            {
                path:"/ScrapAddCategory",
                element:<ScrapAddCategory/>
            },
            {
                path:"/ScrapList",
                element:<ScrapList/>
            },
            {
                path:"/AddScrap",
                element:<AddScrap/>
            }
        ]
    }
    
])

export default shopRouter;