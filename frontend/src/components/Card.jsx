import React from 'react';

export const Card = ({ imgSrc, content, title, isBtn }) => {
  return (
    <div className='max-w-56 bg-white rounded-lg shadow-md overflow-hidden'>
      <img src={imgSrc} alt='' className='w-full h-28 object-cover' />
      <div className='p-4'>
        <p className='text-sm font-bold text-gray-900 mb-1'>{title}</p>
        <p className='text-gray-600 text-xs mb-2'>{content}</p>
        {isBtn && (
          <button className='rounded-md bg-black text-white py-2 px-3 text-xs font-semibold'>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};
