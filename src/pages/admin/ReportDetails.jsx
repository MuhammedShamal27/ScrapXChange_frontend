import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavBar from '../../componets/admin/AdminNavBar';
import HeadingAndProfile from '../../componets/HeadingAndProfile';
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop';
import { getReportDetails } from '../../services/api/admin/adminApi'; // API function to fetch report details

const ReportDetails = () => {
    const { receiver_id } = useParams(); // Get receiver_id from URL
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [reasonCounts, setReasonCounts] = useState({ fraud: 0, inappropriate: 0, spam: 0, other: 0, total: 0 });
    const [similarReports, setSimilarReports] = useState([]);

    useEffect(() => {
        const fetchReportDetails = async () => {
            try {
                const response = await getReportDetails(receiver_id); // Fetch report details using receiver_id
                setReport(response.report);
                setReasonCounts(response.reason_counts);
                setSimilarReports(response.similar_reports);
            } catch (error) {
                console.error('Error fetching report details:', error);
            }
        };

        fetchReportDetails();
    }, [receiver_id]);

    return (
        <div className='adminFont flex bg-bgColor'>
            <AdminNavBar />
            <div className='w-10/12'>
                <HeadingAndProfile />
                <div className='flex m-10 gap-10'>
                    <div className='bg-white w-6/12 rounded-lg flex flex-col justify-around'>
                        <div className='ml-7 space-y-3 p-3'>
                            <h1 className='font-semibold'>Report Details</h1>
                            <div className='flex items-center text-sm space-x-10'>
                                <h1>From : </h1>
                                <p>{report?.sender_name || 'Loading...'}</p>
                            </div>
                            <div className='flex items-center text-sm space-x-5'>
                                <h1>Towards :</h1>
                                <p>{report?.receiver_name || 'Loading...'}</p>
                            </div>
                            <div className='flex items-center text-sm space-x-7'>
                                <h1>Reason :</h1>
                                <p>{report?.reason || 'Loading...'}</p>
                            </div>
                        </div>
                        <div className='flex justify-around text-sm p-3'>
                            <button className='rounded-2xl bg-black text-white w-1/6 h-7' onClick={() => navigate(-1)}>
                                Go Back
                            </button>
                            <button className='rounded-2xl bg-orange-400 text-white w-2/6 h-7'>Make a Warning</button>
                            <button className='rounded-2xl bg-red-500 text-white w-1/6 h-7'>Block</button>
                        </div>
                    </div>

                    {/* Reason Counts */}
                    <div className='bg-white w-6/12 rounded-lg'>
                        <h1 className='font-semibold ml-5 p-3'>Current Report</h1>
                        <div className='flex flex-col ml-5 p-3'>
                            <div className='flex text-sm justify-between border-b'>
                                <h2>Fraud</h2>
                                <h2>Inappropriate Content</h2>
                                <h2>Spam</h2>
                                <h2>Other</h2>
                                <h2>Total Reports</h2>
                            </div>
                            <div className='flex text-sm justify-between'>
                                <p>{reasonCounts.fraud}</p>
                                <p>{reasonCounts.inappropriate}</p>
                                <p>{reasonCounts.spam}</p>
                                <p>{reasonCounts.other}</p>
                                <p>{reasonCounts.total}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Reports */}
                <div className='bg-white m-10 rounded-lg text-sm'>
                    <h1 className='font-semibold ml-7 p-3'>Similar Reports</h1>
                    <div className='flex justify-around border-b'>
                        <h1>From</h1>
                        <h1>Towards</h1>
                        <h1>Reason</h1>
                    </div>
                    {similarReports.map((similar, index) => (
                        <div className='flex justify-around' key={index}>
                            <h1>{similar.sender_name}</h1>
                            <h1>{similar.receiver_name}</h1>
                            <h1>{similar.reason}</h1>
                        </div>
                    ))}
                </div>
            </div>
            <FooterOfAdminAndShop />
        </div>
    );
};

export default ReportDetails;
