import React, { useEffect, useState } from 'react';
import UserNavBar from '../../componets/user/UserNavBar';
import UserSideBar from '../../componets/user/UserSideBar';
import UserFooter from '../../componets/user/UserFooter';
import "../../styles/user.css";
import { Phone, Search, SendHorizontal } from 'lucide-react';
import SA_profile from "../../assets/SA_profile.png";
import { createOrFetchChatRoom, fetchAllShop, fetchMessages, sendMessage } from '../../services/api/user/userApi';

const UserChat = ({ user }) => {
    const [shops, setShops] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedShop, setSelectedShop] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchShops = async () => {
            try {
                if (searchQuery) {
                    const response = await fetchAllShop(searchQuery);
                    setShops(response);
                }
            } catch (error) {
                console.log('Error while fetching shops', error);
            }
        };
        fetchShops();
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setSelectedShop(null); // Clear selected shop when searching
    };

    const handleShopClick = async (shop) => {
        try {
            const chatRoom = await createOrFetchChatRoom(shop.id);
            console.log('the response of the chatroom',chatRoom)
            setSelectedShop(shop);
            setSearchQuery(''); // Clear the search query to hide other shops

            // Fetch messages for the selected chat room
            const response = await fetchMessages(chatRoom.id);
            setMessages(response);

        } catch (error) {
            console.error('Error creating or fetching chat room', error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            const messageData = {
                room_id: selectedShop.chatRoomId,
                receiver_id: selectedShop.id, // Assuming the receiver is the shop
                message: newMessage
            };

            console.log('the response',messageData)
            const response = await sendMessage(messageData);
            setMessages([...messages, response]);  // Append the new message to the list
            setNewMessage('');  // Clear the input field

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <>
            <UserNavBar />
            <div className='userMainFont flex m-7'>
                <UserSideBar />
                <div className='bg-bgColor rounded-lg flex-grow'>
                    <div className="flex bg-white m-7 p-5 gap-7 text-xs rounded-lg shadow-lg h-svh">
                        {/* Left Side - Shop List */}
                        <div className="flex flex-col border-r pr-5 w-1/3">
                            <h1 className="font-bold text-2xl mb-4 text-center">Message</h1>
                            <div className="flex items-center border rounded-full mb-4 p-2">
                                <Search color="#a3aed0" size={20} />
                                <input
                                    className="border-none outline-none flex-grow bg-transparent ml-2"
                                    placeholder="Search Shops"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            {searchQuery && shops.map(shop => (
                                <div
                                    key={shop.id}
                                    className="flex items-center py-2 cursor-pointer"
                                    onClick={() => handleShopClick(shop)}
                                >
                                    <img src={SA_profile} alt="" className="w-12 h-12 rounded-full mr-3" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <h1 className="font-semibold">{shop.username}</h1>
                                            <p className="text-gray-500 text-xs">1:00 PM</p>
                                        </div>
                                        <p className="text-gray-500">Message</p>
                                    </div>
                                </div>
                            ))}
                            {!searchQuery && selectedShop && (
                                <div className="flex items-center py-2">
                                    <img src={SA_profile} alt="" className="w-12 h-12 rounded-full mr-3" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <h1 className="font-semibold">{selectedShop.username}</h1>
                                            <p className="text-gray-500 text-xs">1:00 PM</p>
                                        </div>
                                        <p className="text-gray-500">Message</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Side - Chat Area */}
                        <div className="flex flex-col flex-grow">
                            {selectedShop ? (
                                <>
                                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                                        <div className="flex items-center">
                                            <img src={SA_profile} alt="" className="w-12 h-12 rounded-full mr-3" />
                                            <div>
                                                <h1 className="font-semibold">{selectedShop.username}</h1>
                                                <p className="text-gray-500 text-xs">Online</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-4">
                                            <Phone color="#a3aed0" size={20} />
                                            <Search color="#a3aed0" size={20} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-grow overflow-y-auto space-y-4 mb-4">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`p-3 rounded-lg ${msg.sender_id === user.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                                                    {msg.message}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center border rounded-full p-3">
                                        <input
                                            className="border-none outline-none flex-grow bg-transparent"
                                            placeholder="Write something here..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <SendHorizontal size={20} className="text-blue-500 cursor-pointer" onClick={handleSendMessage} />
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
            <UserFooter />
        </>
    );
};

export default UserChat;
