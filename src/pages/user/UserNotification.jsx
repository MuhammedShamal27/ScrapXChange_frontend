import React, { useEffect, useState } from "react";
import UserNavBar from "../../componets/user/UserNavBar";
import UserSideBar from "../../componets/user/UserSideBar";
import main_profile from "../../assets/main_profile.png";
import "../../styles/user.css";
import { fecthUserNotification, markReadNotification } from "../../services/api/user/userApi";
import { FaCheckCircle } from "react-icons/fa"; // Import a check icon

const UserNotification = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fecthUserNotification();
        console.log("the response is ", response);
        setData(response);  // The response data should be set correctly
      } catch (err) {
        console.error("the error is ", err);
      }
    };
    fetchNotifications(); // Correct function call
  }, []);

  // Function to handle marking notification as read
  const handleNotificationClick = async (id) => {
    try {
      await markReadNotification(id);
      // Update the notification state to mark the notification as read locally
      setData((prevData) =>
        prevData.map((notification) =>
          notification.id === id ? { ...notification, is_read: true } : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  return (
    <>
      <UserNavBar />
      <div className="userMainFont flex m-7">
        <UserSideBar />
        <div className="w-full rounded-lg bg-bgColor">
          {data.length > 0 ? (
            data.map((notification, index) => (
              <div
                key={index}
                onClick={() => handleNotificationClick(notification.id)} // Handle click to mark as read
                className={`flex relative m-7 h-auto p-4 items-center rounded-lg shadow-md space-x-4 cursor-pointer w-3/6 ${
                  notification.is_read ? "bg-gray-100" : "bg-white"
                }`} // Lighter gray if unread, darker gray if read
              >
                <img
                  src={main_profile}
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>
                {/* Tick Icon: Gray when unread, blue when read */}
                <div className="absolute bottom-2 right-2">
                  <FaCheckCircle
                    className={`text-xl ${
                      notification.is_read ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center p-4">No notifications available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserNotification;
