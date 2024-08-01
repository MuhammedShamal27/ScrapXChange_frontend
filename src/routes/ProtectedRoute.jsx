import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function ProtectedRoute  ({ component }) {

    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(()=>{
        if (!isAuthenticated) {
            navigate("/login");
        }
    },[isAuthenticated,navigate]);

    return isAuthenticated ? component :null;
}

export default ProtectedRoute;