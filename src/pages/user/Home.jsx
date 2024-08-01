import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateUser  } from "../../redux/reducers/userReducer";
import { getUserHomeData } from "../../services/api/user/userApi";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] =useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserHomeData();
      
      setUser(userData);
      dispatch(updateUser({user: userData}));
    };
    
    fetchUserData();
  }, [dispatch, getUserHomeData]);
  
  const handleLogout = () =>{
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div>
        {user ? (
          <div>
            wellcome ,{user.username}!
            <button className="bg-red-500" onClick={handleLogout}> logout </button>
            <button className="bg-slate-500" > Profile </button>
          </div>
        ) : (
          <p>Please log in </p>
        )}

      

      </div>
    </>
  );
};

export default Home;
