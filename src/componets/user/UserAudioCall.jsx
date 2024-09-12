import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { jwtDecode } from 'jwt-decode';
import { userProfile } from '../../services/api/user/userApi';


const UserAudioCall = () => {

  const { roomId } = useParams();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(null);
  const [isRoomJoined, setIsRoomJoined] = useState(false); // Track if room is already joined



  let user = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      user = decodedToken.user_id?.toString();
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }


  useEffect(() => {
    console.log('the profile is started')

    const fetchProfile = async () => {
      try {

        const userData = await userProfile();
        setProfile(userData);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };
    console.log('the profile funcion is over')
    fetchProfile();
  }, [token]);

  const handleLeaveRoom = () => {
    navigate('/userChat');
  }
  

  useEffect(() => {
    console.log('the zego is started')
    if(!containerRef.current || !profile || isRoomJoined) return

    const myMeeting = async() => {
      console.log('the zego fuction is started')

      const appId = 1646937662
      const serverSecret = "cf390adbc0b7a6678da6cb1e03179c92" 

      const username = profile?.username || "Default Shop Name";
      console.log('the shop name',username)
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        user,
        username,
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
  },[roomId,user,profile])

    // console.log('is comming for user')
    // const { roomId } = useParams();
    // const containerRef = useRef(null);
    // const [isRoomJoined, setIsRoomJoined] = useState(false);    const navigate = useNavigate();
    // const [profile, setProfile] = useState(null);
    // const token = useSelector((state) => state.auth.token);
  
    // let user = null;
    // if (token) {
    //   try {
    //     const decodedToken = jwtDecode(token);
    //     user = decodedToken.user_id?.toString();
    //   } catch (error) {
    //     console.error("Invalid token:", error);
    //   }
    // }
    
    // useEffect(() => {
    //   const fetchProfile = async () => {
    //     try {
    //       const userData = await userProfile(token);
    //       setProfile(userData);
    //     } catch (error) {
    //       console.error("Error fetching user profile data:", error);
    //     }
    //   };
    //   fetchProfile();
    // }, [token]);

  
    // const handleLeaveRoom = () => {
    //   navigate('/userChat');
    // }
  
    // useEffect(() => {
    //   console.log('started zego');
    //   if (!containerRef.current || !profile ||  !isRoomJoined) {
    //     return;
    //   } else {
    //     console.log('Conditions met, executing myMeeting');
    //   }
  
    //   const myMeeting = async() => {
    //     const appId = 1646937662
    //     const serverSecret = "cf390adbc0b7a6678da6cb1e03179c92"
    //     const username = profile?.username || "Default User Name";
    //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    //       appId,
    //       serverSecret,
    //       roomId,
    //       user,
    //       username,
    //     )
    //     const zc = ZegoUIKitPrebuilt.create(kitToken)
    //     console.log('Joining room with token:', kitToken);  
    //     console.log("ZegoUIKitPrebuilt instance created", zc);

    //     zc.joinRoom({
    //       container: containerRef.current,
    //         scenario:{
    //             mode:ZegoUIKitPrebuilt.OneONoneCall,
    //         },
    //         showScreenSharingButton:false,
    //         showPreJoinView: false ,
    //         turnOnCameraWhenJoining: false,
    //         turnOnMicrophoneWhenJoining: true,
    //         showLeaveRoomConfirmDialog: false,
    //         onLeaveRoom: handleLeaveRoom,
    //         onUserLeave: handleLeaveRoom,
    //     });
    //     setIsRoomJoined(true); 
    //     console.log('Room joined, flag updated to true');

    //   }
    //   console.log('Calling myMeeting function');
    //   myMeeting()
    //   setIsRoomJoined(false);
    // },[roomId,user,profile])


    
  return (
    <div style={{height:'100vh',width:'100vw'}}>
        <div ref={containerRef} style={{height:'100vh',width:'100vw'}}/>
    </div>
  )
}

export default UserAudioCall