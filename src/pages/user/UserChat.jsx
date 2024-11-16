import React, { useEffect, useState } from "react";
import UserNavBar from "../../componets/user/UserNavBar";
import UserSideBar from "../../componets/user/UserSideBar";
import UserFooter from "../../componets/user/UserFooter";
import "../../styles/user.css";
import { Search } from "lucide-react";
import SA_profile from "../../assets/SA_profile.png";
import {
  createOrFetchChatRoom,
  fetchAllShop,
  fetchUserChatRooms,
} from "../../services/api/user/userApi";
import { Outlet, useNavigate } from "react-router-dom"; // Import Outlet and useNavigate

const UserChat = () => {
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShop, setSelectedShop] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        if (searchQuery) {
          const response = await fetchAllShop(searchQuery);
          console.log("the all shopps fetched", response);
          setShops(response);
        }
      } catch (error) {
        console.log("Error while fetching shops", error);
      }
    };
    fetchShops();
  }, [searchQuery]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const rooms = await fetchUserChatRooms();
        setChatRooms(rooms);
      } catch (error) {
        console.log("Error fetching chat rooms", error);
      }
    };
    fetchInitialData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedShop(null); // Clear selected shop when searching
  };

  const handleShopClick = async (shop) => {
    try {
      const chatRoom = await createOrFetchChatRoom(shop.shop.id);
      setSelectedShop(shop.shop);
      setChatRoom(chatRoom);
      console.log("the chat room", chatRoom);
      setSearchQuery(""); // Clear the search query to hide other shops

      setChatRooms((prevRooms) => {
        console.log("Before Update:", prevRooms);
        const exists = prevRooms.some((room) => room.id === chatRoom.id);
        if (!exists) {
          const updatedRooms = [...prevRooms, chatRoom];
          console.log("After Update:", updatedRooms);
          return [...prevRooms, chatRoom];
        }
        console.log("No Update Needed:", prevRooms);
        return prevRooms;
      });
    } catch (error) {
      console.error("Error creating or fetching chat room", error);
    }
    setIsSidebarVisible(false);
  };

  const handleExistingChatClick = async (room) => {
    try {
      setSelectedShop(room.shop);
      setChatRoom(room);
      console.log("the chat that is navigating", chatRoom);
      setTimeout(() => {
        navigate(`/userChat/messages/${room.id}`);
      }, 0);
    } catch (error) {
      console.error("Error fetching messages for existing chat room", error);
    }
    setIsSidebarVisible(false);
  };

  return (
    <>
      <UserNavBar />
      <div className="userMainFont flex">
        <UserSideBar />
        <div className="bg-bgColor rounded-lg flex-grow">
          <div className="flex bg-white lg:m-7 p-5 gap-7 text-xs rounded-lg shadow-lg h-svh ">
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
                  onChange={handleSearchChange}
                />
              </div>
              {searchQuery &&
                shops.map((shop) => (
                  <div
                    key={shop.id}
                    className="flex items-center py-2 cursor-pointer"
                    onClick={() => handleShopClick(shop)}
                  >
                    <img
                      src={SA_profile}
                      alt=""
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h1 className="font-semibold">{shop.shop.shop_name}</h1>
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
                            selectedShop?.id === room.shop.id
                              ? "bg-gray-200"
                              : ""
                          }`}
                          onClick={() => handleExistingChatClick(room)}
                        >
                          <img
                            src={
                              room.shop.profile_picture.indexOf('https://') !== -1
                                ? room.shop.profile_picture.slice(room.shop.profile_picture.indexOf('https://'))
                                : ''
                            }
                            alt=""
                            className="w-12 h-12 rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h1 className="font-semibold">
                                {room.shop.shop_name}
                              </h1>
                              <p className="text-gray-500 text-xs">
                                {/* {lastMessage
                                  ? new Date(
                                      lastMessage.timestamp
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : ""} */}
                              </p>
                            </div>
                            {/* <p className="text-gray-500">
                              {lastMessage
                                ? lastMessage.message
                                : "No messages yet"}
                            </p> */}
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
            <Outlet context={{ selectedShop, chatRoom }} />
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default UserChat;
