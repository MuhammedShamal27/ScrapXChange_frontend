import React from 'react'
import {MoveRight} from 'lucide-react'
import '../../styles/user.css'

const Login = () => {
  return (
    <>
    <div className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg">
        <h1 className='text-4xl text-white font-semibold'>Login to Your Account</h1>
        <div className='flex flex-col   h-10 w-3/12 mt-10  mb-20 gap-2'>
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' placeholder='Email'/>
            <input className='text-sm bg-inputBoxBlack p-5 rounded-lg' placeholder='8 digit pin'/>
        </div>
        <button className='mt-5 bg-green-900  w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold '>Login to Your Account <MoveRight size={30} /> </button>
        <p className='text-xs mt-3 text-gray-600 '>Don't have an account yet ? <span className='text-white ml-2 text-xs'>Register Now !</span></p>
        <button className='p-5 w-3/12 rounded-lg border border-lightGreen text-white mt-5 flex gap-3 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
            </svg>
            Sign in with Google
        </button>
        <p className='text-white underline mt-3'>Forget Password ?</p>
    </div>
    </>
  )
}

export default Login