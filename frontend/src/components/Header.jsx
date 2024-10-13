import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { url } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const { productInCart } = useContext(CartContext);
  const { logout, isAuthenticated, token } = useAuth();
  const [productCountInCart, setproductCountInCart] = useState(0);
  const navigate = useNavigate();
  const handleUserLogout = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/user/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        logout();
        navigate('/login');
      }
    } catch (e) {
      console.error('Failed to Logout User ', e);
    }
  };

  useEffect(() => {
    const totalCount = productInCart.reduce(
      (accm, curr) => accm + curr.count,
      0
    );
    setproductCountInCart(totalCount);
  }, [productInCart]);
  // console.log(productCountInCart);

  const toggleDropdown = () => {
    setDropDownOpen(!dropdownOpen);
  };
  return (
    <header className='bg-gray-950 text-gray-50 font-inter py-6 px-4 flex items-center justify-between top-0 left-0 right-0 fixed z-20'>
      <NavLink to='/' className='text-2xl font-bold'>
        Gadget-Galaxy
      </NavLink>
      <div className='flex items-center justify-center gap-4'>
        <NavLink
          to='/products'
          className={({ isActive }) =>
            `hover:text-gray-400 text-md font-semibold  ${
              isActive ? 'text-gray-400' : ''
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to='/login'
          className={({ isActive }) =>
            `hover:bg-gray-100 text-md font-semibold border px-6 py-2 rounded-lg bg-white text-gray-950 ${
              isAuthenticated() ? 'hidden' : ''
            } ${isActive ? 'text-gray-400' : ''}`
          }
        >
          Login
        </NavLink>
        {isAuthenticated() && (
          <div className='relative'>
            <NavLink to='/cart'>
              <FaShoppingCart
                className={({ isActive }) =>
                  `text-md hover:text-gray-400 ${
                    isActive ? 'text-gray-400' : ''
                  }`
                }
              />
            </NavLink>
            {productCountInCart > 0 && (
              <span className='absolute top-[-10px] right-[-7px] bg-black text-white text-[9px] rounded-full p-[2px]'>
                {isAuthenticated() && productCountInCart}
              </span>
            )}
          </div>
        )}
        {isAuthenticated() && (
          <div className='relative'>
            <button
              onClick={toggleDropdown}
              className='rounded-full focus:outline-none'
            >
              <img
                src='https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1950963813.1721542835&semt=ais_hybrid'
                // alt='User Avatar'
                className='rounded-full bg-cover w-6 h-6'
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
                    to='/order'
                    className='block px-4 py-2 hover:bg-gray-100'
                  >
                    Orders
                  </NavLink>
                  <hr />
                  <button
                    className='w-full text-left px-4 py-2 hover:bg-gray-100'
                    onClick={handleUserLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
