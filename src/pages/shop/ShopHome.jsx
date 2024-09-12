import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopNavBar from '../../componets/shop/ShopNavBar';
import HeadingAndProfile from '../../componets/HeadingAndProfile';
import "../../styles/adminAndShop.css";
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop';
import { updateshop } from '../../redux/reducers/shopReducer';
import { shopHome } from '../../services/api/shop/shopApi';
import { io } from "socket.io-client";


const ShopHome = () => {
  const [shop, setShop] = useState(null);
  const dispatch = useDispatch();
  const socket = useRef();



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

  useEffect( ()=>{
    if (!shop)return;
    socket.current = io("http://127.0.0.1:8000", { transports: ['websocket'], debug: true });
    console.log("socket console:", socket.current);

  })


  return (
    <>
      <div className='adminFont flex bg-bgColor h-screen'>
        <ShopNavBar />
        <div>
          <HeadingAndProfile />
          {shop && <div className='text-center'>Welcome, {shop.username}!</div>}
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ShopHome;
