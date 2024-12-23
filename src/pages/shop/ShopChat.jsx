import React, { useEffect, useRef, useState } from "react";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import { Search } from "lucide-react";
import SA_profile from "../../assets/SA_profile.png";
import {
  fetchAllUsers,
  fetchshopChatRooms,
  shopCreateOrFetchChatRoom,
} from "../../services/api/shop/shopApi";
import { Outlet, useNavigate } from "react-router-dom";

const ShopChat = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (searchQuery) {
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
    const fetchChatRooms = async () => {
      try {
        const response = await fetchshopChatRooms();
        console.log("the response of fetch shop chat rooms", response);
        setChatRooms(response);
      } catch (error) {
        console.error("the is error while fetching the chat rooms", error);
      }
    };
    fetchChatRooms();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserClick = async (user) => {
    try {
      console.log("the user ", user);
      console.log("the user ", user.id);
      const chatRoom = await shopCreateOrFetchChatRoom(user.id);
      console.log("the chat room ", chatRoom);
      setSelectedUser(user);
      setChatRoom(chatRoom);
      setSearchQuery("");
    } catch (error) {
      console.error("some error happend while creating or fetching.", error);
    }
    setIsSidebarVisible(false);
  };

  const handleExistingChatClick = async (room) => {
    try {
      console.log("the room of shop", room);

      setSelectedUser(room.user);
      setChatRoom(room);
      console.log("the chat that is navigating", chatRoom);
      setTimeout(() => {
        navigate(`/shop/shopChat/messages/${room.id}`);
      }, 0);
    } catch (error) {
      console.error("Error fetching messages for existing chat room", error);
    }
    setIsSidebarVisible(false);
  };

  return (
    <>
      <div className="flex bg-bgColor">
        <ShopNavBar />
        <div className="bg-bgColor rounded-lg flex-grow">
          <HeadingAndProfile />
          <div className="flex bg-white m-7 p-5 gap-7 text-xs rounded-lg shadow-lg h-svh">
            {/* Left Side - Shop List */}
            <div
              className={`flex flex-col lg:border-r pr-5 w-full lg:w-1/3 sm:m-1 ${
                isSidebarVisible ? "block" : "hidden"
              } lg:block`}
            >
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
              {searchQuery &&
                users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className="flex items-center py-2 cursor-pointer"
                  >
                    <img
                      src={user.User_profile.profile_picture}
                      alt=""
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h1 className="font-semibold">{user.username}</h1>
                        <p className="text-gray-500 text-xs">1:00 PM</p>
                      </div>
                      <p className="text-gray-500">Message</p>
                    </div>
                  </div>
                ))}

              {!searchQuery && (
                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Your Chats</h2>
                  {chatRooms.length > 0 ? (
                    chatRooms.map((room) => {
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
                            src={
                              room.user.User_profile.profile_picture.indexOf('https://') !== -1
                                ? room.user.User_profile.profile_picture.slice(room.user.User_profile.profile_picture.indexOf('https://'))
                                : ''
                            }
                            alt=""
                            className="w-12 h-12 rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h1 className="font-semibold">
                                {room.user.username}
                              </h1>
                              <p className="text-gray-500 text-xs"></p>
                            </div>
                            <p className="text-gray-500"> </p>
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
            <Outlet context={{ selectedUser, chatRoom }} />
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ShopChat;
