import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAdmin } from '../../redux/reducers/adminReducer';
import { useNavigate , Link } from 'react-router-dom';
import { adminHome } from '../../services/api/admin/adminApi';

const AdminHome = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState();

  useEffect(() => {
    const fetchAdminData = async () => {
      const adminData = await adminHome();

      setAdmin(adminData);
      dispatch(updateAdmin({ admin: adminData }));
    };

    fetchAdminData();
  }, [dispatch, adminHome]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1">
        <div admin={admin} handleLogout={handleLogout} ></div>
        <div className="p-10">
          {admin ? (
            <div className="bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl font-bold mb-4">Welcome, {admin.username}!</h1>
              <div className="flex space-x-4">
                <Link to="/admin/userlist">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    User List
                  </button>
                </Link>
                <Link to="/admin/shoprequestlist">
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Shop Request List
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <p>Please log in.</p>
          )}
        </div>
      </div>
    </div>

  );
}

export default AdminHome;
