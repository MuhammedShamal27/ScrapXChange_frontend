import React from 'react'
import {ArrowUpFromLine} from 'lucide-react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import '../../styles/adminAndShop.css'

const EditScrapDetails = () => {
  return (
    <>
    <div className='adminFont flex bg-bgColor'>
        <ShopNavBar/>
        <div className='w-4/5 flex flex-col'>
            <HeadingAndProfile/>
            <div className='flex flex-col bg-white rounded-2xl ml-11'>
                <h1 className='text-blue-950 font-bold text-2xl ml-11 mt-7'>Edit Scrap Details</h1>
                <div className='grid grid-cols-2 m-7 p-7 text-xs space-y-4 relative'>
                    <div >
                        <p className=''>Name</p>
                        <input className='border rounded-md w-80 h-9 px-5' type="text" placeholder='Scrap Name' />
                    </div>
                    <div>
                        <p>Price</p>
                        <input className='border rounded-md w-80 h-9 px-5' type="text" placeholder='Product Price' />
                    </div>
                    <div>
                        <p>Category</p>
                        <input className='border rounded-md w-80 h-9 px-5' type="text" placeholder='Category' />
                    </div>
                    <div>
                        <p>Image</p>
                        <div className='flex justify-between items-center border rounded-md w-80 h-9 px-5'>
                            <input  type="" placeholder='Upload the image' />
                            <ArrowUpFromLine color="#4318FF" />
                        </div>
                    </div>
                    <div></div>
                    <button className=' bg-myBlue w-3/5 h-9 rounded-md text-white '>Submit</button>
                </div>
            </div>
        </div>
    </div>
    <FooterOfAdminAndShop/>
    </>
  )
}

export default EditScrapDetails