import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, shop, admin }) {
  const navigate = useNavigate();
  const isToken = useSelector((state) =>
    admin ? state.admin.token : shop ? state.shop.token : state.auth.token
  );
  useEffect(() => {
    if (!isToken) {
      navigate(admin ? "/admin/login" : shop ? "/shop/login" : "/login");
    }
  }, [isToken, navigate, shop, admin]);

  return isToken ? children : null;
}
export default ProtectedRoute;
