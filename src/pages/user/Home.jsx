// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate ,Link } from "react-router-dom";
// import { logout, updateUser } from "../../redux/reducers/userReducer";
// import { getUserHomeData } from "../../services/api/user/userApi";

// const Home = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [user, setUser] = useState();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userData = await getUserHomeData();

//       setUser(userData);
//       dispatch(updateUser({ user: userData }));
//     };

//     fetchUserData();
//   }, [dispatch, getUserHomeData]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
// <div className="flex flex-col h-screen bg-gray-100">
//       <header className="bg-white shadow p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold">User Home</h1>
//         {user && (
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-700">Welcome, {user.username}!</span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </header>
//       <main className="flex-1 p-10">
//         {user ? (
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-2xl font-bold mb-4">Hello, {user.username}!</h2>
//             <div className="flex space-x-4">
//               <Link to="/profile">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                   Profile
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <p>Please log in.</p>
//             <Link to="/login">
//               <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                 Go to Login
//               </button>
//             </Link>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import logo from "../../assets/logo.png";
import SA_profile from "../../assets/SA_profile.png";
import {
  Bell,
  Search,
  MoveUpRight,
  SquareArrowUpRight,
  Twitter,
  Linkedin,
} from "lucide-react";
import "../../styles/user.css";
import himage1 from "../../assets/himage1.jpeg";
import himage2 from "../../assets/himage2.png";
import himage3 from "../../assets/himage3.png";
import himage4 from "../../assets/himage4.png";
import himage5 from "../../assets/himage5.jpeg";
import first from "../../assets/first.png";
import second from "../../assets/second.png";
import third from "../../assets/third.png";
import UserNavBar from "../../componets/user/UserNavBar";
import UserFooter from "../../componets/user/UserFooter";

const Home = () => {
  return (
    <>
      <div className="userMainFont">
        <UserNavBar/>

        <div className="text-center m-10 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold m-3">
            {" "}
            Efficient{" "}
            <span className="bg-homePageGreen rounded-3xl ">Scrap</span>{" "}
            Recycling{" "}
          </h1>
          <h1 className="text-5xl font-bold m-3">Services Near You</h1>
          <div className="text-center text-sm">
            <h5>
              {" "}
              Discover efficient scrap recycling services right in your
              neighborhood! We're dedicated to providing convenient
            </h5>
            <h5>
              and reliable scrap recycling solutions to businesses and
              individuals alike. Whether you have metal, paper, plastic,
            </h5>
            <h5>
              {" "}
              or electronics to recycle, our experienced team is here to help.
            </h5>
          </div>
          <button className="flex border items-center border-black rounded-full p-3  mt-7 text-xs  gap-3">
            Get Started
            <span className="bg-green-950 rounded-full p-1">
              <MoveUpRight color="#FFFFFF" />
            </span>
          </button>
        </div>
        <div className="flex justify-between h-60 w-60 gap-7 items-center mt-20 ml-32 ">
          <img className="h-32 rounded-xl" src={himage1} alt="" />
          <img className="h-48 rounded-xl" src={himage2} alt="" />
          <img className="rounded-xl" src={himage3} alt="" />
          <img className="h-48 rounded-xl" src={himage4} alt="" />
          <img className="h-32 rounded-xl" src={himage5} alt="" />
        </div>

        <div className="flex justify-evenly items-center m-20">
          <h1 className="text-5xl font-bold">Transforming Scrap into Value</h1>
          <div className="text-xs">
            <h5>Discover efficient scrap recycling neighborhood!</h5>
            <h5>We're dedicated to providing convenient reliable.</h5>
          </div>
        </div>

        <div className="items-center m-20">
          <h1 className="text-3xl font-bold ">
            Make Our World Cleaner & Greener!
          </h1>
          <h5 className="text-xs mt-7">
            Discover efficient scrap recycling services right in your
            neighborhood!
          </h5>
          <h5 className="text-xs">
            We're dedicated to providing convenient and reliable scrap
            recycling.
          </h5>
        </div>

        <div className="flex justify-between m-10">
          <div className="flex bg-gray-200 rounded-md">
            <div>
              <h1 className="font-bold p-7">
                Protect Our <br /> Animal{" "}
              </h1>
              <h5 className="text-xs pl-7">
                Energy efficiency gains to <br /> 80% compared traditional{" "}
                <br /> lighting system.
              </h5>
              <button className="flex p-7 rounded-full items-center text-xs gap-3">
                read more{" "}
                <span>
                  <SquareArrowUpRight size={10} />
                </span>
              </button>
            </div>

            <img className="p-7" src={first} alt="" />
          </div>
          <div className="flex bg-homePageGreen rounded-md">
            <div>
              <h1 className="font-bold p-7">
                Cleanup The <br /> Environment{" "}
              </h1>
              <h5 className="text-xs pl-7">
                Energy efficiency gains to <br /> 80% compared traditional{" "}
                <br /> lighting system.
              </h5>
              <button className="flex p-7 rounded-full items-center text-xs gap-3">
                read more{" "}
                <span>
                  <SquareArrowUpRight size={10} />
                </span>
              </button>
            </div>

            <img className="p-7" src={second} alt="" />
          </div>
          <div className="flex bg-gray-200 rounded-md">
            <div>
              <h1 className="font-bold p-7">
                Protect & Cleanup <br /> The Environment{" "}
              </h1>
              <h5 className="text-xs pl-7">
                Energy efficiency gains to <br /> 80% compared traditional{" "}
                <br /> lighting system.
              </h5>
              <button className="flex p-7 rounded-full items-center text-xs gap-3">
                read more{" "}
                <span>
                  <SquareArrowUpRight size={10} />
                </span>
              </button>
            </div>

            <img className="p-7" src={third} alt="" />
          </div>
        </div>

      <UserFooter/>
      </div>
    </>
  );
};

export default Home;
