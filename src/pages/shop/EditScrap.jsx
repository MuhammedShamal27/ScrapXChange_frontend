import React from "react";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import EditScrapAndCategory from "../../componets/shop/EditScrapAndCategory";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import { useParams } from "react-router-dom";

const EditScrap = () => {
  const { id } = useParams();
  return (
    <>
      <div className="adminFont bg-bgColor flex">
        <ShopNavBar />
        <div className="w-4/5 flex flex-col">
          <HeadingAndProfile />
          <EditScrapAndCategory type="scrap" id={id} />
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default EditScrap;
