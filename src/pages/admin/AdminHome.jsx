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
    <div>AdminHome
        {admin ? (
          <div>
            wellcome ,{admin.username}!
            <button className="bg-red-500" onClick={handleLogout}>
              {" "}
              logout{" "}
            </button>
            <Link to="/admin/userlist">
              <button className="bg-slate-500" >
                {" "}
                userlist{" "}
              </button>
            </Link>
            <Link to="/admin/shoprequestlist">Shop Request List</Link>
          </div>
        ) : (
          <p>Please log in </p>
        )}
    </div>

  );
}

export default AdminHome;
