import React from 'react'
import Shop_requests from '../../assets/Shop_requests.png'
import SA_profile from '../../assets/SA_profile.png'
import '../../styles/adminAndShop.css'
import {LayoutDashboard,House,CircleCheckBig,ChartNoAxesColumn,User} from 'lucide-react'

const ShopRequestList = () => {
  return (
    <>
        <div className='adminFont flex'>
            <div>
                <div className='flex flex-col'>
                    <h1 className='text-2xl text-blue-950 font-bold m-10'>Scrap X Change</h1>
                    <h1 className='flex justify-center'><House />Dashboard</h1>
                    <h1 className='flex justify-center'><CircleCheckBig />Shop Requests</h1>
                    <h1 className='flex justify-center'><ChartNoAxesColumn />Report</h1>
                    <h1 className='flex justify-center'><LayoutDashboard />Shop List</h1>
                    <h1 className='flex m-10 '><User />User List</h1>
                </div>
            </div>
            <div>
                <div className='flex '>
                    <h2>Shop Requests</h2>
                    <div className='flex'>
                        <input type="Search" />
                        <p>notfication</p>
                        <img src={SA_profile} alt="profile_picture" />
                    </div>
                </div>
                <div>
                    <div>
                        <h5>list</h5>
                        <input type="Search" />
                    </div>
                    <div className='flex'>
                        <p>Name</p>
                        <p>Place</p>
                        <p>Email</p>
                        <p>Details</p>
                    </div>
                    <div className='flex'>
                        <div className='flex'>
                            <img src={Shop_requests} alt="profile" />
                            <p>Shop Name</p>
                        </div>
                        <p>Kaloor</p>
                        <p>old@gmail.com</p>
                        <p>icon</p>
                        <br/>
                        <div className='flex'>
                            <img src={Shop_requests} alt="profile" />
                            <p>Shop Name</p>
                        </div>
                        <p>Kaloor</p>
                        <p>old@gmail.com</p>
                        <p>icon</p>
                        <br/>
                        <div className='flex'>
                            <img src={Shop_requests} alt="profile" />
                            <p>Shop Name</p>
                        </div>
                        <p>Kaloor</p>
                        <p>old@gmail.com</p>
                        <p>icon</p>
                        <br/>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
            </div>
        </div>
    </>
  )
}

export default ShopRequestList