import React from 'react'
import Report from '../assets/Report.png';
import {toast} from 'sonner'
import { useState } from 'react';
import { reportUser } from '../services/api/user/userApi';
import { reportShop } from '../services/api/shop/shopApi';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import socket from '../utils/hooks/Socket';

const ReportMessage = ({ onClose, Name, receiver, type }) => {
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');

    const userToken = useSelector((state) => state.auth.token);
    const shopToken = useSelector((state) => state.shop.token);
  
    let userId = null;
    let shopId = null;
  
    // Decode tokens to get user/shop IDs
    if (userToken) {
        try {
            const decodedUserToken = jwtDecode(userToken);
            userId = decodedUserToken.user_id;
            console.log('the user',userId)
        } catch (error) {
            console.error("Invalid user token:", error);
        }
    }
  
    if (shopToken) {
        try {
            const decodedShopToken = jwtDecode(shopToken);
            shopId = decodedShopToken.user_id;
            console.log('the shop',shopId)
        } catch (error) {
            console.error("Invalid shop token:", error);
        }
    }

    const handleSubmit = async () => {
        try {
          let finalReason = reason === 'other' ? "other" : reason;
          let description = reason === 'other' ? otherReason : '';

          let response;
          // Check the type and call the appropriate report function
          if (type === 'user') {
            response = await reportUser({ receiver, reason: finalReason,description });
            socket.emit('notification', {
                sender_id: userId,  
                receiver_id: receiver,  
                message: 'A report Aganist a shop is submitted.',
                notification_type : 'report'
              });
          } else if (type === 'shop') {
            response = await reportShop({ receiver, reason: finalReason,description });
            socket.emit('notification', {
                sender_id: shopId,  
                receiver_id: receiver,  
                message: 'A report Aganist a user is submitted.', 
                notification_type : 'report' 
              });
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
                <p className="text-sm text-gray-600">
                    Please select a reason and provide details if "Other" is selected.
                </p>
                <h1 className="font-semibold text-lg mb-2">{Name}</h1>
                
                {/* Dropdown for selecting reason */}
                <select
                    className="w-full border border-gray-300 p-2 text-gray-700 text-xs rounded-full"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                >
                    <option value="" disabled>Select Reason</option>
                    <option value="fraud">Fraud</option>
                    <option value="inappropriate">Inappropriate Content</option>
                    <option value="spam">Spam</option>
                    <option value="other">Other</option>
                </select>

                {/* Show text area only when "Other" is selected */}
                {reason === 'other' && (
                    <textarea
                        className="rounded-full w-full border border-gray-300 p-2 text-gray-700 text-xs mt-2"
                        rows="3"
                        placeholder="Please describe the reason"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                    />
                )}

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