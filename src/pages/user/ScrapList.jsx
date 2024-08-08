import React from 'react';
import UserNavBar from '../../componets/user/UserNavBar';
import books from '../../assets/books.png';
import UserFooter from '../../componets/user/UserFooter';
import {X} from 'lucide-react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const ScrapList = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <UserNavBar />

        <div className="flex-grow">
          <h1 className="text-center font-medium text-2xl mt-10">Category</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 px-4 sm:px-10 lg:px-20 py-10">
            <div className="border-2 p-3 rounded-lg">
              <img className="w-full h-auto" src={books} alt="Book" />
              <h1 className="font-semibold text-lg mt-2">Name</h1>
              <p className="text-gray-600">Price</p>
            </div>
          </div>
          
        <div className='flex justify-around'>
            <div className='c'>
                <h1 className='font-medium text-lg'>Selected item</h1>
                <div className='flex flex-col  '>
                    <p className='flex justify-between '>Paper <X /></p>
                    <p className='flex justify-between '>Paper <X /></p>
                    <p className='flex justify-between '>Paper <X /></p>
                    <p className='flex justify-between '>Paper <X /></p>
                    <p className='flex justify-between '>Paper <X /></p>

                </div>
            </div>
            <div className=''>
            <div className="relative max-w-sm">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    <svg
      className="w-4 h-4 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
    </svg>
  </div>
  <input    
    id="datepicker-autohide"
    datepicker=""
    datepicker-autohide=""
    type="text"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Select date"
  />
</div>

            </div>
        </div>
        </div>
        <UserFooter/>
      </div>
    </>
  );
};

export default ScrapList;
