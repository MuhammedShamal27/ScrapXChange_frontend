import React, { useState } from "react";
import todaypending from "../../assets/test.png";
import { shopProfileAndLocation } from "../../services/api/shop/shopApi";
import { toast } from "sonner";

const UploadShopProfile = ({ isOpen, onClose }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudinaryConfig = {
      cloud_name: "dqffglvoq",
      upload_preset: "ml_default",
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryConfig.upload_preset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setCloudinaryUrl(data.secure_url); // Store the Cloudinary URL
      setPreviewImage(data.secure_url); // Update the preview with the Cloudinary URL
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed. Please try again.");
    }
  };

  const saveImage = async () => {
    if (!cloudinaryUrl) {
      toast.error("Please upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", cloudinaryUrl); // Pass Cloudinary URL to your backend

    try {
      const response = await shopProfileAndLocation(formData);
      console.log("Response from shopProfileAndLocation:", response);
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="flex">
      <div className="w-3/3 flex flex-col space-y-3">
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
