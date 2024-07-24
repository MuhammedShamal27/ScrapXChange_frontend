import React from 'react'
import {House,CircleCheckBig,ChartNoAxesColumn,LayoutDashboard,User,MessageSquareMore,ScrollText} from 'lucide-react'


const ShopNavBar = () => {
  return (
    <>
        <div className='adminFont bg-white'>
            <div className='flex flex-col'>
                <h1 className='text-2xl text-blue-950 font-bold m-10'>Scrap X Change</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><House color="#a3aed0" />Dashboard</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><CircleCheckBig color="#a3aed0" />Requests</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><ChartNoAxesColumn color="#a3aed0" />Transcation Table</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><LayoutDashboard color="#a3aed0" />Today Pendings</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><User color="#a3aed0" />Users</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><MessageSquareMore color="#a3aed0" />Messages</h1>
                <h1 className='flex ml-9 mt-7 gap-x-5'><ScrollText color="#a3aed0" />Scrap List</h1>
            </div>
        </div>
    </>
  )
}

export default ShopNavBar