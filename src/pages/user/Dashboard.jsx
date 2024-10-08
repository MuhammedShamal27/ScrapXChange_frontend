  import React from "react";
  import UserNavBar from "../../componets/user/UserNavBar";
  import UserSideBar from "../../componets/user/UserSideBar";
  import {
    ChartNoAxesColumn,
    CircleCheckBig,
    IndianRupee,
    LayoutList,
    Ellipsis,
    EllipsisVertical,
  } from "lucide-react";
  import UserFooter from "../../componets/user/UserFooter";
  import todaypending from "../../assets/todaypending.png";

  const Dashboard = () => {
    return (
      <>
        <UserNavBar />
        <div className="userMainFont flex m-7">
          <UserSideBar />
          <div className="bg-bgColor w-full rounded-lg">
            {/* Cards */}
            <div className="flex flex-wrap gap-6 m-4 ">
              <div className="flex bg-white rounded-lg shadow-sm p-4 space-x-4 w-full sm:w-5/12 lg:w-2/12 h-20">
                <div className="p-3 bg-bgColor rounded-full">
                  <ChartNoAxesColumn color="#a3aed0" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Collected</p>
                  <h1 className="font-semibold text-lg">350</h1>
                </div>
              </div>

              <div className="flex bg-white rounded-lg shadow-sm p-4 space-x-4 w-full sm:w-5/12 lg:w-2/12 h-20">
                <div className="p-3 bg-bgColor rounded-full">
                  <IndianRupee color="#a3aed0" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <h1 className="font-semibold text-lg">₹ 3500</h1>
                </div>
              </div>

              <div className="flex bg-white rounded-lg shadow-sm p-4 space-x-4 w-full sm:w-5/12 lg:w-2/12 h-20">
                <div className="p-3 bg-bgColor rounded-full">
                  <LayoutList color="#a3aed0" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Today Scheduled</p>
                  <h1 className="font-semibold text-lg">5</h1>
                </div>
              </div>

              <div className="flex bg-white rounded-lg shadow-sm p-4 space-x-4 w-full sm:w-5/12 lg:w-3/12 h-20">
                <div className="p-3 bg-bgColor rounded-full">
                  <CircleCheckBig color="#a3aed0" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Requests</p>
                  <h1 className="font-semibold text-lg">10</h1>
                </div>
              </div>
            </div>

            {/* Collection Pending and Calendar */}
            <div className="flex flex-wrap gap-6 m-4">
              <div className="bg-white rounded-lg shadow-sm lg:w-6/12 w-full p-4">
                <div className="flex justify-between mb-4">
                  <h1 className="text-xl font-semibold">Collection Pending</h1>
                  <p className="bg-bgColor rounded-md p-1">
                    <Ellipsis color="#a3aed0" />
                  </p>
                </div>
                <div className="flex justify-between items-center shadow-sm rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <img src={todaypending} alt="" className="h-10 w-10 rounded-lg" />
                    <h1 className="text-sm">Name</h1>
                  </div>
                  <p>
                    <EllipsisVertical color="#a3aed0" />
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm lg:w-5/12 w-full p-4">
                <h1 className="text-xl font-semibold">Calendar</h1>
                {/* Calendar content goes here */}
              </div>
            </div>

            {/* Transaction Table */}
            <div className="bg-white rounded-lg shadow-sm w-11/12 p-4 m-4">
              <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">Transaction Table</h1>
                <p className="bg-bgColor rounded-md p-1">
                  <Ellipsis color="#a3aed0" />
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <h1 className="w-1/4">Name</h1>
                  <h1 className="w-1/4 text-center">Quantity</h1>
                  <h1 className="w-1/4 text-center">Price</h1>
                  <h1 className="w-1/4 text-right">Date</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="w-1/4">UserName</h1>
                  <h1 className="w-1/4 text-center">10 kg</h1>
                  <h1 className="w-1/4 text-center">₹ 52456</h1>
                  <h1 className="w-1/4 text-right">4/10/2025</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserFooter />
      </>
    );
  };

  export default Dashboard;
