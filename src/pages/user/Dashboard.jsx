import React, { useEffect, useState } from "react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { fetchUserDashboard } from "../../services/api/user/userApi";

const Dashboard = () => {
  const [data, setData] = useState({
    transactions: [],
    pending_pickups: [],
    total_collections: [],
    total_collected_value: "0.00",
    today_pending_pickups: [],
    pending_requests: [],
  });

  const [selectedDate, setSelectedDate] = useState(dayjs()); // Initially set to the current date
  const [filteredPickups, setFilteredPickups] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetchUserDashboard();
        console.log('the response is', response);
        setData(response);
        filterPickupsForDate(dayjs(), response.pending_pickups); // Filter pickups for the current date
      } catch (error) {
        console.error('the error is ', error);
      }
    };
    fetchDashboard();
  }, []);

  // Function to filter pickups based on the selected date
  const filterPickupsForDate = (date, pickups) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const filtered = pickups.filter(
      (pickup) => pickup.scheduled_date === formattedDate
    );
    setFilteredPickups(filtered);
  };

  return (
    <>
      <UserNavBar />
      <div className="userMainFont flex">
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
                <h1 className="font-semibold text-lg">{data.total_collections.length}</h1>
              </div>
            </div>

            <div className="flex bg-white rounded-lg shadow-sm p-4 space-x-4 w-full sm:w-5/12 lg:w-2/12 h-20">
              <div className="p-3 bg-bgColor rounded-full">
                <IndianRupee color="#a3aed0" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <h1 className="font-semibold text-lg">₹ {data.total_collected_value}</h1>
              </div>
            </div>

            <div className="flex bg-white rounded-lg shadow-sm p-4 space-x-4 w-full sm:w-5/12 lg:w-2/12 h-20">
              <div className="p-3 bg-bgColor rounded-full">
                <LayoutList color="#a3aed0" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today Scheduled</p>
                <h1 className="font-semibold text-lg">{data.today_pending_pickups.length}</h1>
              </div>
            </div>

            <div className="flex bg-white rounded-lg shadow-sm p-4 space-x-3 w-full sm:w-5/12 lg:w-2/12 h-20">
              <div className="p-3 bg-bgColor rounded-full">
                <CircleCheckBig color="#a3aed0" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Requests</p>
                <h1 className="font-semibold text-lg">{data.pending_requests.length}</h1>
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
              {filteredPickups.length > 0 ? (
                filteredPickups.slice(0, 5).map((pickup, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center shadow-sm rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={todaypending}
                        alt=""
                        className="h-10 w-10 rounded-lg"
                      />
                      <h1 className="text-sm">{pickup.name}</h1>
                    </div>
                    <p>
                      <EllipsisVertical color="#a3aed0" />
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm">No pickups scheduled for this date</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm lg:w-5/12 w-full p-4 hidden lg:block">
              <h1 className="text-xl font-semibold">Calendar</h1>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  orientation="landscape"
                  value={selectedDate}
                  onChange={(newDate) => {
                    setSelectedDate(newDate);
                    filterPickupsForDate(newDate, data.pending_pickups);
                  }}
                  disablePast
                  minDate={dayjs()} // Today's date
                  maxDate={dayjs().add(7, 'day')} // One week from today
                />
              </LocalizationProvider>
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
  <div className="flex flex-col space-y-3 text-sm">
    <div className="flex justify-between border-b pb-2">
      <h1 className="w-1/2 sm:w-1/4">Name</h1>
      <h1 className="hidden sm:block w-1/4 text-center">Quantity</h1>
      <h1 className="w-1/2 sm:w-1/4 text-center">Price</h1>
      <h1 className="hidden sm:block w-1/4 text-center">Payment method</h1>
      <h1 className="hidden sm:block w-1/4 text-right">Date</h1>
    </div>

    {data.transactions.slice(0, 5).map((transaction, index) => (
      <div key={index} className="flex justify-between">
        <h1 className="w-1/2 sm:w-1/4">{transaction.shop_name}</h1>
        <h1 className="hidden sm:block w-1/4 text-center">{transaction.total_quantity} kg</h1>
        <h1 className="w-1/2 sm:w-1/4 text-center">₹ {transaction.total_price}</h1>
        <h1 className="hidden sm:block w-1/4 text-center">{transaction.payment_method}</h1>
        <h1 className="hidden sm:block w-1/4 text-right">{transaction.date_picked}</h1>
      </div>
    ))}
  </div>
</div>

        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default Dashboard;
