import React from 'react'
import { Info } from 'lucide-react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'


const ScrapRequest = () => {
  return (
    <>
        <div className='adminFont flex bg-bgColor '>
            <ShopNavBar/>
            <div className='w-4/5' >
                <HeadingAndProfile/>
                
                <div className='bg-white rounded-lg m-7 '>
                    <div className='text-blue-950 font-bold text-2xl p-7'>
                        <h1>Requests Table</h1>
                    </div>
                    <table className='flex flex-col'>
                        <thead >
                            <tr className='flex justify-between m-7 font-semibold'>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Address</th>
                                <th>Pincode</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr className='flex justify-between m-7 text-xs'>
                                <td>Messi</td>
                                <td>15/08/2024</td>
                                <td>Kochi</td>
                                <td>987457</td>
                                <div>
                                    <button className=''><Info color="#a3aed0" /></button>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <FooterOfAdminAndShop/>
    </>
  )
}

export default ScrapRequest