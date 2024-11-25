import React, { useEffect, useState } from "react";
import { Search, Bell } from "lucide-react";
import SA_profile from "../assets/SA_profile.png";
import "../styles/adminAndShop.css";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { fetchShopHome } from "../services/api/shop/shopApi";
import { baseURL } from "../utils/constant";
import { userProfile } from "../services/api/user/userApi";

const HeadingAndProfile = ({ isAdmin }) => {
  const token = useSelector((state) => state.shop.token);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  let shop = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      // console.log('the shop is',decodedToken)
      shop = decodedToken.user_id;
    } catch (error) {
      // console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetchShopHome();
        console.log(response)
        setProfile(response);
        // console.log('the profile',response)
      } catch (error) {
        // console.error('the error is ',error)
      }
    };
    fetchProfile();
  }, []);

  const handleProfile = () => {
    navigate("/shop/shopProfile/");
  };

  const handleNotifications = () => {
    navigate(isAdmin ? "/admin/notifications/" : "/shop/notifications/");
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
            src={
              profile?.user_profile
                ?  profile.user_profile 
                : SA_profile
            }
            alt="profile_picture"
            onClick={handleProfile}
          />
        </div>
      </div>
    </>
  );
};

export default HeadingAndProfile;
