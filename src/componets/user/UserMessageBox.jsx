import React, { useEffect, useState } from 'react'
import { Camera, CircleStop, Mic, Paperclip, Phone, Search, SendHorizontal, Video } from 'lucide-react'
import { useRef } from 'react';
import SA_profile from "../../assets/SA_profile.png";
import { fetchMessages, sendMessage } from '../../services/api/user/userApi';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useOutletContext, useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

const UserMessageBox = () => {
const { roomId } = useParams();
  const { selectedShop, chatRoom } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const { sendMessage: sendSocketMessage, lastMessage, readyState } = useWebSocket(
    chatRoom ? `ws://127.0.0.1:8000/ws/chat/${chatRoom.id}/` : null,
    { shouldReconnect: (closeEvent) => true }
  );
  const token = useSelector((state) => state.auth.token);
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
    console.log('Fetching messages for room ID:', roomId);
    const fetchChatRoomMessages = async () => {
      if (roomId) {
        const response = await fetchMessages(roomId);
        console.log('Fetched messages:', response);
        setMessages(response);
      }
    };
    fetchChatRoomMessages();
  }, [roomId]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      console.log("the data shows", data);
      setMessages((prevMessages) => {
        // Check for duplicates
        const isDuplicate = prevMessages.some((msg) => msg.id === data.id);
        if (isDuplicate) {
          console.log("Duplicate message detected:", data);
          return prevMessages;
        }
        console.log("Adding new message:", data);
        return [...prevMessages, data];
      });
    }
  }, [lastMessage]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !selectedFile && !audioBlob) return;

    try {
      const formData = new FormData();
      formData.append("room_id", chatRoom.id);
      formData.append("receiver_id", selectedShop.user);
      console.log("the selected shop id", selectedShop.user);
      formData.append("message", newMessage);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      if (audioBlob) {
        formData.append("audio", audioBlob, "audio.webm");
      }

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      console.log("the response from the formData", formData);

      const response = await sendMessage(formData);
      console.log("the response sending ", response);

      setMessages((prevMessages) => [...prevMessages, response]);
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      mediaRecorder.stop();
      console.log("the recording is stopped", mediaRecorder);
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
                        <h1 className="font-semibold">
                          {selectedShop.shop_name}
                        </h1>
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
                            msg.sender === user
                              ? "justify-end"
                              : "justify-start"
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
                      <Paperclip color="#a3aed0" onClick={handlePaperclipClick}   className="cursor-pointer"   />

                      {showMediaOptions && (
                        <div className="absolute bottom-full mb-2 flex space-x-2 bg-bgColor h-10 w-20 items-center p-2 shadow-2xl rounded-lg">
                          <Camera color="#a3aed0" className="cursor-pointer" onClick={handleIconClick} />
                          <Video color="#a3aed0" className="cursor-pointer" onClick={handleIconClick} />
                        </div>
                      )}

                      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange}  />
                    </div>
                    <input className="border-none outline-none flex-grow bg-transparent"
                      placeholder="Write something here..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                    {newMessage.trim() === "" &&
                    !isRecording &&
                    !showMediaOptions ? (
                      <div className="bg-lightGreen p-3 rounded-full cursor-pointer" onClick={handleMicClick} >
                        <Mic color="#ffffff" />
                      </div>
                    ) : isRecording ? (
                      <div className="bg-lightGreen p-3 rounded-full cursor-pointer" onClick={handleMicClick} >
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
  )
}

export default UserMessageBox