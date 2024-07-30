import { toast } from "sonner";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Otp from "./pages/user/Otp";
import ResetPassword from "./pages/user/ResetPassword";
import EmailForPasswordReset from "./pages/user/EmailForPasswordReset";
import ShopRegister from "./pages/shop/ShopRegister";
import ShopLogin from "./pages/shop/ShopLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import ShopRequestList from "./pages/admin/ShopRequestList";
import ScrapList from "./pages/shop/ScrapList";
import EditScrapDetails from "./pages/shop/AddScrap";
import UserList from "./pages/admin/UserList";
import ShopList from "./pages/admin/ShopList";
import UserAndAdminList from "./componets/admin/UserAndAdminList";
import UserDetails from "./pages/admin/UserDetails";
import HeadingAndProfile from "./componets/HeadingAndProfile";
import ShopDetails from "./pages/admin/ShopDetails";
import RequestDeatils from "./pages/admin/RequestDeatils";
import Home from "./pages/user/Home";
import Protect from "./routes/protect";
import { Outlet } from "react-router-dom";



function App() {
  return (
    <>

        <Outlet/>
  
    </>
  );
}

export default App;
