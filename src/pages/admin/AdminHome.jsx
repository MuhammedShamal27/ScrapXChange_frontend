import React, { useEffect, useState } from 'react'
import AdminNavBar from '../../componets/admin/AdminNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import '../../styles/adminAndShop.css'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import {adminHome} from '../../services/api/admin/adminApi'
import { useDispatch } from 'react-redux'


const AdminHome = () => {

  const [admin, setAdmin] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminData = await adminHome();  // Fetch admin data using API
        setAdmin(adminData);
        dispatch(updateAdmin({ admin: adminData }));  // Dispatch action to update admin in the state
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      }
    };

    fetchAdminData();
  }, [dispatch]);

  return (
    <>
      <div className='adminFont flex bg-bgColor '>
        <AdminNavBar/>
        <div>
          <HeadingAndProfile/>
          {admin && <div>Welcome, {admin.username}!</div>}
        </div>
      </div>
      <FooterOfAdminAndShop/>
    </>
  )
}

export default AdminHome
