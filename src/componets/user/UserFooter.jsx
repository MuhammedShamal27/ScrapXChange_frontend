import React from "react";
import logo from "../../assets/logo.png";
import { Linkedin,Twitter } from "lucide-react";

const UserFooter = () => {
  return (
    <>
      <div className="bg-black grid grid-rows-1 grid-flow-col gap-7 text-gray-300 mt-10">
        <div className="m-7">
          <div className="flex items-center gap-3">
            <img className="w-8 h-8" src={logo} alt="" />
            <h1 className="text-white font-bold text-2xl">ScrapXChange</h1>
          </div>
          <p className="text-xs m-7">
            Whatever you want to ask, our chat <br /> has the answers
          </p>
          <div className="flex gap-3 items-center m-7">
            <p className="p-1 border border-gray-50 rounded-full">
              <Twitter size={20} />
            </p>
            <p className="p-1 border border-gray-50 rounded-full">
              <Linkedin size={20} />
            </p>
          </div>
        </div>
        <div className="m-7 ">
          <h1 className="text-white font-light">Shops</h1>
          <h5 className="text-xs pt-5">Pricing</h5>
          <h5 className="text-xs pt-5">Report</h5>
        </div>
        <div className="m-7 ">
          <h1 className="text-white font-light ">Support</h1>
          <h5 className="text-xs pt-5">Contact Us</h5>
          <h5 className="text-xs pt-5">Request a New Feature</h5>
        </div>
        <div className="m-7 ">
          <h1 className="text-white font-light">About</h1>
          <h5 className="text-xs pt-5">Privacy Policy</h5>
        </div>
      </div>
      <div className="border-b-2 border-gray-900"></div>
      <h1 className="bg-black text-gray-300 text-center text-sm tracking-wider p-3">
        2024 ScrapXchange All Right Reserved
      </h1>
      
    </>
  );
};

export default UserFooter;
