import React from 'react'
import {MoveRight} from 'lucide-react'
import '../../styles/user.css'

const Otp = () => {
  return (
    <>
    <div className= "userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg">
        <h1 className='text-4xl text-white font-semibold'>OTP Verification</h1>
        <div className='bg flex mt-10 mb-5 gap-4'>
            <input className='text-sm bg-inputBoxBlack w-11 h-11 rounded-lg border  border-gray-500/50' />
            <input className='text-sm bg-inputBoxBlack w-11 h-11 rounded-lg border  border-gray-500/50' />
            <input className='text-sm bg-inputBoxBlack w-11 h-11 rounded-lg border  border-gray-500/50' />
            <input className='text-sm bg-inputBoxBlack w-11 h-11 rounded-lg border  border-gray-500/50' />
        </div>
        <div className='flex justify-between gap-7'>
            <p className='text-xs mt-3 text-gray-500 font-bold'>00:45</p>
            <p className='text-xs mt-3 text-gray-600 '>Don't get OTP yet ? <span className='text-white ml-2 text-xs'>Resend OTP !</span></p>
        </div>
        <button className='mt-3 bg-green-900  w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold '>Confirm OTP <MoveRight size={30} /> </button> 
    </div>
    </>
  )
}

export default Otp