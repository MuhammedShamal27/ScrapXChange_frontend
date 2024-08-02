import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { editProfile, userProfile } from "../../services/api/user/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
      username: "",
      email: "",
      address: "",
      pincode: "",
      phone: "",
      alternative_phone: "",
      profile_picture: null,
    });
    const [errors, setErrors] = useState({});
    const token = useSelector((state) => state.auth.token);
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const userData = await userProfile();
          setProfile(userData);
        } catch (error) {
          console.error("Error fetching user profile data:", error);
          toast.error("Failed to load user profile.");
        }
      };
      fetchProfile();
    }, []);
  
    const validate = () => {
      const newErrors = {};
      if (!profile.username || /\s/.test(profile.username) || !/^[A-Za-z]+$/.test(profile.username)) {
        newErrors.username = "The Username should only contain alphabets and no spaces.";
      }
      if (profile.address && (/^\s/.test(profile.address) || /[!@#$%^&()_+=<>?/;:'"[\]{}|\\`~]/.test(profile.address))) {
        newErrors.address = "Address cannot start with a space or contain special characters except dot (.) and comma (,)";
      }
      if (!profile.phone || !/^\d{10}$/.test(profile.phone)) {
        newErrors.phone = "Phone number must be 10 digits.";
      }
      if (profile.alternative_phone && (!/^\d{10}$/.test(profile.alternative_phone) || profile.alternative_phone === profile.phone)) {
        newErrors.alternative_phone = "Alternative phone number must be 10 digits and cannot be the same as the primary phone number.";
      }
      if (profile.pincode && !/^\d{6}$/.test(profile.pincode)) {
        newErrors.pincode = "Pincode must be 6 digits.";
      }
      return newErrors;
    };
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "profile_picture") {
        setProfile({ ...profile, [name]: files[0] });
      } else {
        setProfile({ ...profile, [name]: value });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("Please correct the errors in the form.");
        return;
      }
  
      const formData = new FormData();
      for (const key in profile) {
        if (profile[key]) {
          formData.append(key, profile[key]);
        }
      }
  
      try {
        const response = await editProfile(formData);
        toast.success("Profile updated successfully.");
        setProfile(response.data);
        navigate("/profile");
      } catch (error) {
        console.error("Error updating profile data:", error);
        toast.error("Failed to update profile.");
      }
    };
  
  return (
    <>
      <div className="editProfile bg-myBlack p-5 rounded-lg text-gray-700">
      <h1 className="text-4xl font-semibold mb-5">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={profile.pincode}
            onChange={handleChange}
          />
          {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label>Alternative Phone</label>
          <input
            type="text"
            name="alternative_phone"
            value={profile.alternative_phone}
            onChange={handleChange}
          />
          {errors.alternative_phone && (
            <p className="text-red-500">{errors.alternative_phone}</p>
          )}
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input type="file" name="profile_picture" onChange={handleChange} />
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
        <button type="submit" className="mt-3 bg-green-900 p-3 rounded-lg">
          Update Profile
        </button>
      </form>
    </div>
    </>
  );
};

export default EditProfile;
