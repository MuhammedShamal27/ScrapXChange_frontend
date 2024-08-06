import React, { useEffect, useState } from 'react'
import {Search,Info} from 'lucide-react'
import AdminNavBar from '../../componets/admin/AdminNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import Shop_requests from '../../assets/Shop_requests.png'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import '../../styles/adminAndShop.css'
import { ShopRequestList as fetchShopRequests } from '../../services/api/admin/adminApi';
import { useNavigate } from 'react-router-dom'

const ShopRequestList = () => {

    const [shopRequests, setShopRequests] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
      const loadShopRequests = async () => {
        try {
          const response = await fetchShopRequests();
          setShopRequests(response);
        } catch (error) {
          console.error('Failed to fetch shop requests:', error);
        }
      };
  
      loadShopRequests();
    }, []);
    const handleInfoClick = (id) => {
        navigate(`/admin/shoprequestdetails/${id}`); // Navigate to the details page with the request ID
      };

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
                    {shopRequests.length === 0 ? (
                <p>No shop requests available.</p>
              ) : (
                shopRequests.map((request) => (
                  <div key={request.id} className='flex justify-between m-3 shadow-xl rounded-lg items-center'>
                    <div className='flex m-3 items-center space-x-3'>
                      <img src={Shop_requests} alt="profile" />
                      <p>{request.shop.name}</p>
                    </div>
                    <p>{request.email}</p>
                    <p>{request.shop.place}</p>
                    <p><Info color="#a3aed0" onClick={() => handleInfoClick(request.id)} /></p>
                  </div>
                ))
              )}
                    </div>
                </div>
            </div>
        </div>
        <FooterOfAdminAndShop/>
    </>
  )
}

export default ShopRequestList