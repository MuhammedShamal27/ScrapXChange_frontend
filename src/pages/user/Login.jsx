import React, { useState } from "react";
import { MoveRight } from "lucide-react";
import "../../styles/user.css";
import { useDispatch } from "react-redux";
import { useNavigate ,Link } from "react-router-dom";
import { loginUser } from "../../services/api/user/userApi";
import { toast } from "sonner";
import { loginSuccess } from "../../redux/reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S/.test(value)) {
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

    console.log("Form data on Change :".formData);
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
    console.log("the errors", setErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("coming to login");
        const response = await loginUser(formData);
        console.log("result action", response);
        if (response && response.tokens && response.tokens.access) {
          console.log("coming into the if condition");
          dispatch(loginSuccess({ token: response.tokens.access }));
          navigate("/");
        } else {
          console.error("failed", response);
          toast.error(
            "Login failed . please check your credential and try again"
          );
        }
      } catch (err) {
        if (err.email) {
          toast.error(`Email error : ${err.email[0]}`);
        }
        if (err.password) {
          toast.error(`Password error : ${err.password[0]}`);
        } else {
          toast.error("An unexpected error occured.Please try again later.");
        }
      }
    }
  };

  return (
    <>
      <form
        className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl text-white font-semibold">
          Login to Your Account
        </h1>
        <div className="flex flex-col   h-10 w-3/12 mt-10  mb-20 gap-2">
          {errors.email && <p>{errors.email}</p>}
          <input
            className="text-sm bg-inputBoxBlack p-5 rounded-lg"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.password && <p>{errors.password}</p>}
          <input
            className="text-sm bg-inputBoxBlack p-5 rounded-lg"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="8 digit pin"
          />
        </div>
        <button
          className="mt-5 bg-green-900  w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold "
          type="submit"
        >
          Login to Your Account <MoveRight size={30} />{" "}
        </button>
        <p className="text-xs mt-3 text-gray-600 ">
          Don't have an account yet ?{" "}
          <Link to="/register">
            <span className="text-white ml-2 text-xs">Register Now !</span>
          </Link>
        </p>
        <button className="p-5 w-3/12 rounded-lg border border-lightGreen text-white mt-5 flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-google"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
          </svg>
          Sign in with Google
        </button>
        <Link to="/email">
          <p className="text-white underline mt-3">Forget Password ?</p>
        </Link>
      </form>
    </>
  );
};

export default Login;
