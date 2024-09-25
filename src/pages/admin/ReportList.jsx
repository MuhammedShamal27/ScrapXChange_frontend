import React from 'react'
import AdminNavBar from '../../componets/admin/AdminNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'

const ReportList = () => {
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
                        <div className='grid grid-cols-4 gap-4 p-3 items-center text-xs  '>
                            <p>Bekcam</p>
                            <p>Carlos</p>
                            <p>That was a foul</p>
                            <button className='bg-red-500 rounded-2xl text-white px-4 py-1 w-1/3'>Block</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterOfAdminAndShop/>
    </>
  )
}

export default ReportList



                    {/* <table className="w-full">
                        <thead className=" text-sm text-left">
                            <tr className='m-7 border-b'>
                                <th className="pl-10">From</th>
                                <th className="pl-10">Towards</th>
                                <th className="pl-10">Reason</th>
                                <th className="pl-10">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-xs mt-7 shadow-sm'>
                                <td className="pl-10 ">Bekcam</td>
                                <td className="pl-10 ">Carlos</td>
                                <td className="pl-10 ">That was a foul</td>
                                <td className="pl-10 ">
                                <button className="bg-red-500 text-white rounded-2xl px-3 py-1">
                                    Block
                                </button>
                                </td>
                            </tr>
                        </tbody>
                    </table> */}