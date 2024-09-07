import { jwtDecode } from "jwt-decode";
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
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { io } from "socket.io-client";

export const ShopMessageBox = () => {
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
  const socket = useRef();
  const token = useSelector((state) => state.shop.token);
  const scrollRef = useRef();

  let shop = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      shop = decodedToken.user_id;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);




  useEffect(() => {
    if (!chatRoom?.id) return;

    let reconnectInterval;


    console.log("Attempting WebSocket connection to:", chatRoom.id);
    // Establish WebSocket connection using native WebSocket
    // socket.current = io("http://127.0.0.1:8000", { transports: ['websocket'],});
    socket.current = io("http://127.0.0.1:8000", { transports: ['websocket'], debug: true });

    console.log("WebSocket reference:", socket.current);
    socket.current.emit('join_room', { room_id: chatRoom.id, shop_id: shop });

    // Listen for connection event
    socket.current.on("connect", () => {
        console.log("Connected to Socket.IO server");
        clearInterval(reconnectInterval);
      });

    // Handle Socket.IO error event
    socket.current.on("connect_error", (error) => {
        console.error("Socket.IO connection error:", error);
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
  }, [chatRoom.id]);

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
        
      const formData = new FormData();
      formData.append("room_id", chatRoom.id);
      formData.append("receiver_id", selectedUser.id);
      console.log("the selected user id", selectedUser.id);
      formData.append("message", newMessage);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      if (audioBlob) {
        formData.append("audio", audioBlob, "audio.webm");
      }
      // Prepare the message payload
      const messagePayload = {
        message: newMessage,
        room_id: chatRoom.id,
        sender_id: shop,
        receiver_id: selectedUser.id,
      };
      console.log("Message payload::", messagePayload);
      console.log("WebSocket state:", socket.current); // 0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED
      console.log("WebSocket state connected:", socket.current.connected);
      // Check if the Socket.IO connection is open before sending a message
      if (socket.current && socket.current.connected) {
        console.log("Socket.IO is connected, sending message");
        socket.current.emit("send_message", messagePayload);
      } else {
        console.error("Socket.IO is not connected. Message not sent.");
      }

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

    //   setMessages((prevMessages) => [...prevMessages, messagePayload]);
      console.log("Message added to state",messages);
      setNewMessage("");
      setSelectedFile(null); // Reset the selected file after sending
      setAudioBlob(null);
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
              <Phone color="#a3aed0" size={20} />
              <Search color="#a3aed0" size={20} />
            </div>
          </div>
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