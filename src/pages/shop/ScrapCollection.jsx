import React from 'react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import { Pencil } from 'lucide-react'
import todaypending from '../../assets/todaypending.png'

const ScrapCollection = () => {
  return (
    <>
    <div className='flex bg-bgColor '>
        <ShopNavBar />
        <div className=' w-8/12'>
            <HeadingAndProfile />
            <div className='text-xs bg-white p-10 rounded-lg shadow-lg justify-center m-10 '>
                <h1 className='font-semibold text-xl'>Scrap Collection</h1>
                <div className='flex justify-between mt-7'>
                    <div className='flex flex-col gap-7 w-2/6'>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="">Name</label>
                            <input className='rounded-lg text-xs border-gray-300 p-2' type="text" placeholder='Product name' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="">Quantity</label>
                            <input className='rounded-lg text-xs border-gray-300 p-2' type="text" placeholder='Quantity' />
                        </div>
                        <div className='flex justify-between mt-4'>
                            <button className='bg-black text-white py-2 px-4 rounded-3xl text-xs'>Add More</button>
                            <button className='bg-myBlue text-white py-2 px-4 rounded-3xl text-xs'>Submit</button>
                        </div>
                    </div>
                    <div className='flex rounded-2xl shadow-lg h-24 items-center justify-between p-3 w-3/6 '>
                        <div className='flex items-center space-x-3'>
                            <img className='w-16 h-16 rounded-xl ' src={todaypending} alt="Product" />
                            <p className='font-medium'>Product Name</p>
                        </div>
                        <p className='font-medium'>1.30 Kg</p>
                        <Pencil color="#a3aed0" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <FooterOfAdminAndShop />
</>

  )
}

export default ScrapCollection