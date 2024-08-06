import React from 'react'
import {Search} from 'lucide-react'
import { Dropdown, DropdownItem } from "flowbite-react";
import USA_profile from '../../assets/USA_profile.png'
import { useNavigate } from 'react-router-dom';


const UserAndAdminList = ({users}) => {

  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/admin/userdetails/${id}`);
  };

  return (
    <>
        <div className='bg-white rounded-2xl ml-11'>
            <div className='flex justify-between ml-7'>
                <h5 className='text-blue-950 font-bold text-2xl m-3'>All Users</h5>
                <div className='flex mr-11'>
                    <div className='flex bg-bgColor rounded-full m-3 justify-between items-center h-7 '>
                            <Search color="#7E7E7E" size={20}/>
                            <input className='bg-bgColor rounded-full text-myBlue' placeholder='Search'/>
                    </div>
                    <div className='flex items-center text-xs'>
                        <p className='text-gray-500'>Sort by: </p>
                        <Dropdown className='font-semibold' label="Blocked" inline>
                            <DropdownItem>Blocked</DropdownItem>
                            <DropdownItem>UnBlocked</DropdownItem>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div>
                <div className=' flex  mt-5 px-10 text-gray-500 '>
                    <p>Name</p>
                    <p className='pl-80'>Email</p>
                    <p className='pl-60'>Phone</p>
                    <p className='pl-48'>Details</p>
                </div>
                <div className='flex flex-col mt-5 ml-5 justify-around'>
                {users.map(user => (
              <div key={user.id} className='flex space-x-40 items-center'>
                <div className='flex m-3 items-center space-x-3'>
                  <img src={user.user_profile?.profile_picture || USA_profile} alt="profile" />
                  <p>{user.user_profile?.shop_name || 'Shop Name'}</p>
                </div>
                <p>{user.email}</p>
                <p>{user.user_profile?.phone || 'N/A'}</p>
                <button onClick={() => handleDetails(user.id)} className='bg-black text-white rounded-3xl text-xs w-20 font-light p-2'>Details</button>
                <br />
              </div>
            ))}
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default UserAndAdminList