import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { jwtDecode } from 'jwt-decode';
import { fetchShopProfile } from '../../services/api/shop/shopApi';


const ShopAudioCall = () => {
  const { roomId } = useParams();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.shop.token);
  const [profile, setProfile] = useState(null);
  const [isRoomJoined, setIsRoomJoined] = useState(false); // Track if room is already joined



  let shop = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      shop = decodedToken.user_id?.toString();
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }


  useEffect(() => {
    console.log('the profile is started')

    const fetchProfile = async () => {
      try {

        const shopData = await fetchShopProfile();
        setProfile(shopData);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };
    console.log('the profile funcion is over')
    fetchProfile();
  }, [token]);

  const handleLeaveRoom = () => {
    navigate('/shop/shopChat');
  }
  

  useEffect(() => {
    console.log('the zego is started')
    if(!containerRef.current || !profile || isRoomJoined) return

    const myMeeting = async() => {
      console.log('the zego fuction is started')

      const appId = 176630120
      const serverSecret = "ec7e0aad2c5f86cf4e76f7369e3520fc" 

      const shopName = profile?.shop_name || "Default Shop Name";
      console.log('the shop name',shopName)
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        shop,
        shopName,
      )
      const zc = ZegoUIKitPrebuilt.create(kitToken)
      console.log('Joining room with token:', kitToken);  
      console.log("ZegoUIKitPrebuilt instance created", zc);
      zc.joinRoom({
        container: containerRef.current,
          scenario:{
              mode:ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton:false,
          showPreJoinView: false ,
          turnOnCameraWhenJoining: false,
          turnOnMicrophoneWhenJoining: true,
          showLeaveRoomConfirmDialog: false,
          onLeaveRoom: handleLeaveRoom,
          onUserLeave: handleLeaveRoom,
      })
      setIsRoomJoined(true); 
          // Cleanup to ensure you leave the room when the component unmounts or `useEffect` is triggered again

    return () => {
      console.log('Leaving room');
      setIsRoomJoined(false);
    };
    }
    console.log('the zego funcion is over')
    myMeeting()
  },[roomId,shop,profile])

  return (

    <div>
        <div ref={containerRef} style={{height:'100vh',width:'100vw'}}/>
    </div>

  )
}

export default ShopAudioCall


// roomId, userId, userName, navigate