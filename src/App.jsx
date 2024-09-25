import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import socket from "./utils/hooks/Socket";



function App() {
  // const socket = useRef();

  // useEffect(() => {
  //   // connect the socket when the app loads
  //   socket.connect();

  //   socket.current.on( "connect",()=>{
  //     console.log('socket connected',socket.id)
  //   })

  //   socket.current.on('disconnect',()=>{
  //     console.log('socket disconnected')
  //   })

  //   // Listen for notification events
  //   socket.current.on("notification", (data) => {
  //     console.log("Notification received:", data);

  //     // Display notification message
  //     toast(`New Notification: ${data.message}`);
  //   });

  //   return ()=> {
  //     // Cleanup socket on component unmount
  //     socket.current.disconnect();
  //   }
  // },[])
  
  return (
    <>
        <Outlet/>
    </>
  );
}

export default App;
