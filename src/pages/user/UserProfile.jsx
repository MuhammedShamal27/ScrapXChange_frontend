import React, { useEffect, useState } from "react";
import Background_image from "../../assets/Background_image.png";
import main_profile from "../../assets/main_profile.png";
import UserNavBar from "../../componets/user/UserNavBar";
import UserFooter from "../../componets/user/UserFooter";
import { userProfile } from "../../services/api/user/userApi";
import { toast } from "sonner";
import "../../styles/user.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserSideBar from "../../componets/user/UserSideBar";

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await userProfile(token);
        console.log("Profile Picture URL:", userData);
        setProfile(userData);
      } catch (error) {
        toast.error("Failed to load user profile.");
        console.error("Error fetching user profile data:", error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleEditProfile = () => {
    navigate("/editProfile");
  };


  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserNavBar />
      <div className="userMainFont flex ">
        <UserSideBar />

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
                  src={
                    profile.profile_picture
                      ? profile.profile_picture
                      : main_profile
                  }
                  alt="Profile"
                />
              </div>
              <h1 className="text-center text-blue-950 text-base m-7 font-semibold">
                {profile.username}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-y-10 gap-7 m-5 text-xs sm:text-xs">
                <div className="rounded-xl p-3 shadow ">
                  <p className="text-gray-500">Email</p>
                  <p className="text-black">{profile.email}</p>
                </div>
                <div className="rounded-xl p-3 shadow ">
                  <p className="text-gray-500">Address</p>
                  <p className="text-black">{profile.address}</p>
                </div>
                <div className="rounded-xl p-3 shadow ">
                  <p className="text-gray-500">Pincode</p>
                  <p className="text-black">{profile.pincode}</p>
                </div>
                <div className="rounded-xl p-3 shadow ">
                  <p className="text-gray-500">Phone</p>
                  <p className="text-black">{profile.phone}</p>
                </div>
                <div className="rounded-xl p-3 shadow ">
                  <p className="text-gray-500">Alternative Phone</p>
                  <p className="text-black">{profile.alternative_phone}</p>
                </div>
                <div className="w-full flex justify-center items-end">
                  <button
                    onClick={handleEditProfile}
                    className="bg-black text-white  rounded-3xl text-xs w-full h-7  items-center"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default UserProfile;
