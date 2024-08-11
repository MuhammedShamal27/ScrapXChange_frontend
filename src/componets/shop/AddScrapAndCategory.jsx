import React, { useEffect, useState } from "react";
import { ArrowUpFromLine } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCategory,
  addScrap,
  fetchCategoryList,
} from "../../services/api/shop/shopApi";

const AddScrapAndCategory = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setErrors] = useState({});
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
        console.error("Error fetching catgories:", err);
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
      default:
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      console.log("Uploaded file:", files[0]);
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

    console.log("validation error:", validationErrors);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        let response;
        if (type === "scrap") {
          response = await addScrap(scrapFormData);
          navigate("/shop/scraplist");
        } else {
          response = await addCategory(categoryFormData);
          navigate("/shop/categorylist");
        }
      } catch (err) {
        console.error("Submission error:", err);
        setErrors(err);
      }
    }
  };

  return (
    <>
        <div className="bg-white m-10 w-8/12 rounded-2xl">
            <h1 className="text-blue-950 font-bold text-2xl m-7">{type === "scrap" ? "Add Scrap" : "Add Category"}</h1>
            <form className="grid grid-cols-2 m-7   text-xs ">
                <div className="flex flex-col p-3">
                    <label htmlFor="">Name</label>
                    <input name="name" value={
                        type === "scrap" ? scrapFormData.name : categoryFormData.name
                    } className="border-gray-300 rounded-md  placeholder:text-xs mt-3 " onChange={handleChange} type="text" placeholder="Name to display"/>
                </div >
                {error.name && <p>{error.name}</p>}
                {type === "category" && (
                    <div className="flex flex-col p-3 ">
                        <label htmlFor="">Description</label>
                        <input name="description" value={categoryFormData.description} onChange={handleChange} className="border-gray-300 rounded-md  placeholder:text-xs mt-3 " type="text" placeholder="Name to display"/>
                        {error.description && <p>{error.description}</p>}
                    </div>
                )}
                {type === "scrap" && (
                    <>
                    <div className="flex flex-col p-3">
                        <label htmlFor="">Price</label>
                        <input name="price" value={scrapFormData.price} onChange={handleChange} className="border-gray-300 rounded-md  placeholder:text-xs mt-3 " type="text" placeholder="Name to display"/>
                        {error.price && <p>{error.price}</p>}
                    </div>
                    <div className="flex flex-col p-3" >
                        <p>Category</p>
                        <select
                            className="border-gray-300 rounded-md  placeholder:text-xs mt-3 "
                            name="category"
                            value={scrapFormData.category}
                            onChange={handleChange}
                            >
                            <option className="text-xs"  value="">Select a category</option>
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
                        <div className="border rounded-md  placeholder:text-xs mt-3 ">
                        <input type="file" name="image" onChange={handleChange} />
                        {/* <ArrowUpFromLine color="#4318FF" /> */}
                        </div>
                        {error.image && <p>{error.image}</p>}
                    </div>
                    {type ==="scrap" &&(<div></div>)}
                    
                    <button className="text-center rounded-md bg-myBlue text-white m-3 p-3 " >Submit</button>
            </form>
        </div>
    </>
  );
};

export default AddScrapAndCategory;
