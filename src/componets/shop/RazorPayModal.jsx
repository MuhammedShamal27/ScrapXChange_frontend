// import React from 'react'
// import RazorPayButton from './RazorPayButton'
// import { X } from 'lucide-react';
// import razorpay from '../../assets/razorpay.jpeg'

// const RazorPayModal = ({ orderId, amount, onClose }) => {
//   return (
//     <>
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" >
//             <div onClick={(e) => e.stopPropagation()}> 
//                 <button className='bg-white' onClick={onClose}> <X/></button>
//                 <div className="bg-white p-5 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-bold text-center ">Complete Payment</h2>
//                     <div className='flex items-center gap-7'>
//                         <img className='h-24 w-24' src={razorpay} alt="razorpay" />
//                         <RazorPayButton
//                             orderId={orderId}
//                             amount={amount}
//                             onSuccess={onClose}
//                             onFailure={onClose}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default RazorPayModal