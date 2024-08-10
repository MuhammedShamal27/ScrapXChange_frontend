import React from "react";
import { Search, Plus, Pencil, IndianRupee } from "lucide-react";
import Shop_requests from "../../assets/Shop_requests.png";
import { Link } from "react-router-dom";

const CategoryAndScrapList = ({ list, type }) => {
  return (
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
        {list.map((item) => (
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
            <Link className=" flex justify-center">
              <Pencil color="#a3aed0" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryAndScrapList;
