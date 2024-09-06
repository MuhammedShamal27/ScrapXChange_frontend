import React, { useEffect, useRef, useState } from "react";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import {Search,SendHorizontal,Phone,Paperclip,Camera,Video,Mic,CircleStop,} from "lucide-react";
import SA_profile from "../../assets/SA_profile.png";
import { fetchAllUsers, fetchshopChatRooms, fetchShopMessages, shopCreateOrFetchChatRoom, shopSendMessage } from "../../services/api/shop/shopApi";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

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
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const socketRef = useRef(null);

  const token = useSelector((state) => state.shop.token);




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
            <Outlet/>
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ShopChat;
