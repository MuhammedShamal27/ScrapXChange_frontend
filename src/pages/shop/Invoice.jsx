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
                    <div className='flex justify-between p-3'>
                        <div className='flex'>
                            <img className='w-14 h-14' src={logo} alt="logo" />
                            <div className='items-center'>
                                <h1>INVOICE</h1>
                                <h5>ScrapXchange</h5>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-right'>#2024</h1>
                            <h1>INVOICE NUMBER</h1>
                        </div>
                    </div>
                    <div className='flex justify-between p-3'>
                        <div>
                            <h1>ShopName</h1>
                            <p>Beckam</p>
                            <p>Shop Licences Number</p>
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
                        <div>
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
                    <table className='flex flex-col'>
                        <thead>
                            <tr>Name</tr>
                            <tr>Category</tr>
                            <tr>quantity</tr>
                            <tr>Price</tr>
                            <tr>Total Price</tr>
                        </thead>
                        <tbody>
                        <tr>Name</tr>
                            <tr>Notebook</tr>
                            <tr>Paper</tr>
                            <tr>10 Kg</tr>
                            <tr>Rs 8</tr>
                            <tr>Rs 80</tr>
                        </tbody>
                    </table>
                    
                    <div className='flex'>
                        <div>
                            <button>Go Back</button>
                            <button>Download</button>
                        </div>
                        <div>
                            <label htmlFor="">Total Quantity:</label>
                            <p>73 kg</p>
                        </div>
                        <div>
                            <label htmlFor="">Total Amount:</label>
                            <p>Rs 1212</p>
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