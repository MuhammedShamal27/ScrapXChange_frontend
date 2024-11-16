import { Bell, Search } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import SA_profile from "../assets/SA_profile.png";


const AdminHeadingAndProfile = () => {
    const navigate = useNavigate();

  
    const handleNotifications = () => {
      navigate("/admin/notifications/");
    };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center">
        <h2 className="text-2xl text-blue-950 font-bold m-4 sm:m-11">
          ScrapXChange
        </h2>
        <div className="flex items-center bg-white h-14 w-full sm:w-80 rounded-full space-x-5 mt-3 sm:mt-7 sm:mr-11 cursor-pointer">
          <div className="flex bg-bgColor rounded-full ml-3 p-1 items-center w-full sm:w-auto">
            <Search color="#a3aed0" size={20} />
            <input
              className="bg-bgColor rounded-full border-none outline-none w-full sm:w-auto"
              placeholder="Search"
            />
          </div>
          <p onClick={handleNotifications}>
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
  )
}

export default AdminHeadingAndProfile