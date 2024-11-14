import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../../componets/user/UserNavBar";
import UserFooter from "../../componets/user/UserFooter";
import test from "../../assets/test.png";
import { fetchshops, shopScrapList } from "../../services/api/user/userApi";
import ReportMessage from "../../componets/ReportMessage";
import { Search } from "lucide-react";
import stateData from "../../data/states-and-districts.json";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 9.9367552, // Default center coordinates (could be a central location)
  lng: 76.3180429,
};

const Shops = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShops, setFilteredShops] = useState([]);
  const [shops, setShops] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const handleSellScrapClick = (shopId) => {
    navigate(`/scraplist/${shopId}`);
  };

  const handleReportClick = (shop) => {
    setSelectedShop(shop);
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedShop(null);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);

    const selectedStateData = stateData.states.find((s) => s.state === state);

    if (selectedStateData) {
      setDistricts(selectedStateData.districts);
      console.log("Districts found:", selectedStateData.districts);
    } else {
      setDistricts([]);
      console.log("No districts found");
    }
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      fetchShopsData();
    }
  }, [selectedState, selectedDistrict]);

  const fetchShopsData = async () => {
    try {
      const params = {
        state: selectedState,
        district: selectedDistrict,
      };
      const data = await fetchshops(params);
      setShops(data);
      setFilteredShops(data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = shops.filter((shop) =>
        shop.products.some((product) =>
          product.name.toLowerCase().includes(query)
        )
      );
      setFilteredShops(filtered);
    } else {
      setFilteredShops(shops); // Reset to all shops if no search query
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <UserNavBar />

        <div className="flex-grow mt-10 ml-4 sm:ml-10 flex flex-col sm:flex-row">
          <div className="w-full sm:w-2/3 pr-4 overflow-auto">
            {/* Title and Controls (State, District, and Search) */}
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <h1 className="font-medium text-2xl sm:ml-4 mb-4 sm:mb-0">
                Sell Scrap
              </h1>

              {/* State and District Dropdowns */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-4 sm:mb-0">
                <select
                  className="rounded-full text-sm mb-2 sm:mb-0"
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="">Select State</option>
                  {stateData.states.map((state) => (
                    <option key={state.state} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </select>

                {districts.length > 0 && (
                  <select
                    className="rounded-full text-sm"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Search Bar for Products */}
              <div className="flex items-center border rounded-full p-2 gap-2 sm:ml-10 sm:w-1/3 lg:justify-end">
                <Search size={15} />
                <input
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search for products..."
                  className="border-none text-xs outline-none w-full"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row mt-4">
              {/* Shop List */}
              <div className="w-full sm:w-1/2 sm:m-4 text-sm">
                {filteredShops.length > 0 ? (
                  filteredShops.map((shop) => (
                    <div
                      key={shop.id}
                      className="flex flex-col sm:flex-row items-center justify-between rounded-lg shadow-lg p-3 mb-4"
                    >
                      <div className="flex items-center w-24 h-24 justify-between space-x-3 mb-3 sm:mb-0">
                        <img src={test} alt="shop" />
                        <div>
                          <h2 className="uppercase font-bold">
                            {shop.shop_name}
                          </h2>
                          <h2>{shop.address}</h2>
                        </div>
                      </div>
                      <div className="flex space-x-3 w-full sm:w-auto">
                        <button
                          className="bg-black text-white p-1 rounded-3xl text-xs w-full sm:w-24"
                          onClick={() => handleSellScrapClick(shop.id)}
                        >
                          Sell Scrap
                        </button>
                        <button
                          className="bg-red-500 text-white p-1 rounded-3xl text-xs w-full sm:w-24"
                          onClick={() => handleReportClick(shop)}
                        >
                          Report
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="font-semibold">
                    {searchQuery
                      ? "No shop accepting the searched product in this area."
                      : "Select State and District To Sell Scrap."}
                  </p>
                )}
              </div>

              {/* Google Map */}
              <div className="w-full sm:w-1/2 mt-6 sm:mt-0 sm:ml-auto lg:justify-end">
                <LoadScript googleMapsApiKey="AIzaSyDyghidkWq1RnG3XfrzM8pZBaNm3u71eeU">
                  <GoogleMap
                    mapContainerStyle={{
                      width: "100%",
                      height: "300px",
                    }}
                    zoom={10}
                    center={defaultCenter}
                  >
                    {filteredShops.length > 0 &&
                      filteredShops.map((shop) => (
                        <Marker
                          key={shop.id}
                          position={{
                            lat: parseFloat(shop.latitude),
                            lng: parseFloat(shop.longitude),
                          }}
                          title={shop.shop_name}
                          onClick={() => navigate(`/scraplist/${shop.id}`)}
                        />
                      ))}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <UserFooter />
        </div>
        {isReportModalOpen && selectedShop && (
          <ReportMessage
            onClose={closeReportModal}
            receiver={selectedShop.user_id}
            Name={selectedShop.shop_name}
            type="user"
          />
        )}
      </div>
    </>
  );
};

export default Shops;
