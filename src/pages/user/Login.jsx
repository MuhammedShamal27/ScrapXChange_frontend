import React, { useEffect, useState } from 'react';
import '../../styles/adminAndShop.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginShop } from '../../services/api/shop/shopApi';
import { loginUser } from '../../services/api/user/userApi';
import { adminLogin } from '../../services/api/admin/adminApi';
import { shopLoginSuccess } from '../../redux/reducers/shopReducer';
import { loginSuccess } from '../../redux/reducers/userReducer';
import { adminLoginSuccess } from '../../redux/reducers/adminReducer';
import { toast } from 'sonner';
import { useSwipeable } from 'react-swipeable';
import { MoveLeft, MoveRight } from 'lucide-react'; // Assuming this is a valid icon import

const roles = ['user', 'shop', 'admin'];  // Define available roles

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isShopAuthenticated = useSelector((state) => state.shop.isAuthenticated);
  const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdminAuthenticated = useSelector((state) => state.admin.isAuthenticated);

  const [roleIndex, setRoleIndex] = useState(0); // index to track current role
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const currentRole = roles[roleIndex];  // Get current role based on index

  useEffect(() => {
    if (isShopAuthenticated) {
      navigate('/shop/home');
    } else if (isUserAuthenticated) {
      navigate('/');
    } else if (isAdminAuthenticated) {
      navigate('/admin/home');
    }
  }, [isShopAuthenticated, isUserAuthenticated, isAdminAuthenticated, navigate]);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          return 'Invalid email format.';
        }
        break;
      case 'password':
        if (!/^\S{8,17}$/.test(value)) {
          return 'Password should be 8-17 characters and should not include spaces.';
        }
        break;
      default:
        return '';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
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
        let response;
        if (currentRole === 'shop') {
          response = await loginShop(formData);
          if (response?.tokens?.access) {
            dispatch(shopLoginSuccess({ token: response.tokens.access }));
          }
        } else if (currentRole === 'user') {
          response = await loginUser(formData);
          if (response?.tokens?.access) {
            dispatch(loginSuccess({ token: response.tokens.access }));
          }
        } else if (currentRole === 'admin') {
          response = await adminLogin(formData);
          if (response?.access) {
            dispatch(adminLoginSuccess({ token: response.access }));
          }
        }

        if (!response || !response.tokens?.access) {
          toast.error('Login failed. Please check your credentials and try again.');
        }
      } catch (err) {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  // Function to change role based on swipe or button click
  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length); // Swipe left -> next role
    } else if (direction === 'right') {
      setRoleIndex((prevIndex) => (prevIndex - 1 + roles.length) % roles.length); // Swipe right -> previous role
    }
  };

  // Proper swipe handler using useSwipeable
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true // Enables swiping with a mouse for testing
  });

  return (
    <div className="relative userFont bg-myBlack flex flex-col justify-center items-center h-screen w-full overflow-hidden rounded-lg" {...handlers}>
      {/* Left Arrow */}
      <div
        className="absolute left-0 top-0 h-full flex items-center cursor-pointer"
        onClick={() => handleSwipe('right')}
      >
        <div
          className="w-10 h-20 bg-gradient-to-r from-gray-900 to-transparent flex justify-center items-center rounded-r-md"
        >
          {/* Left Arrow Icon */}
          <MoveLeft className="text-white" size={30} />
        </div>
      </div>

      {/* Center Form Section */}
      <h1 className="text-4xl text-white font-semibold">
        {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Login
      </h1>

      <div className="flex flex-col h-auto w-3/12 mt-10 mb-10 gap-4">
        <div className="flex flex-col gap-1">
          <input
            className="text-sm text-white bg-inputBoxBlack p-5 rounded-lg"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-700 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            className="text-sm text-white bg-inputBoxBlack p-5 rounded-lg"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="8 digit pin"
          />
          {errors.password && (
            <p className="text-red-700 text-xs">{errors.password}</p>
          )}
        </div>
      </div>

      <button
        className="mt-5 bg-green-900 w-3/12 p-5 bg-gradient-to-r from-lightGreen to-darkGreen rounded-lg flex justify-between font-extrabold"
        type="submit"
        onClick={handleSubmit}
      >
        Login to Your Account <MoveRight size={30} />
      </button>

      <p className="text-xs mt-3 text-gray-600">
        Don't have an account yet?
        <Link to="/register">
          <span className="text-white ml-2 text-xs">Register Now!</span>
        </Link>
      </p>

      <Link to="/email">
        <p className="text-white underline mt-3">Forget Password?</p>
      </Link>

      {/* Right Arrow */}
      <div
        className="absolute right-0 top-0 h-full flex items-center cursor-pointer"
        onClick={() => handleSwipe('left')}
      >
        <div
          className="w-10 h-20 bg-gradient-to-l from-gray-900 to-transparent flex justify-center items-center rounded-l-md"
        >
          {/* Right Arrow Icon */}
          <MoveRight className="text-white" size={30} />
        </div>
      </div>
    </div>
  );
};

export default Login;
