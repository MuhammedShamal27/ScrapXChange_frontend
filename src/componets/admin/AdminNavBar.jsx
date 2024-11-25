import React from "react";
import {
  LayoutDashboard,
  House,
  CircleCheckBig,
  ChartNoAxesColumn,
  User,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../../redux/reducers/adminReducer";
import { useDispatch } from "react-redux";

const AdminNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/login");
  };

  return (
    <>
      <div className="lg:bg-white h-screen">
        <div className="flex flex-col">
          <h1 className="text-2xl text-blue-950 font-bold  lg:m-10 hidden sm:inline">
            Scrap X Change
          </h1>

          {/* Link to Dashboard */}
          <Link to="/admin/home" className="flex lg:ml-9 mt-36 lg:mt-7 gap-x-5">
            <House color="#a3aed0" />
            <span className="hidden sm:inline">Dashboard</span>{" "}
            {/* Hide text on small screens */}
          </Link>

          {/* Link to Shop Requests */}
          <Link
            to="/admin/shoprequestlist"
            className="flex lg:ml-9 mt-7 gap-x-5"
          >
            <CircleCheckBig color="#a3aed0" />
            <span className="hidden sm:inline">Shop Requests</span>{" "}
            {/* Hide text on small screens */}
          </Link>

          {/* Link to Report */}
          <Link to="/admin/reportlist" className="flex lg:ml-9 mt-7 gap-x-5">
            <ChartNoAxesColumn color="#a3aed0" />
            <span className="hidden sm:inline">Report</span>{" "}
            {/* Hide text on small screens */}
          </Link>

          {/* Link to Shop List */}
          <Link to="/admin/shoplist" className="flex lg:ml-9 mt-7 gap-x-5">
            <LayoutDashboard color="#a3aed0" />
            <span className="hidden sm:inline">Shop List</span>{" "}
            {/* Hide text on small screens */}
          </Link>

          {/* Link to User List */}
          <Link to="/admin/userlist" className="flex lg:ml-9 mt-7 gap-x-5">
            <User color="#a3aed0" />
            <span className="hidden sm:inline">User List</span>{" "}
            {/* Hide text on small screens */}
          </Link>

          {/* Link to LogOut */}
          <Link onClick={handleLogout} className="flex lg:ml-9 mt-7 gap-x-5">
            <LogOut color="#a3aed0" />
            <span className="hidden sm:inline">LogOut</span>{" "}
            {/* Hide text on small screens */}
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminNavBar;
