import React from "react";
import {
  House,
  CircleCheckBig,
  ChartNoAxesColumn,
  LayoutDashboard,
  User,
  LogOut,
  ScrollText,
  MessageSquareMore,
  LayoutList,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { shopLogout } from "../../redux/reducers/shopReducer";

const ShopNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(shopLogout());
    navigate("/login");
  };
  return (
    <>
      <div className="adminFont lg:bg-white ">
        <div className="flex flex-col">
          <h1 className="text-2xl text-blue-950 font-bold m-10 hidden sm:inline">
            Scrap X Change
          </h1>
          <Link to="/shop/home" className="flex lg:ml-9 lg:mt-7 mt-36 gap-x-5">
            <House color="#a3aed0" />
            <span className="hidden sm:inline">Dashboard</span>{" "}
            {/* Hidden on small screens */}
          </Link>
          <Link to="/shop/todayspending" className="flex lg:ml-9 mt-7 gap-x-5">
            <LayoutList color="#a3aed0" />
            <span className="hidden sm:inline">Today Pendings</span>
          </Link>
          <Link to="/shop/scrapRequests" className="flex lg:ml-9 mt-7 gap-x-5">
            <CircleCheckBig color="#a3aed0" />
            <span className="hidden sm:inline">Scrap Requests</span>
          </Link>
          <Link to="/shop/transactions" className="flex lg:ml-9 mt-7 gap-x-5">
            <ChartNoAxesColumn color="#a3aed0" />
            <span className="hidden sm:inline">Transcation Table</span>
          </Link>
          <Link to="/shop/categorylist" className="flex lg:ml-9 mt-7 gap-x-5">
            <LayoutDashboard color="#a3aed0" />
            <span className="hidden sm:inline">Category List</span>
          </Link>
          <Link to="/shop/scraplist" className="flex lg:ml-9 mt-7 gap-x-5">
            <ScrollText color="#a3aed0" />
            <span className="hidden sm:inline">Scrap List</span>
          </Link>
          <Link to="/shop/shopChat" className="flex lg:ml-9 mt-7 gap-x-5">
            <MessageSquareMore color="#a3aed0" />
            <span className="hidden sm:inline">Messages</span>
          </Link>
          <Link onClick={handleLogout} className="flex  lg:ml-9 mt-7 gap-x-5">
            <LogOut color="#a3aed0" />
            <span className="hidden sm:inline">LogOut</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShopNavBar;
