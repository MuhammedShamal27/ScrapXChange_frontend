import React from 'react'
import {LayoutDashboard,House,CircleCheckBig,ChartNoAxesColumn,User, LogOut} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogout } from '../../redux/reducers/adminReducer';
import { useDispatch } from 'react-redux';



const AdminNavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/login");
  };

  return (
    <>
        <div className=' bg-white h-screen'>
            <div className='flex flex-col'>
                <h1 className='text-2xl text-blue-950 font-bold m-10'>Scrap X Change</h1>
                <Link to='/admin/home' className='flex ml-9 mt-7 gap-x-5'><House color="#a3aed0" />Dashboard</Link>
                <Link to='/admin/shoprequestlist' className='flex ml-9 mt-7 gap-x-5'><CircleCheckBig color="#a3aed0" />Shop Requests</Link>
                <Link to='/admin/reportlist' className='flex ml-9 mt-7 gap-x-5'><ChartNoAxesColumn color="#a3aed0" />Report</Link>
                <Link to='/admin/shoplist' className='flex ml-9 mt-7 gap-x-5'><LayoutDashboard color="#a3aed0" />Shop List</Link>
                <Link to='/admin/userlist' className='flex ml-9 mt-7 gap-x-5'><User color="#a3aed0" />User List</Link>
                <Link onClick={handleLogout} className='flex ml-9 mt-7 gap-x-5'><LogOut color="#a3aed0" />LogOut</Link>
                
            </div>
        </div>
    </>
  )
}

export default AdminNavBar