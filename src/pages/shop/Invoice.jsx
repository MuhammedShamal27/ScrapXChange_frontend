import React from 'react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import logo from '../../assets/logo.png'

const Invoice = () => {
  return (
    <>
        <div className='flex bg-bgColor'>
            <ShopNavBar/>
            <div className='w-8/12'>   
                <HeadingAndProfile/>
                <div className='flex flex-col bg-white m-7  rounded-xl text-xs'>
                    <div className='flex justify-between p-3 border-b'>
                        <div className='flex items-center'>
                            <img className='w-14 h-14' src={logo} alt="logo" />
                            <div className=''>
                                <h1 className='text-xl font-bold'>INVOICE</h1>
                                <h5 className='font-semibold'>ScrapXchange</h5>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <h1 className='text-right font-medium'>#2024</h1>
                            <h1 className='font-bold'>INVOICE NUMBER</h1>
                        </div>
                    </div>
                    <div className='flex justify-between p-3 '>
                        <div className='flex justify-between gap-11 font-semibold ml-3'>
                            <div>
                                <h1>ShopName</h1>
                                <p>Beckam</p>
                                <p>Licences Number</p>
                                <p>Place</p>
                                <p>Phone</p>
                            </div>
                            <div>
                                <h1>UserName</h1>
                                <p>Shamal</p>
                                <p>Address</p>
                                <p>Place</p>
                                <p>Phone</p>
                            </div>
                        </div>
                        <div  className='flex flex-col font-medium ml-3'>
                            <div className='flex'>
                                <h1>Payment Method:</h1>
                                <p>Cash</p>
                            </div>
                            <div className='flex'>
                                <h1>Picked Date:</h1>
                                <p>28/08/2024</p>
                            </div>
                            <div className='flex'>
                                <h1>Scheduled Date:</h1>
                                <p>28/08/2024</p>
                            </div>
                            <div className='flex'>
                                <h1>Payment id:</h1>
                                <p>#sfser342sdfs</p>
                            </div>
                        </div>
                    </div>
                    <table className='flex flex-col m-7'>
                        <thead className='flex justify-between font-semibold border-b'>
                            <tr>Name</tr>
                            <tr>Category</tr>
                            <tr>quantity</tr>
                            <tr>Price</tr>
                            <tr>Total Price</tr>
                        </thead>
                        <tbody className='flex justify-between border-b'>
                            <tr>Name</tr>
                            <tr>Notebook</tr>
                            <tr>Paper</tr>
                            <tr>10 Kg</tr>
                            <tr>Rs 8</tr>
                            <tr>Rs 80</tr>
                        </tbody>
                    </table>
                    
                    <div className='flex justify-between p-7'>
                        <div className='flex justify-between gap-7'>
                            <button className='bg-black text-white h-7 w-28 rounded-3xl text-xs'>Go Back</button>
                            <button className='bg-myBlue text-white h-7 w-28 rounded-3xl text-xs'>Download</button>
                        </div>
                        <div className='font-semibold'>
                            <div className='flex'>
                                <label htmlFor="">Total Quantity:</label>
                                <p>73 kg</p>
                            </div>
                            <div className='flex'>
                                <label htmlFor="">Total Amount:</label>
                                <p>Rs 1212</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <FooterOfAdminAndShop/>
    </>
  )
}

export default Invoice