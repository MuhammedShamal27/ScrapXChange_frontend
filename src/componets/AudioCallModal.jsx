import React from 'react'
import SA_profile from "../assets/SA_profile.png";


const AudioCallModal = ({ onAccept, onDecline }
) => {
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">

        <div className="flex justify-center mb-4">
          <img src={SA_profile} alt="Caller" className="w-24 h-24 rounded-full object-cover"/>
        </div>
        
        <h2 className="text-xl font-semibold mb-2">Incoming Call</h2>
        <p className="text-gray-500 mb-6">John Doe is calling...</p>
        
        <video src="" className="hidden"></video> 
        <div className="flex justify-evenly mt-6">
          <button onClick={onAccept} className="bg-darkGreen text-white px-4 py-2 rounded-full focus:outline-none" > Accept </button>
          <button onClick={onDecline} className="bg-black text-white px-4 py-2 rounded-full focus:outline-none "> Decline </button>
        </div>
      </div>
    </div>
  </>
  )
}

export default AudioCallModal