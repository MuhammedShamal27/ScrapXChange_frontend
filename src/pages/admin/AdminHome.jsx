import React, { useEffect, useState } from "react";
import AdminNavBar from "../../componets/admin/AdminNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import "../../styles/adminAndShop.css";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import { adminHome, DashboardData } from "../../services/api/admin/adminApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CircleCheckBig,
  Ellipsis,
  EllipsisVertical,
  LayoutDashboard,
  User,
} from "lucide-react";
import SA_profile from "../../assets/SA_profile.png";
import AdminHeadingAndProfile from "../../componets/AdminHeadingAndProfile";
import { updateAdmin } from "../../redux/reducers/adminReducer";

const AdminHome = () => {
  const [admin, setAdmin] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    total_users: 0,
    total_shops: 0,
    users: [],
    shops: [],
    unverified_shops: [],
    pending_reports: [],
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminData = await adminHome(); 
        console.log(adminData)
        setAdmin(adminData);
        // dispatch(updateAdmin({ admin: adminData })); 
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await DashboardData();
        console.log("the response of dashboard data", response);
        setDashboardData(response);
      } catch (error) {
        console.error("error occured", error);
      }
    };
    fetchAllData();
  }, []);

  const handleRequestTable = () => {
    navigate("/admin/shoprequestlist/");
  };
  const handleUser = () => {
    navigate("/admin/userlist/");
  };
  const handleShop = () => {
    navigate("/admin/shoplist/");
  };

  return (
    <>
      <div className="adminFont flex bg-bgColor ">
        <AdminNavBar />
        <div className="w-9/12 ">
          <AdminHeadingAndProfile />
          {/* {admin && <div>Welcome, {admin.username}!</div>} */}

          <div className="ml-7 mt-7">
            {/* Header Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 w-full sm:w-8/12">
              <div className="flex bg-white rounded-lg shadow items-center space-x-3">
                <User
                  color="#a3aed0"
                  size={40}
                  className="bg-bgColor m-3 p-2 rounded-full"
                />
                <div>
                  <p>Total User</p>
                  <h1 className="font-semibold">{dashboardData.total_users}</h1>
                </div>
              </div>
              <div className="flex bg-white rounded-lg shadow items-center space-x-3">
                <LayoutDashboard
                  color="#a3aed0"
                  size={40}
                  className="bg-bgColor m-3 p-2 rounded-full"
                />
                <div>
                  <p>Total Shops</p>
                  <h1 className="font-semibold">{dashboardData.total_shops}</h1>
                </div>
              </div>
              <div className="flex bg-white rounded-lg shadow items-center space-x-3">
                <CircleCheckBig
                  color="#a3aed0"
                  size={40}
                  className="bg-bgColor m-3 p-2 rounded-full"
                />
                <div>
                  <p>Pending Reports</p>
                  <h1 className="font-semibold">
                    {dashboardData.pending_reports.length}
                  </h1>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Users Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-bold">Users</h2>
                  <button
                    onClick={handleUser}
                    className="bg-bgColor rounded-md"
                  >
                    <Ellipsis color="#a3aed0" />
                  </button>
                </div>

                {dashboardData.users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between shadow p-1 rounded-lg m-3"
                  >
                    <div className="flex space-x-3 text-sm">
                      <img
                        src={user.profile_picture?user.profile_picture:SA_profile}
                        alt="userImage"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <h1>{user.username}</h1>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <button>
                      <EllipsisVertical color="#a3aed0" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Request Table Section */}
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex justify-between">
                  <h1 className="text-xl font-bold">Report Table</h1>
                  <button
                    onClick={handleRequestTable}
                    className="bg-bgColor rounded-md"
                  >
                    <Ellipsis color="#a3aed0" />
                  </button>
                </div>
                <div className="flex flex-col space-y-3 text-sm">
                  <div className="flex justify-between border-b">
                    <h1>From</h1>
                    <h1>Towards</h1>
                    <h1>Date</h1>
                  </div>
                  {dashboardData.pending_reports &&
                  dashboardData.pending_reports.length > 0 ? (
                    dashboardData.pending_reports.slice(0, 5).map((report) => (
                      <div key={report.id} className="flex justify-between">
                        <h1>{report.sender_name}</h1>
                        <div className="flex">{report.receiver_name}</div>
                        <p>{new Date(report.timestamp).toLocaleDateString()}</p>
                      </div>
                    ))
                  ) : (
                    <p>No pending reports available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* Shops Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-bold">Shop</h2>
                  <button
                    onClick={handleShop}
                    className="bg-bgColor rounded-md"
                  >
                    <Ellipsis color="#a3aed0" />
                  </button>
                </div>

                {dashboardData.shops.map((shop) => (
                  <div
                    key={shop.id}
                    className="flex justify-between shadow p-1 rounded-lg m-3"
                  >
                    <div className="flex space-x-3 text-sm">
                      <img
                        src={shop.profile_picture?shop.profile_picture:SA_profile}
                        alt="shopImage"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <h1>{shop.shop_name}</h1>
                        <p>{shop.phone}</p>
                      </div>
                    </div>
                    <button>
                      <EllipsisVertical color="#a3aed0" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Today Pending Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Request Pending</h2>
                <div className="flex flex-col space-y-3 text-sm">
                  {/* Table Header */}
                  <div className="grid grid-cols-4 border-b">
                    <p>Name</p>
                    <p>Email</p>
                    <p>Place</p>
                    <p>Details</p>
                  </div>

                  {/* Table Row */}
                  {dashboardData.unverified_shops.length > 0 ? (
                    dashboardData.unverified_shops.map((shop) => (
                      <div key={shop.id} className="grid grid-cols-4">
                        <p>{shop.shop_name}</p>
                        <p>{shop.shop_license_number}</p>
                        <p>{shop.phone}</p>
                        <p>Pending</p>
                      </div>
                    ))
                  ) : (
                    <p>No pending shops</p>
                  )}
                </div>
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
