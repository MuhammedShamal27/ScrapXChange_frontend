import React, { useEffect, useRef, useState } from "react";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import {Search,SendHorizontal,Phone,Paperclip,Camera,Video,Mic,CircleStop,} from "lucide-react";
import SA_profile from "../../assets/SA_profile.png";
import { fetchAllUsers, fetchshopChatRooms, fetchShopMessages, shopCreateOrFetchChatRoom, shopSendMessage } from "../../services/api/shop/shopApi";
import { fetchMessages } from "../../services/api/user/userApi";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const ShopChat = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showMediaOptions, setShowMediaOptions] = useState(false);

  const token = useSelector((state) => state.shop.token);

  let shop = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log('the token',decodedToken)
      shop = decodedToken.user_id; 
      console.log("the user id id", shop);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (searchQuery){
            const response = await fetchAllUsers(searchQuery);
            console.log("the response of fetch all users", response);
            setUsers(response);
        }
      } catch (error) {
        console.error("the is some error happend while fetching users", error);
      }
    };
    fetchUsers();
  }, [searchQuery]);


  useEffect(() => {
    const fetchChatRooms = async() => {
        try{
            const response = await fetchshopChatRooms();
            console.log('the response of fetch shop chat rooms',response)
            setChatRooms(response);
        }catch (error){
            console.error('the is error while fetching the chat rooms',error)
        }
    }
    fetchChatRooms();
  },[])

  const handleSearch = (e)=> {
    setSearchQuery(e.target.value)

  }

  const handleUserClick = async(user) => {
    try{
        console.log('the user ',user)
        console.log('the user ',user.id)
        const chatRoom = await shopCreateOrFetchChatRoom(user.id)
        console.log('the chat room ',chatRoom)
        setSelectedUser(user)
        setChatRoom(chatRoom)
        setSearchQuery("");

        const response = await fetchShopMessages(chatRoom.id)
        console.log('the messages sended and recived',response)
        setMessages(response)
    }catch(error){
        console.error('some error happend while creating or fetching.',error)
    }
  }

  const handleExistingChatClick = async (room) => {
    try {
      console.log("the room of shop", room);
      
      setSelectedUser(room.user);
      setChatRoom(room);
      setMessages(await fetchShopMessages(room.id));
    } catch (error) {
      console.error("Error fetching messages for existing chat room", error);
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
      console.log('the recodering is stopped',mediaRecorder)
    } else {
      startRecording();
    }
  };

const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
        console.log('started the audio recording')
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.ondataavailable = async(event) => {
            const blob=event.data;
            setAudioBlob(blob);
            setIsRecording(false);
            await handleSendMessage(blob);
        };
        recorder.start();
        setIsRecording(true);
        
        })
        .catch(error => {
        console.error("Error accessing microphone", error);
        });
};

useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        if (audioBlob) {
          console.log('Audio Blob:', audioBlob);
          await handleSendMessage();
        }
      };
    }
  }, [mediaRecorder, audioBlob]);


  const handleSendMessage = async (blob = null) => {
    if (newMessage.trim() === '' && !selectedFile && !blob) return;

    try{

        const formData = new FormData();
        formData.append('room_id', chatRoom.id);
        formData.append('receiver_id', selectedUser.id);
        console.log('the selected user id',selectedUser.id)
        formData.append('message', newMessage);
        
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        if (blob) {
          formData.append('audio', blob, 'audio.webm');
        } else if (audioBlob) {
          formData.append('audio', audioBlob, 'audio.webm');
        }

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        
        
        
            console.log("the response from the formData", formData);
    
            const response = await shopSendMessage(formData);
            console.log('the response sending ',response)
            setMessages([...messages, response]);
            setNewMessage('');
            setSelectedFile(null); // Reset the selected file after sending
            setAudioBlob(null);
    }
    catch(error){
        console.error("Error sending message:", error);
    }

};


  return (
    <>
      <div className="flex bg-bgColor">
        <ShopNavBar />
        <div className="bg-bgColor rounded-lg flex-grow">
            <HeadingAndProfile/>
          <div className="flex bg-white m-7 p-5 gap-7 text-xs rounded-lg shadow-lg h-svh">
            {/* Left Side - Shop List */}
            <div className="flex flex-col border-r pr-5 w-1/3">
              <h1 className="font-bold text-2xl mb-4 text-center">Message</h1>
              <div className="flex items-center border rounded-full mb-4 p-2">
                <Search color="#a3aed0" size={20} />
                <input
                  className="border-none outline-none flex-grow bg-transparent ml-2"
                  placeholder="Search or start a new chat."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              { searchQuery && users.map((user) =>   
                <div key={user.id} onClick={ () => handleUserClick(user)} className="flex items-center py-2 cursor-pointer">
                    <img src={user.User_profile.profile_picture} alt="" className="w-12 h-12 rounded-full mr-3"/>
                    <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <h1 className="font-semibold">{user.username}</h1>
                        <p className="text-gray-500 text-xs">1:00 PM</p>
                    </div>
                    <p className="text-gray-500">Message</p>
                    </div>
                </div>
                )}
            
            {!searchQuery && (
                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Your Chats</h2>
                  {chatRooms.length > 0 ? (
                    chatRooms.map((room) => {
                      const lastMessage =
                        room.messages.length > 0
                          ? room.messages[room.messages.length - 1]
                          : null;

                      return (
                        <div
                          key={room.id}
                          className={`flex items-center py-2 cursor-pointer ${
                            selectedUser?.id === room.user.id
                              ? "bg-gray-200"
                              : ""
                          }`}
                          onClick={() => handleExistingChatClick(room)}
                        >
                          <img
                            src={room.user.User_profile.profile_picture}
                            alt=""
                            className="w-12 h-12 rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h1 className="font-semibold">
                                {room.user.username}
                              </h1>
                              <p className="text-gray-500 text-xs">
                                {lastMessage
                                  ? new Date(
                                      lastMessage.timestamp
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : ""}
                              </p>
                            </div>
                            <p className="text-gray-500">
                              {lastMessage
                                ? lastMessage.message
                                : "No messages yet"}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm">No existing chats.</p>
                  )}
                </div>
              )}
            </div>

            {/* Right Side - Chat Area */}
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
                      messages.map((msg) =>
                        msg && msg.id ? (
                          <div key={msg.id}className={`flex ${ msg.sender === shop ? "justify-end" : "justify-start"}`} >
                            <div className={`p-3 rounded-lg ${msg.sender === shop ? "bg-bgColor text-black shadow-2xl"
                                  : "bg-gray text-black shadow-2xl"   }`}  >
                              {msg.message}
                              {msg.image && (
                                    <img
                                    src={`http://127.0.0.1:8000${msg.image}`}
                                    alt="image"
                                    className="max-w-xs mt-2 rounded-lg"
                                    />
                                )}
                              {msg.video && (
                                <video src={`http://127.0.0.1:8000${msg.video}`}
                                       controls
                                       className="max-w-xs mt-2 rounded-lg" />
                              )}
                              {msg.audio && (
                                <audio src={`http://127.0.0.1:8000${msg.audio}`}
                                       controls
                                       />
                              )}
                              <span className="text-xs text-black ml-7">
                                {new Date(msg.timestamp).toLocaleTimeString( [],{ hour: "2-digit", minute: "2-digit" } )}
                              </span>
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
    
                    <div className="flex items-center border rounded-full relative gap-3">
                       <div>
                        <Paperclip color="#a3aed0" onClick={handlePaperclipClick} className="cursor-pointer" />
                        {showMediaOptions && (
                            <div className="absolute bottom-full mb-2 flex space-x-2 bg-bgColor h-10 w-20 items-center p-2 shadow-2xl rounded-lg">
                            <Camera color="#a3aed0" className="cursor-pointer" onClick={handleIconClick} />
                            <Video color="#a3aed0" className="cursor-pointer" onClick={handleIconClick}/>
                            </div>
                        )}
    
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange}/>
                      </div> 
                       <input
                        className="border-none outline-none flex-grow bg-transparent"
                        placeholder="Write something here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
    
                        {newMessage.trim() === "" && !isRecording && !showMediaOptions ?  (
                            <div className="bg-lightGreen p-3 rounded-full cursor-pointer" onClick={handleMicClick}>
                                <Mic color="#ffffff" />
                            </div>
                        ) : isRecording ? (
                            <div className="bg-lightGreen p-3 rounded-full cursor-pointer" onClick={handleMicClick}>
                                <CircleStop color="#ffffff" />
                            </div>
                        ) : (
                            <div className="bg-lightGreen p-3 rounded-full cursor-pointer" onClick={handleSendMessage}>
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
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ShopChat;
