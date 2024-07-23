import React from 'react'
import { MoveRight } from 'lucide-react'
import '../../styles/user.css'

const EmailForPasswordReset = () => {
  return (
    <>
    <div className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg">
        <h1 className='text-4xl text-white font-semibold'>Reset Password</h1>
        <div className='flex flex-col   h-10 w-3/12 mt-10  mb-5 gap-2'>
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' placeholder='Email'/>
        </div>
        <button className='mt-5 bg-green-900  w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold '>Confirm Password <MoveRight size={30} /> </button>
    </div>
    </>
  )
}

export default EmailForPasswordReset