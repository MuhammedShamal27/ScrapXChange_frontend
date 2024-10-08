import React, { useEffect } from 'react'
import { toast } from "sonner";
import socket from "../../utils/hooks/Socket";
import { useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";

const UserNotification = () => {
    const userToken = useSelector((state) => state.auth.token);

    let user = null;
  
    if (userToken) {
      try {
        const decodedUserToken = jwtDecode(userToken);
        user = decodedUserToken.user_id; // User ID from token
      } catch (error) {
        console.error("Invalid user token:", error);
      }
    }
  
    useEffect(() => {
      const handleNotification = (data) => {
        console.log("Received notification for user:", data);
        if (data.receiver_id === user && data.sender_id !== user) {
          toast(`User Notification: ${data.message}`);
        }
      };
  
      socket.on("connect", () => {
        console.log("User connected for notifications");
        if (user) {
          socket.emit("join_room", { room_id: user });
        }
      });
  
      socket.on("notification", handleNotification);
  
      return () => {
        socket.off("notification", handleNotification);
        socket.disconnect();
      };
    }, [userToken]);
  return (
    <>
    </>
  )
}

export default UserNotification