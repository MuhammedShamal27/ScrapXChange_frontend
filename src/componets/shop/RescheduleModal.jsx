import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {
  CreateShopNotifications,
  reScheduleRequest,
  shopCreateOrFetchChatRoom,
} from "../../services/api/shop/shopApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import socket from "../../utils/hooks/Socket";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";


const RescheduleModal = ({ isOpen, id, userDetails, onClose }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  console.log("user", userDetails);
  const shopToken = useSelector((state) => state.shop.token);
  let shopId = null;

  if (shopToken) {
    try {
      const decodedShopToken = jwtDecode(shopToken);
      shopId = decodedShopToken.user_id;
      console.log("the shop", shopId);
    } catch (error) {
      console.error("Invalid shop token:", error);
    }
  }

  const handleReShedule = async (e) => {
    e.preventDefault();
    const date = selectedDate.format("YYYY-MM-DD");
    try {
      console.log(date);
      const response = await reScheduleRequest(id, date);
      console.log("the response is ", response);
      // const createRoom = await shopCreateOrFetchChatRoom(userDetails.user);
      // console.log("the response of create room", createRoom);

      // const room_id=createRoom.id
      // const shop=createRoom.shop.user
      // const user=createRoom.user.id
      // const username=createRoom.shop.shop_name
      // const message = `${username} has accepted the collection request .`;
      // console.log(`the room_id ${room_id},the shop id is ${shop}`)

      const notification = {
        sender: shopId,
        receiver: userDetails.user,
        message: "A  scrap collection request has been Approved",
        notification_type: "general",
      }
      const sendNotification =  await CreateShopNotifications(notification)
      toast("Scheduled successfully.");
      onClose();
      navigate("/shop/scrapRequests");
    } catch (err) {
      console.error("Error while scheduling.", err);
      if (err.response && err.response.data) {
        const errorMessage =
          err.response.data.scheduled_date?.[0] ||
          "Error occurred while scheduling.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleGoBack = () => {
    onClose();
  };

  if (!isOpen) return null;

  const handleMessage = () => {
    navigate("/shop/shopChat");
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-3 sm:p-5 rounded-lg w-11/12 sm:w-auto">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              orientation="landscape"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </LocalizationProvider>
          <div className="flex flex-col sm:flex-row justify-around space-y-3 sm:space-y-0 sm:space-x-7 mt-4">
            <button
              className="bg-myBlue text-white rounded-3xl text-xs h-7 w-full sm:w-24"
              onClick={handleMessage}
            >
              Message
            </button>
            <button
              onClick={handleReShedule}
              className="bg-green-500 text-white rounded-3xl text-xs h-7 w-full sm:w-24"
            >
              Schedule
            </button>
            <button
              onClick={handleGoBack}
              className="bg-black text-white rounded-3xl text-xs h-7 w-full sm:w-24"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RescheduleModal;
