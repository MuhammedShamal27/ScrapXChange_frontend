import React from "react";
import UserNavBar from "../../componets/user/UserNavBar";
import UserSideBar from "../../componets/user/UserSideBar";
import {
  ChartNoAxesColumn,
  CircleCheckBig,
  DollarSignIcon,
  IndianRupee,
} from "lucide-react";

const Dashboard = () => {
  return (
    <>
      <UserNavBar />
      <div className="userMainFont flex m-7">
        <UserSideBar />
        <div class="bg-bgColor p-10 rounded-lg w-full">
          <div class="grid grid-cols-4 gap-10 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div class="bg-bgColor p-2 rounded-full">
                <ChartNoAxesColumn />
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Exchange</p>
                <p class="text-2xl font-bold">10</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div class="bg-bgColor p-2 rounded-full">
                <IndianRupee />
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Earnings</p>
                <p class="text-2xl font-bold">$1642.39</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div class="bg-lightGreen p-2 rounded-full">
                <CircleCheckBig />
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Request</p>
                <p class="text-2xl font-bold">14</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div class="bg-blue-500 p-2 rounded-full">
                <CircleCheckBig />
              </div>
              <div>
                <p class="text-sm text-gray-500">Request Pending</p>
                <p class="text-2xl font-bold">4</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="flex items-center justify-between mb-4">
                <p class="text-lg font-semibold">₹37.5K Total Spent</p>
                <ChartNoAxesColumn />
              </div>
              <p class="text-green-500 text-sm">On track</p>
              <div class="mt-6">{/* <ChartComponent /> */}</div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="flex items-center justify-between mb-4">
                <p class="text-lg font-semibold">April 2021</p>
              </div>
              {/* <CalendarComponent /> */}
            </div>
          </div>

          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-2 bg-white p-6 rounded-lg shadow-md">
              <p class="text-lg font-semibold mb-4">Transaction Table</p>
              <table class="w-full text-left">
                <thead>
                  <tr class="text-gray-500 text-sm">
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-t">
                    <td class="py-2">Horizon</td>
                    <td>₹175</td>
                    <td>2.458 Kg</td>
                    <td>24 Jan, 2021</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
              <p class="text-lg font-semibold mb-4">Pending</p>
              <div class="space-y-4">
                <div class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    class="form-checkbox text-green-500"
                    checked
                  />
                  <span>Landing Page Design</span>
                </div>
                <div class="flex items-center space-x-2">
                  <input type="checkbox" class="form-checkbox text-red-500" />
                  <span>Illustrations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

// <div className=" flex w-full gap-6 h-2/6">
//                     <div className="bg-white rounded-lg flex items-center p-4  shadow-lg">
//                         <div className="bg-bgColor rounded-full p-3">
//                             <ChartNoAxesColumn  />
//                         </div>
//                         <div>
//                             <h1 className="text-sm text-gray-500">Total Exchange</h1>
//                             <p className="text-xl font-semibold text-navy">10</p>
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-lg flex items-center p-4 shadow-lg">
//                         <div className="bg-bgColor rounded-full p-3">
//                             <IndianRupee />
//                         </div>
//                         <div>
//                             <h1 className="text-sm text-gray-500">Total Earnings</h1>
//                             <p className="text-xl font-semibold text-navy">$1642.39</p>
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-lg flex items-center p-4 shadow-lg">
//                         <div className="bg-bgColor rounded-full p-3">
//                             <CircleCheckBig />
//                         </div>
//                         <div>
//                             <h1 className="text-sm text-gray-500">Total Request</h1>
//                             <p className="text-xl font-semibold text-navy">$1642.39</p>
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-lg flex items-center p-4 shadow-lg">
//                         <div className="bg-bgColor rounded-full p-3">
//                             <CircleCheckBig />
//                         </div>
//                         <div>
//                             <h1 className="text-sm text-gray-500">Request Pending</h1>
//                             <p className="text-xl font-semibold text-navy">$1642.39</p>
//                         </div>
//                     </div>
//                 </div>
