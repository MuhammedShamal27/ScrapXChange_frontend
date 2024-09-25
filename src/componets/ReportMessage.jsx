import React from 'react'
import Report from '../assets/Report.png';
import {toast} from 'sonner'
import { useState } from 'react';
import { reportUser } from '../services/api/user/userApi';
import { reportShop } from '../services/api/shop/shopApi';

const ReportMessage = ({ onClose, Name, receiver, type }) => {
    const [reason, setReason] = useState('');

    const handleSubmit = async () => {
        try {

          let response;
          // Check the type and call the appropriate report function
          if (type === 'user') {
            response = await reportUser({ receiver, reason });
          } else if (type === 'shop') {
            response = await reportShop({ receiver, reason });
          }

          toast.success('Report sent successfully');
          onClose(); // Close the modal on success
        } catch (err) {
          console.error('An error happened while sending:', err);
          toast.error('Error occurred while sending the report');
        }
      };
    
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex shadow-lg m-4 rounded-2xl items-center w-full md:w-8/12 lg:w-6/12 bg-white p-6 relative">
        <div className="p-6 space-y-4 w-full md:w-8/12">
          <h2 className="text-3xl font-bold">Message</h2>
          <p className="text-sm text-gray-600">Please state your reason in the below box and click submit.</p>
          <h1 className="font-semibold text-lg mb-2">{Name}</h1>
          <textarea 
            className="rounded-full w-full border border-gray-300 p-2 text-gray-700 text-xs"
            rows="3" 
            placeholder="Reason for Reporting"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className="flex flex-col gap-3">
            <button 
              className="text-white bg-red-500 rounded-full w-24 text-xs h-7"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button 
              className="text-white bg-black rounded-full w-24 text-xs h-7"
              onClick={onClose}
            >
              Go back
            </button>
          </div>
        </div>
        <div className="hidden md:block md:w-4/12 p-1">
          <img src={Report} alt="Illustration" className="w-full h-auto" />
        </div>
      </div>
    </div>
  </>
  )
}

export default ReportMessage