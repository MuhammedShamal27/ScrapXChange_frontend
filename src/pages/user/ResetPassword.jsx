import React, { useState } from 'react'
import{MoveRight} from 'lucide-react'
import '../../styles/user.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { resetPassword } from '../../services/api/user/userApi';

const ResetPassword = () => {

  const [password , setPassword] = useState("");
  const [error , setError] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password, confirmPassword) => {
    if (!/^\S{8,17}$/.test(password) ){  
      return "Password must be at least 8 characters log ."
    }
    if (password !== confirmPassword){
      return "Passwords do not match ."
    }
    return null;
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
    setError("");

  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("");

    const ValidationError = validatePassword(password, confirmPassword);
    if (ValidationError){
      setError(ValidationError);
      toast.error(ValidationError);
      return;
    }

    try {
      const email= localStorage.getItem("userEmail")
      const response = await resetPassword({email,new_password:password});
      console.log("password reset response", response)
      toast.success("Password reset successfully .Please login .");
      navigate("/login");
    }
    catch (err) {
      console.error ("Password reset error.",err);
      toast.error("An error occured while resetting the password.Please try again.")
    }
  }

  return (
    <>
    <div className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg">
        <h1 className='text-4xl text-white font-semibold'>Reset Password</h1>
        <div className='flex flex-col   h-10 w-3/12 mt-10  mb-20 gap-2'>
            { error && <p>{error}</p> }
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg text-white' 
            type='password' value={password} onChange={handlePasswordChange} placeholder='8 digit pin'/>
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' 
            type='password' value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='Re-enter 8 digit pin'/>
        </div>
        <button className='mt-5 bg-green-900  w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold '
         onClick={handleSubmit} >Confirm Password <MoveRight size={30} /> </button>
    </div>
    </>
  )
}

export default ResetPassword