import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Dropdown, DropdownItem } from "flowbite-react";
import main_profile from '../../assets/USA_profile.png';
import { useNavigate } from 'react-router-dom';

const UserAndShoplist = ({ list, type, setFilter, setSearchQuery }) => {
  const navigate = useNavigate();

  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the current items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = list.slice(startIndex, startIndex + itemsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(list.length / itemsPerPage);

  const handleDetails = (id) => {
    navigate(`/admin/${type === 'users' ? 'userdetails' : 'shopdetails'}/${id}`);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleSearchChange = (e) => {
    console.log('Search Query:', e.target.value);
    setSearchQuery(e.target.value);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl ml-11 p-6">
        <div className="flex justify-between items-center mb-5 text-xs">
          <h5 className="text-blue-950 font-bold text-2xl">
            {type === 'users' ? 'All Users' : 'All Shops'}
          </h5>
          <div className="flex items-center space-x-5">
            <div className="flex bg-bgColor rounded-full px-4 py-2 items-center">
              <Search color="#7E7E7E" size={20} />
              <input
                className="bg-bgColor rounded-full text-myBlue pl-3 border-0 focus:outline-none focus:border-none"   
                onChange={handleSearchChange}
                placeholder="Search"
              />
            </div>
            <div className="flex items-center text-sm space-x-2">
              <p className="text-gray-500">Sort by: </p>
              <Dropdown className="font-semibold" label="Sort" inline>
                <DropdownItem onClick={() => handleFilterChange('all')}>All</DropdownItem>
                <DropdownItem onClick={() => handleFilterChange('blocked')}>Blocked</DropdownItem>
                <DropdownItem onClick={() => handleFilterChange('unblocked')}>UnBlocked</DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-4 text-gray-500 text-sm px-10 pb-3 border-b border-gray-200">
            <p>Name</p>
            <p className="pl-20">Email</p>
            <p className="pl-16">Phone</p>
            <p className="pl-12">Details</p>
          </div>
          <div className="mt-4 space-y-10">
            {currentItems.map((item) => (
              <div key={item.id} className="grid grid-cols-4 items-center px-10 text-xs">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      type === 'users'
                        ? item.user_profile?.profile_picture
                        : item.shop?.profile_picture || main_profile
                    }
                    alt="profile"
                  />
                  <p>{type === 'users' ? item.username : item.shop?.shop_name || 'N/A'}</p>
                </div>
                <p className="pl-20">{item.email || 'N/A'}</p>
                <p className="pl-16">{type === 'users' ? item.user_profile?.phone : item.shop?.phone || 'N/A'}</p>
                <button
                  onClick={() => handleDetails(item.id)}
                  className="bg-black text-white rounded-3xl text-xs w-20 font-light ml-10 p-2"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-3">
            {currentPage > 1 && (
              <button onClick={handlePrevClick} className="border rounded-lg bg-white p-2 text-gray-500">
                Prev
              </button>
            )}
            <p className="border rounded-lg bg-white p-2 text-gray-500">
              {currentPage}
            </p>
            {currentPage < totalPages && (
              <button onClick={handleNextClick} className="border rounded-lg bg-white p-2 text-gray-500">
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserAndShoplist;
