import React from "react";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import "../../styles/adminAndShop.css";
import AddAndEditScrapAndCategory from "../../componets/shop/AddScrapAndCategory";

const AddCategory = () => {
  return (
    <>
      <div className="adminFont flex bg-bgColor">
        <ShopNavBar />
        <div className="w-4/5 flex flex-col">
          <HeadingAndProfile />
          <AddAndEditScrapAndCategory type="category" />
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default AddCategory;
