import React, { useEffect, useState } from "react";
import AdminNavBar from "../../componets/admin/AdminNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import UserAndAdminList from "../../componets/admin/UserAndShopList";
import {
  fetchUserList,
  blockedUserList,
  unblockedUserList,
} from "../../services/api/admin/adminApi";
import "../../styles/adminAndShop.css";
import { useDebounce } from "../../utils/hooks/Debounce";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // default filter is 'all'
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        const params = { search: debouncedSearchQuery };

        if (filter === "blocked") {
          data = await blockedUserList(params);
        } else if (filter === "unblocked") {
          data = await unblockedUserList(params);
        } else {
          data = await fetchUserList(params);
        }
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
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
          <HeadingAndProfile />
          <div>
            <UserAndAdminList
              list={users}
              type="users"
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

export default UserList;
