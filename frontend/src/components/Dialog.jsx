import React, { useContext } from 'react';
import { IoMdClose } from 'react-icons/io';
import { handleCashOnDelivery, handleCheckout } from '../utils';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const DialogBox = ({ onClose, totalAmount }) => {
  const { productInCart, setProductInCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { token } = useAuth();
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition duration-300 ease-in-out border-gray-300'>
      <div className='bg-white shadow-lg border border-gray-300 p-8 w-fit flex flex-col justify-center items-center font-inter relative rounded-lg transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100'>
        <button
          className='absolute text-lg top-2 right-4 p-2 text-gray-600 rounded-full hover:bg-gray-200 transition'
          onClick={onClose}
        >
          <IoMdClose />
        </button>
        <h2 className='text-2xl font-bold mb-4'>Checkout Options</h2>
        <div id='btns' className='flex gap-4 mt-4'>
          <button
            className='text-lg font-semibold bg-blue-600 py-3 px-5 rounded-lg text-white transition-all duration-300 hover:bg-blue-700'
            onClick={() =>
              handleCashOnDelivery(
                productInCart,
                totalAmount,
                navigate,
                setProductInCart,
                token
              )
            }
          >
            Cash on Delivery
          </button>
          <button
            className='text-lg font-semibold bg-green-600 py-3 px-5 rounded-lg text-white transition-all duration-300 hover:bg-green-700'
            onClick={() => handleCheckout(productInCart)}
          >
            Online Payment
          </button>
        </div>
      </div>
    </div>
  );
};
