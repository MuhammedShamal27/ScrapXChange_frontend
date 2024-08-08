import { toast } from "sonner";
import Protect from "./routes/ProtectedRoute";
import { Outlet } from "react-router-dom";
import Shops from "./pages/user/Shops";



function App() {
  return (
    <>
        <Outlet/>
    </>
  );
}

export default App;
