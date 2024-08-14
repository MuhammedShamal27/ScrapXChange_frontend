import React from 'react'
import Background_image from '../../assets/Background_image.png'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'

const ScrapRequestDetails = () => {
  return (
    <>
      <div className="adminFont flex bg-bgColor min-h-screen">
        <ShopNavBar />
        <div className="flex flex-col flex-1">
          <HeadingAndProfile />
          <div className="flex flex-1 justify-center items-center bg-bgColor rounded-lg">
            <div className="bg-white rounded-2xl">
              <div className="flex flex-col">
                <div className="flex flex-col relative">
                  <img
                    className="m-3"
                    src={Background_image}
                    alt="Profile_image"
                  />
                  <img
                    className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 rounded-full w-14 h-14"
                    src=""
                    alt="Profile"
                  />
                </div>
                <h1 className="text-center text-blue-950 text-base m-7 font-semibold"></h1>
                <div className="grid grid-cols-2 gap-y-10 gap-7 m-5 text-xs">
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Name</p>
                    <p className="text-black"></p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Date Requested</p>
                    <p className="text-black"></p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Address</p>
                    <p className="text-black"></p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Landmark</p>
                    <p className="text-black"></p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Pincode</p>
                    <p className="text-black"></p>
                  </div>
                  <div className="rounded-xl p-3 shadow">
                    <p className="text-gray-500">Phone</p>
                    <p className="text-black"></p>
                  </div>
                </div>
                <div className="flex flex-col rounded-lg shadow-md m-3 gap-5 items-center text-xs">
                  <h1 className="font-medium">Selected Items</h1>
                  <p className="text-gray-500">Items requested from the user side.</p>
                </div>
                <div className="flex justify-evenly p-3 items-center">
                  <button className="bg-green-500 text-white rounded-3xl text-xs h-7 w-36">Schedule</button>
                  <button className="bg-myBlue text-white rounded-3xl text-xs h-7 w-36">Reschedule</button>
                  <button className="bg-red-700 text-white rounded-3xl text-xs h-7 w-36">Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  )
}

export default ScrapRequestDetails
