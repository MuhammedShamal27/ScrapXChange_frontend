import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import socket from "./utils/hooks/Socket";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

function App() {
  const userToken = useSelector((state) => state.auth.token);
  const shopToken = useSelector((state) => state.shop.token);

  let userId = null;
  let shopId = null;

  // Decode tokens to get user/shop IDs
  if (userToken) {
      try {
          const decodedUserToken = jwtDecode(userToken);
          userId = decodedUserToken.user_id;
      } catch (error) {
          console.error("Invalid user token:", error);
      }
  }

  if (shopToken) {
      try {
          const decodedShopToken = jwtDecode(shopToken);
          shopId = decodedShopToken.user_id;
      } catch (error) {
          console.error("Invalid shop token:", error);
      }
  }

  useEffect(() => {
      const handleNotification = (data) => {
        console.log('the notification data',data)
          // Check if the notification is meant for the logged-in user or shop
          if (userId && data.receiver_id === userId) {
              toast(`${data.message}`);
          } else if (shopId && data.receiver_id === shopId) {
              toast(` ${data.message}`);
          }
      };

      socket.on("connect", () => {
          console.log("Connected for notifications");
      });

      // Listen for notifications
      socket.on("notification", handleNotification);

      // Cleanup on component unmount
      return () => {
          socket.off("notification", handleNotification);
          socket.disconnect();
      };
  }, [userToken, shopToken]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
