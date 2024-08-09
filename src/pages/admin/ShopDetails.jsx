import React, { useEffect, useState } from "react";
import AdminNavBar from "../../componets/admin/AdminNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import DetailsPages from "../../componets/admin/DetailsPages";
import "../../styles/adminAndShop.css";
import { useParams } from "react-router-dom";
import { fetchShopDetails } from "../../services/api/admin/adminApi";

const ShopDetails = () => {

  const { id } = useParams();
  const [shopDetails, setShopDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchShopDetails(id);
        setShopDetails(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <div className="adminFont flex bg-bgColor min-h-screen ">
        <AdminNavBar />
        <div className="flex flex-col w-full">
          <HeadingAndProfile />
          <div className="flex justify-center">
            <DetailsPages details={shopDetails} type="shop" />
          </div>
        </div>
        
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ShopDetails;
