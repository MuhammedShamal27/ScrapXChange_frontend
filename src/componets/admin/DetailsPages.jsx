import React from "react";
import Background_image from "../../assets/Background_image.png";
import main_profile from "../../assets/main_profile.png";

const DetailsPages = () => {
  return (
    <>
      <div className="bg-white rounded-2xl ml-11 mt-32">
        <div className="flex flex-col ">
          <div className="flex flex-col relative">
            <img className="m-3" src={Background_image} alt="Profile_image" />
            <img
              className="absolute -bottom-7 ml-60 rounded-full"
              src={main_profile}
              alt=""
            />
          </div>
          <h1 className="text-center text-blue-950 text-xl m-7 font-bold">
            Adela Parkson
          </h1>
          <div className="grid grid-cols-2 place-content-center p-3 text-xs ">
            <div className="rounded-xl shadow-xl m-2 p-3 h-14 ">
              <p className="text-gray-500">Address</p>
              <p className="text-black">Mardu</p>
            </div>
            <div className="rounded-xl shadow-2xl m-2 p-3 h-14 ">
              <p className="text-gray-500">Email</p>
              <p className="text-black">adelaparkson@gmail.com</p>
            </div>
            <div className="rounded-xl shadow-2xl m-2 p-3 h-14 ">
              <p className="text-gray-500">Pincode</p>
              <p className="text-black">624853</p>
            </div>
            <div className="rounded-xl shadow-2xl m-2 p-3 h-14">
              <p className="text-gray-500">Phone</p>
              <p className="text-black">9875665454</p>
            </div>
            <div className="rounded-xl shadow-2xl m-2 p-3 h-14 ">
              <p className="text-gray-500">Alternative Phone</p>
              <p className="text-black">9456845759</p>
            </div>
            <div></div>
            <button className="text-white bg-red-600 rounded-2xl text-xs w-36 h-7 ml-11 mt-7">
              Block
            </button>
            <button className="text-white bg-myBlue rounded-2xl text-xs w-36 h-7 ml-11 mt-7">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPages;
