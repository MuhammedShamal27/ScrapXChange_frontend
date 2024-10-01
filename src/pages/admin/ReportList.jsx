import React, { useEffect, useState } from 'react'
import AdminNavBar from '../../componets/admin/AdminNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import { ReportBlockUnblock, Reports } from '../../services/api/admin/adminApi'
import {toast} from 'sonner'
import { EllipsisVertical } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ReportList = () => {
    const [reports , setReports] =useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchAllReports = async () =>{
            try{
                const response = await Reports();
                setReports(response);
            }catch(err){
                console.error('some error occured ',err)
            }
        }
        fetchAllReports();
    },[])

    const handleNavigate = (receiver_id) => {
        // Navigate to the report details page, passing the receiver_id as a URL param
        navigate(`/admin/reports/${receiver_id}`);
    }


  return (
    <>
        <div className='adminFont flex bg-bgColor '>
            <AdminNavBar/>
            <div className='w-10/12'>
                <HeadingAndProfile/>
                <div className=" bg-white m-7 rounded-lg">
                    <h1 className="text-xl font-semibold p-3 ml-7">Reports</h1>
                    <div className='flex flex-col ml-7'>
                        <div className='grid grid-cols-4 gap-4 p-3 font-semibold border-b '>
                            <h1>From</h1>
                            <h1>Towards</h1>
                            <h1>Reason</h1>
                            <h1>Action</h1>
                        </div>
                        {reports.map((report,index)=>(
                            <div key={index} onClick={() => handleNavigate(report.receiver_id)}
                             className='grid grid-cols-4 gap-4 p-3 items-center text-xs  '>
                                <p>{report.sender_name}</p>
                                <p>{report.receiver_name}</p>
                                <p>{report.reason}</p>
                                <p ><EllipsisVertical /></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <FooterOfAdminAndShop/>
    </>
  )
}

export default ReportList
