import React, { useEffect, useState } from "react";
import {
  fetchCategoryList,
  getCategoryById,
  getScrapById,
  updateCategory,
  updateScrap,
} from "../../services/api/shop/shopApi";
import { useNavigate } from "react-router-dom";

const EditScrapAndCategory = ({ id, type }) => {
  const navigate = useNavigate();
  const [scrapFormData, setScrapFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [imageName, setImageName] = useState("");
  const [categories, setCategories] = useState([]);
  const [originalImageUrl, setOriginalImageUrl] = useState(null); // Store the original image URL
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "scrap" && id) {
          const data = await getScrapById(id);
          setScrapFormData(data);
          const imageUrl = data.image;
          setOriginalImageUrl(imageUrl); // Store the original image URL
          const trimmedImageName = imageUrl.split("/").pop();
          setImageName(trimmedImageName);
          const categoryList = await fetchCategoryList();
          setCategories(categoryList);
        } else if (type === "category" && id) {
          const data = await getCategoryById(id);
          setCategoryFormData(data);
          const imageUrl = data.image;
          setOriginalImageUrl(imageUrl); // Store the original image URL
          const trimmedImageName = imageUrl.split("/").pop();
          setImageName(trimmedImageName);
        }
      } catch (err) {
        console.error("Error details:", err);
        setError(err);
      }
    };

    fetchData();
  }, [id, type]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (type === "scrap") {
      setScrapFormData({
        ...scrapFormData,
        [name]: files ? files[0] : value,
      });
    } else {
      setCategoryFormData({
        ...categoryFormData,
        [name]: files ? files[0] : value,
      });
    }

    if (files) {
      setImageName(files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        // If the category name exists, map it to its corresponding ID
        if (scrapFormData.category_name && !scrapFormData.category) {
            const category = categories.find(cat => cat.name === scrapFormData.category_name);
            if (category) {
                scrapFormData.category = category.id;
            } else {
                throw new Error("Invalid category selected");
            }
        }

        console.log('the scrap data', scrapFormData);

        if (type === "scrap") {
            await updateScrap(id, scrapFormData, originalImageUrl);
            navigate("/shop/scraplist");
        } else {
            console.log('the category data', categoryFormData);
            await updateCategory(id, categoryFormData, originalImageUrl);
            navigate("/shop/categorylist");
        }
    } catch (err) {
        console.error("Error details:", err);
        setError(err.response?.data || { global: "An error occurred" });
    }
};


  return (
    <div className="bg-white m-10 w-8/12 rounded-2xl">
      <h1 className="text-blue-950 font-bold text-2xl m-7">
        {type === "scrap" ? "Edit Scrap" : "Edit Category"}
      </h1>
      <form className="grid grid-cols-2 m-7 text-xs" onSubmit={handleSubmit}>
        <div className="flex flex-col p-3">
          <label htmlFor="">Name</label>
          <input
            name="name"
            value={
              type === "scrap" ? scrapFormData.name : categoryFormData.name
            }
            className="border-gray-300 rounded-md placeholder:text-xs mt-3"
            onChange={handleChange}
            type="text"
            placeholder="Name to display"
          />
          {error.name && <p>{error.name}</p>}
        </div>

        {type === "category" && (
          <div className="flex flex-col p-3">
            <label htmlFor="">Description</label>
            <input
              name="description"
              value={categoryFormData.description}
              onChange={handleChange}
              className="border-gray-300 rounded-md placeholder:text-xs mt-3"
              type="text"
              placeholder="Description"
            />
            {error.description && <p>{error.description}</p>}
          </div>
        )}
        {type === "scrap" && (
          <>
            <div className="flex flex-col p-3">
              <label htmlFor="">Price</label>
              <input
                name="price"
                value={scrapFormData.price}
                onChange={handleChange}
                className="border-gray-300 rounded-md placeholder:text-xs mt-3"
                type="text"
                placeholder="Price"
              />
              {error.price && <p>{error.price}</p>}
            </div>
            <div className="flex flex-col p-3">
              <p>Category</p>
              <select
                className="border-gray-300 rounded-md placeholder:text-xs mt-3"
                name="category"
                value={scrapFormData.category}
                onChange={handleChange}
              >
                <option className="text-xs" value="">
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option className="text-xs" key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {error.category && <p>{error.category}</p>}
            </div>
          </>
        )}
        <div className="flex flex-col p-3">
          <p>Image</p>
          <div className="border rounded-md placeholder:text-xs mt-3">
            <input
              hidden
              type="file"
              id="imageUpload"
              name="image"
              onChange={handleChange}
            />
            <label
              htmlFor="imageUpload"
              className="text-gray-500 h-10 text-center cursor-pointer flex items-center justify-center"
            >
              {imageName || "Choose Image"}
            </label>
          </div>
          {error.image && <p className="text-red-700">{error.image}</p>}
        </div>

        <button
          className="text-center rounded-md bg-myBlue text-white m-3 p-3 h-10 mt-10"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditScrapAndCategory;
