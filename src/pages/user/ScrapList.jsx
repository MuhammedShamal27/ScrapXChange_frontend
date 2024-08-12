import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react'
import UserNavBar from '../../componets/user/UserNavBar';
import UserFooter from '../../componets/user/UserFooter';
import { shopScrapList } from '../../services/api/user/userApi';
import { Datepicker } from "flowbite-react";
const baseURL = import.meta.env.SCRAPXCHANGE_API_URL || "http://127.0.0.1:8000";

const ScrapList = () => {
  const { id } = useParams(); // Get shop_id from URL
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await shopScrapList(id);
        setCategories(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategories();
  }, [id]);

  const hasProducts = categories.some(category => category.products.length > 0);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <UserNavBar />

        <div className="flex-grow">
          <div className="px-4 sm:px-10 lg:px-20 py-10">
            {hasProducts ? (
              categories.map(category => (
                <div key={category.id} className="m-10">
                  <h1 className="text-2xl font-semibold mb-4 text-center">{category.name}</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 m-7 w-6/12">
                    {category.products.map(product => (
                      <div key={product.id} className="border-2 p-3 rounded-lg">
                        <div className="flex justify-center">
                          <img className="w-24 h-24" src={`${baseURL}${product.image}`} alt={product.name} />
                        </div>
                        <h1 className="text-sm mt-3">{product.name}</h1>
                        <p className="text-gray-600">₹ {product.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">THE SHOP HAS NOT LISTED ANY SCRAP ITEMS YET.</h2>
              </div>
            )}
          </div>
        </div>


        <div className='flex justify-around'>
            <div className='c'>
                <h1 className='font-medium text-lg'>Selected item</h1>
                <div className='flex flex-col  '>
                    <p className='flex justify-between '>Paper <X /></p>
                    <p className='flex justify-between '>Paper <X /></p>
                    <p className='flex justify-between '>Paper <X /></p>
                    <p className='flex justify-between '>Paper <X /></p>
                    <p className='flex justify-between '>Paper <X /></p>

                </div>
            </div>
            <div >
              <Datepicker  inline />
            </div>
            
        </div>

        <UserFooter />
      </div>
    </>
  );
};

export default ScrapList;
