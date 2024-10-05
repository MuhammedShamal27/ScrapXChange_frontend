import React, { useEffect, useState } from "react";
import Background_image from "../../assets/Background_image.png";
import main_profile from "../../assets/main_profile.png";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import { fetchShopProfile } from "../../services/api/shop/shopApi";
import Spinner from "../../utils/Spinner";
import UploadShopProfile from "../../componets/shop/UploadShopProfile";
import { baseURL } from "../../utils/constant";
import { X } from "lucide-react";

const ShopProfile = () => {
  const [shopProfile, setShopProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadAllowed, setIsUploadAllowed] = useState(true);  // New state to control upload access

  useEffect(() => {
    const ShopDetails = async () => {
      try {
        const response = await fetchShopProfile();
        console.log("the shop response", response);
        setShopProfile(response);

        // Check if the profile_picture, latitude, and longitude are already set
        if (response.profile_picture && response.latitude && response.longitude) {
          setIsUploadAllowed(false);  // Disable upload if data already exists
        }
      } catch (err) {
        console.error("error occurred while fetching ", err);
      }
    };
    ShopDetails();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!shopProfile) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex bg-bgColor">
        <ShopNavBar />
        <div className="w-8/12">
          <HeadingAndProfile />
          <div className="flex flex-1 justify-center bg-bgColor rounded-lg">
            <div className="bg-white rounded-2xl m-10">
              <div className="flex flex-col ">
                <div className="flex flex-col relative">
                  <img className="m-3" src={Background_image} alt="Profile_image" />
                  <img
                    className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 rounded-full w-14 h-14"
                    src={shopProfile.profile_picture ? `${baseURL}${shopProfile.profile_picture}` : main_profile}
                    alt="Profile"
                  />
                </div>
                <h1 className="text-center text-blue-950 text-base m-7 font-semibold">
                  {shopProfile.username}
                </h1>
                <div className="grid grid-cols-2 gap-y-10 gap-7 m-5 text-xs">
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Email</p>
                    <p className="text-black">{shopProfile.email}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">ShopName</p>
                    <p className="text-black">{shopProfile.shop_name}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Shop Number</p>
                    <p className="text-black">{shopProfile.shop_license_number}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Address</p>
                    <p className="text-black">{shopProfile.address}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Place</p>
                    <p className="text-black">{shopProfile.place}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Phone</p>
                    <p className="text-black">{shopProfile.phone}</p>
                  </div>
                  <div className="w-full flex justify-center items-end">
                    <button className="bg-black text-white rounded-3xl text-xs w-full h-7 items-center">
                      Go Back
                    </button>
                  </div>
                  <div className="w-full flex justify-center items-end">
                    <button
                      onClick={handleOpenModal}
                      disabled={!isUploadAllowed}  // Disable if upload is not allowed
                      className={`rounded-3xl text-xs w-full h-7 items-center ${
                        isUploadAllowed ? 'bg-myBlue text-white' : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isUploadAllowed ? 'Upload' : 'Already Uploaded'}
                    </button>
                  </div>
                </div>
                {!isUploadAllowed && (
                  <p className="text-xs font-bold ml-7 text-red-500">
                    NOTE : Once uploaded,you can only update your location and image after 30 days.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
      {/* Modal for UploadShopProfile */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 relative w-3/4">
            <button className="absolute top-2 right-2 text-red-500" onClick={handleCloseModal}>
              <X/>
            </button>
            <UploadShopProfile onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default ShopProfile;
