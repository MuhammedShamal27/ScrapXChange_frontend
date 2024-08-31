import React, { useEffect, useState } from 'react';
import ShopNavBar from '../../componets/shop/ShopNavBar';
import HeadingAndProfile from '../../componets/HeadingAndProfile';
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop';
import { Search, SendHorizontal, Phone } from 'lucide-react';
import SA_profile from "../../assets/SA_profile.png";
import { fetchAllUsers, shopCreateOrFetchChatRoom, shopFetchMessages, shopSendMessage } from '../../services/api/shop/shopApi';

const ShopChat = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatRoom, setChatRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchAllUsers(searchQuery);
                setUsers(response);
            } catch (error) {
                console.log('There was an error fetching users:', error);
            }
        };
        fetchUsers();
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setSelectedUser(null);
    };

    const handleUserClick = async (user) => {
        try {
            const chatRoom = await shopCreateOrFetchChatRoom(user.id);
            setSelectedUser(user);
            setChatRoom(chatRoom);
            setSearchQuery('');

            const response = await shopFetchMessages(chatRoom.id);
            setMessages(response);
        } catch (error) {
            console.error('Error creating or fetching chat room:', error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            const messageData = {
                room_id: chatRoom.id,
                receiver_id: selectedUser.id,
                message: newMessage,
            };
            const response = await shopSendMessage(messageData);
            setMessages([...messages, response]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <>
            <div className="flex bg-bgColor">
                <ShopNavBar />
                <div className="flex flex-col flex-grow">
                    <HeadingAndProfile />
                    <div className="flex bg-white m-7 p-5 gap-7 text-xs rounded-lg shadow-lg h-svh">
                        <div className="flex flex-col border-r pr-5 w-1/3">
                            <h1 className="font-bold text-2xl mb-4 text-center">Message</h1>
                            <div className="flex items-center border rounded-full mb-4 p-2">
                                <Search color="#a3aed0" size={20} />
                                <input
                                    className="border-none outline-none flex-grow bg-transparent ml-2"
                                    placeholder="Search People"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            {users.map((user) => (
                                <div key={user.id} onClick={() => handleUserClick(user)} className="flex items-center py-2 cursor-pointer">
                                    <img src={SA_profile} alt="" className="w-12 h-12 rounded-full mr-3" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <h1 className="font-semibold">{user.username}</h1>
                                            <p className="text-gray-500 text-xs">1:00 PM</p>
                                        </div>
                                        <p className="text-gray-500">Last message...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col flex-grow">
                            {selectedUser ? (
                                <>
                                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                                        <div className="flex items-center">
                                            <img src={SA_profile} alt="" className="w-12 h-12 rounded-full mr-3" />
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
                                        {Array.isArray(messages) && messages.map((msg) => (
                                            <div key={msg.id} className={`flex ${msg.sender_id === selectedUser?.id ? 'justify-end' : 'justify-start'}`}>
                                                
                                                <p className={`p-3 rounded-lg max-w-xs ${msg.sender_id === selectedUser?.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>{msg.message}</p>

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
                                    Select a user to start chatting
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
