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
    <div className="bg-white font-semibold">
      <div className="flex flex-col m-0 gap-y-5 sm:gap-y-7 sm:m-10">
        {/* Dashboard Link */}
        <Link to="/dashboard" className="flex items-center gap-x-3 sm:gap-x-5 p-3 sm:p-0">
          <House className="text-2xl sm:text-base" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>

        {/* Profile Link */}
        <Link to="/profile" className="flex items-center gap-x-3 sm:gap-x-5 p-3 sm:p-0">
          <CircleUserRound className="text-2xl sm:text-base" />
          <span className="hidden sm:inline">Profile</span>
        </Link>

        {/* Xchange Link */}
        <Link to="/transactions" className="flex items-center gap-x-3 sm:gap-x-5 p-3 sm:p-0">
          <ArrowLeftRight className="text-2xl sm:text-base" />
          <span className="hidden sm:inline">Xchange</span>
        </Link>

        {/* Message Link */}
        <Link to="/userChat" className="flex items-center gap-x-3 sm:gap-x-5 p-3 sm:p-0">
          <Mail className="text-2xl sm:text-base" />
          <span className="hidden sm:inline">Message</span>
        </Link>

        {/* Logout Link */}
        <Link onClick={handleLogout} className="flex items-center gap-x-3 sm:gap-x-5 p-3 sm:p-0">
          <LogOut className="text-2xl sm:text-base" />
          <span className="hidden sm:inline">Logout</span>
        </Link>
      </div>
    </div>
    // <div className=' bg-white font-semibold'>
    //     <div className='flex flex-col m-10 gap-y-7'>
    //         <Link to='/dashboard' className='flex   gap-x-5'><House  />Dashboard</Link>
    //         <Link to='/profile' className='flex   gap-x-5'><CircleUserRound  />Profile</Link>
    //         <Link to='/transactions' className='flex   gap-x-5'><ArrowLeftRight  />Xchange</Link>
    //         <Link to='/userChat' className='flex   gap-x-5'><Mail />Message</Link>
    //         <Link onClick={handleLogout} className='flex   gap-x-5'><LogOut />Logout</Link>
    //     </div>
    // </div>
  )
}

export default UserSideBar