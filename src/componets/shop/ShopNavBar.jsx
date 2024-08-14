import React from 'react'
import {House,CircleCheckBig,ChartNoAxesColumn,LayoutDashboard,User,LogOut,ScrollText,MessageSquareMore,LayoutList} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { shopLogout } from '../../redux/reducers/shopReducer';


const ShopNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(shopLogout());
    navigate('/shop/login'); 
  };
  return (
    <>
        <div className='adminFont bg-white'>
            <div className='flex flex-col'>
                <h1 className='text-2xl text-blue-950 font-bold m-10'>Scrap X Change</h1>
                <Link to='/shop/home' className='flex ml-9 mt-7 gap-x-5'><House color="#a3aed0" />Dashboard</Link>
                <Link to='' className='flex ml-9 mt-7 gap-x-5'><LayoutList color="#a3aed0" />Today Pendings</Link>
                <Link to='/shop/scrapRequests' className='flex ml-9 mt-7 gap-x-5'><CircleCheckBig color="#a3aed0" />Scrap Requests</Link>
                <Link to='' className='flex ml-9 mt-7 gap-x-5'><ChartNoAxesColumn color="#a3aed0" />Transcation Table</Link>
                <Link to='' className='flex ml-9 mt-7 gap-x-5'><User color="#a3aed0" />User List</Link>
                <Link to='/shop/categorylist' className='flex ml-9 mt-7 gap-x-5'><LayoutDashboard color="#a3aed0" />Category List</Link>
                <Link to='/shop/scraplist' className='flex ml-9 mt-7 gap-x-5'><ScrollText color="#a3aed0" />Scrap List</Link>
                <Link to='' className='flex ml-9 mt-7 gap-x-5'><MessageSquareMore color="#a3aed0" />Messages</Link>
                <Link onClick={handleLogout} className='flex ml-9 mt-7 gap-x-5'><LogOut color="#a3aed0" />LogOut</Link>
            </div>
        </div>
    </>
  )
}

export default ShopNavBar