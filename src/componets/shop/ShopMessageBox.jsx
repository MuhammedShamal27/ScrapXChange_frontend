import React, { useEffect, useRef } from "react";
import {
    Camera,
    CircleStop,
    Mic,
    Paperclip,
    Phone,
    Search,
    SendHorizontal,
    Video,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { fetchShopMessages, fetchShopProfile, shopSendMessage } from "../../services/api/shop/shopApi";
import { Outlet,useNavigate } from "react-router-dom";
import AudioCallModal from "../AudioCallModal";

const ShopMessageBox = () => {
  const { roomId } = useParams();
  const { selectedUser, chatRoom } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state
  const socket = useRef();
  const navigate = useNavigate();  
  const token = useSelector((state) => state.shop.token);
  const [callId, setCallId] = useState(null);
  const scrollRef = useRef();

  let shop = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log('the decoded token',decodedToken)
      shop = decodedToken.user_id;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);


    // Fetch old messages when the component mounts
    useEffect(() => {
        if (roomId) {
          fetchShopMessages(roomId).then((fetchedMessages) => {
            setMessages(fetchedMessages);
          }).catch((err) => console.error("Error fetching messages:", err));
        }
      }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    let reconnectInterval;


    console.log("Attempting WebSocket connection to:", roomId);
    // Establish WebSocket connection using native WebSocket
    // socket.current = io("http://127.0.0.1:8000", { transports: ['websocket'],});
    socket.current = io("http://127.0.0.1:8000", { transports: ['websocket'], debug: true });

    console.log("WebSocket reference:", socket.current);
    socket.current.emit('join_room', { room_id: roomId, shop_id: shop });

    // Listen for connection event
    socket.current.on("connect", () => {
        console.log("Connected to Socket.IO server");
        clearInterval(reconnectInterval);
      });

    // Handle Socket.IO error event
    socket.current.on("connect_error", (error) => {
        console.error("Socket.IO connection error:", error);
        clearInterval(reconnectInterval);
      });

    // Handle disconnection and automatic reconnection
    socket.current.on("disconnect", () => {
        console.log("Socket.IO disconnected");
        reconnectInterval = setInterval(() => {
          console.log("Attempting to reconnect...");
          socket.current.connect();
        }, 5000);
      });

    return () => {
      console.log("Closing WebSocket connection...");
      socket.current.disconnect(); // Clean up WebSocket connection
      clearInterval(reconnectInterval);
    };
  }, [roomId]);

  useEffect(() => {
    if (!socket.current) return;
  
    const handleMessage = (data) => {
      console.log("Shop Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };
  
    socket.current.on("receive_message", handleMessage);
  
    return () => {
      socket.current.off("receive_message", handleMessage); // Cleanup listener
    };
  }, []); // Empty dependency array because you only want this to run once

    
    const handleSendMessage = async () => {
        if (newMessage.trim() === "" && !selectedFile && !audioBlob) return;
      
        try {
          let messagePayload = {
            message: newMessage,
            room_id: roomId,
            sender_id: shop,
            receiver_id: selectedUser.id,
          };
      
          // Handle file sending via API
          if (selectedFile || audioBlob) {
            const formData = new FormData();
            formData.append("room_id", roomId);
            formData.append("receiver_id", selectedUser.id);
            formData.append("message", newMessage);
      
            if (selectedFile) {
              formData.append("file", selectedFile);
            }
      
            if (audioBlob) {
              formData.append("audio", audioBlob, "audio.webm");
            }
      
            // Send the file via API and get the response
            const response = await shopSendMessage(formData); // API call
            console.log('the response comming for shop send message',response)

            // Add the file URL to the WebSocket payload based on response
            if (response.image) {
              messagePayload.image = response.image;
            }
            if (response.video) {
              messagePayload.video = response.video;
            }
            if (response.audio) {
                console.log('is audio')
              messagePayload.audio = response.audio;
            }
      
            // Reset file and audio input after sending
            setSelectedFile(null);
            setAudioBlob(null);
          }
      
          // WebSocket send logic
          if (socket.current && socket.current.connected) {
            socket.current.emit("send_message", messagePayload);
          } else {
            console.error("Socket.IO is not connected. Message not sent.");
          }
      
          setNewMessage(""); // Clear the message input
        } catch (error) {
          console.error("Error sending message:", error);
        }
      };
      

  const handlePaperclipClick = () => {
    setShowMediaOptions(!showMediaOptions);
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleMicClick = () => {
    if (isRecording) {
      mediaRecorder.stop();
      console.log("the recodering is stopped", mediaRecorder);
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("started the audio recording");
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.ondataavailable = (event) => {
          setAudioBlob(event.data);
          setIsRecording(false);
        };
        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone", error);
      });
  };

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        if (audioBlob) {
          console.log("Audio Blob:", audioBlob);
          await handleSendMessage();
        }
      };
    }
  }, [mediaRecorder]);


  //audio call
  // Generate random ID
  const randomID = (len = 5) => {
    let result = "";
    const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handlePhoneClickShop = () => {
    const callId = randomID(); // Generate random ID for the call
    setCallId(callId)
    console.log('the call id is ',callId)
    if (callId){
      socket.current.emit("audio_call", {
        callId,
        sender_id: shop,
        receiver_id: selectedUser.id, // If the shop is calling a user
        room_id: roomId,
        message: "Calling"
      });
      navigate(`/shop/shopChat/audioCall/${roomId}/${callId}`);
    };
    }
  

  const handleAcceptCall = () => {
    if (callId){
      socket.current.emit("audio_call", {
        callId,
        sender_id: shop, // Shop accepting the call
        receiver_id: selectedUser.id, 
        room_id: roomId,
        message: "call_accepted"
      });
      navigate(`/shop/shopChat/audioCall/${roomId}/${callId}`);
    };
    }
  

  const handleDeclineCall = () => {
    socket.current.emit("audio_call", {
      message: "call_declined",
      sender_id: shop,
      receiver_id: selectedUser.id,
      roomId
    });
    setShowModal(false);
  };

  useEffect(() => {
    if (!socket.current) return;
  
    const handleMessage = (data) => {
      console.log('the data comming to the handle message',data)

          // Check if the current user/shop is the receiver
    if (data.message === "Calling" && data.receiver_id === shop) {
      // Show the incoming call modal
      setCallId(data.callId);
      setShowModal(true);
    } 

    if (data.message === "call_declined" && data.receiver_id === shop) {
      alert("The call was declined.");
      setShowModal(false);
    }
    };
  
    socket.current.on("receive_message", handleMessage);
  
    return () => {
      socket.current.off("receive_message", handleMessage); // Cleanup listener
    };
  }, [shop]);

      


  return (
    <div className="flex flex-col flex-grow">
      {selectedUser ? (
        <>
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div className="flex items-center">
              <img
                src={selectedUser.User_profile.profile_picture}
                alt=""
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h1 className="font-semibold">{selectedUser.username}</h1>
                <p className="text-gray-500 text-xs">Online</p>
              </div>
            </div>
            <div className="flex space-x-4">

              <Outlet />
              <Phone  color="#a3aed0" size={20} onClick={handlePhoneClickShop} className="cursor-pointer" />
              <Search color="#a3aed0" size={20} />
            </div>
          </div>

          {showModal && (
            <AudioCallModal
            callId={callId}
            handleAcceptCall={handleAcceptCall}
            handleDeclineCall={handleDeclineCall} />
          )}

          <div className="flex flex-col flex-grow overflow-y-auto space-y-4 mb-4">
            {Array.isArray(messages) &&
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === shop ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      msg.sender === shop
                        ? "bg-bgColor text-black shadow-2xl"
                        : "bg-gray text-black shadow-2xl"
                    }`}
                  >
                    {msg.message}
                    {msg.image && (
                      <img
                        src={`http://127.0.0.1:8000${msg.image}`}
                        alt="image"
                        className="max-w-xs mt-2 rounded-lg"
                      />
                    )}
                    {msg.video && (
                      <video
                        src={`http://127.0.0.1:8000${msg.video}`}
                        controls
                        className="max-w-xs mt-2 rounded-lg"
                      />
                    )}
                    {msg.audio && (
                      <audio
                        src={`http://127.0.0.1:8000${msg.audio}`}
                        controls
                      />
                    )}
                    <span className="text-xs text-black ml-7">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center border rounded-full relative gap-3">
            <div>
              <Paperclip color="#a3aed0" onClick={handlePaperclipClick} className="cursor-pointer" />
              {showMediaOptions && (
                <div className="absolute bottom-full mb-2 flex space-x-2 bg-bgColor h-10 w-20 items-center p-2 shadow-2xl rounded-lg">
                  <Camera color="#a3aed0" className="cursor-pointer" onClick={handleIconClick} />
                  <Video color="#a3aed0" className="cursor-pointer" onClick={handleIconClick} />
                </div>
              )}

              <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
            </div>
            <input
              className="border-none outline-none flex-grow bg-transparent"
              placeholder="Write something here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            {newMessage.trim() === "" && !isRecording && !showMediaOptions ? (
              <div className="bg-lightGreen p-3 rounded-full cursor-pointer" onClick={handleMicClick} >
                <Mic color="#ffffff" />
              </div>
            ) : isRecording ? (
              <div className="bg-lightGreen p-3 rounded-full cursor-pointer" onClick={handleMicClick}>
                <CircleStop color="#ffffff" />
              </div>
            ) : (
              <div className="bg-lightGreen p-3 rounded-full cursor-pointer" onClick={handleSendMessage} >
                <SendHorizontal color="#ffffff" />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a shop to start chatting
        </div>
      )}
    </div>
  );
};



export default ShopMessageBox;