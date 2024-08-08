import React, { useState } from "react";
import Background_image from "../../assets/Background_image.png";
import main_profile from "../../assets/main_profile.png";
import { ShopRequestaccept, ShopRequestreject, UserBlockUnblock } from "../../services/api/admin/adminApi";

const DetailsPages = ({ details, type }) => {
  if (!details) {
    return null; 
  }

  const [isBlocked, setIsBlocked] = useState(type === 'user' ? details.user_profile.is_blocked : details.shop.is_blocked);
  const [isAccepted, setIsAccepted] = useState(type === 'shop' ? details.shop.is_verified : null);

  const handleBlockUnblock = async () => {
    try {
      const actionPerformed = isBlocked ? 'unblock' : 'block';
      const response = await UserBlockUnblock(details.id, actionPerformed);
      if (response && response.message) {
        setIsBlocked(!isBlocked);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Failed to block/unblock user:", error);
    }
  };

  const handleAcceptReject = async (action) => {
    try {
      const response = action === 'accept'
      console.log(`Action: ${action}, ID: ${details.id}`)
        ? await ShopRequestaccept(details.id)
        : await ShopRequestreject(details.id);
      if (response && response.message) {
        setIsAccepted(action === 'accept');
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error(`Failed to ${action} shop:`, error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl ml-11 mt-32">
        <div className="flex flex-col ">
          <div className="flex flex-col relative">
            <img className="m-3" src={Background_image} alt="Profile_image" />
            <img
              className="absolute -bottom-7 ml-60 rounded-full"
              src={details.profile_picture || main_profile}
              alt=""
            />
          </div>
          <h1 className="text-center text-blue-950 text-xl m-7 font-bold">
            {details.username || "Name"}
          </h1>
          <div className="grid grid-cols-2 place-content-center p-3 text-xs ">
            {type === 'shop' && (
              <>
                <div className="rounded-xl shadow-xl m-2 p-3 h-14 ">
                  <p className="text-gray-500">Shop Name</p>
                  <p className="text-black">{details.shop.shop_name || "N/A"}</p>
                </div>
                <div className="rounded-xl shadow-xl m-2 p-3 h-14 ">
                  <p className="text-gray-500">Shop License Number</p>
                  <p className="text-black">{details.shop.shop_license_number || "N/A"}</p>
                </div>
              </>
            )}
            <div className="rounded-xl shadow-xl m-2 p-3 h-14 ">
              <p className="text-gray-500">{type === 'user' ? 'Address' : 'Address'}</p>
              <p className="text-black">{type === 'user' ? details.user_profile.address : details.shop.address || "N/A"}</p>
            </div>
            <div className="rounded-xl shadow-2xl m-2 p-3 h-14 ">
              <p className="text-gray-500">Email</p>
              <p className="text-black">{details.email || "N/A"}</p>
            </div>
            <div className="rounded-xl shadow-2xl m-2 p-3 h-14 ">
              <p className="text-gray-500">Pincode</p>
              <p className="text-black">{type === 'user' ? details.user_profile.pincode : details.shop.pincode || "N/A"}</p>
            </div>
            <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
              <p className="text-gray-500">Phone</p>
              <p className="text-black">{type === 'user' ? details.user_profile.phone : details.shop.phone || "N/A"}</p>
            </div>
            <div className="rounded-xl shadow-2xl m-2 p-3 h-14 ">
              <p className="text-gray-500">{type === 'user' ? 'Alternative Phone' : 'Place'}</p>
              <p className="text-black">{type === 'user' ? details.user_profile.alternative_phone : details.shop.place || "N/A"}</p>
            </div>
            <div></div>
            {type === 'user' && (
              <button
                className={`text-white rounded-2xl text-xs w-36 h-7 ml-11 mt-7 ${isBlocked ? "bg-black" : "bg-red-600"}`}
                onClick={handleBlockUnblock}
              >
                {isBlocked ? "Unblock" : "Block"}
              </button>
            )}
            {type === 'shop' && (
              <>
                <button
                  className="text-white bg-myBlue rounded-2xl text-xs w-36 h-7 ml-11 mt-7"
                  onClick={() => handleAcceptReject('accept')}
                >
                  Accept
                </button>
                <button
                  className="text-white bg-red-600 rounded-2xl text-xs w-36 h-7 ml-11 mt-7"
                  onClick={() => handleAcceptReject('reject')}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPages;
