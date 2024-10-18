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
          setShopRequests(Array.isArray(response) ? response : []);
          
        } catch (error) {
          console.error('Failed to fetch shop requests:', error);
          setShopRequests([]);
        }
      };
  
      loadShopRequests();
    }, []);
    const handleInfoClick = (id) => {
        navigate(`/admin/shoprequestdetails/${id}`); // Navigate to the details page with the request ID
      };

  return (
<>
  <div className="adminFont flex flex-col lg:flex-row bg-bgColor min-h-screen">
    <AdminNavBar />
    
    <div className="w-full lg:w-4/5">
      <HeadingAndProfile />
      
      <div className="bg-white lg:ml-11 rounded-2xl p-6">
        <div className="flex justify-between lg:ml-9 mb-4">
          <h5 className="text-blue-950 font-bold text-2xl m-3">List</h5>
        </div>
        <div className="hidden lg:flex mt-5 text-myBlue px-10 border-b pb-4">
          <p className="w-1/4 text-left">Name</p> {/* Align to left */}
          <p className="w-1/4 text-center">Email</p>
          <p className="w-1/4 text-center">Pincode</p>
          <p className="w-1/4 text-center">Details</p>
        </div>

        <div className="lg:hidden mt-5 mb-4 text-myBlue border-b pb-4">
          <p className="w-full text-left">Requests</p>
        </div>

        <div className="flex flex-col mt-5 space-y-3">
          {shopRequests.length === 0 ? (
            <p className="text-center font-bold text-xl m-10">No Available Requests.</p>
          ) : (
            shopRequests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col lg:flex-row justify-between items-center m-3 p-4 shadow-xl rounded-lg bg-gray-50 w-full"
              >
                <div className="lg:w-1/4 flex items-center space-x-3">
                  <img src={request.profile_picture ? `${baseURL}${request.profile_picture}` : Shop_requests} alt="profile" className="h-12 w-12 rounded-full" />
                  <p className="text-gray-700 font-medium">{request.shop.shop_name}</p>
                </div>
                <p className="w-full lg:w-1/4 text-center text-gray-700">{request.email}</p>
                <p className="w-full lg:w-1/4 text-center text-gray-700">{request.shop.pincode}</p>
                  <div className="w-full lg:w-1/4 flex justify-center">
                  <Info
                    className="cursor-pointer"
                    color="#a3aed0"
                    onClick={() => handleInfoClick(request.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
  
  <FooterOfAdminAndShop />
</>

  )
}

export default ShopRequestList