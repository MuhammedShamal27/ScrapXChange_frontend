import React, { useCallback, useRef, useState } from 'react'
import register_page_img from '../../assets/register_page_img.png'
import '../../styles/adminAndShop.css'
import { useDispatch } from 'react-redux'
import { registerShop } from '../../services/api/shop/shopApi'
import { toast } from 'sonner'
import axiosInstance from '../../services/api/axiosInstance'
// import { Autocomplete, GoogleMap, LoadScript } from '@react-google-maps/api'

const libraries = ["places", "marker"];
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Define the container style for the map
const containerStyle = {
  width: "100%",
  height: "400px"
};

// Initial map center
const center = {
  lat: -3.745,
  lng: -38.523
}

const ShopRegister = () => {

    const [formData, setFormData] = useState({
        username:'',
        email: '',
        password: '',
        re_enter_password: '',
        shop_name: '',
        shop_license_number: '',
        address: '',
        pincode: '',
        state: '',
        district: '',
        latitude:'',
        longitude:'',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    // const [center, setCenter] = useState({ lat: 9.928430, lng: 76.316391 });
    // const [autocomplete, setAutocomplete] = useState(null);
    // const [mapBounds, setMapBounds] = useState(null);
    // const [map, setMap] = useState(null);
    // const markerRef = useRef(null); 

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
                    errorMessage = "Shop name must contain only alphabets and a single space between words, with no leading or trailing spaces.";
                }
                break;
            case "shop_license_number":
                if (!/^[A-Z]{3}\d{11}$/.test(value)) {
                    errorMessage = "Shop license number must start with uppercase alphabets followed by 11 digits.";
                }
                break;
            case "address":
                if (!/^[A-Za-z0-9\s,\.]+$/.test(value)) {
                    errorMessage = "Address must not contain special characters other than dot (.) and comma (,).";
                }
                break;
            case "pincode":
                if (!/\d[0-9]{6}/.test(value)) {
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
            [name]: value
        });

        const errorMessage = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage
        }));

        console.log("Form data on Change:", formData);
    };

    const handlePincodeChange = async(e) => {
      const pincode = e.target.value;
      setFormData({...formData,pincode})

      if (pincode.length === 6) {
        try{
          const response = await axiosInstance.get(`https://api.postalpincode.in/pincode/${pincode}`)
          console.log('the response of pincode',response)
          const data = response.data;
          if (data[0].Status === 'Success' && data[0].PostOffice){
            const PostOfficeData = data[0].PostOffice[0];
            const {State , District ,Name} =PostOfficeData;

            setFormData({
              ...formData,
              state:State,
              district:District,
            });
            const location = `${Name}, ${District}, ${State}`;
            const geocodingResponse = await axiosInstance.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyDyghidkWq1RnG3XfrzM8pZBaNm3u71eeU`
            );
            
            // if (geocodingResponse.data.status === "OK") {
            //     const locationData = geocodingResponse.data.results[0].geometry.location;
            //     const newCenter = {
            //         lat: locationData.lat,
            //         lng: locationData.lng,
            //     };
            //     setCenter(newCenter);
            //     const bounds = geocodingResponse.data.results[0].geometry.bounds;
            //     if (bounds) {
            //       setMapBounds(new window.google.maps.LatLngBounds(
            //           bounds.southwest, bounds.northeast
            //       ));
            //   }
            //     if (markerRef.current) {
            //       markerRef.current.setPosition(newCenter);
            //     }
            // } else {
            //     toast.error("Unable to find coordinates for the location.");
            // }
        } else {
            toast.error("Invalid Pincode or no data available.");
        }
        }catch(error){
          console.error('there is an error ',error)
        }
      }
    }


//     const isMarkerWithinBounds = (lat, lng) => {
//       if (!mapBounds) return true; // No bounds set
//       return mapBounds.contains(new window.google.maps.LatLng(lat, lng));
//   };

//   const onMarkerDragEnd = (event) => {
//     const position = { lat: event.latLng.lat(), lng: event.latLng.lng() };

//     if (isMarkerWithinBounds(position.lat, position.lng)) {
//         setFormData({ ...formData, latitude: position.lat, longitude: position.lng });
//         setCenter(position); // Update map center
//     } else {
//         toast.error("Marker out of bounds. Please place it within the allowed region.");
//         markerRef.current.setPosition(center); // Reset marker to last valid position
//     }
// };


//     const mapOptions = {
//       zoom: 13,
//       mapId: "626bdc518ba1534c", 
//     };

  
//     // Initialize the AdvancedMarkerElement after the map is loaded
//     const initializeAdvancedMarker = useCallback((mapInstance) => {
//       if (!window.google || !window.google.maps.marker.AdvancedMarkerElement) {
//         console.error("AdvancedMarkerElement not available");
//         return;
//       }
  
//       const markerElement = new window.google.maps.marker.AdvancedMarkerElement({
//         map: mapInstance,
//         position: center, // Use the dynamic center as the marker position
//         title: "Drag me!",
//         draggable: true,
//       });
  
//       // Set up the dragend listener
//       markerElement.addListener("dragend",onMarkerDragEnd);
//       markerRef.current = markerElement;
//       }, [center ,onMarkerDragEnd]); // Dependency on center
  
//     // On load map
//     const onLoadMap = useCallback((mapInstance) => {
//       setMap(mapInstance);
//       initializeAdvancedMarker(mapInstance);
//     }, [initializeAdvancedMarker]);
  
//     // On autocomplete load
//     const onLoadAutocomplete = (autocompleteInstance) => {
//       setAutocomplete(autocompleteInstance);
//     };
  
//     const onPlaceChanged = () => {
//       if (autocomplete !== null) {
//           const place = autocomplete.getPlace();
//           if (place.geometry && place.geometry.location) {
//               const location = place.geometry.location;
//               const newCenter = { lat: location.lat(), lng: location.lng() };

//               if (isMarkerWithinBounds(newCenter.lat, newCenter.lng)) {
//                   setCenter(newCenter);
//                   markerRef.current.setPosition(newCenter); // Update marker position
//               } else {
//                   toast.error("Selected place is outside the allowed region.");
//               }
//           }
//       }
//   };

const [markerPosition, setMarkerPosition] = useState(center);

// Function to update marker on map click
const onMapClick = (e) => {
  setMarkerPosition({
    lat: e.latLng.lat(),
    lng: e.latLng.lng(),
  });
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
                const result = await registerShop(formData);
                console.log("befor the result if",result)
                console.log(result.message)
                if (result.message) {
                    console.log("the message",result.message)
                    toast.success(result.message); 
                }else{
                    toast.error("Failed to register")
                }
            } catch (err) {
                if (err.response && err.response.data) {
                    const errorData = err.response.data;
                    Object.keys(errorData).forEach((key) => {
                        if (errorData[key]) {
                            toast.error(`${key.replace('_', ' ')} error: ${errorData[key][0]}`);
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
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/4 mt-7">
          {/* Title Section */}
          <div className="mb-20">
            <h1 className="text-3xl text-blue-950 font-bold text-center m-3">Scrap X Change</h1>
            <h1 className="ml-10 text-2xl text-blue-950 font-extrabold">Register</h1>
            <p className="ml-10 text-xs text-gray-400 mt-10">
              Enter the details given below to become a shop!
            </p>
          </div>
  
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="ml-10 text-xs grid grid-flow-row grid-cols-2 gap-2 font-medium"
          >
            {/* Username */}
            <div className="flex flex-col mt-4">
              {errors.username && <p className="text-red-500">{errors.username}</p>}
              <h5>Username</h5>
              <input
                className="border rounded-md w-80 h-9 px-5"
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
                className="border rounded-md w-80 h-9 px-5"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mail@pegasus.com"
              />
            </div>
  
            {/* Shop Name */}
            <div className="flex flex-col mt-4">
              {errors.shop_name && <p className="text-red-500">{errors.shop_name}</p>}
              <h5>Shop Name</h5>
              <input
                className="border rounded-md w-80 h-9 px-5"
                name="shop_name"
                value={formData.shop_name}
                onChange={handleChange}
                placeholder="Name of the shop"
              />
            </div>
  
            {/* Shop License Number */}
            <div className="flex flex-col mt-4">
              {errors.shop_license_number && <p className="text-red-500">{errors.shop_license_number}</p>}
              <h5>Shop License Number</h5>
              <input
                className="border rounded-md w-80 h-9 px-5"
                name="shop_license_number"
                value={formData.shop_license_number}
                onChange={handleChange}
                placeholder="License Number"
              />
            </div>
  
            {/* Address */}
            <div className="flex flex-col mt-4">
              {errors.address && <p className="text-red-500">{errors.address}</p>}
              <h5>Address</h5>
              <input
                className="border rounded-md w-80 h-9 px-5"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Shop Address"
              />
            </div>
  
            {/* Pincode */}
            <div className="flex flex-col mt-4">
              {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}
              <h5>Pincode</h5>
              <input
                className="border rounded-md w-80 h-9 px-5"
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
                className="border rounded-md w-80 h-9 px-5"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                readOnly
              />
            </div>
  
            {/* District */}
            <div className="flex flex-col mt-4">
              {errors.district && <p className="text-red-500">{errors.district}</p>}
              <h5>District</h5>
              <input
                className="border rounded-md w-80 h-9 px-5"
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
                className="border rounded-md w-80 h-9 px-5"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Mobile number"
              />
            </div>
  
            {/* Password */}
            <div className="flex flex-col mt-4">
              {errors.password && <p className="text-red-500">{errors.password}</p>}
              <h5>Password</h5>
              <input
                className="border rounded-md w-80 h-9 px-5 text-xs"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
              />
            </div>
  
            {/* Re-enter Password */}
            <div className="flex flex-col mt-4">
              {errors.re_enter_password && <p className="text-red-500">{errors.re_enter_password}</p>}
              <h5>Re-Enter Password</h5>
              <input
                className="border rounded-md w-80 h-9 px-5 text-xs"
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
              className="mt-8 text-xs bg-myBlue text-white w-80 h-9 border rounded-md"
            >
              Register
            </button>
          </form>
        </div>
  
        {/* Map and Image Section */}
        <div className="flex flex-col lg:flex-row lg:w-2/4 lg:ml-auto space-x-4">
          {/* Map Section */}
          <div className="lg:w-3/4 mt-72">

          <LoadScript googleMapsApiKey="AIzaSyDyghidkWq1RnG3XfrzM8pZBaNm3u71eeU">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={10}
        onClick={onMapClick} // Set marker on click
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
            {/* <LoadScript googleMapsApiKey="AIzaSyDyghidkWq1RnG3XfrzM8pZBaNm3u71eeU" libraries={libraries}>
              <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
                <input
                  id="place-input"
                  type="text"
                  placeholder="Search for a place..."
                  className="border p-2 rounded-full mb-2 w-full text-xs"
                />
              </Autocomplete>
  
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "300px" }}
                center={center} // Dynamically updated center
                options={mapOptions} // Including mapId and other options
                zoom={13}
                onLoad={onLoadMap}
              />
            </LoadScript> */}
          </div>
  
          {/* Image Section */}
          <div className="lg:w-1/4 lg:ml-auto">
            <img className="w-full h-full object-cover" src={register_page_img} alt="Register" />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default ShopRegister
