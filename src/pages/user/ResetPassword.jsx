import React, { useState } from 'react'
import{MoveRight} from 'lucide-react'
import '../../styles/user.css'
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

  const [error , setError] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (password) => {
    if (!/\S+@\S+\.\S+/.test(password)){
      return "Invalid email format."
    }
    elif (password != confirm_password)
  }

  const handleChange = (e) =>{
    setPassword(e.target.value);
    setError("");

  }

  return (
    <>
    <div className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg">
        <h1 className='text-4xl text-white font-semibold'>Reset Password</h1>
        <div className='flex flex-col   h-10 w-3/12 mt-10  mb-20 gap-2'>
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' 
            type='text' value={password} onChange={handleChange} placeholder='8 digit pin'/>
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' 
            type='text' value={confirm_password} onChange={handleChange} placeholder='Re-enter 8 digit pin'/>
        </div>
        <button className='mt-5 bg-green-900  w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold '
         onClick={handleSubmit} >Confirm Password <MoveRight size={30} /> </button>
    </div>
    </>
  )
}

export default ResetPassword