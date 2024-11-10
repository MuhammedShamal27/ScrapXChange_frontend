import React from "react";
import logo from "../../assets/logo.png";
import { Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const UserFooter = () => {
  return (
    <>
      <div className="bg-black text-gray-300 mt-10">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 p-5 lg:gap-10">
          {/* Logo and Description Section */}
          <div className="m-5 lg:m-7">
            <div className="flex items-center gap-3">
              <img className="w-8 h-8" src={logo} alt="ScrapXChange Logo" />
              <h1 className="text-white font-bold text-2xl">ScrapXChange</h1>
            </div>
            <p className="text-xs mt-5 lg:mt-7">
              Whatever you want to ask, our chat <br /> has the answers
            </p>
            <div className="flex gap-3 items-center mt-5 lg:mt-7">
              <p className="p-1 border border-gray-50 rounded-full">
                <Twitter size={20} />
              </p>
              <p className="p-1 border border-gray-50 rounded-full">
                <Linkedin size={20} />
              </p>
            </div>
          </div>

          {/* Shops Section */}
          <div className="m-5 lg:m-7">
            <h1 className="text-white font-light">Shops</h1>
            <h5 className="text-xs pt-3 lg:pt-5">Pricing</h5>
            <Link className="text-xs pt-3 lg:pt-5">Become Shop</Link>
            <h5 className="text-xs pt-3 lg:pt-5">Report</h5>
          </div>

          {/* Support Section */}
          <div className="m-5 lg:m-7">
            <h1 className="text-white font-light">Support</h1>
            <h5 className="text-xs pt-3 lg:pt-5">Contact Us</h5>
            <h5 className="text-xs pt-3 lg:pt-5">Request a New Feature</h5>
          </div>

          {/* About Section */}
          <div className="m-5 lg:m-7">
            <h1 className="text-white font-light">About</h1>
            <h5 className="text-xs pt-3 lg:pt-5">Privacy Policy</h5>
          </div>
        </div>

        {/* Footer Bottom Line and Rights Reserved */}
        <div className="border-b-2 border-gray-900"></div>
        <h1 className="bg-black text-gray-300 text-center text-xs sm:text-sm tracking-wider p-3">
          2024 ScrapXChange All Rights Reserved
        </h1>
      </div>
    </>
  );
};

export default UserFooter;
