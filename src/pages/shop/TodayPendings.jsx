import React from 'react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import todaypending from '../../assets/todaypending.png'

const TodayPendings = () => {
  return (
    <>
        <div className="adminFont flex bg-bgColor min-h-screen">
            <ShopNavBar/>
            <div>
                <HeadingAndProfile/>
                <div className='grid grid-cols-3 gap-7 ml-10'>
                    <div className='rounded-lg shadow-2xl p-3 space-y-3'>
                        <img className='rounded' src={todaypending} alt="" />
                        <h1 className='text-center font-semibold'>Name</h1>
                        <div className='flex justify-between'>
                            <button className='bg-black text-white py-2 px-4 rounded-3xl text-xs'>Details</button>
                            <button className='bg-myBlue text-white py-2 px-4 rounded-3xl text-xs'>Collect</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default TodayPendings