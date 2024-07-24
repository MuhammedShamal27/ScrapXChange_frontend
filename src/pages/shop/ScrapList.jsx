import React from 'react'
import {Search,Bell,Plus,Pencil,IndianRupee} from 'lucide-react'
import Shop_requests from '../../assets/Shop_requests.png'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import '../../styles/adminAndShop.css'

const ScrapList = () => {
  return (
    <>
        <div className='adminFont flex bg-bgColor'>
            <ShopNavBar/>
            <div className='w-4/5' >
                <HeadingAndProfile/>
                <div className='bg-white ml-11 rounded-2xl  '>
                    <div className='flex justify-between ml-9'>
                        <h5 className='text-blue-950 font-bold text-2xl m-3'>Listed Product</h5>
                        <div className='flex justify-between'>
                            <div className='flex bg-bgColor rounded-full m-3 items-center h-7 '>
                                    <Search color="#4318FF" size={20}/>
                                    <input className='bg-bgColor rounded-full text-myBlue' placeholder='Search'/>
                            </div>
                            <div className='bg-bgColor rounded-md h-9 w-20 pl-7 mt-2 mr-7 place-items-center'>
                                    <Plus color="#4318ff" size={30}/>
                            </div>
                        </div>
                    </div>
                    <div className=' flex mt-5 text-myBlue px-10 '>
                        <p>Name</p>
                        <p className='pl-80'>Category</p>
                        <p className='pl-52'>Price</p>
                        <p className='pl-52'>Edit</p>
                    </div>
                    <div className='flex flex-col mt-5  justify-around'>
                        <div className='flex justify-between m-2 shadow-xl rounded-lg items-center '>
                            <div className='flex m-3 items-center space-x-3'>
                                <img src={Shop_requests} alt="profile" />
                                <p>Text Book</p>
                            </div>
                            <p>Paper</p>
                            <p className='flex items-center' ><IndianRupee color="#a3aed0"  size={15}/> 98</p>
                            <p ><Pencil color="#a3aed0" /></p>
                            <br/>
                        </div>
                        <div className='flex justify-between m-2 shadow-xl rounded-lg items-center '>
                            <div className='flex m-3 items-center space-x-3'>
                                <img src={Shop_requests} alt="profile" />
                                <p>Text Book</p>
                            </div>
                            <p>Paper</p>
                            <p className='flex items-center' ><IndianRupee color="#a3aed0"  size={15}/> 98</p>
                            <p ><Pencil color="#a3aed0" /></p>
                            <br/>
                        </div>
                        <div className='flex justify-between m-2 shadow-xl rounded-lg items-center '>
                            <div className='flex m-3 items-center space-x-3'>
                                <img src={Shop_requests} alt="profile" />
                                <p>Text Book</p>
                            </div>
                            <p>Paper</p>
                            <p className='flex items-center' ><IndianRupee color="#a3aed0"  size={15}/> 98</p>
                            <p ><Pencil color="#a3aed0" /></p>
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

export default ScrapList