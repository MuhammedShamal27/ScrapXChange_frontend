import React, { useEffect, useState } from 'react'
import AdminNavBar from '../../componets/admin/AdminNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import { ReportBlockUnblock, Reports } from '../../services/api/admin/adminApi'
import {toast} from 'sonner'

const ReportList = () => {
    const [reports , setReports] =useState([]);

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

    const handleBlockUnblock = async (receiverId, reportId) => {
        try{
            const response = await ReportBlockUnblock(receiverId, reportId);
            // Update the specific report's block status directly in the state
            setReports((prevReports) =>
                prevReports.map((report) =>
                    report.id === reportId
                        ? { ...report, receiver_is_blocked: !report.receiver_is_blocked ,is_checked: false }
                        : report
                )
            );
            toast.success(response.message)
        }catch(err){
            console.error('some error occured during blocking or unblocking ',err)
            toast.error('Something went wrong , please try again.')
        }
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
                            <div key={index} className='grid grid-cols-4 gap-4 p-3 items-center text-xs  '>
                                <p>{report.sender_name}</p>
                                <p>{report.receiver_name}</p>
                                <p>{report.reason}</p>
                                <button className={`rounded-2xl text-white px-4 py-1 w-2/4 ${report.receiver_is_blocked ? 'bg-black' : 'bg-red-500'}`} 
                                onClick={() => handleBlockUnblock(report.receiver, report.id)}>{report.receiver_is_blocked ? 'Unblock' : 'Block'}</button>
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
