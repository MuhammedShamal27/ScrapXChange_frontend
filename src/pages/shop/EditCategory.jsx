import React from 'react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import '../../styles/adminAndShop.css'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import EditScrapAndCategory from '../../componets/shop/EditScrapAndCategory'
import { useParams } from 'react-router-dom'

const EditCategory = () => {

    const {id} = useParams();
    
  return (
    <>
    <div className='adminFont bg-bgColor flex'>
        <ShopNavBar/>
        <div className='w-4/5 flex flex-col'>
            <HeadingAndProfile/>
            <EditScrapAndCategory type="category" id={id}/>
        </div>
    </div>
    <FooterOfAdminAndShop/>
    </>
  )
}

export default EditCategory