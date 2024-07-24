import React from "react";
import AdminNavBar from "../../componets/admin/AdminNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import Background_image from "../../assets/Background_image.png";
import main_profile from "../../assets/main_profile.png";
import "../../styles/adminAndShop.css";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import DetailsPages from "../../componets/admin/DetailsPages";

const UserDetails = () => {
  return (
    <>
      <div className="adminFont flex bg-bgColor  ">
        <AdminNavBar />
        <HeadingAndProfile />
        <DetailsPages />
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default UserDetails;
