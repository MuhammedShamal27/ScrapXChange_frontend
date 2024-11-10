import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../styles/adminAndShop.css";
import { useDispatch } from "react-redux";
import { registerShop } from "../../services/api/shop/shopApi";
import { toast } from "sonner";
import axiosInstance from "../../services/api/axiosInstance";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const libraries = ["places", "marker"];

const ShopRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_enter_password: "",
    shop_name: "",
    shop_license_number: "",
    address: "",
    pincode: "",
    state: "",
    district: "",
    latitude: "",
    longitude: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [center, setCenter] = useState({ lat: 9.92843, lng: 76.316391 });
  const [map, setMap] = useState(null); // Store the map instance
  const markerRef = useRef(null);
  const [MarkerPosition, setMarkerPosition] = useState(center);
  const [newLatLng, setNewLatLng] = useState(null);

  useEffect(() => {
    if (newLatLng) {
      setMarkerPosition(newLatLng); // Update marker position when newLatLng changes
      setFormData((prevData) => ({
        ...prevData,
        latitude: newLatLng.lat,
        longitude: newLatLng.lng,
      })); // Update form with new lat/lng
    }
  }, [newLatLng]);

  // Initialize the advanced marker once the map is loaded
  useEffect(() => {
    if (map && !markerRef.current) {
      google.maps
        .importLibrary("marker") // Import the marker library
        .then(({ AdvancedMarkerElement, PinElement }) => {
          markerRef.current = new AdvancedMarkerElement({
            map,
            position: MarkerPosition,
            title: "Map",
            draggable: true,
          });

          google.maps.event.addListener(
            markerRef.current,
            "dragend",
            function (event) {
              const newPosition = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              };
              setMarkerPosition(newPosition); // Update marker position on drag
              setFormData((prevData) => ({
                ...prevData,
                latitude: newPosition.lat,
                longitude: newPosition.lng,
              })); // Update form with dragged position
            }
          );
        });
    }

    // Update the marker position when MarkerPosition changes
    if (markerRef.current) {
      markerRef.current.position = MarkerPosition;
    }
  }, [map, MarkerPosition]);

  // Function to update marker on map click
  const onMapClick = (e) => {
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    setFormData((prevData) => ({
      ...prevData,
      latitude: newPosition.lat,
      longitude: newPosition.lng,
    }));
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "username":
        if (!/^[A-Za-z]+$/.test(value)) {
          errorMessage = "Username should only contain alphabets.";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Email is invalid.";
        }
        break;
      case "password":
        if (value.length < 8 || value.length > 17) {
          errorMessage = "The password should be min 8 to max 17 characters.";
        }
        break;
      case "re_enter_password":
        if (value !== formData.password) {
          errorMessage = "Passwords do not match.";
        }
        break;
      case "shop_name":
        if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value)) {
          errorMessage =
            "Shop name must contain only alphabets and a single space between words, with no leading or trailing spaces.";
        }
        break;
      case "shop_license_number":
        if (!/^[A-Z]{3}\d{11}$/.test(value)) {
          errorMessage =
            "Shop license number must start with uppercase alphabets followed by 11 digits.";
        }
        break;
      case "address":
        if (!/^[A-Za-z0-9\s,\.]+$/.test(value)) {
          errorMessage =
            "Address must not contain special characters other than dot (.) and comma (,).";
        }
        break;
      case "pincode":
        if (!/^\d{6}$/.test(value)) {
          errorMessage = "Please check the entered pincode.";
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          errorMessage = "Phone number must be 10 digits.";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    console.log("Form data on Change:", formData);
  };

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    setFormData({ ...formData, pincode: pincode });

    if (pincode.length === 6) {
      try {
        const response = await axiosInstance.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        console.log("the response of pincode", response);
        const data = response.data;
        if (data[0].Status === "Success" && data[0].PostOffice) {
          const PostOfficeData = data[0].PostOffice[0];
          const { State, District, Name } = PostOfficeData;

          setFormData((prevFormData) => ({
            ...prevFormData,
            state: State,
            district: District,
          }));
          const location = `${Name}, ${District}, ${State}`;
          const geocodingResponse = await axiosInstance.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              location
            )}&key=AIzaSyDyghidkWq1RnG3XfrzM8pZBaNm3u71eeU`
          );
          console.log("the response", geocodingResponse.data);

          const { lat, lng } =
            geocodingResponse.data.results[0].geometry.location;

          // Update the ShopRegister component's marker position
          setNewLatLng({ lat, lng }); // Call this with lat and lng
        } else {
          toast.error("Invalid Pincode or no data available.");
        }
      } catch (error) {
        console.error("there is an error ", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        validationErrors[key] = errorMessage;
      }
    });

    console.log("validation error:", validationErrors);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("the formData", formData);
        const result = await registerShop(formData);
        console.log("befor the result if", result);
        console.log(result.message);
        if (result.message) {
          console.log("the message", result.message);
          toast.success(result.message);
          setFormData({
            username: "",
            email: "",
            password: "",
            re_enter_password: "",
            shop_name: "",
            shop_license_number: "",
            address: "",
            pincode: "",
            state: "",
            district: "",
            latitude: "",
            longitude: "",
            phone: "",
          });
          // Reset the marker position and map center
          setMarkerPosition(center);
          setNewLatLng(center); // Resets the marker back to default position
          if (markerRef.current) {
            markerRef.current.setPosition(center);
          }
        } else {
          toast.error("Failed to register");
        }
      } catch (err) {
        if (err) {
          const errorData = err;
          Object.keys(errorData).forEach((key) => {
            if (errorData[key] && Array.isArray(errorData[key])) {
              // Show each error as a toast message
              errorData[key].forEach((errorMessage) => {
                toast.error(`${key.replace("_", " ")}: ${errorMessage}`);
              });
            }
          });
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <>
      <div className="adminFont">
        <h1 className="text-3xl text-blue-950 font-bold text-center m-3">
          Scrap X Change
        </h1>
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="md:w-full lg:w-2/4 mt-7">
            {/* Title Section */}
            <div className="mb-20">
              <h1 className="ml-10 text-2xl text-blue-950 font-extrabold">
                Register
              </h1>
              <p className="ml-10 text-xs text-gray-400">
                Enter the details given below to become a shop!
              </p>
            </div>

            {/* Form Section */}
            <form
              onSubmit={handleSubmit}
              className="ml-10 text-xs grid grid-cols-1 md:grid-cols-2 gap-4 font-medium"
            >
              {/* Username */}
              <div className="flex flex-col mt-4">
                {errors.username && (
                  <p className="text-red-500">{errors.username}</p>
                )}
                <h5>Username</h5>
                <input
                  className="border rounded-md w-full h-9 px-5"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Name of the user"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col mt-4">
                {errors.email && <p className="text-red-500">{errors.email}</p>}
                <h5>Email</h5>
                <input
                  className="border rounded-md w-full h-9 px-5"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mail@pegasus.com"
                />
              </div>

              {/* Shop Name */}
              <div className="flex flex-col mt-4">
                {errors.shop_name && (
                  <p className="text-red-500">{errors.shop_name}</p>
                )}
                <h5>Shop Name</h5>
                <input
                  className="border rounded-md w-full h-9 px-5"
                  name="shop_name"
                  value={formData.shop_name}
                  onChange={handleChange}
                  placeholder="Name of the shop"
                />
              </div>

              {/* Shop License Number */}
              <div className="flex flex-col mt-4">
                {errors.shop_license_number && (
                  <p className="text-red-500">{errors.shop_license_number}</p>
                )}
                <h5>Shop License Number</h5>
                <input
                  className="border rounded-md w-full h-9 px-5"
                  name="shop_license_number"
                  value={formData.shop_license_number}
                  onChange={handleChange}
                  placeholder="License Number"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col mt-4">
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
                <h5>Address</h5>
                <input
                  className="border rounded-md w-full h-9 px-5"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Shop Address"
                />
              </div>

              {/* Pincode */}
              <div className="flex flex-col mt-4">
                {errors.pincode && (
                  <p className="text-red-500">{errors.pincode}</p>
                )}
                <h5>Pincode</h5>
                <input
                  className="border rounded-md w-full h-9 px-5"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handlePincodeChange}
                  placeholder="Pincode"
                />
              </div>

              {/* State */}
              <div className="flex flex-col mt-4">
                {errors.state && <p className="text-red-500">{errors.state}</p>}
                <h5>State</h5>
                <input
                  className="border rounded-md w-full h-9 px-5"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  readOnly
                />
              </div>

              {/* District */}
              <div className="flex flex-col mt-4">
                {errors.district && (
                  <p className="text-red-500">{errors.district}</p>
                )}
                <h5>District</h5>
                <input
                  className="border rounded-md w-full h-9 px-5"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="District"
                  readOnly
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col mt-4">
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                <h5>Phone</h5>
                <input
                  className="border rounded-md w-full h-9 px-5"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile number"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col mt-4">
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
                <h5>Password</h5>
                <input
                  className="border rounded-md w-full h-9 px-5 text-xs"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                />
              </div>

              {/* Re-enter Password */}
              <div className="flex flex-col mt-4">
                {errors.re_enter_password && (
                  <p className="text-red-500">{errors.re_enter_password}</p>
                )}
                <h5>Re-Enter Password</h5>
                <input
                  className="border rounded-md w-full h-9 px-5 text-xs"
                  name="re_enter_password"
                  type="password"
                  value={formData.re_enter_password}
                  onChange={handleChange}
                  placeholder="Re-enter Min. 8 characters"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-8 text-xs bg-myBlue text-white w-full h-9 border rounded-md"
              >
                Register
              </button>
            </form>
          </div>

          {/* Map and Image Section */}
          <div className="flex flex-col lg:flex-row lg:w-2/4 lg:ml-auto mt-36 space-x-4">
            {/* Map Section */}
            <div className="lg:w-3/4 mt-12">
              <LoadScript
                googleMapsApiKey="AIzaSyDyghidkWq1RnG3XfrzM8pZBaNm3u71eeU"
                libraries={libraries}
              >
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "300px" }}
                  center={MarkerPosition}
                  zoom={10}
                  onLoad={(map) => setMap(map)}
                  onClick={onMapClick}
                  options={{ mapId: "626bdc518ba1534c" }}
                ></GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopRegister;
