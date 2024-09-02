import React from "react";
import { Bell, Search } from "lucide-react";
import profile from "../../assets/SA_profile.png";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const baseURL = import.meta.env.SCRAPXCHANGE_API_URL || "http://127.0.0.1:8000";

const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

const UserNavBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-5">
      <div className="flex gap-3 items-center mb-4 sm:mb-0">
        <img onClick={goToHome} className="h-8 w-8 cursor-pointer" src={logo} alt="logo" />
        <h1 onClick={goToHome} className="font-extrabold text-xl cursor-pointer">ScrapXChange</h1>
      </div>
      <div className="flex gap-7 mb-4 sm:mb-0">
        <Link className="font-semibold" to='/'>Home</Link>
        <Link className="font-semibold" to='/shops'>Sell Scrap</Link>
        <Link className="font-semibold" >About Us</Link>
      </div>

      <div className="flex gap-7 items-center">
        {isAuthenticated ? (
          <>
            <p className="">
              <Bell size={20} />
            </p>
            <p className="">
              <Search size={20} />
            </p>
            <Link to='/profile'>
              <img 
                className="w-10 h-10 cursor-pointer rounded-full"
                src={user?.profile_picture ? `${baseURL}${user.profile_picture}` : profile}
                alt="profile picture of user"
              />
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleSignUp} className="bg-black text-white p-3 rounded-3xl text-xs w-24">
              Sign Up
            </button>

            <p>
              <Search size={20} />
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserNavBar;
