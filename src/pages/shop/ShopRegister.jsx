import React from 'react'
import register_page_img from '../../assets/register_page_img.png'
import '../../styles/adminAndShop.css'

const ShopRegister = () => {
  return (
    <>
    <div className='adminFont '>
        <div className='flex'>
            <div className='w-11/12 relative mt-7'>
                <h1 className='text-3xl text-blue-950 font-bold text-center m-3 mb-20'>Scrap X Change</h1>
                <h1 className='absolute left-1/4 text-2xl text-blue-950 font-extrabold'>Register</h1>
                <p className='absolute left-1/4 text-xs text-gray-400 mt-10'>Enter the details give below to become a shop !</p>
                <div className='absolute left-1/4 text-xs grid grid-rows-8 grid-flow-col gap-x-12 mt-20 font-medium'>
                    <h5  className='mt-4'>Shop Name</h5>
                    <input className='border rounded-md w-80 h-9 px-5' placeholder='Name of the shop' />
                    <h5 className='mt-4'>Shop Licences Number</h5>
                    <input className='border rounded-md w-80 h-9 px-5' placeholder='Licences Number' />
                    <h5  className='mt-4'>Address</h5>
                    <input className='border rounded-md w-80 h-9 px-5' placeholder='Shop Address' />
                    <h5 className='mt-4'>Place</h5>
                    <input className='border rounded-md w-80 h-9 px-5' placeholder='Location' />
                    <h5 className='mt-4'>Phone</h5>
                    <input className='border rounded-md w-80 h-9 px-5' placeholder='Mobile number' />
                    <h5 className='mt-4'>Email</h5>
                    <input className='border rounded-md w-80 h-9 px-5' placeholder='mail@pegasus.com' />
                    <h5 className='mt-4'>Password</h5>
                    <input className='border rounded-md w-80 h-9 px-5' placeholder='Min. 8 characters' />
                    <h5 className='mt-4'>Re-Enter Password</h5>
                    <input className='border rounded-md w-80 h-9 px-5' placeholder='Re-enter Min. 8 characters' />
                </div>
                <button className='absolute right-1/4  text-xs bg-myBlue text-white w-80 h-9 border rounded-md mt-96 '>Request</button>
            </div>
            <div >
                <img className='w-full h-svh' src={register_page_img}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default ShopRegister