import React, { useState } from 'react'
import register_page_img from '../../assets/register_page_img.png'
import '../../styles/adminAndShop.css'
import { useDispatch } from 'react-redux'
import { registerShop } from '../../services/api/shop/shopApi'
import { toast } from 'sonner'

const ShopRegister = () => {

    const [formData, setFormData] = useState({
        username:'',
        email: '',
        password: '',
        re_enter_password: '',
        shop_name: '',
        shop_license_number: '',
        address: '',
        place: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const validateField = (name, value) => {
        let errorMessage = "";

        switch (name) {

            case "username":
                if (!/^[A-Za-z]+$/.test(value)) {
                    errorMessage = "Username should only contain alphabets.";
                }
                break;
            case "email":
                if (!/\S+@\S+\.\S+/.test(value)) {
                    errorMessage = "Email is invalid.";
                }
                break;
            case "password":
                if (value.length < 8 || value.length > 17) {
                    errorMessage = "The password should be min 8 to max 17 characters.";
                }
                break;
            case "re_enter_password":
                if (value !== formData.password) {
                    errorMessage = "Passwords do not match.";
                }
                break;
            case "shop_name":
                if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value)) {
                    errorMessage = "Shop name must contain only alphabets and a single space between words, with no leading or trailing spaces.";
                }
                break;
            case "shop_license_number":
                if (!/^[A-Z]{3}\d{11}$/.test(value)) {
                    errorMessage = "Shop license number must start with uppercase alphabets followed by 11 digits.";
                }
                break;
            case "address":
                if (!/^[A-Za-z0-9\s,\.]+$/.test(value)) {
                    errorMessage = "Address must not contain special characters other than dot (.) and comma (,).";
                }
                break;
            case "place":
                if (!/^[a-zA-Z]+$/.test(value)) {
                    errorMessage = "Place must contain only alphabets.";
                }
                break;
            case "phone":
                if (!/^\d{10}$/.test(value)) {
                    errorMessage = "Phone number must be 10 digits.";
                }
                break;
            default:
                break;
        }

        return errorMessage;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        const errorMessage = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage
        }));

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

        if (Object.keys(validationErrors).length === 0) {
            try {
                const result = await registerShop(formData);
                console.log("befor the result if",result)
                console.log(result.message)
                if (result.message) {
                    console.log("the message",result.message)
                    toast.success(result.message); 
                }else{
                    toast.error("Failed to register")
                }
            } catch (err) {
                if (err.response && err.response.data) {
                    const errorData = err.response.data;
                    Object.keys(errorData).forEach((key) => {
                        if (errorData[key]) {
                            toast.error(`${key.replace('_', ' ')} error: ${errorData[key][0]}`);
                        }
                    });
                } else {
                    toast.error("An unexpected error occurred. Please try again later.");
                }
            }
        }
    };

  return (
    <>
    <div className='adminFont '>
        <div className='flex'>
            <div className='w-11/12 mt-7'>
                <h1 className='text-3xl text-blue-950 font-bold text-center m-3 mb-20'>Scrap X Change</h1>
                <h1 className='ml-28 text-2xl text-blue-950 font-extrabold'>Register</h1>
                <p className='ml-28 text-xs text-gray-400 mt-10'>Enter the details give below to become a shop !</p>
                <form onSubmit={handleSubmit} className='ml-28 text-xs grid grid-rows-10 grid-flow-col   font-medium'>
                    {errors.username && <p className='text-red-500'> {errors.username} </p>}
                    <h5 className='mt-4'>Username</h5>
                    <input className='border rounded-md w-80 h-9 px-5' name='username' value={formData.username} onChange={handleChange} placeholder='Name of the user' />
                    {errors.shop_name && <p className='text-red-500'> {errors.shop_name} </p>}
                    <h5 className='mt-4'>Shop Name</h5>
                    <input className='border rounded-md w-80 h-9 px-5' name='shop_name' value={formData.shop_name} onChange={handleChange} placeholder='Name of the shop' />
                    {errors.shop_license_number && <p className='text-red-500'> {errors.shop_license_number} </p>}
                    <h5 className='mt-4'>Shop Licences Number</h5>
                    <input className='border rounded-md w-80 h-9 px-5' name='shop_license_number' value={formData.shop_license_number} onChange={handleChange} placeholder='Licences Number' />
                    {errors.address && <p className='text-red-500'> {errors.address} </p>}
                    <h5 className='mt-4'>Address</h5>
                    <input className='border rounded-md w-80 h-9 px-5' name='address' value={formData.address} onChange={handleChange} placeholder='Shop Address' />
                    {errors.place && <p className='text-red-500'> {errors.place} </p>}
                    <h5 className='mt-4'>Place</h5>
                    <input className='border rounded-md w-80 h-9 px-5' name='place' value={formData.place} onChange={handleChange} placeholder='Location' />
                    {errors.phone && <p className='text-red-500'> {errors.phone} </p>}
                    <h5 className='mt-4'>Phone</h5>
                    <input className='border rounded-md w-80 h-9 px-5' name='phone' value={formData.phone} onChange={handleChange} placeholder='Mobile number' />
                    {errors.email && <p className='text-red-500'> {errors.email} </p>}
                    <h5 className='mt-4'>Email</h5>
                    <input className='border rounded-md w-80 h-9 px-5' name='email' value={formData.email} onChange={handleChange} placeholder='mail@pegasus.com' />
                    {errors.password && <p className='text-red-500'> {errors.password} </p>}
                    <h5 className='mt-4'>Password</h5>
                    <input className='border rounded-md w-80 h-9 px-5' name='password' value={formData.password} onChange={handleChange} placeholder='Min. 8 characters' />
                    {errors.re_enter_password && <p className='text-red-500'> {errors.re_enter_password} </p>}
                    <h5 className='mt-4'>Re-Enter Password</h5>
                    <input className='border rounded-md w-80 h-9 px-5' name='re_enter_password' value={formData.re_enter_password} onChange={handleChange} placeholder='Re-enter Min. 8 characters' />
                    
                    <button type='submit' className=' text-xs bg-myBlue text-white w-80 h-9 border rounded-md  '>Request</button>
                </form>
            </div>
            <div >
                <img className='w-full h-svh' src={register_page_img}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default ShopRegister
