import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../../componets/user/UserNavBar";
import UserFooter from "../../componets/user/UserFooter";
import Shop_image from "../../assets/Shop_requests.png";
import { fetchshops, shopScrapList } from "../../services/api/user/userApi";
import ReportMessage from "../../componets/ReportMessage";
import { Search } from "lucide-react";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const itemsPerPage = 2;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopsData = async () => {
      try {
        const response = await fetchshops();
        console.log("the response", response);
        const shopWithProducts = await Promise.all(
          response.map(async (shop) => {
            const products = await shopScrapList(shop.id);
            // Flatten categories and products into a single list of products
            const allProducts = products.flatMap(
              (category) => category.products
            );
            return { ...shop, allProducts }; // Include flattened products list
          })
        );
        setShops(shopWithProducts);
        setFilteredShops(shopWithProducts); // Initially, all shops are shown
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shops:", error);
        setLoading(false);
      }
    };

    fetchShopsData();
  }, []);

  // Handle product search filtering
  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setProductSearch(searchQuery);

    const filtered = shops.filter((shop) =>
      shop.allProducts.some((product) =>
        product.name.toLowerCase().includes(searchQuery)
      )
    );
    setFilteredShops(filtered);
  };

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = shops.slice(startIndex, startIndex + itemsPerPage);

  // Calculate the total number of pages
  const totalPages = Math.ceil(shops.length / itemsPerPage);

  // Handle pagination controls
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <UserNavBar />

        <div className="flex-grow mt-10 ml-10">
          <div className="flex justify-between">
            <h1 className="font-medium text-2xl ml-4 sm:ml-10 lg:ml-20">
              Sell Scrap
            </h1>

            {/* Search Bar for Products */}
            <div className="flex items-center border rounded-full w-1/6 ml-20 gap-3">
              <Search size={15} />
              <input
                // type="text"
                value={productSearch}
                onChange={handleSearch}
                placeholder="Search for products..."
                className="border-none text-xs outline-none"
              />
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : filteredShops.length === 0 ? (
            <p className="ml-10 mt-4">
              No shops have the product you're looking for.
            </p>
          ) : (
            filteredShops.map((shop) => (
              <div
                key={shop.id}
                className="flex flex-col lg:flex-row justify-between items-center border-2 w-full lg:w-6/12 mt-6 ml-4 sm:ml-10 lg:ml-20 p-4 rounded-xl shadow-2xl space-y-4 lg:space-y-0"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-24 h-24"
                    src={Shop_image}
                    alt="Shop image"
                  />
                  <div>
                    <h1 className="font-bold">{shop.shop_name}</h1>
                    <p className="text-xs">{shop.address}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 items-center lg:items-start lg:m-3">
                  <button
                    onClick={() => handleSellScrapClick(shop.id)}
                    className="bg-black text-white p-2 sm:p-3 rounded-3xl text-xs w-full sm:w-24"
                  >
                    Sell Scrap
                  </button>
                  <button
                    onClick={() => handleReportClick(shop)}
                    className="bg-red-500 text-white p-2 sm:p-3 rounded-3xl text-xs w-full sm:w-24"
                  >
                    Report
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center lg:justify-end rounded-lg bg-white w-full lg:w-24 ml-4 sm:ml-10 lg:ml-32 mt-4 space-x-3 text-black">
            {currentPage > 1 && (
              <button
                onClick={handlePrevClick}
                className="rounded-lg p-2 text-gray-500"
              >
                Prev |
              </button>
            )}
            <p className="rounded-lg p-2 text-gray-500">{currentPage}</p>
            {currentPage < totalPages && (
              <button
                onClick={handleNextClick}
                className="rounded-lg p-2 text-gray-500"
              >
                | Next
              </button>
            )}
          </div>
        )}

        <div className="mt-auto">
          <UserFooter />
        </div>

        {isReportModalOpen && selectedShop && (
          <ReportMessage
            onClose={closeReportModal}
            receiver={selectedShop.user}
            Name={selectedShop.shop_name}
            type="user"
          />
        )}
      </div>
    </>
  );
};

export default Shops;
