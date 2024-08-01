import { toast } from "sonner";
import Protect from "./routes/ProtectedRoute";
import { Outlet } from "react-router-dom";



function App() {
  return (
    <>

        <Outlet/>
  
    </>
  );
}

export default App;
