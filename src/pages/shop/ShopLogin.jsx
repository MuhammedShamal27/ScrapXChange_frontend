import React from 'react'
import Shop_login_img from '../../assets/Shop_login_img.png'
import '../../styles/adminAndShop.css'

const ShopLogin = () => {
  return (
    <>
    <div className='adminFont '>
        <div className='flex'>
            <div className='w-11/12 relative mt-7'>
                <h1 className='text-3xl text-blue-950 font-bold text-center m-3 mb-20'>Scrap X Change</h1>
                <h1 className='absolute left-1/4 text-2xl text-blue-950 font-extrabold mt-7'>Login</h1>
                <p className='absolute left-1/4 text-xs text-gray-400 mt-16'>Enter your email and password to sign in!</p>
                <div className='absolute left-1/4 text-xs grid grid-rows-8 grid-flow-col gap-x-12 mt-24 font-medium'>
                    <h5 className='mt-4'>Email</h5>
                    <input className='border rounded-md w-80 h-9 px-5' placeholder='mail@pegasus.com' />
                    <h5 className='mt-4'>Password</h5>
                    <input className='border rounded-md w-80 h-9 px-5' placeholder='Min. 8 characters' />
                </div>
                <button className='absolute left-1/4 mt-64 text-xs bg-myBlue text-white w-80 h-9 border rounded-md  '>Sign in</button>
            </div>
            <div >
                <img className='w-full h-svh' src={Shop_login_img}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default ShopLogin