import React from 'react'
import {MoveRight} from 'lucide-react'
import '../../styles/user.css'

const Register = () => {
  return (
    <>    
    <div className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg">
        <h1 className='text-4xl text-white font-semibold'>Register Your Account</h1>
        <div className='flex flex-col   h-10 w-10/12 lg:w-3/12 mt-10  mb-20 gap-2'>
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' placeholder='Name'/>
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' placeholder='Email'/>
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' placeholder='Phone'/>
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' placeholder='8 digit pin'/>
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' placeholder='Re-enter 8 digit pin'/>
        </div>
        <button className='mt-56 bg-green-900  w-10/12 lg:w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold '>Login to Your Account <MoveRight size={30} /> </button>
        <p className='text-xs mt-3 text-gray-600 '>Already have an account ? <span className='text-white ml-2 text-xs'>Login Now !</span></p>
    </div>
    </>
  )
}

export default Register