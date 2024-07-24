import React from "react";
import { Search, Bell } from "lucide-react";
import SA_profile from "../assets/SA_profile.png";
import "../styles/adminAndShop.css";

const HeadingAndProfile = () => {
  return (
    <>
      <div className="flex justify-between ">
        <h2 className="text-2xl text-blue-950 font-bold m-11">Scrap List</h2>
        <div className="flex bg-white h-14 w-80 rounded-full space-x-5 items-center mt-7 absolute left-3/4">
          <div className="flex bg-bgColor rounded-full ml-3">
            <Search color="#a3aed0" size={20} />
            <input className="bg-bgColor rounded-full" placeholder="Search" />
          </div>
          <p>
            <Bell color="#a3aed0" size={20} />
          </p>
          <img
            className="w-9 h-9 rounded-full"
            src={SA_profile}
            alt="profile_picture"
          />
        </div>
      </div>
    </>
  );
};

export default HeadingAndProfile;
