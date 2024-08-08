import React, { useEffect, useState, } from "react";
import { useSelector } from "react-redux";
import { userProfile } from "../../services/api/user/userApi";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchProfile = async () => {
        try{

            const userData = await userProfile();
            setProfile(userData)
        }catch (error){
            console.error("Error fetching user profile data:",error)
            toast.error("Failed to load user profile.")
        }
    };
    fetchProfile();
  }, []);

  if (!profile){
    return <p>Loading...</p>
  }

  return (
<div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-4xl font-semibold text-gray-800 mb-5">User Profile</h1>
        <div className="profile-details space-y-4">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Pincode:</strong> {profile.pincode}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Alternative Phone:</strong> {profile.alternative_phone}</p>
          {profile.profile_picture && (
            <div className="profile-picture flex justify-center mt-4">
              <img
                src={profile.profile_picture}
                alt="Profile"
                className="w-32 h-32 rounded-full shadow-md"
              />
            </div>
          )}
        </div>
        <div className="mt-6">
          <Link to="/editProfile">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
