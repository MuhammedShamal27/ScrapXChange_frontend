export const initiateRazorpayPayment = async () => {
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