import React, { useState } from "react";
import Background_image from "../../assets/Background_image.png";
import main_profile from "../../assets/main_profile.png";
import { ShopBlockUnblock, ShopRequestaccept, ShopRequestreject, UserBlockUnblock } from "../../services/api/admin/adminApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const DetailsPages = ({ details, type }) => {
  if (!details) {
    return null;
  }

  const [localDetails, setLocalDetails] = useState(details);

  if (!localDetails) {
    return null;
  }

  const navigate = useNavigate();
  
  const isBlocked = type === 'user' ? localDetails?.user_profile?.is_blocked : localDetails?.shop?.is_blocked;
  const isAccepted = type === 'shopRequest' ? localDetails?.shop?.is_verified : null;

  const handleBlockUnblock = async () => {
    try {
      const actionPerformed = isBlocked ? 'unblock' : 'block';
      let response;
      
      if (type === 'user') {
        response = await UserBlockUnblock(localDetails.id, actionPerformed);
      } else if (type === 'shop') {
        response = await ShopBlockUnblock(localDetails.id, actionPerformed);
      }

      if (response && response.message) {
        toast.success(`${isBlocked ? 'Unblocked' : 'Blocked'} successfully!`);
        
        // Update the local state to reflect the changes
        setLocalDetails((prevDetails) => ({
          ...prevDetails,
          [type === 'user' ? 'user_profile' : 'shop']: {
            ...prevDetails[type === 'user' ? 'user_profile' : 'shop'],
            is_blocked: !isBlocked,
          },
        }));
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error(`Failed to ${isBlocked ? 'unblock' : 'block'}:`, error);
      toast.error(`Failed to ${isBlocked ? 'unblock' : 'block'}: ${error.message}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl ">
      <div className="flex flex-col">
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
        <div className="grid grid-cols-2 place-content-center p-3 text-xs">
          {type === 'user' && (
              <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
                <p className="text-gray-500">Username</p>
                <p className="text-black">
                  {details.username|| "N/A"}
                </p>
              </div>
            )}
          {(type === 'shop' || type === 'shopRequest') && (
            <>
              <div className="rounded-xl shadow-xl m-2 p-3 h-14">
                <p className="text-gray-500">Shop Name</p>
                <p className="text-black">{details?.shop?.shop_name || "N/A"}</p>
              </div>
              <div className="rounded-xl shadow-xl m-2 p-3 h-14">
                <p className="text-gray-500">Shop License Number</p>
                <p className="text-black">{details?.shop?.shop_license_number  || "N/A"}</p>
              </div>
            </>
          )}
          <div className="rounded-xl shadow-xl m-2 p-3 h-14">
            <p className="text-gray-500">Address</p>
            <p className="text-black">
              {type === 'user' ? details?.user_profile?.address : details?.shop?.address || "N/A"}
            </p>
          </div>
          <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
            <p className="text-gray-500">Email</p>
            <p className="text-black">{details.email || "N/A"}</p>
          </div>
          {type === 'user' && (
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
              {type === 'user' ? details?.user_profile?.phone : details?.shop?.phone || "N/A"}
            </p>
          </div>
          <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
            <p className="text-gray-500">{type === 'user' ? 'Alternative Phone' : 'Place'}</p>
            <p className="text-black">
              {type === 'user' ? details?.user_profile?.alternative_phone : details?.shop?.place || "N/A"}
            </p>
          </div>
          {(type === 'user' || type === 'shop') && (
            <button
              className={`text-white rounded-2xl text-xs w-36 h-7 ml-11 mt-7 ${isBlocked ? "bg-myBlue" : "bg-red-600"}`}
              onClick={handleBlockUnblock}
            >
              {isBlocked ? "Unblock" : "Block"}
            </button>
          )}
          {(type === 'user' || type === 'shop') && (
          <button
            className="text-white rounded-2xl text-xs w-36 h-7 ml-11 mt-7 bg-black"
            onClick={() => navigate(-1)} // Navigate back
          >
            Go Back
          </button>
        )}
          {type === 'shopRequest' && (
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
  );
};

export default DetailsPages;
