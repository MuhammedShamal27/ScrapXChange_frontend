import React, { useEffect, useState } from 'react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import todaypending from '../../assets/todaypending.png'
import { getPendingDetails, todayPendings } from '../../services/api/shop/shopApi'
import RequestDetails from '../../componets/shop/RequestDetails'
import FooterofAdminAndShop from '../../componets/FooterOfAdminAndShop'
const TodayPendings = () => {

    const [pendings,setPendings] = useState([]);
    const [error , setError] = useState(null);
    const [isDetailsModalOpen,setIsDetailsModalOpen] = useState(false);
    const [selectedRequestDetails, setSelectedRequestDetails] = useState(null);

    useEffect( ()=>   {
        const fetchPendings = async() => {
            try{
                const response=await todayPendings()
                console.log('response',response)
                setPendings(response)
            }catch(err){
                console.error('Error while fetching data',err)
                setError(err.message)
            }
        }
        fetchPendings();
    },[]);

    
    const openDetailsModal = async (id) => {
        try {
            const response = await getPendingDetails(id);
            console.log('the response in frontend',response)
            setSelectedRequestDetails(response);
            setIsDetailsModalOpen(true);
        } catch (err) {
            console.error('Error while fetching details', err);
            setError(err.message);
        }
    };

  return (
    <>
        <div className="adminFont flex bg-bgColor min-h-screen">
            <ShopNavBar />
            <div>
                <HeadingAndProfile />
                <div className="grid grid-cols-3 gap-7 ml-10">
                    {pendings.map((pending, index) => (
                        <div key={index} className="rounded-lg shadow-2xl p-3 space-y-3">
                            <img className="rounded" src={todaypending} alt="Pending" />
                            <h1 className="text-center font-semibold">{pending.name}</h1>
                            <div className="flex justify-between">
                                <button onClick={() => openDetailsModal(pending.id)} className="bg-black text-white py-2 px-4 rounded-3xl text-xs">Details</button>
                                <button className="bg-myBlue text-white py-2 px-4 rounded-3xl text-xs">Collect</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <FooterofAdminAndShop/>
        {isDetailsModalOpen  && selectedRequestDetails && (
            <RequestDetails
            isOpen={isDetailsModalOpen}
            details={selectedRequestDetails}
            onClose={() => setIsDetailsModalOpen(false)}/>
        )}
    </>
  )
}

export default TodayPendings