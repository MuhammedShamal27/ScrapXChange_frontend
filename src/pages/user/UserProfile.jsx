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
    <>
      <div className="userProfile bg-myBlack p-5 rounded-lg text-white">
        <h1 className="text-4xl font-semibold mb-5">User Profile</h1>
        <div className="profile-details">
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Pincode:</strong> {profile.pincode}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Alternative Phone:</strong> {profile.alternative_phone}</p>
          {profile.profile_picture && (
            <div className="profile-picture">
              <img
                src={profile.profile_picture}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
            </div>
          )}
        </div>
      </div>

      <Link to='/editProfile'>EditProfile</Link>
    </>
  );
};

export default UserProfile;
