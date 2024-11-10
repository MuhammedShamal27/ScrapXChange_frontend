import React, { useEffect, useState } from "react";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import { Pencil } from "lucide-react";
import todaypending from "../../assets/test.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchScrapList,
  scrapCollected,
} from "../../services/api/shop/shopApi";
import { toast } from "sonner";

const ScrapCollection = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [error, setError] = useState();
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchScrapList();
        setProductsList(response);
      } catch (err) {
        console.error("the error", err);
        setError(err);
        toast(error.message || "An error occurred while fetching products");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData")) || [];
    setFormData(savedData);
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (product && quantity) {
      if (isNaN(quantity) || parseInt(quantity) <= 0) {
        toast.error("Quantity must be a positive integer");
        return;
      }
      const selectedProduct = productsList.find(
        (p) => p.id === parseInt(product)
      );
      const newFormData = [
        ...formData,
        { id: selectedProduct.id, name: selectedProduct.name, quantity },
      ];
      setFormData(newFormData);
      localStorage.setItem("formData", JSON.stringify(newFormData));
      setProduct("");
      setQuantity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.length === 0) {
      toast.error("At least one product must be added");
      return;
    }
    try {
      console.log("formData", formData, id);
      const Data = { id, formData };
      const response = await scrapCollected(id, Data);
      console.log("the response", response);
      const t_id = response.id;
      localStorage.removeItem("formData");
      navigate(`/shop/confirm/${t_id}/`);
    } catch (err) {
      console.error("Error while submitting data", err);
      toast.error("Submission failed");
    }
  };

  return (
    <>
      <div className="flex bg-bgColor ">
        <ShopNavBar />
        <div className=" w-8/12">
          <HeadingAndProfile />
          <div className="text-xs bg-white p-5 sm:p-10 rounded-lg shadow-lg m-5 sm:m-10 w-full sm:w-auto">
            <h1 className="font-semibold text-lg sm:text-xl">
              Scrap Collection: {id}
            </h1>

            {/* Responsive container with flex-row for larger screens, flex-col for small screens */}
            <div className="flex flex-col sm:flex-row sm:justify-between mt-5 sm:mt-7 gap-5">
              {/* First column */}
              <div className="flex flex-col gap-5 sm:gap-7 w-full sm:w-2/6">
                <div className="flex flex-col gap-3">
                  <label>Name</label>
                  <select
                    className="rounded-lg text-xs border-gray-300 p-2 w-full"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                  >
                    <option value="">Select a product</option>
                    {productsList.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label>Quantity</label>
                  <input
                    className="rounded-lg text-xs border-gray-300 p-2 w-full"
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                  />
                </div>

                {/* Buttons for small screens should also be stacked */}
                <div className="flex flex-col sm:flex-row sm:justify-between mt-4 gap-3 ">
                  <button
                    onClick={handleAddProduct}
                    className="bg-black text-white py-2 px-4 rounded-3xl text-xs w-full sm:w-auto"
                  >
                    Add More
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-myBlue text-white py-2 px-4 rounded-3xl text-xs w-full sm:w-auto"
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Second column */}
              <div className="flex flex-col gap-4 w-full sm:w-3/6 ">
                {formData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl shadow-lg p-3 h-20 sm:h-24 w-full"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl"
                        src={todaypending}
                        alt="Product"
                      />
                      <p className="font-medium text-xs sm:text-xs">
                        {item.name}
                      </p>
                    </div>
                    <p className="font-medium text-xs sm:text-xs">
                      {item.quantity} Kg
                    </p>
                    <Pencil color="#a3aed0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ScrapCollection;
