import React from 'react'
import {House,CircleCheckBig,ChartNoAxesColumn,LayoutDashboard,User,LogOut,ScrollText,MessageSquareMore,LayoutList} from 'lucide-react'
import { Link } from 'react-router-dom'


const ShopNavBar = () => {
  return (
    <>
        <div className='adminFont bg-white'>
            <div className='flex flex-col'>
                <h1 className='text-2xl text-blue-950 font-bold m-10'>Scrap X Change</h1>
                <Link to='/shop/home' className='flex ml-9 mt-7 gap-x-5'><House color="#a3aed0" />Dashboard</Link>
                <Link to='' className='flex ml-9 mt-7 gap-x-5'><LayoutList color="#a3aed0" />Today Pendings</Link>
                <Link to='' className='flex ml-9 mt-7 gap-x-5'><CircleCheckBig color="#a3aed0" />Scrap Requests</Link>
                <Link to='' className='flex ml-9 mt-7 gap-x-5'><ChartNoAxesColumn color="#a3aed0" />Transcation Table</Link>
                <Link to='' className='flex ml-9 mt-7 gap-x-5'><User color="#a3aed0" />User List</Link>
                <Link to='/shop/categorylist' className='flex ml-9 mt-7 gap-x-5'><LayoutDashboard color="#a3aed0" />Category List</Link>
                <Link to='/shop/scraplist' className='flex ml-9 mt-7 gap-x-5'><ScrollText color="#a3aed0" />Scrap List</Link>
                <Link to='' className='flex ml-9 mt-7 gap-x-5'><MessageSquareMore color="#a3aed0" />Messages</Link>
                <Link  className='flex ml-9 mt-7 gap-x-5'><LogOut color="#a3aed0" />LogOut</Link>
            </div>
        </div>
    </>
  )
}

export default ShopNavBar