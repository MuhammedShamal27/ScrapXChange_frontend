import React, { useEffect, useState } from "react";
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
import { useRef } from "react";
import SA_profile from "../../assets/SA_profile.png";
import { fetchMessages, sendMessage } from "../../services/api/user/userApi";
import { useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Outlet, useNavigate } from "react-router-dom";
import AudioCallModal from "../AudioCallModal";

const UserMessageBox = () => {
  const { roomId } = useParams();
  const { selectedShop, chatRoom } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const token = useSelector((state) => state.auth.token);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [callId, setCallId] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const navigate = useNavigate();

  let user = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      user = decodedToken.user_id; // Assuming your JWT has `user_id`
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
      fetchMessages(roomId)
        .then((fetchedMessages) => {
          setMessages(fetchedMessages);
        })
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    let reconnectInterval;

    console.log("Attempting WebSocket connection to:", roomId);

    socket.current = io(`${import.meta.env.VITE_SCRAPXCHANGE_API_URL}`, {
      transports: ["websocket"],
      debug: true,
    });

    console.log("WebSocket reference:", socket.current);

    socket.current.emit("join_room", { room_id: roomId, user_id: user });

    socket.current.on("connect", () => {
      console.log("Connected to Socket.IO server");
      clearInterval(reconnectInterval);
    });

    socket.current.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
      clearInterval(reconnectInterval);
    });

    socket.current.on("disconnect", () => {
      console.log("Socket.IO disconnected");
      reconnectInterval = setInterval(() => {
        console.log("Attempting to reconnect...");
        socket.current.connect();
      }, 5000);
    });

    return () => {
      console.log("Closing WebSocket connection...");
      socket.current.disconnect();
      clearInterval(reconnectInterval);
    };
  }, [roomId]);

  useEffect(() => {
    if (!socket.current) return;

    const handleMessage = (data) => {
      console.log("User Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.current.on("receive_message", handleMessage);

    return () => {
      socket.current.off("receive_message", handleMessage); // Cleanup listener
    };
  }, []); // Empty dependency array because you only want this to run once

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !selectedFile) return;
    const currentTimestamp = new Date().toISOString();

    try {
      let messagePayload = {
        message: newMessage,
        room_id: roomId,
        sender_id: user,
        receiver_id: selectedShop.user,
        timestamp: currentTimestamp,
      };

      // Handle file sending via API
      if (selectedFile || newMessage) {
        const formData = new FormData();
        formData.append("room_id", roomId);
        formData.append("receiver_id", selectedShop.id);
        formData.append("message", newMessage);

        if (selectedFile) {
          formData.append("file", selectedFile);
        }

        for (let [key, value] of formData.entries()) {
          console.log("formdata console,", `${key}:`, value);
        }

        // Send the file via API and get the response
        const response = await sendMessage(formData); // API call
        console.log("the response comming for shop send message", response);

        // Add the file URL to the WebSocket payload based on response
        if (response.image) {
          messagePayload.image = response.image;
        }
        if (response.video) {
          messagePayload.video = response.video;
        }

        setSelectedFile(null);
      }

      // WebSocket send logic
      if (socket.current && socket.current.connected) {
        console.log("the message sending includes", messagePayload);
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //---audio call

  // Generate random ID
  const randomID = (len = 5) => {
    let result = "";
    const chars =
      "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handlePhoneClick = () => {
    const callId = randomID(); // Generate random ID for the call
    setCallId(callId);
    if (callId) {
      socket.current.emit("audio_call", {
        callId,
        sender_id: user,
        receiver_id: selectedShop.user,
        room_id: roomId,
        message: "Calling",
      });
      navigate(`/audioCall/${roomId}/${callId}`);
    }
  };

  const handleAcceptCall = () => {
    if (callId) {
      socket.current.emit("audio_call", {
        callId,
        sender_id: user, // Shop accepting the call
        receiver_id: selectedShop.user,
        room_id: roomId,
        message: "call_accepted",
      });
      navigate(`/audioCall/${roomId}/${callId}`);
    }
  };

  const handleDeclineCall = () => {
    socket.current.emit("audio_call", {
      message: "call_declined",
      sender_id: user,
      receiver_id: selectedShop.id,
      room_id: roomId,
    });
    setShowModal(false);
  };

  useEffect(() => {
    if (!socket.current) return;

    const handleAudioMessage = (data) => {
      console.log("the data comming to the handle message", data);

      // Check if the current user/shop is the receiver
      if (data.message === "Calling" && data.receiver_id === user) {
        setCallId(data.callId);
        // Show the incoming call modal
        setShowModal(true);
      }

      if (data.message === "call_declined" && data.receiver_id === user) {
        alert("The call was declined.");
        setShowModal(false);
      }
    };

    socket.current.on("receive_message", handleAudioMessage);

    return () => {
      socket.current.off("receive_message", handleAudioMessage); // Cleanup listener
    };
  }, [user]);

  return (
    <div className="flex flex-col flex-grow">
      {selectedShop ? (
        <>
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div className="flex items-center">
              <img
                src={SA_profile}
                alt=""
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h1 className="font-semibold">{selectedShop.shop_name}</h1>
                <p className="text-gray-500 text-xs">Online</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Phone
                color="#a3aed0"
                size={20}
                onClick={handlePhoneClick}
                className="cursor-pointer"
              />
              <Search color="#a3aed0" size={20} />
            </div>
          </div>

          {showModal && (
            <AudioCallModal
              callId={callId}
              handleAcceptCall={handleAcceptCall}
              handleDeclineCall={handleDeclineCall}
            />
          )}

          <div className="flex flex-col flex-grow overflow-y-auto space-y-4 mb-4">
            {Array.isArray(messages) &&
              messages.map((msg, index) => (
                <div
                  key={index}
                  ref={index === messages.length - 1 ? scrollRef : null} // Add ref to the last message
                  className={`flex ${
                    msg.sender === user ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      msg.sender === user
                        ? "bg-gray text-black shadow-2xl"
                        : "bg-bgColor text-black shadow-2xl"
                    }`}
                  >
                    {msg.message}
                    {msg.image && (
                      <img
                        src={`${import.meta.env.VITE_SCRAPXCHANGE_API_URL}${
                          msg.image
                        }`}
                        alt="image"
                        className="w-full sm:max-w-xs mt-2 rounded-lg"
                      />
                    )}
                    {msg.video && (
                      <video
                        src={`${import.meta.env.VITE_SCRAPXCHANGE_API_URL}${
                          msg.video
                        }`}
                        controls
                        className="max-w-xs mt-2 rounded-lg"
                      />
                    )}

                    <span className="text-xs text-black ml-7">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {/* {new Date(msg.timestamp).toISOString().slice(11, 16)} */}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center border rounded-full relative gap-3 p-1">
            <div>
              <Paperclip
                color="#a3aed0"
                onClick={handlePaperclipClick}
                className="cursor-pointer"
              />

              {showMediaOptions && (
                <div className="absolute bottom-full mb-2 flex space-x-2 bg-bgColor h-10 w-20 items-center p-2 shadow-2xl rounded-lg">
                  <Camera
                    color="#a3aed0"
                    className="cursor-pointer"
                    onClick={handleIconClick}
                  />
                  <Video
                    color="#a3aed0"
                    className="cursor-pointer"
                    onClick={handleIconClick}
                  />
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <input
              className="border-none outline-none flex-grow bg-transparent"
              placeholder="Write something here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            {(newMessage.trim() !== "" || showMediaOptions) && (
              <div
                className="bg-lightGreen p-3 rounded-full cursor-pointer"
                onClick={handleSendMessage}
              >
                <SendHorizontal color="#ffffff" />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="hidden sm:flex items-center justify-center h-full text-gray-500">
          Select a shop to start chatting
        </div>
      )}
    </div>
  );
};

export default UserMessageBox;
