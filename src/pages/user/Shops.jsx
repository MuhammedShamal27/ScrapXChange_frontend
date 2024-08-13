import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from '../../componets/user/UserNavBar';
import UserFooter from '../../componets/user/UserFooter';
import Shop_image from '../../assets/Shop_requests.png';
import { fetchshops } from '../../services/api/user/userApi';

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = shops.slice(startIndex, startIndex + itemsPerPage);

  // Calculate the total number of pages
  const totalPages = Math.ceil(shops.length / itemsPerPage);

  // Handle pagination controls
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <UserNavBar />

        <div className="flex-grow mt-10 ml-10">
          <h1 className="font-medium text-2xl ml-20">Sell Scrap</h1>
          {currentItems.map(shop => (
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
        
        {totalPages > 1 && (
          <div className='flex justify-end  rounded-lg bg-white w-24 ml-32 mt-4 space-x-3 text-black'>
            {currentPage > 1 && (
              <button onClick={handlePrevClick} className='rounded-lg p-2 text-gray-500'>
                Prev |
              </button>
            )}
            <p className='rounded-lg p-2 text-gray-500'>
              {currentPage}
            </p>
            {currentPage < totalPages && (
              <button onClick={handleNextClick} className='rounded-lg p-2 text-gray-500'>
               | Next
              </button>
            )}
          </div>
        )}

        <div className="mt-auto">
          <UserFooter />
        </div>
      </div>
    </>
  );
};

export default Shops;
