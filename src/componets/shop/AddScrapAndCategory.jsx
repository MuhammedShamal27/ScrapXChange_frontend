import React, { useEffect, useState } from "react";
import { ArrowUpFromLine } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  addCategory,
  addScrap,
  fetchCategoryList,
} from "../../services/api/shop/shopApi";

const AddScrapAndCategory = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [scrapFormData, setScrapFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategoryList();
        setCategories(response);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (value.trim() === "") return "Name is required.";
        break;
      case "description":
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Description should contain only letters and spaces.";
        break;
      case "category":
        if (value.trim() === "") return "Category is required.";
        break;
      case "price":
        if (!/^\d+(\.\d{1,2})?$/.test(value))
          return "Price should be a valid number.";
        break;
      case "image":
        if (!value) return "Image is required.";
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      if (type === "scrap") {
        setScrapFormData({ ...scrapFormData, [name]: files[0] });
      } else {
        setCategoryFormData({ ...categoryFormData, [name]: files[0] });
      }
    } else {
      if (type === "scrap") {
        setScrapFormData({ ...scrapFormData, [name]: value });
      } else {
        setCategoryFormData({ ...categoryFormData, [name]: value });
      }
    }

    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = type === "scrap" ? scrapFormData : categoryFormData;

    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        validationErrors[key] = errorMessage;
      }
    });

    if (Object.keys(validationErrors).length === 0) {
      try {
        let response;
        if (type === "scrap") {
          console.log('ivan')
          response = await addScrap(scrapFormData);
          navigate("/shop/scraplist");
        } else {
          console.log('ivanalla')
          console.log('categoryformData is sending ',categoryFormData)
          response = await addCategory(categoryFormData);
          navigate("/shop/categorylist");
        }
      } catch (err) {
        
        console.error(err.name);
        setErrors({name: err.name[0] });
      }
    } else {
      setErrors(validationErrors);
      toast.error("Please fill in all fields before submitting.");
    }
  };

  return (
    <>
      <div className="bg-white m-10 w-8/12 rounded-2xl">
        <h1 className="text-blue-950 font-bold text-2xl m-7">
          {type === "scrap" ? "Add Scrap" : "Add Category"}
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 m-7 text-xs">
          <div className="flex flex-col p-3">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              value={type === "scrap" ? scrapFormData.name : categoryFormData.name}
              className="border-gray-300 rounded-md placeholder:text-xs mt-3"
              onChange={handleChange}
              type="text"
              placeholder="Name to display"
            />
            {errors.name && <p className='text-red-700'>{errors.name}</p>}
          </div>
          {type === "category" && (
            <div className="flex flex-col p-3">
              <label htmlFor="description">Description</label>
              <input
                name="description"
                value={categoryFormData.description}
                onChange={handleChange}
                className="border-gray-300 rounded-md placeholder:text-xs mt-3"
                type="text"
                placeholder="Description"
              />
              {errors.description && <p className='text-red-700'>{errors.description}</p>}
            </div>
          )}
          {type === "scrap" && (
            <>
              <div className="flex flex-col p-3">
                <label htmlFor="price">Price</label>
                <input
                  name="price"
                  value={scrapFormData.price}
                  onChange={handleChange}
                  className="border-gray-300 rounded-md placeholder:text-xs mt-3"
                  type="text"
                  placeholder="Price"
                />
                {errors.price && <p className='text-red-700'>{errors.price}</p>}
              </div>
              <div className="flex flex-col p-3">
                <label htmlFor="category">Category</label>
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
                {errors.category && <p className='text-red-700'>{errors.category}</p>}
              </div>
            </>
          )}
          <div className="flex flex-col p-3">
            <label htmlFor="image">Image</label>
            <div className="border rounded-md placeholder:text-xs mt-3">
              <input type="file" name="image" onChange={handleChange} />
            </div>
            {errors.image && <p className='text-red-700'>{errors.image}</p>}
          </div>
          {type ==="scrap" &&(<div></div>)}
          
          <button
            className="text-center rounded-md bg-myBlue text-white m-3 p-3 h-10 mt-10"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddScrapAndCategory;
