import React, { useEffect, useRef, useState } from "react";
import { MoveRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOtp, getUserHomeData } from "../../services/api/user/userApi";
import "../../styles/user.css";
import { toast } from "sonner";
import { loginSuccess } from "../../redux/reducers/userReducer";

const Otp = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }else{
      toast.error("Email not found. Please retry.")
    }
  },[])

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
    if (!email){
      toast.error("Email is missing.Please try again.");
      return ;
    }
    try {
      const response = await verifyOtp({ email, otp: otpString });
      console.log("the response", response);
    
      if (response.access) {
        dispatch(loginSuccess({token: response.access }))
        // console.log("the access token", response.access);
        // console.log("the refresh token", response.refresh);
    
        // Clear previous tokens if any
        // localStorage.removeItem('accessToken');
        // localStorage.removeItem('refreshToken');
    
        // localStorage.setItem('refreshToken', response.refresh);
        // console.log("refresh token stored:", localStorage.getItem('refreshToken'));
    
        // localStorage.setItem('accessToken', response.access);
        // console.log("access token stored:", localStorage.getItem('accessToken'));
    
        // localStorage.setItem('accessTokenTest', response.access);
        // console.log("access token test stored:", localStorage.getItem('accessTokenTest'));
    
       
        // localStorage.setItem('user', JSON.stringify(userData));
        
        console.log("is coming");
        navigate("/");
      } else {
        toast.error("Invalid OTP.");
      }
    } catch (err) {
      console.error("Failed to verify OTP.", err);
      toast.error("Something went wrong.Please try again.");
    }
  };

  return (
    <>
      <div
        className="userFont bg-myBlack flex flex-col justify-center items-center h-screen liner rounded-lg"
        
      >
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
            <span className="text-white ml-2 text-xs">Resend OTP !</span>
          </p>
        </div>
        <button
          className="mt-3 bg-green-900  w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold "
          type="submit" onClick={handleSubmit}
        >
          Confirm OTP <MoveRight size={30} />{" "}
        </button>
      </div>
    </>
  );
};

export default Otp;
