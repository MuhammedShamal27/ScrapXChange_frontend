import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { jwtDecode } from 'jwt-decode';


const ShopAudioCall = () => {
  const { roomId } = useParams();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.shop.token);

  let shop = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      shop = decodedToken.user_id;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const handleLeaveRoom = () => {
    navigate('/shop/shopChat/Messages');
  }

  useEffect(() => {
    if(!containerRef.current) return

    const myMeeting = async() => {
      const appId = 1646937662
      const serverSecret = "cf390adbc0b7a6678da6cb1e03179c92"
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        shop,
        shop.name,
      )
      const zc = ZegoUIKitPrebuilt.create(kitToken)
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
    }
    myMeeting()
  },[ roomId, shop,  navigate ])

  return (

    <div>
        <div ref={containerRef} style={{height:'100vh',width:'100vw'}}/>
    </div>

  )
}

export default ShopAudioCall