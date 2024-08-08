  import React from 'react';
  import { Bell, Search } from 'lucide-react';
  import profile from '../../assets/SA_profile.png';
  import logo from '../../assets/logo.png';

  const UserNavBar = () => {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center p-5">
        <div className="flex gap-3 items-center mb-4 sm:mb-0">
          <img className="h-8 w-8" src={logo} alt="logo" />
          <h1 className="font-extrabold text-xl">ScrapXChange</h1>
        </div>
        <div className="flex gap-7 mb-4 sm:mb-0">
          <h3 className="font-semibold">Home</h3>
          <h3 className="font-semibold">Sell Scrap</h3>
          <h3 className="font-semibold">About Us</h3>
        </div>

        <div className="flex gap-7 items-center">

          <button>Sign Up</button>

          <p className="">
            <Search size={20} />
          </p>

          {/* <p className="">
            <Bell size={20} />
          </p>
          <p className="">
            <Search size={20} />
          </p>
          <img
            className="w-10 h-10"
            src={profile}
            alt="profile picture of user"
          /> */}
        </div>
      </div>
    );
  };

  export default UserNavBar;
