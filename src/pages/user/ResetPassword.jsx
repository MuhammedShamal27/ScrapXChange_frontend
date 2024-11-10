import React, { useState } from "react";
import { MoveRight } from "lucide-react";
import "../../styles/user.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPassword } from "../../services/api/user/userApi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password, confirmPassword) => {
    if (!/^\S{8,17}$/.test(password)) {
      return "Password must be at least 8 characters log .";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match .";
    }
    return null;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const ValidationError = validatePassword(password, confirmPassword);
    if (ValidationError) {
      setError(ValidationError);
      toast.error(ValidationError);
      return;
    }

    try {
      const email = localStorage.getItem("userEmail");
      const response = await resetPassword({ email, new_password: password });
      console.log("password reset response", response);
      toast.success("Password reset successfully .Please login .");
      navigate("/login");
    } catch (err) {
      console.error("Password reset error.", err);
      toast.error(
        "An error occured while resetting the password.Please try again."
      );
    }
  };

  return (
    <>
      <div className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg p-4">
        <h1 className="text-2xl md:text-4xl text-white font-semibold text-center">
          Reset Password
        </h1>
        <div className="flex flex-col w-full sm:w-8/12 md:w-6/12 lg:w-3/12 mt-10 mb-20 gap-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <input
            className="text-sm bg-inputBoxBlack p-4 md:p-5 rounded-lg text-white"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="8 digit pin"
          />
          <input
            className="text-sm bg-inputBoxBlack p-4 md:p-5 rounded-lg text-white"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Re-enter 8 digit pin"
          />
        </div>
        <button
          className="mt-5 bg-green-900 w-8/12 sm:w-8/12 md:w-6/12 lg:w-3/12 p-4 md:p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-center items-center gap-2 font-extrabold text-white"
          onClick={handleSubmit}
        >
          Confirm Password
          <MoveRight size={24} />
        </button>
      </div>
    </>
  );
};

export default ResetPassword;
