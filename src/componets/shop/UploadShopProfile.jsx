import React, { useState, useCallback, useEffect, useRef } from "react";
import todaypending from "../../assets/test.png";
import { shopProfileAndLocation } from "../../services/api/shop/shopApi";
import { toast } from "sonner";

const libraries = ["places", "marker"]; // Ensure 'marker' is included

const UploadShopProfile = ({ isOpen, onClose }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Save location and image
  const saveImage = async () => {
    if (!profilePicture) {
      toast("Please upload an image");
      return;
    }

    const formData = new FormData();
    if (profilePicture) {
      formData.append("profile_picture", profilePicture); // Make sure this line is executed
    }

    try {
      const response = await shopProfileAndLocation(formData);
      console.log("the response of shopProfileAndLocation", response);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex ">
      <div className="w-3/3 flex flex-col space-y-3 ">
        <label htmlFor="profilePictureInput" className="cursor-pointer">
          {previewImage ? (
            <img
              className="w-32 h-32 rounded-lg object-cover mb-4"
              src={previewImage}
              alt="Selected profile"
            />
          ) : (
            <img
              className="w-32 h-32 rounded-lg object-cover mb-4"
              src={todaypending}
              alt="Placeholder"
            />
          )}
        </label>
        <input
          id="profilePictureInput"
          type="file"
          name="profile_picture"
          className="hidden"
          onChange={handleImageChange}
        />

        <button
          className="bg-black hover:bg-gray-600 text-xs text-white py-2 px-4 rounded-full mt-2"
          onClick={() => document.getElementById("profilePictureInput").click()}
        >
          Upload Image
        </button>
        <button
          onClick={saveImage}
          className="bg-myBlue text-white py-2 px-4 text-xs rounded-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadShopProfile;
