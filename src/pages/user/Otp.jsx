import React, { useEffect, useRef, useState } from "react";
import { MoveRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyOtp,
  passwordOtp,
  resendOtp,
} from "../../services/api/user/userApi";
import "../../styles/user.css";
import { toast } from "sonner";
import { loginSuccess } from "../../redux/reducers/userReducer";

const Otp = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);
  const context = location.state?.context || "registration";
  console.log('location',context)

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error("Email not found. Please retry.");
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      toast.error("Please enter a 4-digit OTP.");
      return;
    }
    if (!email) {
      toast.error("Email is missing.Please try again.");
      return;
    }
    try {
      if (context === "registration") {
        const response = await verifyOtp({ email, otp: otpString });
        console.log("the response", response);

        if (response) {
          console.log('coming to put the token')
          dispatch(loginSuccess({ token: response.access }));

          console.log("is coming");
          navigate("/");
        } else {
          toast.error("Invalid OTP.");
        }
      } else if (context === "passwordReset") {
        console.log('coming in to passwordotp')
        const response = await passwordOtp({ email, otp: otpString });
        console.log("Password reset otp response",response)
        if (response) {
          navigate("/resetPassword");
        } else {
          toast.error("Invalid OTP.");
        }
      }
    } catch (err) {
      console.error("Failed to verify OTP.", err);
      toast.error("Something went wrong.Please try again.");
    }
  };

  const handleResendOtp = async (e) =>{
    e.preventDefault();
    console.log("Resending OTP to email:", email);
    try {
      const response = await resendOtp({ email });
      console.log("the response coming inside",response)
      if (response){
        toast.success("OTP sent successfully.")
      }else{
        toast.error("Failed to resend OTP.")
      }
    }catch (err){
      console.log("Failed to resend OTP.",err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg">
        <h1 className="text-4xl text-white font-semibold">OTP Verification</h1>
        <div className="bg flex mt-10 mb-5 gap-4">
          {error && <p className="text-red-500"> {error}</p>}
          {otp.map((digit, index) => (
            <input
              className="text-sm bg-inputBoxBlack w-11 h-11 rounded-lg border  border-gray-500/50"
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
            />
          ))}
        </div>
        <div className="flex justify-between gap-7">
          <p className="text-xs mt-3 text-gray-500 font-bold">00:45</p>
          <p className="text-xs mt-3 text-gray-600 ">
            Don't get OTP yet ?{" "}
            <span className="text-white ml-2 text-xs" onClick={handleResendOtp}>Resend OTP !</span>
          </p>
        </div>
        <button
          className="mt-3 bg-green-900  w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold "
          type="submit"
          onClick={handleSubmit}
        >
          Confirm OTP <MoveRight size={30} />{" "}
        </button>
      </div>
    </>
  );
};

export default Otp;
