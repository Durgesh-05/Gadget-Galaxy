import React from 'react';
import { Link } from 'react-router-dom';

export const Card = ({
  imgSrc,
  price,
  title,
  isBtn,
  productId,
  isCategory,
  content,
}) => {
  return isCategory ? (
    <div className='w-60 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 transform hover:scale-105 md:h-80 md:w-80 p-4 flex flex-col justify-between'>
      <img src={imgSrc} alt={title} className='w-full h-32 object-contain' />

      <div id='content'>
        <p className='text-sm font-bold text-gray-900 mb-2'>{title}</p>
        <p className='text-gray-600 text-sm mb-4'>{content}</p>
      </div>

      {isBtn && (
        <button className='w-full rounded-md bg-black text-white py-2 px-3 text-sm font-semibold hover:bg-gray-900 '>
          Add to cart
        </button>
      )}
    </div>
  ) : (
    <Link to={`/product/${productId}`} className='block'>
      <div className='w-60 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg md:h-80 md:w-80 p-4 flex flex-col justify-between transition-transform duration-300 transform hover:scale-105'>
        <img src={imgSrc} alt={title} className='w-full h-32 object-contain' />

        <div id='content'>
          <p className='text-sm font-bold text-gray-900 mb-2'>{title}</p>
          <p className='text-gray-600 text-sm mb-4'>Price: ${price}</p>
        </div>

        {isBtn && (
          <button className='w-full rounded-md bg-black text-white py-2 px-3 text-sm font-semibold hover:bg-gray-900 '>
            Add to cart
          </button>
        )}
      </div>
    </Link>
  );
};
