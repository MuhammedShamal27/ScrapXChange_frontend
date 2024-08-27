import axiosInstance from '../../services/api/axiosInstance';
import { VerifyPayment } from '../../services/api/shop/shopApi';
import { loadRazorpayScript } from '../../utils/razorpay';

const RazorPayButton = ({ orderId, amount, onSuccess, onFailure }) => {
    const handlePayment = async () => {
        console.log('Starting Razorpay payment process...');
        const res = await loadRazorpayScript();

        if (!res) {
            console.error('Razorpay SDK failed to load. Check your internet connection.');
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        console.log('Razorpay SDK loaded successfully.');
        console.log('Creating Razorpay payment options...');
        console.log('Order ID:', orderId);
        console.log('Amount:', amount);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: amount.toString(),
            currency: 'INR',
            order_id: orderId,
            handler: async function (response) {
                console.log('Razorpay payment completed.');
                console.log('Payment response:', response);

                try {
                    console.log(' inside this Payment response:');
                    const verifyResponse = await VerifyPayment(response);

                    console.log('Payment verification response:', verifyResponse);
                    console.log('Status received:', response.status);
                    if (verifyResponse.status === 'success') {
                        console.log('Payment verification successful.');
                        onSuccess();
                    } else {
                        console.warn('Payment verification failed on server side.');
                        onFailure();
                    }
                } catch (err) {
                    console.error('Error during payment verification:', err);
                    onFailure();
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

        console.log('Opening Razorpay payment gateway...');
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <button onClick={handlePayment} className="bg-myBlue text-white h-7 w-28 rounded-3xl text-xs">
            Pay with Razorpay
        </button>
    );
};

export default RazorPayButton;
