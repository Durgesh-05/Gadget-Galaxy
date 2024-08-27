import React, { useContext } from 'react';
import { IoMdClose } from 'react-icons/io';
import { handleCashOnDelivery } from '../utils';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const DialogBox = ({ onClose, totalAmount }) => {
  const { productInCart } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-gray-100 shadow-lg border border-gray-500 p-8 w-fit  flex flex-col justify-center items-center font-inter relative rounded-lg'>
        <button
          className='absolute text-lg top-2 right-4 py-2 px-4 text-gray-800 text-center rounded-lg '
          onClick={onClose}
        >
          <IoMdClose />
        </button>
        <div id='btns' className='flex gap-4 mt-4'>
          <button
            className='text-lg font-semibold bg-gray-950 py-3 px-5 rounded-lg text-white text-center hover:bg-gray-800 hover:cursor-pointer'
            onClick={() =>
              handleCashOnDelivery(productInCart, totalAmount, navigate)
            }
          >
            Cash on Delivery
          </button>
          <button className='text-lg font-semibold bg-gray-950 py-3 px-5 rounded-lg text-white text-center hover:bg-gray-800 hover:cursor-pointer'>
            Online Payment
          </button>
        </div>
      </div>
    </div>
  );
};
