import React, { useEffect, useState } from "react";
import Background_image from "../../assets/Background_image.png";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import {
  CreateShopNotifications,
  getScrapRequestDetails,
  rejectRequest,
  scheduleRequest,
  shopCreateOrFetchChatRoom,
} from "../../services/api/shop/shopApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import MessageModal from "../../componets/shop/MessageModal";
import ResheduleModal from "../../componets/shop/RescheduleModal";
import socket from "../../utils/hooks/Socket";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";


const ScrapRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isResheduleModalOpen, setIsResheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
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

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getScrapRequestDetails(id);
        setRequestDetails(response);
      } catch (err) {
        console.error("Error fetching request details.", err);
        setError(err);
      }
    };
    fetchDetails();
  }, [id]);

  const handleShedule = async () => {
    try {
      const response = await scheduleRequest(id);
      console.log("request sheduled successfully", response);
      // console.log("the user id is", requestDetails.user);
      // const createRoom = await shopCreateOrFetchChatRoom(requestDetails.user);
      // console.log("the response of create room", createRoom);
      const notification = {
        sender: shopId,
        receiver: requestDetails.user,
        message: "A  scrap collection request has been Approved",
        notification_type: "general",
      }
      const sendNotification =  await CreateShopNotifications(notification)
      toast("Scheduled successfully");
      navigate("/shop/scrapRequests");
    } catch (err) {
      console.error("error while scheduling ", err);
      if (err.response && err.response.data.detail) {
        toast.error(err.response.data.detail);
      } else if (err.response && err.response.data.non_field_errors) {
        toast.error(err.response.data.non_field_errors[0]);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleReject = () => {
    setIsRejectModalOpen(true);
  };

  const handleRejectSubmit = async (reason) => {
    try {
      const response = await rejectRequest(id, reason);
      setIsRejectModalOpen(false);
      toast("Rejected the request.");
      navigate("/shop/scrapRequests");
    } catch (err) {
      console.error("error while rejecting.", err);
    }
  };

  const openResheduleModal = () => {
    setIsResheduleModalOpen(true);
  };

  if (error) {
    return <div>Error fetching request details: {error.message}</div>;
  }

  if (!requestDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="adminFont flex bg-bgColor min-h-screen">
        <ShopNavBar />
        <div className="flex flex-col flex-1">
          <HeadingAndProfile />
          <div className="flex flex-1 justify-center items-center bg-bgColor rounded-lg">
            <div className="bg-white rounded-2xl">
              <div className="flex flex-col">
                {/* Image container, hidden on small screens */}
                <div className="flex flex-col relative ">
                  <img
                    className="m-3"
                    src={Background_image}
                    alt="Profile_image"
                  />
                </div>

                {/* Selected Items */}
                <div className="flex flex-col rounded-lg shadow-md m-3 gap-3 items-center text-sm">
                  <h1 className="font-bold text-blue-950 text-lg">
                    Selected Items
                  </h1>
                  <p className="text-black text-center sm:text-left">
                    {requestDetails.products
                      .map((product) => product.name)
                      .join(", ")}
                  </p>
                  <div className="flex flex-col sm:flex-row text-center sm:text-left">
                    <p className="font-bold">Note:</p>
                    <p className="ml-1">{requestDetails.add_note}</p>
                  </div>
                </div>

                {/* Details grid, stack items on small screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-3 m-3 sm:m-5 text-xs">
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Name</p>
                    <p className="text-black">{requestDetails.name}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Date Requested</p>
                    <p className="text-black">
                      {new Date(
                        requestDetails.date_requested
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Address</p>
                    <p className="text-black">{requestDetails.address}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Landmark</p>
                    <p className="text-black">{requestDetails.landmark}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Pincode</p>
                    <p className="text-black">{requestDetails.pincode}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Phone</p>
                    <p className="text-black">{requestDetails.phone}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-evenly p-3 gap-2 sm:gap-0 items-center">
                  <button
                    onClick={handleShedule}
                    className="bg-green-500 text-white rounded-3xl text-xs h-8 w-full sm:w-36"
                  >
                    Schedule
                  </button>
                  <button
                    onClick={openResheduleModal}
                    className="bg-myBlue text-white rounded-3xl text-xs h-8 w-full sm:w-36"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={handleReject}
                    className="bg-red-700 text-white rounded-3xl text-xs h-8 w-full sm:w-36"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
      <MessageModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onSubmit={handleRejectSubmit}
      />
      <ResheduleModal
        isOpen={isResheduleModalOpen}
        onClose={() => setIsResheduleModalOpen(false)}
        id={id}
        userDetails={requestDetails}
      />
    </>
  );
};

export default ScrapRequestDetails;
