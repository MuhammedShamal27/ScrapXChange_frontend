import React, { useEffect, useState } from "react";
import Background_image from "../../assets/Background_image.png";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import {
  getScrapRequestDetails,
  rejectRequest,
  scheduleRequest,
} from "../../services/api/shop/shopApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import MessageModal from "../../componets/shop/MessageModal";
import ResheduleModal from "../../componets/shop/RescheduleModal";

const ScrapRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isResheduleModalOpen, setIsResheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
                <div className="flex flex-col relative">
                  <img
                    className="m-3"
                    src={Background_image}
                    alt="Profile_image"
                  />
 
                </div>
                {/* <h1 className="text-center text-blue-950 text-lg m-7 font-bold">
                  {requestDetails.name}
                </h1> */}
                <div className="flex flex-col rounded-lg shadow-md m-3 gap-3 items-center text-sm">
                  <h1 className="font-bold text-blue-950 text-lg">Selected Items</h1>
                  <p className="text-black">
                    {requestDetails.products
                      .map((product) => product.name)
                      .join(", ")}
                  </p>
                  <div className="flex">
                    <p className="font-bold">Note : </p>
                    <p> {requestDetails.add_note}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-10 gap-7 m-5 text-xs">
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

                <div className="flex justify-evenly p-3 items-center">
                  <button
                    onClick={handleShedule}
                    className="bg-green-500 text-white rounded-3xl text-xs h-7 w-36"
                  >
                    Schedule
                  </button>
                  <button
                    onClick={openResheduleModal}
                    className="bg-myBlue text-white rounded-3xl text-xs h-7 w-36"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={handleReject}
                    className="bg-red-700 text-white rounded-3xl text-xs h-7 w-36"
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
      />
    </>
  );
};

export default ScrapRequestDetails;
