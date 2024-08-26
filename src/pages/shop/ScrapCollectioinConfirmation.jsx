import React from 'react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import success from '../../assets/success.png'

const ScrapCollectioinConfirmation = () => {
  return (
    <>
      <div className='flex bg-bgColor'>
        <ShopNavBar/>
        <div className='flex-grow'>
          <HeadingAndProfile/>
          <div className='bg-white rounded-xl text-xs m-3 p-6'>
            <h1 className='font-semibold text-2xl mb-4'>Total</h1>
            <table className='w-full table-auto'>
              <thead>
                <tr className='text-left'>
                  <th className='p-2'>Name</th>
                  <th className='p-2'>Category</th>
                  <th className='p-2'>Quantity</th>
                  <th className='p-2'>Price</th>
                  <th className='p-2'>Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-t border-b'>
                  <td className='p-2'>Notebook</td>
                  <td className='p-2'>Paper</td>
                  <td className='p-2'>2 Kg</td>
                  <td className='p-2'>₹ 12</td>
                  <td className='p-2'>₹ 123</td>
                </tr>
              </tbody>
            </table>
            <div className='flex justify-between m-3'>
              <div className='flex space-x-4'>
                <button className='bg-black text-white h-7 w-28 rounded-3xl text-xs'>Cash</button>
                <button className='bg-myBlue text-white h-7 w-28 rounded-3xl text-xs'>UPI</button>
              </div>
              <div className='flex flex-col space-y-2 font-bold'>
                <div className='flex justify-between'>
                  <label className=''>Total Quantity :</label>
                  <p>120 Kg</p>
                </div>
                <div className='flex justify-between'>
                  <label className=''>Total Amount :</label>
                  <p> ₹ 1258</p>
                </div>
              </div>
            </div>
          </div>
        </div>      
      </div>
      <FooterOfAdminAndShop/>
      {/* <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <img className='' src={success} alt="successimage" />
          <div className='text-center'>
            <p className='text-xl font-bold'>Woo hoo!!</p>
            <p className="text-xs  mb-4">Payment Successfully!</p>
            <button
              className="bg-black text-white py-2 px-4 rounded-3xl text-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default ScrapCollectioinConfirmation