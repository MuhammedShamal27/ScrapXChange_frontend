import React, { useEffect, useState } from "react";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import "../../styles/adminAndShop.css";
import { fetchShopNotifications, markShopNotifications } from "../../services/api/shop/shopApi";
import { Check, CheckCheck } from "lucide-react";
import main_profile from "../../assets/main_profile.png";

const ShopNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetchShopNotifications();
        setNotifications(response); // set fetched notifications
      } catch (error) {
        console.error("the error is ", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      // API call to mark notification as read
      await markShopNotifications(notificationId);

      // Update the state to mark notification as read locally
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
      navigate("/shop/scrapRequests/");
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <>
      <div className="adminFont flex bg-bgColor">
        <ShopNavBar />
        <div className="flex flex-col flex-grow">
          <HeadingAndProfile />

          <div className="flex flex-col m-4">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={notification.id} // Use notification.id as the key for better performance
                  className={`flex items-center justify-between p-4 my-2 rounded-lg shadow-sm transition-all ${
                    notification.is_read ? "bg-gray-200" : "bg-white" // Conditional classes based on read status
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)} // Call the handler when clicked
                >
                  <div className="flex items-center gap-4">
                    {/* Notification content */}
                    <img
                      src={notification.sender.profile_picture || main_profile} // Fallback if no profile pic
                      alt="Sender profile"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Mark as read indicator */}
                  <div>
                    {notification.is_read ? (
                      <CheckCheck className="text-green-500" size={20} />
                    ) : (
                      <Check className="text-gray-400" size={20} />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No notifications available.</p>
            )}
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ShopNotifications;
