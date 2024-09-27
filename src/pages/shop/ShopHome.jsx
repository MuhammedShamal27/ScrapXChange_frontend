import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopNavBar from '../../componets/shop/ShopNavBar';
import HeadingAndProfile from '../../componets/HeadingAndProfile';
import "../../styles/adminAndShop.css";
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop';
import { updateshop } from '../../redux/reducers/shopReducer';
import { shopHome } from '../../services/api/shop/shopApi';
import { ChartNoAxesColumn, CircleCheckBig, LayoutDashboard, LayoutList, User } from 'lucide-react';


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
      <div className='adminFont flex bg-bgColor h-screen'>
        <ShopNavBar />
        <div>
          <HeadingAndProfile />
          {shop && <div className='text-center'>Welcome, {shop.username}!</div>}
          {/* <div>
            <ChartNoAxesColumn color="#a3aed0" />
            <div>
              <p>Total Collected</p>
              <h1>350</h1>
            </div>
          </div>

          <div>
            <IndianRupee color="#a3aed0" />
            <div>
              <p>Total Amount</p>
              <h1>RS 3500</h1>
            </div>
          </div>

          <div>
            <LayoutList color="#a3aed0" />
            <div>
              <p>Today Scheduled</p>
              <h1>5</h1>
            </div>
          </div>

          <div>
            <CircleCheckBig color="#a3aed0" />
            <div>
              <p>Pending Requests</p>
              <h1>10</h1>
            </div>
          </div> */}

        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ShopHome;
