import React from 'react';
import UserNavBar from '../../componets/user/UserNavBar';
import UserFooter from '../../componets/user/UserFooter';
import Shop_image from '../../assets/Shop_requests.png';

const Shops = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <UserNavBar/>

        <div className="flex-grow mt-10 ml-10 ">
          <h1 className="font-medium text-2xl ml-20">Sell Scrap</h1>

          <div className="flex justify-evenly items-center border-2 w-6/12 mt-10 ml-20 rounded-xl shadow-2xl">
            <img className="w-24 h-24 m-3" src={Shop_image} alt="Shop image" />
            <div>
              <h1 className="font-bold">Shop Name</h1>
              <p className="text-xs">This will be the shop address in order to understand the shop more.</p>
            </div>
            <button className="bg-black text-white p-3 rounded-3xl text-xs w-24">Sell Scrap</button>
            <button className="bg-red-500 text-white p-3 rounded-3xl text-xs w-24">Report</button>
          </div>

          <div className="flex justify-evenly items-center border-2 w-6/12 mt-10 ml-20 rounded-xl shadow-2xl">
            <img className="w-24 h-24 m-3" src={Shop_image} alt="Shop image" />
            <div>
              <h1 className="font-bold">Shop Name</h1>
              <p className="text-xs">This will be the shop address in order to understand the shop more.</p>
            </div>
            <button className="bg-black text-white p-3 rounded-3xl text-xs w-24">Sell Scrap</button>
            <button className="bg-red-500 text-white p-3 rounded-3xl text-xs w-24">Report</button>
          </div>

          <div className="flex justify-evenly items-center border-2 w-6/12 mt-10 ml-20 rounded-xl shadow-2xl">
            <img className="w-24 h-24 m-3" src={Shop_image} alt="Shop image" />
            <div>
              <h1 className="font-bold">Shop Name</h1>
              <p className="text-xs">This will be the shop address in order to understand the shop more.</p>
            </div>
            <button className="bg-black text-white p-3 rounded-3xl text-xs w-24">Sell Scrap</button>
            <button className="bg-red-500 text-white p-3 rounded-3xl text-xs w-24">Report</button>
          </div>

          <div className="flex justify-evenly items-center border-2 w-6/12 mt-10 ml-20 rounded-xl shadow-2xl">
            <img className="w-24 h-24 m-3" src={Shop_image} alt="Shop image" />
            <div>
              <h1 className="font-bold">Shop Name</h1>
              <p className="text-xs">This will be the shop address in order to understand the shop more.</p>
            </div>
            <button className="bg-black text-white p-3 rounded-3xl text-xs w-24">Sell Scrap</button>
            <button className="bg-red-500 text-white p-3 rounded-3xl text-xs w-24">Report</button>
          </div>
        </div>

        <div className="mt-auto">
          <UserFooter />
        </div>
      </div>
    </>
  );
};

export default Shops;
