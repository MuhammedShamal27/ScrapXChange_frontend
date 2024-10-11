import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import UserNavBar from '../../componets/user/UserNavBar';
import UserFooter from '../../componets/user/UserFooter';
import { collectionRequest, createOrFetchChatRoom, shopScrapList } from '../../services/api/user/userApi';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { toast } from 'sonner';
import success from '../../assets/success.png'
import { Socket } from 'socket.io-client';
import socket from '../../utils/hooks/Socket';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
const baseURL = import.meta.env.SCRAPXCHANGE_API_URL || "http://127.0.0.1:8000";

const ScrapList = () => {
  const { id } = useParams(); // Get shop_id from URL
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formDetails, setFormDetails] = useState({
    name: '',
    address: '',
    landmark: '',
    pincode: '',
    phone: '',
    upi: '',
    confirmDetails: false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const userToken = useSelector((state) => state.auth.token);

  let user = null;

  // Decode the user token if it exists
  if (userToken ) {
    // Ensure only userToken is used for user side
    try {
      const decodedUserToken = jwtDecode(userToken);
      user = decodedUserToken.user_id;
      console.log("user ID:", user);
    } catch (error) {
      console.error("Invalid user token:", error);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await shopScrapList(id);
        setCategories(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategories();
  }, [id]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
      case "landmark":
        if (!value || /\s/.test(value) || !/^[A-Za-z]+$/.test(value)) {
          return "Field should contain only alphabets.";
        }
        break;
      case "address":
        if (value && (/^\s/.test(value) || /[!@#$%^&()_+=<>?/;:'"[\]{}|\\`~]/.test(value))) {
          return "Address cannot start with a space or contain special characters.";
        }
        break;
      case "pincode":
        if (value && !/^\d{6}$/.test(value)) {
          return "Pincode must be 6 digits.";
        }
        break;
      case "phone":
        if (!value || !/^\d{10}$/.test(value)) {
          return "Phone number must be 10 digits.";
        }
        break;
      case "upi":
        if (!value || /\s/.test(value) || !/\S+@\S/.test(value)) {
          return "UPI can only contain the special character '@' apart from alphabets and digits.";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleItemClick = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.some(selectedItem => selectedItem.id === item.id)) {
        return prevSelectedItems.filter(selectedItem => selectedItem.id !== item.id);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation checks
    if (selectedItems.length === 0) {
      toast("Please select items");
      return;
    }
    if (!selectedDate) {
      toast("Please select a date.");
      return;
    }
    if (!formDetails.name || !formDetails.address || !formDetails.landmark ||
       !formDetails.pincode || !formDetails.phone || !formDetails.upi || !formDetails.add_note ) {
      toast("Please fill all the required details.");
      return;
    }

    const formData = {
      ...formDetails,
      date_requested: selectedDate.format('YYYY-MM-DD'), 
      products: selectedItems.map(item => item.id),
      shop: id,
    };
    

    try {
      
      console.log('the form data',formData)
      const response = await collectionRequest(formData);
      console.log("the response", response);
      const createRoom = await createOrFetchChatRoom(id);
      console.log('create or fetch room',createRoom)
          // Emit the notification via Socket.IO
      socket.emit('notification', {
        sender_id: user,  
        receiver_id: createRoom.shop.user,  // Shop ID 
        message: 'A new scrap collection request has been submitted', 
        notification_type:'general',
      });
      toast("Submitted successfully");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting request", error);
      toast("Failed to submit request");
    }
  };



  const hasProducts = categories.some(category => Array.isArray(category.products) && category.products.length > 0);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <UserNavBar />

        <div className="flex-grow">
          <div className="px-4 sm:px-10 lg:px-20 py-10">
            {hasProducts ? (
              categories.map(category => (
                category.products.length > 0 &&(
                <div key={category.id} className="m-10">
                  <h1 className="text-2xl font-semibold mb-4 text-center">{category.name}</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 m-7 w-6/12">
                    {category.products.map(product => (
                      <div
                        key={product.id}
                        className={`border-2 p-3 rounded-lg cursor-pointer ${selectedItems.some(item => item.id === product.id) ? 'bg-gray-100' : ''}`}
                        onClick={() => handleItemClick(product)}
                      >
                        <div className="flex justify-center">
                          <img className="w-24 h-24" src={`${baseURL}${product.image}`} alt={product.name} />
                        </div>
                        <h1 className="text-sm mt-3">{product.name}</h1>
                        <p className="text-gray-600">₹ {product.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
                )
              ))
            ) : (
              <div className="text-center py-20 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">THE SHOP HAS NOT LISTED ANY SCRAP ITEMS YET.</h2>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className='flex justify-around m-7 shadow-lg rounded-lg'>
          {selectedItems.length > 0 && (
            <div className='rounded-lg w-1/4'>
              <h1 className='font-medium text-lg m-7'>Selected Items</h1>
              <div className='flex flex-col m-7 space-y-1'>
                {selectedItems.map(item => (
                  <div key={item.id} className='flex justify-between'>
                    <p>{item.name}</p>
                    <p onClick={() => handleItemClick(item)}><X /></p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedItems.length > 0 && (
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker orientation="landscape" value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />
              </LocalizationProvider>
            </div>
          )}

          <div>
            {selectedItems.length > 0 && (
              <div className='space-y-5 rounded-lg'>
                <div className='p-3'>
                  <h1 className='font-medium text-lg'>Add The Address</h1>
                </div>
                <div className='grid grid-cols-2 gap-7 p-3'>
                  <input
                    className='bg-gray-100 border-0 rounded-lg text-xs'
                    type="text"
                    name="name"
                    placeholder='Name'
                    value={formDetails.name}
                    onChange={handleInputChange}
                  />
                  <input
                    className='bg-gray-100 border-0 rounded-lg text-xs'
                    type="text"
                    name="address"
                    placeholder='Address'
                    value={formDetails.address}
                    onChange={handleInputChange}
                  />
                  <input
                    className='bg-gray-100 border-0 rounded-lg text-xs'
                    type="text"
                    name="landmark"
                    placeholder='landmark'
                    value={formDetails.landmark}
                    onChange={handleInputChange}
                  />
                  <input
                    className='bg-gray-100 border-0 rounded-lg text-xs'
                    type="text"
                    name="pincode"
                    placeholder='Pincode'
                    value={formDetails.pincode}
                    onChange={handleInputChange}
                  />
                  <input
                    className='bg-gray-100 border-0 rounded-lg text-xs'
                    type="text"
                    name="phone"
                    placeholder='Phone'
                    value={formDetails.phone}
                    onChange={handleInputChange}
                  />
                  <input
                    className='bg-gray-100 border-0 rounded-lg text-xs'
                    type="text"
                    name="upi"
                    placeholder='UPI'
                    value={formDetails.upi}
                    onChange={handleInputChange}
                  />
                </div>
                <div className=' p-3'>
                  <input
                      className='bg-gray-100 border-0 rounded-lg text-xs w-full h-14'
                      type="text"
                      name="add_note"
                      placeholder='Add Description'
                      value={formDetails.add_note}
                      onChange={handleInputChange}
                    />
                </div>
                <div className='flex justify-between items-center text-xs font-bold p-3'>
                  <div className='flex space-x-3'>
                    <input
                      type="checkbox"
                      name="confirmDetails"
                      checked={formDetails.confirmDetails}
                      onChange={handleInputChange}
                    />
                    <p>Confirm The Above Details</p>
                  </div>
                  <button type='submit' className='bg-black text-white py-2 px-4 rounded-3xl text-xs'>Submit</button>
                </div>
              </div>
            )}
          </div>
        </form>

        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <img className='' src={success} alt="successimage" />
              <div className='text-center'>
                <p className='text-xl font-bold'>Woo hoo!!</p>
                <p className="text-xs  mb-4">Request submitted successfully!</p>
                <button
                  className="bg-black text-white py-2 px-4 rounded-3xl text-xs"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        <UserFooter />
      </div>
    </>
  );
};

export default ScrapList;
