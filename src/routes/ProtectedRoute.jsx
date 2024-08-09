import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function ProtectedRoute  ({ component }) {

    const navigate = useNavigate();
    const isToken = useSelector((state) => state.auth.token);


    useEffect(()=>{
        if (!isToken) {
            navigate("/login");
        }
    },[isToken,navigate]);

    return isToken ? component :null;
}

export default ProtectedRoute;