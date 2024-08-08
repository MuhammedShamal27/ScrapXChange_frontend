import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../services/api/axiosInstance';
import { editProfile } from '../../services/api/user/userApi';

const EditProfile = () => {

    const navigate = useNavigate();
    const [errors ,setErrors] = useState({})
    const [formData , setFormData ] = useState({
        username: "",
        email: "",
        address: "",
        pincode: "",
        phone: "",
        alternative_phone:"",
        profile_picture: null,
    })

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get('/user/edit-profile/');
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user profile data:", error);
                setLoading(false);
            }
        };
        fetchProfileData();
    }, []);


    const validateField = (name, value) => {
        switch(name){
            case "username":
                if (!value || /\s/.test(value) || !/^[A-Za-z]+$/.test(value)){
                    return "Name should contain only alphabets.";
                }
                break;
            case "email":
                if (!value || /\s/.test(value) || !/\S+@\S+\.\S+/.test(value)){
                    return "Invalid email address.";
                }
                break;
            case "address":
                if (value && (/^\s/.test(value) || /[!@#$%^&()_+=<>?/;:'"[\]{}|\\`~]/.test(value))){
                    return "Address cannot start with a space or contain special characters.";
                }
                break;
            case "pincode":
                if (value && !/^\d{6}$/.test(value)){
                    return "Pincode must be 6 digits.";
                }
                break;
            case "phone":
                if (!value || !/^\d{10}$/.test(value)){
                    return "Phone number must be 10 digits.";
                }
                break;
            case "alternative_phone":
                if(value && (!/^\d{10}$/.test(value) || value === formData.phone)){
                    return "Alternative phone number must be 10 digits and different from the primary phone.";
                }
                break;
            default:
                return "";
        }
        return "";
    };

    const handleChange = (e) => {
        const { name , value } = e.target;
        setFormData ( { ...formData,[name]:value});

        const errorMessage = validateField(name,value);
        setErrors((prevErrors) => ( {...prevErrors,[name] : errorMessage}));

        console.log("Form data on Change:".formData);
    }


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const validationErrors = {};
        Object.keys(formData).forEach((key) =>{
            const errorMessage = validateField(key , formData[key]);
            if (errorMessage){
                validationErrors[key] =errorMessage;
            }
        });

        console.log("validation error:" , validationErrors);
        setErrors(validationErrors);

        console.log("Form Data on submit:", formData);
        if (Object.keys(validationErrors).length === 0 ){
            try {
                console.log("the try block")
                const response = await editProfile(formData)
                console.log("response in editprofile",response)
                navigate('/profile')
            } catch (error){
                console.log("Error updating user profile data.",error)
            }
        }
    }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-4xl font-semibold text-gray-800 mb-5">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
                <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.pincode && <p className="text-red-500 text-xs italic">{errors.pincode}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Alternative Phone</label>
                <input
                    type="text"
                    name="alternative_phone"
                    value={formData.alternative_phone}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.alternative_phone && <p className="text-red-500 text-xs italic">{errors.alternative_phone}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
                <input
                    type="file"
                    name="profile_picture"
                    onChange={(e) => setFormData({ ...formData, profile_picture: e.target.files[0] })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
            >
                Update Profile
            </button>
        </form>
    </div>
</div>
  )
}

export default EditProfile

