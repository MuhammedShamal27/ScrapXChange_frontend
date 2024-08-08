import React, { useEffect, useState } from 'react'
import UserNavBar from '../../componets/user/UserNavBar'
import UserSideBar from '../../componets/user/UserSideBar'
import Edit_profile from '../../assets/Edit_profile.png'
import "../../styles/user.css";
import UserFooter from '../../componets/user/UserFooter';
import { useNavigate } from 'react-router-dom';
import { editProfile, userProfile } from '../../services/api/user/userApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const EditProfile = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      address: "",
      pincode: "",
      phone: "",
      alternative_phone: "",
      profile_picture: null,
    });
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.auth.token)
  
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
            const userData = await userProfile(token);
            setFormData(userData);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching user profile data:", error);
            toast.error("Failed to load user profile.");
            setLoading(false);
          }
      };
      fetchProfileData();
    }, [token]);
  
    const validateField = (name, value) => {
      switch (name) {
        case "username":
          if (!value || /\s/.test(value) || !/^[A-Za-z]+$/.test(value)) {
            return "Name should contain only alphabets.";
          }
          break;
        case "email":
          if (!value || /\s/.test(value) || !/\S+@\S+\.\S+/.test(value)) {
            return "Invalid email address.";
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
        case "alternative_phone":
          if (value && (!/^\d{10}$/.test(value) || value === formData.phone)) {
            return "Alternative phone number must be 10 digits and different from the primary phone.";
          }
          break;
        default:
          return "";
      }
      return "";
    };
  
    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData({ ...formData, [name]: value });
  
    //   const errorMessage = validateField(name, value);
    //   setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  
    //   console.log("Form data on Change:", formData);
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Check if the input is for the file
        if (name === "profile_picture") {
            setFormData({ ...formData, profile_picture: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
            const errorMessage = validateField(name, value);
            setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
        }
    
        console.log("Form data on Change:", formData);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = {};
      Object.keys(formData).forEach((key) => {
        const errorMessage = validateField(key, formData[key]);
        if (errorMessage) {
          validationErrors[key] = errorMessage;
        }
      });
  
      console.log("validation error:", validationErrors);
      setErrors(validationErrors);
  
      console.log("Form Data on submit:", formData);
      if (Object.keys(validationErrors).length === 0) {
        try {
          console.log("the try block");
          const response = await editProfile(formData);
          console.log("response in editprofile", response);
          navigate('/profile');
        } catch (error) {
          console.log("Error updating user profile data.", error);
          toast.error("Failed to update user profile.");
        }
      }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }

  return (
    <>
    <UserNavBar />
    <div className='userMainFont flex m-7'>
      <UserSideBar />
      <div className='flex flex-1 justify-center bg-bgColor p-10 rounded-lg'>
        <div className='bg-white w-full max-w-4xl p-10 rounded-lg shadow-lg'>
          <div className='flex justify-between items-center mb-8'>
            <div className='flex items-center gap-4'>
            <label htmlFor="profilePictureInput" className='cursor-pointer'>
                <img className='w-24 h-24 rounded-full' src={formData.profile_picture || Edit_profile} alt="Edit profile" />
            </label>
            <input
                id="profilePictureInput"
                type="file"
                name="profile_picture"
                className="hidden"
                onChange={(e) => setFormData({ ...formData, profile_picture: e.target.files[0] })}
            />
            {errors.profile_picture && <p className='text-red-500 text-xs italic'>{errors.profile_picture}</p>}
              <div className='flex flex-col'>
                <h1 className='font-semibold text-xl'>{formData.username}</h1>
                <h2 className='font-semibold text-sm text-gray-600'>{formData.email}</h2>
              </div>
            </div>
            <button className='bg-black text-white py-2 px-4 rounded-3xl text-xs' onClick={handleSubmit} >Update</button>
          </div>
          <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs'>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-xs'>Username</label>
              <input
                className='bg-gray-100 border-0 rounded-lg text-xs p-3'
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                placeholder='Your Name'
              />
              {errors.username && <p className='text-red-500 text-xs '>{errors.username}</p>}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-xs'>Email</label>
              <input
                className='bg-gray-100 border-0 rounded-lg text-xs p-3'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Your Email'
              />
              {errors.email && <p className='text-red-500 text-xs '>{errors.email}</p>}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-xs'>Address</label>
              <input
                className='bg-gray-100 border-0 rounded-lg text-xs p-3'
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                placeholder='Your Address'
              />
              {errors.address && <p className='text-red-500 text-xs '>{errors.address}</p>}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-xs'>Pincode</label>
              <input
                className='bg-gray-100 border-0 rounded-lg text-xs p-3'
                type='text'
                name='pincode'
                value={formData.pincode}
                onChange={handleChange}
                placeholder='Your Pincode'
              />
              {errors.pincode && <p className='text-red-500 text-xs '>{errors.pincode}</p>}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-xs'>Phone</label>
              <input
                className='bg-gray-100 border-0 rounded-lg text-xs p-3'
                type='text'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='Your Phone'
              />
              {errors.phone && <p className='text-red-500 text-xs '>{errors.phone}</p>}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-xs'>Alternative Phone</label>
              <input
                className='bg-gray-100 border-0 rounded-lg text-xs p-3'
                type='text'
                name='alternative_phone'
                value={formData.alternative_phone}
                onChange={handleChange}
                placeholder='Your Alternative Phone'
              />
              {errors.alternative_phone && <p className='text-red-500 text-xs '>{errors.alternative_phone}</p>}
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
    <UserFooter/>
  </>
  )
}

export default EditProfile
