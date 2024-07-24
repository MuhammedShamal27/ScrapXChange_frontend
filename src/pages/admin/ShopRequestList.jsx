import React from 'react'
import {Search,Info} from 'lucide-react'
import AdminNavBar from '../../componets/admin/AdminNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import Shop_requests from '../../assets/Shop_requests.png'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import '../../styles/adminAndShop.css'

const ShopRequestList = () => {
  return (
    <>
        <div className='adminFont flex bg-bgColor'>
            <AdminNavBar/>
            <div className='w-4/5' >
                <HeadingAndProfile/>
                <div className='bg-white ml-11 rounded-2xl  '>
                    <div className='flex justify-between ml-9'>
                        <h5 className='text-blue-950 font-bold text-2xl m-3'>List</h5>
                        <div className='flex bg-bgColor rounded-full m-3 justify-between items-center h-7 '>
                                <Search color="#4318FF" size={20}/>
                                <input className='bg-bgColor rounded-full text-myBlue' placeholder='Search'/>
                        </div>
                    </div>
                    <div className=' flex  mt-5 text-myBlue px-10 '>
                        <p>Name</p>
                        <p className='pl-80'>Email</p>
                        <p className='pl-68p'>Place</p>
                        <p className='pl-48'>Details</p>
                    </div>
                    <div className='flex flex-col mt-5 ml-5 justify-around'>
                        <div className='flex justify-between m-2 shadow-xl rounded-lg items-center '>
                            <div className='flex m-3 items-center space-x-3'>
                                <img src={Shop_requests} alt="profile" />
                                <p>Shop Name</p>
                            </div>
                            <p>old@gmail.com</p>
                            <p >Kaloor</p>
                            <p ><Info color="#a3aed0" /></p>
                            <br/>
                        </div>
                        <div className='flex justify-between m-3 shadow-xl rounded-lg items-center'>
                            <div className='flex m-3 items-center space-x-3'>
                                <img src={Shop_requests} alt="profile" />
                                <p>Shop Name</p>
                            </div>
                            <p>old@gmail.com</p>
                            <p>Kaloor</p>
                            <p><Info color="#a3aed0" /></p>
                            <br/>
                        </div>
                        <div className='flex justify-between m-3 shadow-xl rounded-lg items-center'>
                            <div className='flex m-3 items-center space-x-3'>
                                <img src={Shop_requests} alt="profile" />
                                <p>Shop Name</p>
                            </div>
                            <p>old@gmail.com</p>
                            <p>Kaloor</p>
                            <p><Info color="#a3aed0" /></p>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterOfAdminAndShop/>
    </>
  )
}

export default ShopRequestList