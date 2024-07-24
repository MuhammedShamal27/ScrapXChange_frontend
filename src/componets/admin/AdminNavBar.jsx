import React from 'react'
import {LayoutDashboard,House,CircleCheckBig,ChartNoAxesColumn,User} from 'lucide-react'



const AdminNavBar = () => {
  return (
    <>
        <div className=' bg-white'>
            <div className='flex flex-col'>
                <h1 className='text-2xl text-blue-950 font-bold m-10'>Scrap X Change</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><House color="#a3aed0" />Dashboard</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><CircleCheckBig color="#a3aed0" />Shop Requests</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><ChartNoAxesColumn color="#a3aed0" />Report</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><LayoutDashboard color="#a3aed0" />Shop List</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><User color="#a3aed0" />User List</h1>
            </div>
        </div>
    </>
  )
}

export default AdminNavBar