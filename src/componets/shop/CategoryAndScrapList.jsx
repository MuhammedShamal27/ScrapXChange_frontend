import React, { useState, useEffect } from "react";
import { Search, Plus, Pencil, IndianRupee } from "lucide-react";
import { useDebounce } from "../../utils/hooks/Debounce"; // Import your useDebounce hook
import Shop_requests from "../../assets/Shop_requests.png";
import { Link } from "react-router-dom";

const CategoryAndScrapList = ({ list, type }) => {
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounce the search query
  const [filteredItems, setFilteredItems] = useState(list);

  useEffect(() => {
    // Filter the list based on the debounced search query
    const filtered = list.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      if (type === 'category') {
        return nameMatch || item.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      } else {
        return nameMatch || item.category_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      }
    });
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [debouncedSearchQuery, list, type]);

  // Calculate the current items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="bg-white ml-11 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-blue-950 font-bold text-2xl">
            {type === "category" ? "All Categories" : "All Scraps"}
          </h5>
          <div className="flex items-center">
            <div className="flex bg-bgColor rounded-full items-center px-3 h-9">
              <Search color="#4318FF" size={20} />
              <input
                className="bg-bgColor rounded-full text-myBlue pl-2 outline-none"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <Link
              to={type === "category" ? "/shop/addCategory" : "/shop/addScrap"}
              className="bg-bgColor rounded-md h-9 w-9 ml-4 flex items-center justify-center"
            >
              <Plus color="#4318ff" size={24} />
            </Link>
          </div>
        </div>

        <div className="flex text-myBlue  border-b pb-2">
          <p className="w-1/4">Name</p>
          {type === 'category' ? (
            <p className="w-2/4">Description</p>
          ) : (
            <>
              <p className="w-1/4">Category</p>
              <p className="w-1/4">Price</p>
            </>
          )}
          <p className="w-1/4">Edit</p>
        </div>

        <div className="flex flex-col mt-5">
          {currentItems.map((item) => (
            <div key={item.id} className="flex items-center m-2 p-3 shadow-xl rounded-lg">
              <div className="w-1/4 flex items-center space-x-3">
                <img
                  src={type === 'category' ? item.image : item.image || Shop_requests}
                  alt="profile"
                  className="w-16 h-16 object-cover rounded-full"
                />
                <p>{item.name || 'N/A'}</p>
              </div>
              {type === 'category' ? (
                <p className="w-2/4">{item.description || 'N/A'}</p>
              ) : (
                <>
                  <p className="w-1/4">{item.category_name || 'N/A'}</p>
                  <p className="w-1/4 flex items-center">
                    <IndianRupee color="#a3aed0" size={15} /> {item.price || 'N/A'}
                  </p>
                </>
              )}
              <Link to={type === "category" ? `/shop/editCategory/${item.id}` : `/shop/editScrap/${item.id}`} className=" flex justify-center">
                <Pencil color="#a3aed0" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-end rounded-lg bg-white w-24 ml-20 mt-4 space-x-3 text-black">
          {currentPage > 1 && (
            <button onClick={handlePrevClick} className=" rounded-lg p-2 text-gray-500">
              Prev |
            </button>
          )}
          <p className="rounded-lg p-2 text-gray-500">{currentPage}</p>
          {currentPage < totalPages && (
            <button onClick={handleNextClick} className="rounded-lg p-2 text-gray-500">
             | Next
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryAndScrapList;
