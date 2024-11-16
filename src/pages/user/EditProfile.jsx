import React, { useEffect, useState } from "react";
import UserNavBar from "../../componets/user/UserNavBar";
import UserSideBar from "../../componets/user/UserSideBar";
import profile from "../../assets/SA_profile.png";
import "../../styles/user.css";
import UserFooter from "../../componets/user/UserFooter";
import { useNavigate } from "react-router-dom";
import { editUserProfile, userProfile } from "../../services/api/user/userApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

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
  const [previewImage, setPreviewImage] = useState(profile);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userData = await userProfile(token);
        setFormData(userData);
        if (userData.profile_picture) {
          setPreviewImage(`${import.meta.env.VITE_MEDIA_API_URL}${userData.profile_picture}`);
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
        toast.error("Failed to load user profile.");
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
        if (
          value &&
          (/^\s/.test(value) || /[!@#$%^&()_+=<>?/;:'"[\]{}|\\`~]/.test(value))
        ) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const cloudinaryConfig = {
      cloud_name: 'dqffglvoq',
      upload_preset: 'ml_default', // Use your actual preset name here
    };
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.upload_preset);
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      console.log('the response of image.',response)
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
  
      const data = await response.json();
      setFormData((prevFormData) => ({
        ...prevFormData,
        profile_picture: data.secure_url, 
      }));
      setPreviewImage(data.secure_url); 
    } catch (error) {
      console.error('Error uploading image:', error);
    }
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

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });
        const response = await editUserProfile(formDataToSend);
        console.log('the response',response)
        toast.success("Profile updated successfully!");
        navigate("/profile");
      } catch (error) {
        console.log("Error updating user profile data.", error);
        toast.error("Failed to update user profile.");
      }
    }
  };

  return (
    <>
      <UserNavBar />
      <div className="userMainFont flex">
        <UserSideBar />
        <div className="flex flex-1 justify-center bg-bgColor p-5 sm:p-10 rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-4xl sm:max-w-3xl p-5 sm:p-10 rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div className="flex items-center gap-4">
                <label htmlFor="profilePictureInput" className="cursor-pointer">
                  <img
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
                    src={previewImage}
                    alt="Edit profile"
                  />
                </label>
                <input
                  id="profilePictureInput"
                  type="file"
                  name="profile_picture"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {errors.profile_picture && (
                  <p className="text-red-500 text-xs italic">
                    {errors.profile_picture}
                  </p>
                )}
                <div className="flex flex-col">
                  <h1 className="font-semibold text-lg sm:text-xl">
                    {formData.username}
                  </h1>
                  <h2 className="font-semibold text-xs sm:text-sm text-gray-600">
                    {formData.email}
                  </h2>
                </div>
              </div>
              <button
                className="bg-black text-white py-2 px-4 rounded-3xl text-xs sm:text-sm"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 text-xs sm:text-sm">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-xs sm:text-sm">
                    Username
                  </label>
                  <input
                    className="bg-gray-100 border-0 rounded-lg text-xs sm:text-sm p-3"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Your Name"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs">{errors.username}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-xs sm:text-sm">
                    Email
                  </label>
                  <input
                    className="bg-gray-100 border-0 rounded-lg text-xs sm:text-sm p-3"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-xs sm:text-sm">
                    Address
                  </label>
                  <input
                    className="bg-gray-100 border-0 rounded-lg text-xs sm:text-sm p-3"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Your Address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs">{errors.address}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-xs sm:text-sm">
                    Pincode
                  </label>
                  <input
                    className="bg-gray-100 border-0 rounded-lg text-xs sm:text-sm p-3"
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Your Pincode"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-xs">{errors.pincode}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-xs sm:text-sm">
                    Phone
                  </label>
                  <input
                    className="bg-gray-100 border-0 rounded-lg text-xs sm:text-sm p-3"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs">{errors.phone}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-xs sm:text-sm">
                    Alternative Phone
                  </label>
                  <input
                    className="bg-gray-100 border-0 rounded-lg text-xs sm:text-sm p-3"
                    type="text"
                    name="alternative_phone"
                    value={formData.alternative_phone}
                    onChange={handleChange}
                    placeholder="Alternative Phone"
                  />
                  {errors.alternative_phone && (
                    <p className="text-red-500 text-xs">
                      {errors.alternative_phone}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                {/* Other content can go here */}
              </div>
            </div>
          </form>
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default EditProfile;
