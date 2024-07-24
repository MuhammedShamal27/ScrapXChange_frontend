import React from 'react'
import AdminNavBar from '../../componets/admin/AdminNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import UserAndAdminList from '../../componets/admin/UserAndAdminList';
import '../../styles/adminAndShop.css'


const UserList = () => {
  return (
    <>
    <div className='adminFont flex bg-bgColor'>
        <AdminNavBar/>
        <div>
            <HeadingAndProfile/>
            <div>
                <UserAndAdminList/>
            </div>
        </div>
    </div>
    <FooterOfAdminAndShop/>
    </>
  )
}

export default UserList