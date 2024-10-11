import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import { updateshop } from "../../redux/reducers/shopReducer";
import {
  fetchShopHome,
  shopDashboard,
  shopGraph,
} from "../../services/api/shop/shopApi";
import {
  ChartNoAxesColumn,
  CircleAlert,
  CircleCheck,
  CircleCheckBig,
  CircleX,
  Ellipsis,
  EllipsisVertical,
  IndianRupee,
  LayoutDashboard,
  LayoutList,
  User,
} from "lucide-react";
import userReducer from "../../redux/reducers/userReducer";
import LineGraph from "../../utils/LineGraph";
import todaypending from "../../assets/todaypending.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import "../../styles/adminAndShop.css";

const ShopHome = () => {
  const [shop, setShop] = useState(null);
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState({
    pending_collections: [],
    pending_requests: [],
    today_pending_collections: [],
    transactions: [],
    total_collected:[],
  });
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shopData = await fetchShopHome();
        setShop(shopData);
        dispatch(updateshop({ shop: shopData }));
        const response = await shopDashboard();
        console.log("the response", response);
        setDashboardData(response);
      } catch (error) {
        console.error("Failed to fetch shop data:", error);
      }
    };

    fetchShopData();
  }, [dispatch]);

  const filteredPendingCollections = dashboardData.pending_collections.filter(
    (collection) =>
      collection.scheduled_date === selectedDate.format("YYYY-MM-DD")
  );

  const handleTransactions = () => {
    navigate('/shop/transactions/')
  }

  const handleTodayPendings = () => {
    navigate('/shop/todaysPending/')
  }

  const handleRequests = () => {
    navigate('/shop/scrapRequests/')
  }

  return (
    <>
      <div className="adminFont flex bg-bgColor ">
        <ShopNavBar />
        <div className="flex flex-col flex-grow">
          <HeadingAndProfile />
          <div className="text-sm">
            {/* Responsive summary cards */}
            <div className="flex flex-wrap gap-4 m-4">
              <div className="flex bg-white rounded-lg shadow-sm p-3 space-x-3 w-full sm:w-5/12 lg:w-auto">
                <div className="p-3 bg-bgColor rounded-full">
                  <ChartNoAxesColumn color="#a3aed0" />
                </div>
                <div>
                  <p className="text-sm">Total Collected</p>
                  <h1 className="font-semibold">
                    {dashboardData.transactions.length}
                  </h1>
                </div>
              </div>

              <div className="flex bg-white rounded-lg shadow-sm p-3 space-x-3 w-full sm:w-5/12 lg:w-auto">
                <div className="p-3 bg-bgColor rounded-full">
                  <IndianRupee color="#a3aed0" />
                </div>
                <div>
                  <p className="text-sm">Total Amount</p>
                  <h1 className="font-semibold">₹ {dashboardData.total_collected}</h1>
                </div>
              </div>

              <div className="flex bg-white rounded-lg shadow-sm p-3 space-x-3 w-full sm:w-5/12 lg:w-auto">
                <div className="p-3 bg-bgColor rounded-full">
                  <LayoutList color="#a3aed0" />
                </div>
                <div>
                  <p className="text-sm">Today Scheduled</p>
                  <h1 className="font-semibold">
                    {dashboardData.today_pending_collections.length}
                  </h1>
                </div>
              </div>

              <div className="flex bg-white rounded-lg shadow-sm p-3 space-x-3 w-full sm:w-5/12 lg:w-auto">
                <div className="p-3 bg-bgColor rounded-full">
                  <CircleCheckBig color="#a3aed0" />
                </div>
                <div>
                  <p className="text-sm">Pending Requests</p>
                  <h1 className="font-semibold">
                    {dashboardData.pending_requests.length}
                  </h1>
                </div>
              </div>
            </div>

            {/* Graph and Pending Section */}
            <div className="flex flex-col lg:flex-row gap-4 m-4">
              <div className="bg-white rounded-lg lg:w-8/12 w-full">
                <LineGraph />
              </div>

              <div className="bg-white rounded-lg lg:w-4/12 w-full">
                <div className="flex justify-between p-3">
                  <h1 className="text-xl font-semibold">Recent Requests</h1>
                  <p onClick={handleRequests} className="bg-bgColor rounded-md">
                    <Ellipsis color="#a3aed0" />
                  </p>
                </div>
                {dashboardData.pending_requests
                  .slice(0, 5)
                  .map((request, index) => (
                    <div
                      key={index}
                      className="flex justify-between p-3 shadow-sm items-center m-3 rounded-lg"
                    >
                      <div className="flex items-center gap-3 ">
                        <img
                          src={todaypending}
                          alt=""
                          className="w-10 h-10 rounded-lg "
                        />
                        <h1>{request.name}</h1>
                      </div>
                      <p >
                        <div className="flex gap-1 items-center">
                          {/* Conditional rendering of status icons based on request properties */}
                          {request.is_rejected ? (
                            <p className="flex gap-1">
                              <CircleX size={20} color="#e71818" />
                              <span>Rejected</span>
                            </p>
                          ) : request.is_scheduled ? (
                            <p className="flex gap-1">
                              <CircleCheck size={20} color="#4CAF50" />
                              <span>Scheduled</span>
                            </p>
                          ) : (
                            <p className="flex gap-1">
                              <CircleAlert size={20} color="#FFC107" />
                              <span>Pending</span>
                            </p>
                          )}
                        </div>
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Users and Recent Requests Section */}
            <div className="flex flex-col lg:flex-row gap-4 m-4">
              <div className="bg-white rounded-lg lg:w-5/12 w-full">
                <div className="flex justify-between p-3">
                  <h1 className="text-xl font-semibold">Today Pending</h1>
                  <p onClick={handleTodayPendings} className="bg-bgColor rounded-md">
                    <Ellipsis color="#a3aed0" />
                  </p>
                </div>
                {filteredPendingCollections.length > 0 ? (
                  filteredPendingCollections
                    .slice(0, 5)
                    .map((pending, index) => (
                      <div
                        key={index}
                        className="flex justify-between p-3 items-center shadow-sm rounded-lg m-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={todaypending}
                            alt=""
                            className="h-10 w-10 rounded-lg"
                          />
                          <h1 className="text-sm">{pending.name}</h1>
                        </div>
                        <p className="">
                          <Ellipsis color="#a3aed0" />
                        </p>
                      </div>
                    ))
                ) : (
                  <div className="p-3 text-center text-gray-500">
                    No scheduled request
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg lg:w-7/12 w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    orientation="landscape"
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    disablePast
                    maxDate={dayjs().add(7, "day")} // Limit to one week from today
                  />
                </LocalizationProvider>
              </div>
            </div>

            {/* Transaction Table and Calendar */}
            <div className="flex flex-col lg:flex-row gap-4 m-4 rounded-lg">
              <div className="bg-white flex flex-col justify-between lg:w-full w-full p-3">
                <div className="flex justify-between">
                  <h1 className="text-xl font-semibold">Transaction Table</h1>
                  <p onClick={handleTransactions} className="bg-bgColor rounded-md">
                    <Ellipsis color="#a3aed0" />
                  </p>
                </div>

                {/* Table Header */}
                <div className="flex justify-between border-b p-2 font-semibold">
                  <div className="w-2/12 text-left">Name</div>
                  <div className="w-2/12 text-left">Quantity</div>
                  <div className="w-2/12 text-left">Price</div>
                  <div className="w-3/12 text-left">Payment Method</div>
                  <div className="w-3/12 text-left">Date</div>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col">
                  {dashboardData.transactions
                    .slice(0, 5)
                    .map((transaction, index) => (
                      <div key={index} className="flex justify-between p-2">
                        <div className="w-2/12 text-left">
                          {transaction.collection_request.name}
                        </div>
                        <div className="w-2/12 text-left">
                          {transaction.total_quantity}kg
                        </div>
                        <div className="w-2/12 text-left">
                          ₹ {transaction.total_price}
                        </div>
                        <div className="w-3/12 text-left">
                          {transaction.payment_method}
                        </div>
                        <div className="w-3/12 text-left">
                          {transaction.date_picked}
                        </div>
                      </div>
                    ))}
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

export default ShopHome;
