import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import AdminNavBar from "../../componets/admin/AdminNavBar";
import main_profile from "../../assets/main_profile.png";
import { fetchAdminNotification, markNotificationRead } from "../../services/api/admin/adminApi";
import { Check, CheckCheck } from "lucide-react"; // Ensure you are importing the icons

const AdminNotification = () => {
  const [data, setData] = useState([]); // State for notifications
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetchAdminNotification(); // Fetch notifications
        console.log("Notifications:", response);
        setData(response); // Set notifications data
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotification();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationRead(notificationId); // Call API to mark as read
      // Update the specific notification in the state to set is_read to true
      setData((prevData) =>
        prevData.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
      // Navigate to the reports page after marking the notification as read
      navigate("/admin/reports/");
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  return (
    <>
      <div className="adminFont flex bg-bgColor">
        <AdminNavBar />
        <div className="flex-grow">
          <HeadingAndProfile />
          <div className="flex flex-col m-4">
            {data.length > 0 ? (
              data.map((notification) => (
                <div
                  key={notification.id} // Use notification.id as the key for better performance
                  className={`flex items-center justify-between p-4 my-2 rounded-lg shadow-sm transition-all ${
                    notification.is_read ? "bg-gray-200" : "bg-white" // Conditional classes based on read status
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)} // Pass notification.id to handler
                >
                  <div className="flex items-center gap-4">
                    {/* Notification content */}
                    <img
                      src={notification.sender.profile_picture || main_profile} // Fallback if no profile pic
                      alt="Sender profile"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {notification.message}
                      </p>
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
    </>
  );
};

export default AdminNotification;
