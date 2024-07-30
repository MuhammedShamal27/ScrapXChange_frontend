import React from 'react'
import {Braces, MoveRight} from 'lucide-react'
import '../../styles/user.css'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../services/api/user/userApi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors,setErrors] = useState({});
  const [formData,setFormData] = useState({
    email:" ",
    username:" ",
    phone:" ",
    password:" ",
    confirm_password:" ",
  });

 

  const validateField = (name,value) => {
    switch (name){
      case 'username':
        if (!/^[A-Za-z]+$/.test(value)){
          return 'Name should contain only alphabets.'
        }
        break;
        case 'email':
          if (!/\S+@\S+\.\S+/.test(value)){
            return 'Invalid email format.'
          }
          break;
        case 'phone':
          if (!/^\d{10}$/.test(value)){
            return 'Phone number should be 10 digits.'
          }
          break;
        case 'password':
          if (!/^\S{8,17}$/.test(value)){
            return 'Password should be 8-17 characters and should not include spaces.'
          }
          break;
        default:
          return '';
    }
    return '';
  }
  const handleChange =(e) =>{
    const { name,value} = e.target;
    setFormData ({ ...formData,[name] : value});

    const errorMessage = validateField(name,value);
    setErrors((prevErrors) =>({ ...prevErrors,[name]:errorMessage}))
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const validationErrors ={};
    Object.keys(formData).forEach((key) =>{
      const errorMessage = validateField(key,formData[key]);
      if (errorMessage){
        validationErrors[key] =errorMessage;
      }
    })

    setErrors(validationErrors)
    if(Object.keys(validationErrors).length ==0){
      try {
        const resultAction = await dispatch (registerUser(formData)).unwrap();
        if (resultAction.success){
          navigate('/otp');
        }
      }
      catch (err){
        console.error ('Failed to register:',err);
      }
    }
  };


  return (
    <>    
    <form className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg"
    onSubmit={handleSubmit}>
        <h1 className='text-4xl text-white font-semibold'>Register Your Account</h1>
        <div className='flex flex-col   h-10 w-10/12 lg:w-3/12 mt-10  mb-20 gap-2'>
            <br />
            {errors.username && <p>{errors.username}</p>}
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' 
            name="username" value={formData.username} onChange={handleChange} placeholder='Name'/>
            {errors.email && <p>{errors.email}</p>}
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' 
            name="email" value={formData.email} onChange={handleChange} placeholder='Email'/>
            {errors.phone && <p>{errors.phone}</p>}
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' 
            name="phone" value={formData.phone} onChange={handleChange} placeholder='Phone'/>
            {errors.password && <p>{errors.password}</p>}
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' 
            name="password" value={formData.password} type='password' onChange={handleChange} placeholder='8 digit pin'/>
            {errors.confirm_password && errors.confirm_password}
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' 
            name="confirm_password" value={formData.confirm_password} type='password' onChange={handleChange} placeholder='Re-enter 8 digit pin'/>
        </div>
        <button className='mt-96 bg-green-900  w-10/12 lg:w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold '
        type='submit' >Login to Your Account <MoveRight size={30} /> </button>
        <p className='text-xs mt-3 text-gray-600 '>Already have an account ? <span className='text-white ml-2 text-xs'>Login Now !</span></p>
    </form>
    </>
  )
}

export default Register