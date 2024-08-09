// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateAdmin } from '../../redux/reducers/adminReducer';
// import { useNavigate , Link } from 'react-router-dom';
// import { adminHome } from '../../services/api/admin/adminApi';
// import '../../styles/adminAndShop.css'

// const AdminHome = () => {


//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [admin, setAdmin] = useState();

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       const adminData = await adminHome();

//       setAdmin(adminData);
//       dispatch(updateAdmin({ admin: adminData }));
//     };

//     fetchAdminData();
//   }, [dispatch, adminHome]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/admin/login");
//   };

//   return (
//     <div className="adminFont flex h-screen bg-gray-100">
//       <div className="flex-1">
//         <div admin={admin} handleLogout={handleLogout} ></div>
//         <div className="p-10">
//           {admin ? (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h1 className="text-2xl font-bold mb-4">Welcome, {admin.username}!</h1>
//               <div className="flex space-x-4">
//                 <Link to="/admin/userlist">
//                   <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                     User List
//                   </button>
//                 </Link>
//                 <Link to="/admin/shoprequestlist">
//                   <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//                     Shop Request List
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ) : (
//             <p>Please log in.</p>
//           )}
//         </div>
//       </div>
//     </div>

//   );
// }

// export default AdminHome;



import React, { useEffect, useState } from 'react'
import AdminNavBar from '../../componets/admin/AdminNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import '../../styles/adminAndShop.css'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import {adminHome} from '../../services/api/admin/adminApi'
import { useDispatch } from 'react-redux'


const AdminHome = () => {

  const [admin, setAdmin] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminData = await adminHome();  // Fetch admin data using API
        setAdmin(adminData);
        dispatch(updateAdmin({ admin: adminData }));  // Dispatch action to update admin in the state
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      }
    };

    fetchAdminData();
  }, [dispatch]);

  return (
    <>
      <div className='adminFont flex bg-bgColor '>
        <AdminNavBar/>
        <div>
          <HeadingAndProfile/>
          {admin && <div>Welcome, {admin.username}!</div>}
        </div>
      </div>
      <FooterOfAdminAndShop/>
    </>
  )
}

export default AdminHome
