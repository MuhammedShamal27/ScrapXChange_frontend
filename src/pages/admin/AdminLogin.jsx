import React, { useState } from 'react'
import Shop_login_img from '../../assets/Shop_login_img.png'
import '../../styles/adminAndShop.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../services/api/admin/adminApi'
import { loginSuccess } from '../../redux/reducers/userReducer'
import { toast } from 'sonner'
import { adminLoginSuccess } from '../../redux/reducers/adminReducer'

const AdminLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    return 'Invalid email format.';
                }
                break;
            case 'password':
                if (!/^\S{8,17}$/.test(value)) {
                    return 'Password should be 8-17 characters and should not include spaces.';
                }
                break;
            default:
                return '';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const errorMessage = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
        console.log('Form data on Change', formData);
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
                console.log('coming');
                const response = await adminLogin(formData);
                console.log("the response in the adminlogin",response)
                if (response.access) {
                    console.log('coming to if ')
                    console.log('response acees in if',response.access)
                    dispatch(adminLoginSuccess  ({ token: response.access }));
                    navigate('/admin/home');
                }
            } catch (err) {
                if (err.email) {
                    toast.error(`Email error: ${err.email[0]}`);
                }
                if (err.password) {
                    toast.error(`Password error: ${err.password[0]}`);
                } else {
                    toast.error('An unexpected error occurred, please try again.');
                }
            }
        }
    };
  return (
    <>
    <div className='adminFont '>
        <div className='flex'>
            <div className='w-11/12 relative mt-7'>
                <h1 className='text-3xl text-blue-950 font-bold text-center m-3 mb-20'>Scrap X Change</h1>
                <h1 className='absolute left-1/4 text-2xl text-blue-950 font-extrabold mt-7'>Login</h1>
                <p className='absolute left-1/4 text-xs text-gray-400 mt-16'>Enter your email and password to sign in!</p>
                <form onSubmit={handleSubmit} className='absolute left-1/4 text-xs grid grid-rows-8 grid-flow-col gap-x-12 mt-24 font-medium'>
                    {errors.email && <p className='text-red-500'> {errors.email} </p>}
                    <h5 className='mt-4'>Email</h5>
                    <input type='email' name='email' value={formData.email} onChange={handleChange} className='border rounded-md w-80 h-9 px-5 text-xs' placeholder='mail@pegasus.com' />
                    <h5 className='mt-4'>Password</h5>
                    {errors.password && <p className='text-red-500'> {errors.password} </p>}
                    <input type='password' name='password' value={formData.password} onChange={handleChange} className='border rounded-md w-80 h-9 px-5 text-xs' placeholder='Min. 8 characters' />
                <button type='submit' className='absolute left-1/4 mt-64 text-xs bg-myBlue text-white w-80 h-9 border rounded-md  '>Sign in</button>
                </form >
            </div>
            <div >
                <img className='w-full h-svh' src={Shop_login_img}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminLogin