import React, { useEffect, useState } from "react";
import Background_image from "../../assets/Background_image.png";
import main_profile from "../../assets/main_profile.png";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import { fetchShopProfile } from "../../services/api/shop/shopApi";
import Spinner from "../../utils/Spinner";
import UploadShopProfile from "../../componets/shop/UploadShopProfile";

const ShopProfile = () => {
    const [shopProfile , setShopProfile] =useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=> {
        const ShopDetails = async ()=> {
            try{
                const response = await fetchShopProfile()
                console.log('the shop response',response)
                setShopProfile(response)
            }catch(err){
                console.error('error occured while fetching ',err)
            }
        }
        ShopDetails();
    },[])

    const handleOpenModal = () => {
            setIsModalOpen(true);
        };
    
    const handleCloseModal = () => {
            setIsModalOpen(false);
        };
     
  if (!shopProfile) {
    return <Spinner/>; 
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
                  <img
                    className="m-3"
                    src={Background_image}
                    alt="Profile_image"
                  />
                  <img
                    className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 rounded-full w-14 h-14"
                    src={main_profile}
                    alt="Profile"
                  />
                </div>
                <h1 className="text-center text-blue-950 text-base m-7 font-semibold">
                  {shopProfile.username}
                </h1>
                <div className="grid grid-cols-2  gap-y-10 gap-7 m-5 text-xs">
                  <div className="rounded-xl p-3 shadow ">
                    <p className="text-gray-500">Email</p>
                    <p className="text-black">{shopProfile.email}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow ">
                    <p className="text-gray-500">ShopName</p>
                    <p className="text-black">{shopProfile.shop_name}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow ">
                    <p className="text-gray-500">Shop Number</p>
                    <p className="text-black">{shopProfile.shop_license_number}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow ">
                    <p className="text-gray-500">Address</p>
                    <p className="text-black">{shopProfile.address}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow ">
                    <p className="text-gray-500">Place</p>
                    <p className="text-black">{shopProfile.place}</p>
                  </div>
                  <div className="rounded-xl p-3 shadow ">
                    <p className="text-gray-500">Phone</p>
                    <p className="text-black">{shopProfile.phone}</p>
                  </div>
                  <div className="w-full flex justify-center items-end">
                    <button
                      onClick=""
                      className="bg-black text-white  rounded-3xl text-xs w-full h-7  items-center"
                    >
                      Go Back
                    </button>
                  </div>
                  <div className="w-full flex justify-center items-end">
                    <button
                      onClick={handleOpenModal}
                      className="bg-myBlue text-white  rounded-3xl text-xs w-full h-7  items-center"
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <p className="text-xs font-bold ml-7 ">Note :- Can only change your location and image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
      <UploadShopProfile isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ShopProfile;
