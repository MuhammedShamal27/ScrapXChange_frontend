import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopNavBar from '../../componets/shop/ShopNavBar';
import HeadingAndProfile from '../../componets/HeadingAndProfile';
import "../../styles/adminAndShop.css";
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop';
import { updateshop } from '../../redux/reducers/shopReducer';
import { shopGraph, shopHome } from '../../services/api/shop/shopApi';
import { ChartNoAxesColumn, CircleCheckBig, CircleX, Ellipsis, EllipsisVertical, IndianRupee, LayoutDashboard, LayoutList, User } from 'lucide-react';
import userReducer from '../../redux/reducers/userReducer';
import LineGraph from '../../utils/LineGraph';
import todaypending from '../../assets/todaypending.png'


const ShopHome = () => {
  const [shop, setShop] = useState(null);
  const dispatch = useDispatch();

  



  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shopData = await shopHome();
        setShop(shopData);
        dispatch(updateshop({ shop: shopData }));
      } catch (error) {
        console.error('Failed to fetch shop data:', error);
      }
    };

    fetchShopData();
  }, [dispatch]);





  return (
    <>
    <div className='adminFont flex bg-bgColor min-h-screen flex-col lg:flex-row'>
      <ShopNavBar />
      <div className='lg:w-8/12 w-full'>
        <HeadingAndProfile />
        <div className='text-sm'>
          
          {/* Responsive summary cards */}
          <div className='flex flex-wrap gap-4 m-4'>
            <div className='flex bg-white rounded-lg shadow-sm p-3 space-x-3 w-full sm:w-5/12 lg:w-auto'>
              <div className='p-3 bg-bgColor rounded-full'>
                <ChartNoAxesColumn color="#a3aed0" />
              </div>
              <div>
                <p className='text-sm'>Total Collected</p>
                <h1 className='font-semibold'>350</h1>
              </div>
            </div>
  
            <div className='flex bg-white rounded-lg shadow-sm p-3 space-x-3 w-full sm:w-5/12 lg:w-auto'>
              <div className='p-3 bg-bgColor rounded-full'>
                <IndianRupee color="#a3aed0" />
              </div>
              <div>
                <p className='text-sm'>Total Amount</p>
                <h1 className='font-semibold'>RS 3500</h1>
              </div>
            </div>
  
            <div className='flex bg-white rounded-lg shadow-sm p-3 space-x-3 w-full sm:w-5/12 lg:w-auto'>
              <div className='p-3 bg-bgColor rounded-full'>
                <LayoutList color="#a3aed0" />
              </div>
              <div>
                <p className='text-sm'>Today Scheduled</p>
                <h1 className='font-semibold'>5</h1>
              </div>
            </div>
  
            <div className='flex bg-white rounded-lg shadow-sm p-3 space-x-3 w-full sm:w-5/12 lg:w-auto'>
              <div className='p-3 bg-bgColor rounded-full'>
                <CircleCheckBig color="#a3aed0" />
              </div>
              <div>
                <p className='text-sm'>Pending Requests</p>
                <h1 className='font-semibold'>10</h1>
              </div>
            </div>
          </div>
  
          {/* Graph and Pending Section */}
          <div className='flex flex-col lg:flex-row gap-4 m-4'>
            <div className='bg-white rounded-lg lg:w-8/12 w-full'>
              <LineGraph />
            </div>
            <div className='bg-white rounded-lg lg:w-4/12 w-full'>
              <div className='flex justify-between p-3'>
                <h1 className='text-xl font-semibold'>Today Pending</h1>
                <p className='bg-bgColor rounded-md'>
                  <Ellipsis color="#a3aed0" />
                </p>
              </div>
              <div className='flex justify-between p-3 items-center shadow-sm rounded-lg m-3'>
                <div className='flex items-center gap-3'>
                  <img src={todaypending} alt="" className='h-10 w-10 rounded-lg' />
                  <h1 className='text-sm'>Name</h1>
                </div>
                <p className=''>
                  <EllipsisVertical color="#a3aed0" />
                </p>
              </div>
            </div>
          </div>
  
          {/* Users and Recent Requests Section */}
          <div className='flex flex-col lg:flex-row gap-4 m-4'>
            <div className='bg-white rounded-lg lg:w-4/12 w-full'>
              <div className='flex justify-between p-3'>
                <h1 className='text-xl font-semibold'>Users</h1>
                <p className='bg-bgColor rounded-md'>
                  <Ellipsis color="#a3aed0" />
                </p>
              </div>
              <div className='flex justify-between p-3 shadow-sm items-center m-3 rounded-lg'>
                <div className='flex items-center gap-3 '>
                  <img src={todaypending} alt="" className='w-10 h-10 rounded-lg ' />
                  <h1>Name</h1>
                </div>
                <p className=''>
                  <EllipsisVertical color="#a3aed0" />
                </p>
              </div>
            </div>
  
            <div className='bg-white rounded-lg lg:w-8/12 w-full p-3'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-semibold'>Recent Requests</h1>
                <p className='bg-bgColor rounded-md'>
                  <Ellipsis color="#a3aed0" />
                </p>
              </div>
              <div className='flex flex-col text-sm'>
                <div className='flex justify-around border-b'>
                  <h1>Name</h1>
                  <h1>Status</h1>
                  <h1>Date</h1>
                </div>
                <div className='flex justify-around '>
                  <p>UserName</p>
                  <div className='flex gap-1'>
                    <p>
                      <CircleX size={20} color="#e71818" />
                    </p>
                    <p>Reject</p>
                  </div>
                  <h1>01/10/2024</h1>
                </div>
              </div>
            </div>
          </div>
  
          {/* Transaction Table and Calendar */}
          <div className='flex flex-col lg:flex-row gap-4 m-4'>
            <div className='bg-white flex flex-col justify-between lg:w-8/12 w-full p-3'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-semibold'>Transaction Table</h1>
                <p className='bg-bgColor rounded-md'>
                  <Ellipsis color="#a3aed0" />
                </p>
              </div>
              <div className='flex flex-col'>
                <div className='flex justify-between border-b'>
                  <h1>Name</h1>
                  <h1>Quantity</h1>
                  <h1>Price</h1>
                  <h1>Date</h1>
                </div>
                <div className='flex justify-between '>
                  <h1>UserName</h1>
                  <h1>10kg</h1>
                  <h1>Rs 52456</h1>
                  <h1>4/10/2025</h1>
                </div>
              </div>
            </div>
  
            <div className='bg-white rounded-lg lg:w-4/12 w-full p-3'>
              <h1 className='text-xl font-semibold'>Calendar</h1>
            </div>
          </div>
  
        </div>
      </div>
    </div>
    <FooterOfAdminAndShop />
  </>
  
  );
};

export default ShopHome;
