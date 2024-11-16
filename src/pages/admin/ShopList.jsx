import React, { useEffect, useState } from "react";
import AdminNavBar from "../../componets/admin/AdminNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import UserAndAdminList from "../../componets/admin/UserAndShopList";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import "../../styles/adminAndShop.css";
import {
  fetchShopList,
  fetchBlockedShopList,
  fetchUnblockedShopList,
} from "../../services/api/admin/adminApi";
import { useDebounce } from "../../utils/hooks/Debounce";
import AdminHeadingAndProfile from "../../componets/AdminHeadingAndProfile";

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // default filter is 'all'
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const loadShops = async () => {
      try {
        let data;
        const params = { search: debouncedSearchQuery };

        if (filter === "blocked") {
          data = await fetchBlockedShopList(params);
        } else if (filter === "unblocked") {
          data = await fetchUnblockedShopList(params);
        } else {
          data = await fetchShopList(params);
        }
        setShops(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadShops();
  }, [filter, debouncedSearchQuery]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="adminFont flex bg-bgColor ">
        <AdminNavBar />
        <div className="w-8/12">
          <AdminHeadingAndProfile />{" "}
          <div>
            <UserAndAdminList
              list={shops}
              type="shops"
              setFilter={setFilter}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ShopList;
