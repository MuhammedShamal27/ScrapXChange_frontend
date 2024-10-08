import React, { useEffect } from 'react'
import { toast } from "sonner";
import socket from "../../utils/hooks/Socket";
import { useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";

const ShopNotification = () => {
    const shopToken = useSelector((state) => state.shop.token);

    let shop = null;
  
    if (shopToken) {
      try {
        const decodedShopToken = jwtDecode(shopToken);
        shop = decodedShopToken.user_id; // Shop ID from token
      } catch (error) {
        console.error("Invalid shop token:", error);
      }
    }
  
    useEffect(() => {
      const handleNotification = (data) => {
        console.log("Received notification for shop:", data);
        if (data.receiver_id === shop && data.sender_id !== shop) {
          toast(`Shop Notification: ${data.message}`);
        }
      };
  
      socket.on("connect", () => {
        console.log("Shop connected for notifications");
        if (shop) {
          socket.emit("join_room", { room_id: shop });
        }
      });
  
      socket.on("notification", handleNotification);
  
      return () => {
        socket.off("notification", handleNotification);
        socket.disconnect();
      };
    }, [shopToken]);
  return (
    <></>
  )
}

export default ShopNotification