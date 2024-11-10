import React, { useEffect, useState } from "react";
import { Search, Bell, Plus, Pencil, IndianRupee } from "lucide-react";
import Shop_requests from "../../assets/test.png";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import "../../styles/adminAndShop.css";
import CategoryAndScrapList from "../../componets/shop/CategoryAndScrapList";
import { fetchScrapList } from "../../services/api/shop/shopApi";

const ScrapList = () => {
  const [scraps, setScrap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadScrap = async () => {
      try {
        const data = await fetchScrapList();
        setScrap(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadScrap();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error : {error}</div>;
  }

  return (
    <>
      <div className="adminFont flex bg-bgColor ">
        <ShopNavBar />
        <div className="w-4/5">
          <HeadingAndProfile />
          <CategoryAndScrapList list={scraps} type="scraps" />
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ScrapList;
