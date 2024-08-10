import React, { useEffect, useState } from "react";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import CategoryAndScrapList from "../../componets/shop/CategoryAndScrapList";
import "../../styles/adminAndShop.css";
import { useDebounce } from "../../utils/hooks/Debounce";
import { Search } from "lucide-react";
import { fetchCategoryList } from "../../services/api/shop/shopApi";

const ScrapCategoryList = () => {

  const [category,setCategory] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error , setError] = useState(null);

  useEffect (() => {
    const loadCategory = async () => {
      try{
        const data = await fetchCategoryList();
        setCategory(Array.isArray(data) ? data: []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadCategory();
  },[])

  if (loading){
    return <div> Loading ...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <div className="adminFont flex bg-bgColor">
        <ShopNavBar />
        <div className="w-4/5">
          <HeadingAndProfile />
          <CategoryAndScrapList list={category} type="category"/>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ScrapCategoryList;
