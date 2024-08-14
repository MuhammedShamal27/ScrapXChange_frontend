import React from 'react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'

const TodayPendings = () => {
  return (
    <>
        <div className="adminFont flex bg-bgColor min-h-screen">
            <ShopNavBar/>
            <div>
                <HeadingAndProfile/>
            </div>
        </div>
    </>
  )
}

export default TodayPendings