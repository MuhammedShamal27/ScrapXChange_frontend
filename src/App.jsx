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

function App() {
  return (
    <>
      <ShopRequestList/>
    </>
  );
}

export default App;
