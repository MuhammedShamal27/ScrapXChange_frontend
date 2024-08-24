import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { reScheduleRequest } from '../../services/api/shop/shopApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RescheduleModal = ({isOpen, id, onClose}) => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);

    const handleReShedule = async (e) => {
        e.preventDefault();
        const date=selectedDate.format('YYYY-MM-DD')
        try {
            console.log(date)
            const response = await reScheduleRequest(id,date);
            toast("Scheduled successfully.");
            onClose(); 
            navigate("/shop/scrapRequests");
        } catch (err) {
            console.error("Error while scheduling.", err);
            if (err.response && err.response.data) {
                const errorMessage = err.response.data.scheduled_date?.[0] || "Error occurred while scheduling.";
                toast.error(errorMessage);  
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    const handleGoBack = () => {
        onClose(); 
    };

    if (!isOpen) return null;
    
  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker orientation="landscape" value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />
                </LocalizationProvider>
                <div className="flex justify-around space-x-7">
                    <button className="bg-myBlue text-white rounded-3xl text-xs h-7 w-36">Message</button>
                    <button onClick={handleReShedule} className=" bg-green-500 text-white rounded-3xl text-xs h-7 w-36">Schedule</button>
                    <button onClick={handleGoBack} className="bg-black text-white rounded-3xl text-xs h-7 w-36">Go Back</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default RescheduleModal