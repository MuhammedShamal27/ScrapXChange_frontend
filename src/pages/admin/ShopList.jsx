import React from 'react'
import AdminNavBar from '../../componets/admin/AdminNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import UserAndAdminList from '../../componets/admin/UserAndAdminList'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import '../../styles/adminAndShop.css'


const ShopList = () => {
  return (
    <>
        <div className='adminFont flex bg-bgColor '>
            <AdminNavBar/>
            <div >
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

export default ShopList