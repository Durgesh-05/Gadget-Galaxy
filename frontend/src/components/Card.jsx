import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { initCartObject } from '../utils';
import { useAuth } from '../context/AuthContext';

export const Card = ({
  imgSrc,
  price,
  title,
  productId,
  isCategory,
  content,
}) => {
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useAuth();
  const clickHandler = () => {
    if (!isAuthenticated())
      return toast.error('Authentication Required', { autoClose: 1000 });
    const cartObject = initCartObject(productId, title, imgSrc, price);
    addToCart(cartObject);
    toast.success('Product is added to Cart', { autoClose: 1000 });
  };
  return isCategory ? (
    <div className='w-60 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 transform hover:scale-105 md:h-80 md:w-80 p-4 flex flex-col justify-between hover:cursor-pointer border border-gray-200'>
      <img src={imgSrc} alt='image' className='w-full h-32 object-contain' />

      <div id='content' className='flex flex-col gap-3'>
        <p className='text-xl font-semibold text-gray-900 '>{title}</p>
        <p className='text-gray-600 text-md mb-4'>{content}</p>
      </div>
    </div>
  ) : (
    <div className='w-[280px]  bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl h-[365px] md:w-80 p-4 flex flex-col justify-between transition-transform duration-300 transform hover:scale-105 hover:cursor-pointer border border-gray-300'>
      <Link to={`/product/${productId}`} className='block'>
        <img src={imgSrc} alt='image' className='w-full h-32 object-contain' />

        <div id='content'>
          <p className='text-md font-bold text-gray-900 mb-2 text-left'>
            {title}
          </p>
          <p className=' text-lg mb-4 text-left font-bold'>Price: ${price}</p>
        </div>
      </Link>
      <button
        className='w-full rounded-md bg-black text-white py-2 px-3 text-md font-bold hover:bg-gray-900 md:py-3 '
        onClick={clickHandler}
      >
        Add to cart
      </button>
    </div>
  );
};
