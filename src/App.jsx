import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import socket from "./utils/hooks/Socket";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

function App() {
  const userToken = useSelector((state) => state.auth.token);
  const shopToken = useSelector((state) => state.shop.token);

  // Initialize user and shop to null
  let user = null;
  let shop = null;

  // Decode the user token if it exists
  if (userToken && !shopToken) {
    // Ensure only userToken is used for user side
    try {
      const decodedUserToken = jwtDecode(userToken);
      user = decodedUserToken.user_id;
      console.log("Logged in user ID:", user);
    } catch (error) {
      console.error("Invalid user token:", error);
    }
  }

  if (shopToken && !userToken) {
    // Ensure only shopToken is used for shop side
    try {
      const decodedShopToken = jwtDecode(shopToken);
      shop = decodedShopToken.user_id;
      console.log("Logged in shop ID:", shop);
    } catch (error) {
      console.error("Invalid shop token:", error);
    }
  }

  useEffect(() => {
    const handleNotification = (data) => {
      console.log("Received notification:", data);
      // Handle only the notifications meant for the current shop or user
      if (data.receiver_id === user) {
        // Ensure notification is ONLY shown to users
        if (data.sender_id !== user) {
          toast(`User Notification: ${data.message}`);
        }
      } else if (data.receiver_id === shop) {
        // Ensure notification is ONLY shown to shops
        if (data.sender_id !== shop) {
          toast(`Shop Notification: ${data.message}`);
        }
      }
    };
  
    // Connect to the socket when either user or shop is logged in
    socket.on("connect", () => {
      console.log("Connected for notifications");
  
      // Join the room for either user or shop
      if (user) {
        socket.emit("join_room", { room_id: user }); // Join room for the user
      } else if (shop) {
        socket.emit("join_room", { room_id: shop }); // Join room for the shop
      }
    });
  
    // Listen for notifications
    socket.on("notification", handleNotification);
  
    // Cleanup
    return () => {
      socket.off("notification", handleNotification);
      socket.disconnect();
    };
  }, [userToken, shopToken]); // Use both userToken and shopToken in the dependency array
  

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
