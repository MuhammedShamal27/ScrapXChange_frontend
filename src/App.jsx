import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { messaging } from "../firebase";
// import { getToken } from "firebase/messaging";
// import { useSelector } from "react-redux";
// import { saveFcmToken } from "./services/api/notificationApi";

function App() {
  // const authToken = useSelector((state) => state.auth.token);
  // const shopToken = useSelector((state) => state.shop.token);
  // const adminToken = useSelector((state) => state.admin.token);

  // useEffect(() => {

  //   if (shopToken || authToken || adminToken) {
  //     console.log("Auth Token:", authToken);
  //     console.log("Shop Token:", shopToken);
  //     console.log("Admin Token:", adminToken);
  //     requestNotificationPermission();
  //   }
  // }, [adminToken, shopToken, shopToken]);



  // function requestNotificationPermission() {
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       getToken(messaging, {
  //         vapidKey: "BEnG8Hi91EpQArrVOCiDo8En61vu9KWxMGeQTXB21HnKx94WRlvBjTa3hor8hCx1zf-yLZ0ys2hJB_VZQ7yczjs",
  //       })
  //         .then((token) => {
  //           console.log("FCM Token:", token);
  //           sendTokenToServer(token); 
  //         })
  //         .catch((error) => {
  //           console.error("Error getting FCM token:", error);
  //         });
  //     }
  //   });
  // }

  // async function sendTokenToServer(token) {
  //   try {
  //     console.log("Sending FCM Token:", token);
  //     console.log("Using  Token:", adminToken || shopToken || authToken);
  //     const response = await saveFcmToken(token); 
  //     console.log("Token saved to server:", response);
  //   } catch (error) {
  //     console.error("Error saving token:", error);
  //   }
  // }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
