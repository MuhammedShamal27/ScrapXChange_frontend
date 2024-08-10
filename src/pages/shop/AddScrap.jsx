import React,{ useEffect, useState } from 'react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import '../../styles/adminAndShop.css'
import AddScrapAndCategory from '../../componets/shop/AddScrapAndCategory'


const AddScrap = () => {
  return (
    <>
      <div className='adminFont flex bg-bgColor'>
          <ShopNavBar/>
          <div className='w-4/5 flex flex-col'>
              <HeadingAndProfile/>
              <AddScrapAndCategory type="scrap" />
          </div>
      </div>
      <FooterOfAdminAndShop/>
    </>
  )
}

export default AddScrap