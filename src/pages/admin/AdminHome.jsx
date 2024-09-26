import React, { useEffect, useState } from "react";
import AdminNavBar from "../../componets/admin/AdminNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import "../../styles/adminAndShop.css";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import { adminHome } from "../../services/api/admin/adminApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Circle, CircleCheck, CircleCheckBig, CircleX, Ellipsis, EllipsisVertical, LayoutDashboard, RectangleEllipsis, User } from "lucide-react";
import SA_profile from "../../assets/SA_profile.png";

const AdminHome = () => {
  const [admin, setAdmin] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminData = await adminHome(); // Fetch admin data using API
        setAdmin(adminData);
        dispatch(updateAdmin({ admin: adminData })); // Dispatch action to update admin in the state
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchAdminData();
  }, [dispatch]);

  return (
    <>
      <div className="adminFont flex bg-bgColor ">
        <AdminNavBar />
        <div className="w-full ">
          <HeadingAndProfile />
          {/* {admin && <div>Welcome, {admin.username}!</div>} */}

          <div className="m-7">
            {/* Header Section */}
            <div className="grid grid-cols-3 gap-6 mb-6 w-8/12">
              <div className="flex bg-white  rounded-lg shadow items-center space-x-3">
                <User color="#a3aed0" size={40} className="bg-bgColor m-3 p-2 rounded-full" />
                <div>
                  <p className="">Total User</p>
                  <h1 className="font-semibold">35</h1>
                </div>
              </div>
              <div className="flex bg-white rounded-lg shadow items-center space-x-3">
                <LayoutDashboard color="#a3aed0" size={40} className="bg-bgColor m-3 p-2 rounded-full"/>
                <div>
                  <p className="">Total Shops</p>
                  <h1 className="font-semibold">39</h1>
                </div>
              </div>
              <div className="flex bg-white rounded-lg shadow items-center space-x-3">
                <CircleCheckBig color="#a3aed0" size={40} className="bg-bgColor m-3 p-2 rounded-full"/>
                <div>
                  <p className="">Pending Requests</p>
                  <h1 className="font-semibold">154</h1>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-2 gap-6">
              {/* Users Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between mb-4 ">
                  <h2 className="text-xl font-bold ">Users</h2>
                  <button className=""><Ellipsis color="#a3aed0" /></button>
                </div>

                <div className="flex justify-between shadow p-1 rounded-lg">
                  <div className="flex space-x-3 text-sm">
                    <img src={SA_profile} alt="userImage" className="h-10 w-10"/>
                    <div>
                      <h1>UserName</h1>
                      <p>Email</p>
                    </div>
                  </div>
                  <button><EllipsisVertical color="#a3aed0" /></button>
                </div>
              </div>

              {/* Request Table Section */}

              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex justify-between">
                  <h1 className="text-xl font-bold">Request Table</h1>
                  <button><Ellipsis color="#a3aed0" /></button>
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between border-b">
                    <h1>Name</h1>
                    <h1>Status</h1>
                    <h1>Date</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1>BeckamScrap</h1>
                    <div className="flex">
                      <CircleX color="#e71818" />
                      <p>Rejected</p>
                    </div>
                    <p>27/09/2024</p>
                  </div>
                  <div className="flex justify-between">
                    <h1>BeckamScrap</h1>
                    <div className="flex">
                      <CircleCheck color="#18e74c" />
                      <p>Approved</p>
                    </div>
                    <p>27/09/2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              {/* Shops Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between mb-4 ">
                  <h2 className="text-xl font-bold ">Shop</h2>
                  <button className=""><Ellipsis color="#a3aed0" /></button>
                </div>

                <div className="flex justify-between shadow p-1 rounded-lg">
                  <div className="flex space-x-3 text-sm">
                    <img src={SA_profile} alt="userImage" className="h-10 w-10"/>
                    <div>
                      <h1>UserName</h1>
                      <p>Email</p>
                    </div>
                  </div>
                  <button><EllipsisVertical color="#a3aed0" /></button>
                </div>
              </div>

              {/* Today Pending Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Today Pending</h2>
                <ul>
                  <li className="flex items-center mb-4">
                    <input type="checkbox" className="mr-4" />
                    <span>Landing Page Design</span>
                  </li>
                  <li className="flex items-center mb-4">
                    <input type="checkbox" className="mr-4" />
                    <span>Dashboard Builder</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default AdminHome;
