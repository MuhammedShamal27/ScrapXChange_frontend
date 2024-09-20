import React, { useEffect, useRef, useState } from "react";
import {
  MoveUpRight,
  SquareArrowUpRight,
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../redux/reducers/userReducer";
import { getUserHomeData } from "../../services/api/user/userApi";


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
 

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserHomeData();
      console.log(userData)
      setUser(userData);
      dispatch(updateUser({ user: userData }));
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  
  return (
    <>
      <div className="userMainFont">
        <UserNavBar />

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
          <Link to='/shops' className="flex border items-center border-black rounded-full p-3  mt-7 text-xs  gap-3">
            Get Started
            <span className="bg-green-950 rounded-full p-1">
              <MoveUpRight color="#FFFFFF" />
            </span>
          </Link>
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
