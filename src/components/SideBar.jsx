import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const SideBar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? 'text-orange-600' : 'text-gray-200';

  return (
    <div className='w-[70px] h-[745px] bg-[#0E1421] rounded-xl ml-6 mt-4'>
      <div className='flex flex-col gap-1 items-center justify-center mt-4 hover:scale-105 transition-all cursor-pointer'>
        <Link to="/" className='flex flex-col gap-1 items-center justify-center'>
          <img src={logo} alt="logo" className='' />
          <span className='text-white text-xs font-semibold'>TuneUp</span>
        </Link>
      </div>
      <div className='flex flex-col gap-1 items-center justify-center mt-16'>
        <Link to="/cities" className='flex flex-col gap-1 items-center justify-center hover:scale-105 transition-all cursor-pointer'>
          <i className={`fa-solid fa-city text-[25px] ${isActive('/cities')}`}></i>
          <span className={`text-xs font-light ${isActive('/cities')}`}>Cities</span>
        </Link>
      </div>
      <div className='flex flex-col gap-1 items-center justify-center mt-6'>
        <Link to="/map" className='flex flex-col gap-1 items-center justify-center hover:scale-105 transition-all cursor-pointer'>
          <i className={`fa-solid fa-map text-[25px] ${isActive('/map')}`}></i>
          <span className={`text-xs font-light ${isActive('/map')}`}>Map</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
