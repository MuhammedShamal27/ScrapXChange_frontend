import React from 'react'
import { House , Mail , LogOut , ArrowLeftRight , CircleUserRound} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';

const UserSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className=' bg-white font-semibold'>
        <div className='flex flex-col m-10 gap-y-7'>
            <Link to='/dashboard' className='flex   gap-x-5'><House  />Dashboard</Link>
            <Link to='/profile' className='flex   gap-x-5'><CircleUserRound  />Profile</Link>
            <Link className='flex   gap-x-5'><ArrowLeftRight  />Xchange</Link>
            <Link to='/userChat' className='flex   gap-x-5'><Mail />Message</Link>
            <Link onClick={handleLogout} className='flex   gap-x-5'><LogOut />Logout</Link>
        </div>
    </div>
  )
}

export default UserSideBar