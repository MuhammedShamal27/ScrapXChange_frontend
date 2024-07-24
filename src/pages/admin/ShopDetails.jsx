import React from "react";
import AdminNavBar from "../../componets/admin/AdminNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import DetailsPages from "../../componets/admin/DetailsPages";
import "../../styles/adminAndShop.css";

const ShopDetails = () => {
  return (
    <>
      <div className="adminFont flex bg-bgColor ">
        <AdminNavBar />
        <HeadingAndProfile />
        <DetailsPages />
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ShopDetails;
