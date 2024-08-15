import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export const Header = () => {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropDownOpen(!dropdownOpen);
  };
  return (
    <header className='bg-gray-950 text-gray-50 font-inter py-4 px-4 flex items-center justify-between top-0 left-0 right-0 fixed z-20'>
      <NavLink to='/' className='text-2xl font-bold'>
        Gadget-Galaxy
      </NavLink>
      <div className='flex items-center justify-center gap-4'>
        <NavLink
          to='/products'
          className={({ isActive }) =>
            `hover:text-gray-400 text-sm font-semibold lg:text-xs ${
              isActive ? 'text-gray-400' : ''
            }`
          }
        >
          Products
        </NavLink>
        <NavLink to='/cart'>
          <FaShoppingCart
            className={({ isActive }) =>
              `text-sm hover:text-gray-400 lg:text-xs ${
                isActive ? 'text-gray-400' : ''
              }`
            }
          />
        </NavLink>
        <div className='relative'>
          <button
            onClick={toggleDropdown}
            className='rounded-full focus:outline-none'
          >
            <img
              src='https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1950963813.1721542835&semt=ais_hybrid'
              // alt='User Avatar'
              className='rounded-full bg-cover w-5 h-5'
            />
          </button>
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 rounded-md shadow-lg'>
              <div className='p-2'>
                <div className='px-4 py-2 font-semibold'>My Account</div>
                <hr />
                <NavLink
                  to='/profile'
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  Profile
                </NavLink>
                <NavLink
                  to='/orders'
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  Orders
                </NavLink>
                <hr />
                <button className='w-full text-left px-4 py-2 hover:bg-gray-100'>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
