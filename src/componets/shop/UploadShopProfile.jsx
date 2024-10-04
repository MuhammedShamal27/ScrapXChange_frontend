import React, { useState, useCallback, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import todaypending from "../../assets/todaypending.png";
import { shopProfileAndLocation } from "../../services/api/shop/shopApi";
import { toast } from "sonner";

const libraries = ["places", "marker"]; // Ensure 'marker' is included

const UploadShopProfile = ({ isOpen, onClose }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [center, setCenter] = useState({ lat: 40.749933, lng: -73.98633 });
  const markerRef = useRef(null); // Ref to store the marker instance

  const mapOptions = {
    zoom: 13,
    mapId: "626bdc518ba1534c", // Replace with your actual Map ID
  };

  // Handle marker dragend event
  const onMarkerDragEnd = (event) => {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedPlace({
      lat: position.lat,
      lng: position.lng,
      displayName: "Custom Location (Dragged)",
    });
    setCenter(position); // Update the center to follow the marker drag
  };

  // Initialize the AdvancedMarkerElement after the map is loaded
  const initializeAdvancedMarker = useCallback((mapInstance) => {
    if (!window.google || !window.google.maps.marker.AdvancedMarkerElement) {
      console.error("AdvancedMarkerElement not available");
      return;
    }

    const markerElement = new window.google.maps.marker.AdvancedMarkerElement({
      map: mapInstance,
      position: center, // Use the dynamic center as the marker position
      title: "Drag me!",
      draggable: true,
    });

    // Set up the dragend listener
    markerElement.addListener("dragend", (event) => {
      const position = event.latLng;
      setSelectedPlace({
        lat: position.lat(),
        lng: position.lng(),
        displayName: "Dragged Location",
      });
      setCenter(position.toJSON()); // Update the map center on marker drag
    });

    markerRef.current = markerElement; // Store the marker instance
  }, [center]); // Dependency on center

  // On load map
  const onLoadMap = useCallback((mapInstance) => {
    setMap(mapInstance);
    initializeAdvancedMarker(mapInstance);
  }, [initializeAdvancedMarker]);

  // On autocomplete load
  const onLoadAutocomplete = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  // On place changed in autocomplete
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        toast("No details available for input: '" + place.name + "'");
        return;
      }

      const location = place.geometry.location;
      const newCenter = { lat: location.lat(), lng: location.lng() };

      setSelectedPlace({
        lat: newCenter.lat,
        lng: newCenter.lng,
        displayName: place.name,
        formattedAddress: place.formatted_address,
      });

      // Update the map center dynamically to the searched location
      setCenter(newCenter); // This will trigger map re-centering

      // Pan the map to the new location
      if (map) {
        map.panTo(newCenter); // Move the map's center to the new location
      }

      // Update marker position for AdvancedMarkerElement
      if (markerRef.current) {
        markerRef.current.position = newCenter; // Update the position property
      }
    }
  };

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Save location and image
  const saveLocation = async () => {
    if (!selectedPlace) {
      toast("Please select a location first");
      return;
    }

    if (!profilePicture) {
        toast("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("latitude", selectedPlace.lat);
    formData.append("longitude", selectedPlace.lng);
    if (profilePicture) {
        formData.append('profile_picture', profilePicture);  // Make sure this line is executed
    }

    try {
      const response = await shopProfileAndLocation(formData)
      console.log('the response of shopProfileAndLocation',response)
      onClose();

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 p-6">
      {/* Left column: Image Upload */}
      <div className="w-full md:w-1/3 flex flex-col items-center">
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
      </div>

      {/* Right column: Map search and details */}
      <div className="w-full md:w-2/3 flex flex-col space-y-4">
        <LoadScript googleMapsApiKey="AIzaSyDyghidkWq1RnG3XfrzM8pZBaNm3u71eeU" libraries={libraries}>
          <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
            <input
              id="place-input"
              type="text"
              placeholder="Search for a place..."
              className="border p-2 rounded-full mb-2 w-2/6 text-xs"
            />
          </Autocomplete>

          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "300px" }}
            center={center} // Dynamically updated center
            options={mapOptions} // Including mapId and other options
            zoom={13}
            onLoad={onLoadMap}
          />
        </LoadScript>

        {/* Display selected place details */}
        <p className="text-sm text-gray-600">
          Selected Location:{" "}
          {selectedPlace
            ? `${selectedPlace.displayName}, ${selectedPlace.formattedAddress}`
            : "Please select a place."}
        </p>

        <div className="">
          {/* <button
            
            className="bg-black text-white py-2 px-4 text-xs rounded-full"
          >
            Confirm Location
          </button> */}

          <button
            onClick={saveLocation}
            className="bg-myBlue text-white py-2 px-4 text-xs rounded-full"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadShopProfile;
