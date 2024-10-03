import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const UploadShopProfile = ({ isOpen, onClose }) => {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [isLocationLoaded, setIsLocationLoaded] = useState(false);


      // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Fetch user location using browser's Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocationLoaded(true);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          setIsLocationLoaded(false);
        }
      );
    }
  }, []);
    // Handle form submit
    const handleSubmit = () => {
        // Process image and location (e.g., send to server)
        console.log("Image:", image);
        console.log("Location:", location);
        onClose(); // Close the modal after submission
      };
    
      if (!isOpen) return null; // Don't render if the modal isn't open
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Upload Image and Location</h2>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:bg-gray-50 file:text-gray-700"
          />
        </div>

        {/* Display Google Map for location */}
        <div className="mb-4">
          {isLocationLoaded ? (
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "200px",
                }}
                center={location}
                zoom={15}
                onClick={(e) =>
                  setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
                }
              >
                <Marker position={location} />
              </GoogleMap>
            </LoadScript>
          ) : (
            <p className="text-gray-500">Fetching location...</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default UploadShopProfile