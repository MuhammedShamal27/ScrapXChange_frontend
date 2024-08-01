import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout  } from "../../redux/reducers/userReducer";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () =>{
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div>
        {user ? (
          <div>
            wellcome ,{user.username}!
            <button className="bg-red-500" onClick={handleLogout}> logout </button>
            <button className="bg-slate-500" > Profile </button>
          </div>
        ) : (
          <p>Please log in </p>
        )}

      

      </div>
    </>
  );
};

export default Home;
