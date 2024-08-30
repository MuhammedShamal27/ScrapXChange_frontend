import React, { useEffect, useState } from 'react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import { Search,SendHorizontal,Phone } from 'lucide-react'
import SA_profile from "../../assets/SA_profile.png";

const ShopChat = () => {

  return (
    <>
        <div className="flex bg-bgColor">
            <ShopNavBar />
            <div className="flex flex-col flex-grow">
                <HeadingAndProfile />
                <div className="flex bg-white m-7 p-5 gap-7 text-xs rounded-lg shadow-lg h-svh">
                    <div className="flex flex-col border-r pr-5 w-1/3">
                        <h1 className="font-bold text-2xl mb-4 text-center">Message</h1>
                        <div className="flex items-center border rounded-full mb-4 p-2">
                            <Search color="#a3aed0" size={20} />
                            <input
                                className="border-none outline-none flex-grow bg-transparent ml-2"
                                placeholder="Search People"
                        />
                        </div>
                        <div className="flex items-center py-2">
                        <img src={SA_profile} alt="" className="w-12 h-12 rounded-full mr-3" />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                            <h1 className="font-semibold">Name</h1>
                            <p className="text-gray-500 text-xs">1:00 PM</p>
                            </div>
                            <p className="text-gray-500">Message</p>
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                            <div className="flex items-center">
                                <img src={SA_profile} alt="" className="w-12 h-12 rounded-full mr-3" />
                                <div>
                                <h1 className="font-semibold">Name</h1>
                                <p className="text-gray-500 text-xs">Online</p>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <Phone color="#a3aed0" size={20} />
                                <Search color="#a3aed0" size={20} />
                            </div>
                        </div>
                        <div className="flex flex-col flex-grow overflow-y-auto space-y-4 mb-4">
                           
                                <div className='flex items-centerjustify-end'>
                                    <img src={SA_profile} alt="" className="w-8 h-8 rounded-full mr-3" />
                                    <p className='p-3 rounded-lg flex-grow max-w-xs bg-gray-300'>message</p>
                                    <p className='p-3 rounded-lg flex-grow max-w-xs bg-bgColor'>message</p>
                                    <img src={SA_profile} alt="" className="w-8 h-8 rounded-full ml-3" />
                                </div>
                            
                        </div>
                        <div className="flex items-center border rounded-full p-3">
                            <input
                                className="border-none outline-none flex-grow bg-transparent"
                                placeholder="Write something here..."
                        
                            />
                            <SendHorizontal size={20} className="text-blue-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <FooterOfAdminAndShop />

    </>
  )
}

export default ShopChat