import React, { useEffect, useState } from 'react';
import ShopNavBar from '../../componets/shop/ShopNavBar';
import HeadingAndProfile from '../../componets/HeadingAndProfile';
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmCollection, PaymentCash, PaymentRazorpay, VerifyPayment } from '../../services/api/shop/shopApi';
import success from '../../assets/success.png'
import {loadRazorpayScript} from '../../utils/razorpay'

const ScrapCollectioinConfirmation = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [payment, setPayment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCollectionReport = async () => {
      try {
        const response = await ConfirmCollection(id);
        console.log('the response ', response);
        setTransaction(response);
      } catch (err) {
        console.error('There is an error', err);
        setError(err.message || 'An unexpected error occurred');
      }
    };
    fetchCollectionReport();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!transaction) {
    return <div>Loading...</div>;
  }

  const products = transaction.transaction_products || [];
  console.log('the products', products);

  const handleCash = async () => {
    try {
      const response = await PaymentCash(id);
      setPayment(response);
      setModalVisible(true);
    } catch (err) {
      console.error('Error occurred during cash payment.', err);
      setError(err.message || 'An unexpected error occurred');
    }
  };

  const handleRazorpaySuccess = () => {
    setModalVisible(true);
  };

  const handleRazorpayFailure = () => {
    setError('Payment verification failed. Please try again.');
  };

  const initiateRazorpayPayment = async () => {
    try {
      const totalAmount = parseFloat(transaction.total_price) * 100; 
      console.log('Initiating Razorpay payment...');
      const response = await PaymentRazorpay(id);
      console.log('Razorpay order creation response:', response);

      const { order_id, amount: razorAmount } = response;

      const res = await loadRazorpayScript();

      if (!res) {
        console.error('Razorpay SDK failed to load. Check your internet connection.');
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorAmount.toString(),
        currency: 'INR',
        order_id: order_id,
        handler: async function (response) {
          try {
            const verifyResponse = await VerifyPayment(response);
            if (verifyResponse.status === 'success') {
              handleRazorpaySuccess();
            } else {
              handleRazorpayFailure();
            }
          } catch (err) {
            console.error('Error during payment verification:', err);
            handleRazorpayFailure();
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Shop Address',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      setError('Failed to initiate Razorpay payment.');
    }
  };

  return (
    <>
      <div className='flex bg-bgColor'>
        <ShopNavBar />
        <div className='flex-grow'>
          <HeadingAndProfile />
          <div className='bg-white rounded-xl text-xs m-3 p-6'>
            <h1 className='font-semibold text-2xl mb-4'>Total</h1>
            <table className='w-full table-auto'>
              <thead>
                <tr className='text-left'>
                  <th className='p-2'>Name</th>
                  <th className='p-2'>Category</th>
                  <th className='p-2'>Quantity</th>
                  <th className='p-2'>Price</th>
                  <th className='p-2'>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className='border-t border-b'>
                    <td className='p-2'>{product.product.name}</td>
                    <td className='p-2'>{product.product.category.name}</td>
                    <td className='p-2'>{product.quantity} Kg</td>
                    <td className='p-2'>₹ {product.product.price}</td>
                    <td className='p-2'>₹ {product.quantity * product.product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-between m-3'>
              <div className='flex space-x-4'>
                <button onClick={handleCash} className='bg-black text-white h-7 w-28 rounded-3xl text-xs'>Cash</button>
                <button onClick={initiateRazorpayPayment} className='bg-myBlue text-white h-7 w-28 rounded-3xl text-xs'>UPI</button>
              </div>
              <div className='flex flex-col space-y-2 font-bold'>
                <div className='flex justify-between'>
                  <label className=''>Total Quantity :</label>
                  <p>{transaction.total_quantity} Kg</p>
                </div>
                <div className='flex justify-between'>
                  <label className=''>Total Amount :</label>
                  <p> ₹ {transaction.total_price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>      
      </div>
      <FooterOfAdminAndShop />
      {modalVisible && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <img className='' src={success} alt="successimage" />
          <div className='text-center'>
            <p className='text-xl font-bold'>Woo hoo!!</p>
            <p className="text-xs  mb-4">Payment Successfully!</p>
            <button
              className="bg-black text-white py-2 px-4 rounded-3xl text-xs"
              onClick={() => navigate('/shop/todaysPending')}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default ScrapCollectioinConfirmation;
