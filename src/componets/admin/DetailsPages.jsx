import React, { useState } from "react";
import Background_image from "../../assets/Background_image.png";
import main_profile from "../../assets/main_profile.png";
import {
  ShopBlockUnblock,
  ShopRequestaccept,
  ShopRequestreject,
  UserBlockUnblock,
} from "../../services/api/admin/adminApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.SCRAPXCHANGE_API_URL || "http://127.0.0.1:8000";

const DetailsPages = ({ details, type }) => {
  if (!details) {
    return null;
  }

  const [localDetails, setLocalDetails] = useState(details);

  if (!localDetails) {
    return null;
  }

  const navigate = useNavigate();

  const isBlocked =
    type === "user"
      ? localDetails?.user_profile?.is_blocked
      : localDetails?.shop?.is_blocked;
  const isAccepted =
    type === "shopRequest" ? localDetails?.shop?.is_verified : null;

  const handleBlockUnblock = async () => {
    try {
      const actionPerformed = isBlocked ? "unblock" : "block";
      let response;

      if (type === "user") {
        response = await UserBlockUnblock(localDetails.id, actionPerformed);
      } else if (type === "shop") {
        response = await ShopBlockUnblock(localDetails.id, actionPerformed);
      }

      if (response && response.message) {
        toast.success(`${isBlocked ? "Unblocked" : "Blocked"} successfully!`);

        // Update the local state to reflect the changes
        setLocalDetails((prevDetails) => ({
          ...prevDetails,
          [type === "user" ? "user_profile" : "shop"]: {
            ...prevDetails[type === "user" ? "user_profile" : "shop"],
            is_blocked: !isBlocked,
          },
        }));
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error(`Failed to ${isBlocked ? "unblock" : "block"}:`, error);
      toast.error(
        `Failed to ${isBlocked ? "unblock" : "block"}: ${error.message}`
      );
    }
  };

  const handleAcceptReject = async (action) => {
    try {
      let response;

      if (action === "accept") {
        response = await ShopRequestaccept(localDetails.id);
      } else if (action === "reject") {
        response = await ShopRequestreject(localDetails.id);
      }

      if (response && response.message) {
        toast.success(
          `${action === "accept" ? "Accepted" : "Rejected"} successfully!`
        );

        // Optionally, update the local state or perform other actions
        setLocalDetails((prevDetails) => ({
          ...prevDetails,
          shop: {
            ...prevDetails.shop,
            is_verified: action === "accept",
          },
        }));

        // Redirect to another page if needed
        navigate("/admin/shoprequestlist"); // Replace with the appropriate path
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error(`Failed to ${action}:`, error);
      toast.error(`Failed to ${action}: ${error.message}`);
    }
  };

  const googleMapsLink =
    details?.shop?.latitude && details?.shop?.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${details.shop.latitude},${details.shop.longitude}`
      : null;
  return (
    <div className="bg-white rounded-2xl ">
      <div className="flex flex-col">
        <div className="flex flex-col relative">
          <img className="m-3" src={Background_image} alt="Profile_image" />
          <img
            className="absolute -bottom-7 ml-60 rounded-full w-16 h-16"
            src={
              type === "user"
                ? details.user_profile?.profile_picture
                : details.shop?.profile_picture || main_profile
            }
            alt=""
          />
        </div>
        <h1 className="text-center text-blue-950 text-xl m-7 font-bold">
          {details.username || "Name"}
        </h1>
        <div className="grid grid-cols-3 place-content-center p-3 text-xs">
          {type === "user" && (
            <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
              <p className="text-gray-500">Username</p>
              <p className="text-black">{details.username || "N/A"}</p>
            </div>
          )}
          {(type === "shop" || type === "shopRequest") && (
            <>
              <div className="rounded-xl shadow-xl m-2 p-3 h-14">
                <p className="text-gray-500">Shop Name</p>
                <p className="text-black">
                  {details?.shop?.shop_name || "N/A"}
                </p>
              </div>
              <div className="rounded-xl shadow-xl m-2 p-3 h-14">
                <p className="text-gray-500">Shop License Number</p>
                <p className="text-black">
                  {details?.shop?.shop_license_number || "N/A"}
                </p>
              </div>
              <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
                <p className="text-gray-500">State</p>
                <p className="text-black">{details?.shop?.state || "N/A"}</p>
              </div>
              <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
                <p className="text-gray-500">District</p>
                <p className="text-black">{details?.shop?.district || "N/A"}</p>
              </div>
            </>
          )}
          <div className="rounded-xl shadow-xl m-2 p-3 h-14">
            <p className="text-gray-500">Address</p>
            <p className="text-black">
              {type === "user"
                ? details?.user_profile?.address
                : details?.shop?.address || "N/A"}
            </p>
          </div>
          <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
            <p className="text-gray-500">Email</p>
            <p className="text-black">{details.email || "N/A"}</p>
          </div>
          {type === "user" && (
            <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
              <p className="text-gray-500">Pincode</p>
              <p className="text-black">
                {details?.user_profile?.pincode || "N/A"}
              </p>
            </div>
          )}
          <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
            <p className="text-gray-500">Phone</p>
            <p className="text-black">
              {type === "user"
                ? details?.user_profile?.phone
                : details?.shop?.phone || "N/A"}
            </p>
          </div>
          <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
            <p className="text-gray-500">
              {type === "user" ? "Alternative Phone" : "Pincode"}
            </p>
            <p className="text-black">
              {type === "user"
                ? details?.user_profile?.alternative_phone
                : details?.shop?.pincode || "N/A"}
            </p>
          </div>
          {(type === "shop" || type === "shopRequest") && googleMapsLink && (
            <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
              <p className="text-gray-500">Location</p>
              <p className="text-black">
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View on Google Map
                </a>
              </p>
            </div>
          )}
          {(type === "user" || type === "shop") && (
            <button
              className={`text-white rounded-2xl text-xs w-36 h-7 ml-5 mt-7 ${
                isBlocked ? "bg-myBlue" : "bg-red-600"
              }`}
              onClick={handleBlockUnblock}
            >
              {isBlocked ? "Unblock" : "Block"}
            </button>
          )}
          {(type === "user" || type === "shop") && (
            <button
              className="text-white rounded-2xl text-xs w-36 h-7 ml-5 mt-7 bg-black "
              onClick={() => navigate(-1)} // Navigate back
            >
              Go Back
            </button>
          )}
        </div>
        {type === "shopRequest" && (
          <>
            <div className="flex justify-evenly p-3">
              <button
                className="text-white bg-myBlue rounded-2xl text-xs w-36 h-7 "
                onClick={() => handleAcceptReject("accept")}
              >
                Accept
              </button>
              <button
                className="text-white bg-red-600 rounded-2xl text-xs w-36 h-7"
                onClick={() => handleAcceptReject("reject")}
              >
                Reject
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsPages;
