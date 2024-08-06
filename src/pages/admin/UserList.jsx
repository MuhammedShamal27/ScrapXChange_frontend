import React, { useEffect, useState } from 'react'
import AdminNavBar from '../../componets/admin/AdminNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import UserAndAdminList from '../../componets/admin/UserAndAdminList';
import { UserList as fetchUserList } from '../../services/api/admin/adminApi';
import '../../styles/adminAndShop.css'


const UserList = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserList();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div className='adminFont flex bg-bgColor'>
        <AdminNavBar/>
        <div>
            <HeadingAndProfile/>
            <div>
                <UserAndAdminList users={users}/>
            </div>
        </div>
    </div>
    <FooterOfAdminAndShop/>
    </>
  )
}

export default UserList