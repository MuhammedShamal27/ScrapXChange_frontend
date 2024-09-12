import React, { useEffect, useRef, useState } from 'react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import logo from '../../assets/logo.png'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchInvoice } from '../../services/api/shop/shopApi'
import html2pdf from 'html2pdf.js';


const Invoice = () => {
    const { id } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const invoiceRef = useRef(); // Reference for the invoice div
    const navigate = useNavigate();


    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await fetchInvoice(id);
                console.log('the coming data', response);
                setInvoiceData(response);
            } catch (error) {
                console.error('the error facing ', error);
            }
        }
        fetchAllData();
    }, [id]);

    if (!invoiceData) {
        return <div>Loading...</div>;
    }

    const { shop, user, name, address, phone, transactions, scheduled_date, upi } = invoiceData;
    const transaction = transactions[0]; // Assuming there's only one transaction, otherwise, map over multiple transactions.

    // Function to download the invoice as PDF
    const downloadInvoice = () => {
        // Select elements with the 'no-print' class and hide them
        const elementsToHide = document.querySelectorAll('.no-print');
        elementsToHide.forEach(el => el.classList.add('hidden'));
    
        const element = invoiceRef.current;
        const options = {
            margin: 0.5,
            filename: `Invoice_${invoiceData.id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        // Generate the PDF
        html2pdf().from(element).set(options).save().then(() => {
            // Restore the buttons after generating the PDF
            elementsToHide.forEach(el => el.classList.remove('hidden'));
        });
    };

    const GoToTodayPendings = () => {
        navigate('/shop/todaysPending')
    }
    

    return (
        <>
            <div className='flex bg-bgColor'>
                <ShopNavBar />
                <div className='w-8/12'>
                    <HeadingAndProfile />
                    <div className='flex flex-col bg-white m-7 rounded-xl text-xs' ref={invoiceRef}>
                        {/* Invoice Header */}
                        <div className='flex justify-between p-3 border-b'>
                            <div className='flex items-center'>
                                <img className='w-14 h-14' src={logo} alt="logo" />
                                <div>
                                    <h1 className='text-xl font-bold'>INVOICE</h1>
                                    <h5 className='font-semibold'>ScrapXchange</h5>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h1 className='text-right font-medium'>#{invoiceData.id}</h1>
                                <h1 className='font-bold'>INVOICE NUMBER</h1>
                            </div>
                        </div>

                        {/* Invoice Details */}
                        <div className='flex justify-between p-3'>
                            <div className='flex justify-between gap-11 font-semibold ml-3'>
                                <div>
                                    <h1 className='text-base border-b'>Shop</h1>
                                    <p>{shop.shop_name}</p>
                                    <p>License Number: {shop.shop_license_number}</p>
                                    <p>Place: {shop.place}</p>
                                    <p>Phone: {shop.phone}</p>
                                </div>
                                <div>
                                    <h1 className='text-base border-b'>User</h1>
                                    <p>{name}</p>
                                    <p>Address: {address}</p>
                                    <p>Phone: {phone}</p>
                                </div>
                            </div>
                            <div className='flex flex-col font-medium ml-3'>
                                <h1 className='text-base border-b'>Payment Details</h1>
                                <div className='flex'>
                                    <h1>Payment Method:</h1>
                                    <p>{transaction.payment_method}</p>
                                </div>
                                <div className='flex'>
                                    <h1>Picked Date:</h1>
                                    <p>{transaction.date_picked}</p>
                                </div>
                                <div className='flex'>
                                    <h1>Scheduled Date:</h1>
                                    <p>{scheduled_date}</p>
                                </div>
                                <div className='flex'>
                                    <h1>Payment UPI:</h1>
                                    <p>{upi}</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Table */}
                        <table className='w-full m-7'>
                            <thead>
                                <tr className='border-b font-semibold'>
                                    <th className='p-2 text-left'>Name</th>
                                    <th className='p-2 text-left'>Category</th>
                                    <th className='p-2 text-left'>Quantity</th>
                                    <th className='p-2 text-left'>Price (per Kg)</th>
                                    <th className='p-2 text-left'>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction.transaction_products.map((product, index) => (
                                    <tr key={index} className='border-b'>
                                        <td className='p-2'>{product.product.name}</td>
                                        <td className='p-2'>{product.product.category.name}</td>
                                        <td className='p-2'>{product.quantity} Kg</td>
                                        <td className='p-2'>₹ {product.product.price}</td>
                                        <td className='p-2'>₹ {product.quantity * product.product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                        {/* Invoice Footer */}
                        <div className='flex justify-between p-7'>
                            <div className='no-print flex justify-between gap-7'>
                                <button className='bg-black text-white h-7 w-28 rounded-3xl text-xs' onClick={GoToTodayPendings} >Go Back</button>
                                <button className='bg-myBlue text-white h-7 w-28 rounded-3xl text-xs' onClick={downloadInvoice}>Download</button>
                            </div>
                            <div className='font-semibold items-center'>
                                <div className='flex items-center gap-3 '>
                                    <label className='font-medium' >Total Quantity:</label>
                                    <p>{transaction.total_quantity} Kg</p>
                                </div>
                                <div className='flex items-center gap-3 '>
                                    <label className='font-medium' >Total Amount:</label>
                                    <p>₹ {transaction.total_price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterOfAdminAndShop />
        </>
    )
}

export default Invoice;
