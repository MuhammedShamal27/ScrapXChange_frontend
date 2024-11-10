import React, { useEffect, useState } from "react";
import Shop_login_img from "../../assets/test.png";
import "../../styles/adminAndShop.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/api/admin/adminApi";
import { loginSuccess } from "../../redux/reducers/userReducer";
import { toast } from "sonner";
import { adminLoginSuccess } from "../../redux/reducers/adminReducer";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/home");
    }
  }, [isAuthenticated, navigate]);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          return "Invalid email format.";
        }
        break;
      case "password":
        if (!/^\S{8,17}$/.test(value)) {
          return "Password should be 8-17 characters and should not include spaces.";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    console.log("Form data on Change", formData);
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

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("coming");
        const response = await adminLogin(formData);
        console.log("the response in the adminlogin", response);
        if (response.access) {
          console.log("coming to if ");
          console.log("response acees in if", response.access);
          dispatch(adminLoginSuccess({ token: response.access }));
          navigate("/admin/home", { replace: true });
        }
      } catch (err) {
        if (err.email) {
          toast.error(`Email error: ${err.email[0]}`);
        }
        if (err.password) {
          toast.error(`Password error: ${err.password[0]}`);
        } else {
          toast.error("An unexpected error occurred, please try again.");
        }
      }
    }
  };
  return (
    <>
      <div className="adminFont ">
        <div className="flex">
          <div className="w-11/12">
            <h1 className="text-3xl text-blue-950 font-bold text-center m-7">
              Scrap X Change
            </h1>
            <div className="flex flex-col mx-96">
              <h1 className="text-2xl text-blue-950 font-extrabold mt-10 ">
                Login
              </h1>
              <p className="text-xs text-gray-400 ">
                Enter your email and password to sign in!
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col mt-10 text-xs gap-y-3"
              >
                <h5 className="">Email</h5>
                <input
                  className="border rounded-md w-80 h-9 px-5 text-xs"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mail@pegasus.com"
                />
                {errors.email && <p className="text-red-700">{errors.email}</p>}
                <h5 className="">Password</h5>
                <input
                  className="border rounded-md w-80 h-9 px-5 text-xs"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                />
                {errors.password && (
                  <p className="text-red-700">{errors.password}</p>
                )}
                <button
                  className="text-xs bg-myBlue text-white w-80 h-9 border rounded-md mt-7"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
          <div>
            <img className="w-full h-svh" src={Shop_login_img} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
