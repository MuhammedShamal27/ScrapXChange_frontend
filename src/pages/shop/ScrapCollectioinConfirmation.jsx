import React, { useEffect, useState } from 'react';
import ShopNavBar from '../../componets/shop/ShopNavBar';
import HeadingAndProfile from '../../componets/HeadingAndProfile';
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmCollection, PaymentCash, PaymentRazorpay } from '../../services/api/shop/shopApi';
import success from '../../assets/success.png'
import RazorPayButton from '../../componets/shop/RazorPayButton';

const ScrapCollectioinConfirmation = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [payment,setPayment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate(); 
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState(0);

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

  // Ensure that transaction.transaction_products is defined before attempting to map over it
  const products = transaction.transaction_products || [];
  console.log('the products',products)

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
        const totalAmount = parseFloat(transaction.total_price) * 100; // amount in paise
        console.log('Initiating Razorpay payment...');
        const response = await PaymentRazorpay(id);
        console.log('Razorpay order creation response:', response);

        const { order_id, amount: razorAmount } = response;
        setOrderId(order_id);
        setAmount(razorAmount);
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
            {orderId && (
                <RazorPayButton
                    orderId={orderId}
                    amount={amount}
                    onSuccess={handleRazorpaySuccess}
                    onFailure={handleRazorpayFailure}
                />
            )}
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
