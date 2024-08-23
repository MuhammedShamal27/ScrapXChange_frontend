import React, { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import { getScrapRequests } from '../../services/api/shop/shopApi'
import { useNavigate } from 'react-router-dom'


const ScrapRequest = () => {

    const [scrapRequests, setScrapRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScrapRequests = async () => {
            try {
                const data = await getScrapRequests();
                setScrapRequests(data);
            } catch (err) {
                console.error("Error fetching scrap requests:", err);
            }
        };

        fetchScrapRequests();
    }, []);

    const handleDetails = (id) => {
        navigate(`/shop/scrapRequestDetails/${id}`)
    }
    
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
                        {scrapRequests.length > 0 ? (
                            scrapRequests.map((request, index) => (
                                <tr key={index} className='flex justify-between m-7 text-xs'>
                                    <td>{request.name}</td>
                                    <td>{new Date(request.date_requested).toLocaleDateString()}</td>
                                    <td>{request.address}</td>
                                    <td>{request.pincode}</td>
                                    <td>
                                        <button onClick={()=>handleDetails(request.id)}><Info color="#a3aed0" /></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className='p-4 text-center'>No requests found</td>
                            </tr>
                        )}
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