import React, { useEffect, useState } from "react";
import AdminNavBar from "../../componets/admin/AdminNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import Background_image from "../../assets/Background_image.png";
import main_profile from "../../assets/main_profile.png";
import "../../styles/adminAndShop.css";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import DetailsPages from "../../componets/admin/DetailsPages";
import { useParams } from "react-router-dom";
import { fetchUserDetails} from "../../services/api/admin/adminApi";

const UserDetails = () => {

  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchUserDetails(id);
        setUserDetails(data);
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
          <HeadingAndProfile    />
          <div className="flex justify-center">
            <DetailsPages details={userDetails} type="user"  />
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default UserDetails;
