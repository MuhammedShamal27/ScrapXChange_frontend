import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from '../../componets/user/UserNavBar';
import UserFooter from '../../componets/user/UserFooter';
import Shop_image from '../../assets/Shop_requests.png';
import { fetchshops } from '../../services/api/user/userApi';

const Shops = () => {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopsData = async () => {
      try {
        const response = await fetchshops();
        setShops(response);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShopsData();
  }, []);

  const handleSellScrapClick = (shopId) => {
    navigate(`/scraplist/${shopId}`);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <UserNavBar />

        <div className="flex-grow mt-10 ml-10">
          <h1 className="font-medium text-2xl ml-20">Sell Scrap</h1>
          {shops.map(shop => (
            <div key={shop.id} className="flex justify-between items-center border-2 w-6/12 mt-10 ml-20 rounded-xl shadow-2xl">
              <div className='flex items-center gap-3 m-3' >
                <img className="w-24 h-24" src={Shop_image} alt="Shop image" />
                <div>
                  <h1 className="font-bold">{shop.shop_name}</h1>
                  <p className="text-xs">{shop.address}</p>
                </div>
              </div>
              <div className='space-x-3 m-3 '>
                <button  onClick={() => handleSellScrapClick(shop.id)}
                  className="bg-black text-white p-3 rounded-3xl text-xs w-24">Sell Scrap </button>
                <button className="bg-red-500 text-white p-3 rounded-3xl text-xs w-24">Report</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <UserFooter />
        </div>
      </div>
    </>
  );
};

export default Shops;
