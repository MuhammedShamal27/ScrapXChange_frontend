import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Added useNavigate
import { adminLogin } from "../../services/api/admin/adminApi";
import { adminLoginSuccess } from "../../redux/reducers/adminReducer";
import { toast } from "sonner";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Validation function for email and password
  const validateField = (name, value) => {
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        return "Invalid email format.";
      }
    } else if (name === "password") {
      if (!/^\S{8,17}$/.test(value)) {
        return "Password must be 8-17 characters and contain no spaces.";
      }
    }
    return "";
  };

  // Update formData and validate fields on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        validationErrors[key] = errorMessage;
      }
    });

    setErrors(validationErrors);

    // Proceed only if there are no validation errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await adminLogin(formData);

        if (response?.access) {
          dispatch(adminLoginSuccess({ token: response.access }));
          toast.success("Login successful!");
          navigate("/admin/home", { replace: true }); // Navigate to admin home
        } else {
          toast.error("Invalid credentials. Please try again.");
        }
      } catch (err) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Admin Login</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            className="w-full p-2 border rounded"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            className="w-full p-2 border rounded"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
