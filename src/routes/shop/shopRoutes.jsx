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
import ScrapRequest from "../../pages/shop/ScrapRequest";
import ScrapRequestDetails from "../../pages/shop/ScrapRequestDetails";
import TodayPendings from "../../pages/shop/TodayPendings";
import ScrapCollection from "../../pages/shop/ScrapCollection";
import ScrapCollectioinConfirmation from "../../pages/shop/ScrapCollectioinConfirmation";
import Invoice from "../../pages/shop/Invoice";
import ShopChat from "../../pages/shop/ShopChat";
import ShopMessageBox from "../../componets/shop/ShopMessageBox";
import ShopAudioCall from "../../componets/shop/ShopAudioCall";
import ShopProfile from "../../pages/shop/ShopProfile";
import TransactionList from "../../pages/shop/TransactionList"
import ShopNotifications from "../../pages/shop/ShopNotifications";


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
        {
            path: 'scrapRequests',
            element: <ProtectedRoute shop><ScrapRequest/></ProtectedRoute>
        },
        {
            path: 'scrapRequestDetails/:id',
            element: <ProtectedRoute shop><ScrapRequestDetails/></ProtectedRoute>
        },
        {
            path: 'todaysPending',
            element: <ProtectedRoute shop><TodayPendings/></ProtectedRoute>
        },
        {
            path: 'scrapCollection/:id',
            element: <ProtectedRoute shop><ScrapCollection/></ProtectedRoute>
        },
        {
            path: 'confirm/:id',
            element: <ProtectedRoute shop><ScrapCollectioinConfirmation/></ProtectedRoute>
        },
        {
            path: 'invoice/:id',
            element: <ProtectedRoute shop><Invoice/></ProtectedRoute>
        },
        {
            path: 'shopChat',
            element: <ProtectedRoute shop><ShopChat/></ProtectedRoute>,
            children : [
                {
                    path :'Messages/:roomId',
                    element : <ProtectedRoute shop><ShopMessageBox/></ProtectedRoute>,
                },

            ]
        },
        {
            path :'audioCall/:roomId/:callId',
            element : <ProtectedRoute shop><ShopAudioCall/></ProtectedRoute>,
        },
        {
            path :'shopProfile',
            element : <ProtectedRoute shop><ShopProfile/></ProtectedRoute>,
        },
        {
            path :'transactions',
            element : <ProtectedRoute shop><TransactionList/></ProtectedRoute>,
        },
        {
            path :'notifications',
            element : <ProtectedRoute shop><ShopNotifications/></ProtectedRoute>,
        },
    ]
};


export default shopRouter;