import React, { useState } from "react";
import { MoveRight } from "lucide-react";
import "../../styles/user.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  emailForResetPassword,
  resetPassword,
} from "../../services/api/user/userApi";

const EmailForPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email format.";
    }
    return null;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validateError = validateEmail(email);
    if (validateError) {
      setError(validateError);
      toast.error(validateError);
      return;
    }

    try {
      const response = await emailForResetPassword({ email });
      console.log("Password rest request.", response);
      toast.success("Password reset link sent. Please check your email.");
      localStorage.setItem("userEmail", email);
      navigate("/otp", { state: { context: "passwordReset" } });
    } catch (err) {
      console.error("Password reset request error:", err);
      toast.error(
        "An error occured while sending the password reset link.Please try again."
      );
    }
  };
  return (
    <>
      <div className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg p-4">
        <h1 className="text-4xl md:text-4xl text-white font-semibold text-center">
          Reset Password
        </h1>
        <div className="flex flex-col w-full sm:w-8/12 md:w-6/12 lg:w-3/12 mt-10 mb-5 gap-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <input
            className="text-sm bg-inputBoxBlack p-4 md:p-5 rounded-lg text-white"
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <button
          className="mt-5 bg-green-900 w-full sm:w-8/12 md:w-6/12 lg:w-3/12 p-4 md:p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between items-center gap-2 font-extrabold"
          onClick={handleSubmit}
        >
          Confirm Password
          <MoveRight size={24} />
        </button>
      </div>
    </>
  );
};

export default EmailForPasswordReset;
