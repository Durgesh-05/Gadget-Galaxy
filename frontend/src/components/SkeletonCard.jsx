import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className='w-[280px] h-[365px] md:w-80 bg-gray-100 rounded-lg shadow-lg overflow-hidden animate-pulse p-4 flex flex-col justify-between border border-gray-200'>
      <div className='w-full h-32 bg-gray-200 rounded-md'></div>
      <div className='mt-4 flex flex-col space-y-2'>
        <div className='w-3/4 h-6 bg-gray-200 rounded-md'></div>
        <div className='w-1/2 h-6 bg-gray-200 rounded-md'></div>
      </div>
      <div className='w-full h-10 mt-4 bg-gray-200 rounded-md'></div>
    </div>
  );
};

export const SkeletonCartCard = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between items-center w-full bg-gray-100 border border-gray-200 rounded-lg shadow-md p-4 mb-4 animate-pulse'>
      <div className='flex items-center gap-4 w-full md:w-auto'>
        <div className='w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-md'></div>
        <div className='flex flex-col gap-2 w-full'>
          <div className='w-3/4 h-6 bg-gray-200 rounded-md'></div>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-gray-200 rounded-md'></div>
            <div className='w-12 h-6 bg-gray-200 rounded-md'></div>
            <div className='w-8 h-8 bg-gray-200 rounded-md'></div>
          </div>
          <div className='w-24 h-6 bg-red-200 rounded-md'></div>
        </div>
      </div>
      <div className='text-end mt-2 sm:mt-0'>
        <div className='w-20 h-8 bg-gray-200 rounded-md'></div>
      </div>
    </div>
  );
};

export const SkeletonProfileCard = () => {
  return (
    <div className='bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto border border-gray-300 animate-pulse'>
      <div className='flex flex-col lg:flex-row items-center'>
        <div className='flex-shrink-0 lg:mr-6'>
          <div className='w-32 h-32 rounded-full bg-gray-200'></div>
        </div>
        <div className='mt-4 lg:mt-0 space-y-3'>
          <div className='h-8 bg-gray-200 rounded-md w-48'></div>
          <div className='h-6 bg-gray-200 rounded-md w-32'></div>
        </div>
      </div>

      <div className='mt-8 space-y-4'>
        <div className='h-6 bg-gray-200 rounded-md w-40'></div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <div className='h-5 bg-gray-200 rounded-md w-32 mb-2'></div>
            <div className='h-10 bg-gray-200 rounded-md w-full'></div>
          </div>
          <div>
            <div className='h-5 bg-gray-200 rounded-md w-32 mb-2'></div>
            <div className='h-10 bg-gray-200 rounded-md w-full'></div>
          </div>
          <div className='md:col-span-2'>
            <div className='h-5 bg-gray-200 rounded-md w-32 mb-2'></div>
            <div className='h-24 bg-gray-200 rounded-md w-full'></div>
          </div>
        </div>

        <div className='flex justify-end mt-6'>
          <div className='h-10 bg-gray-200 rounded-md w-24'></div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonOrderCard = () => {
  return (
    <div className='bg-white text-black shadow-xl border border-gray-400 rounded-lg p-4 sm:p-6 mb-8 animate-pulse'>
      <div className='flex justify-between items-center border-b border-gray-300 pb-2 sm:pb-4 mb-4'>
        <div className='space-y-2'>
          <div className='h-6 bg-gray-200 rounded-md w-40'></div>
          <div className='h-4 bg-gray-200 rounded-md w-24'></div>
          <div className='h-4 bg-gray-200 rounded-md w-32'></div>
          <div className='h-4 bg-gray-200 rounded-md w-28'></div>
          <div className='h-4 bg-gray-200 rounded-md w-32'></div>
        </div>
        <div className='h-6 bg-gray-200 rounded-md w-20'></div>
      </div>

      {/* Skeleton for each order item */}
      <div className='space-y-4'>
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className={`flex justify-between items-center ${
              index < 1 ? 'border-b border-gray-300' : ''
            } pb-2 sm:pb-4 mb-4`}
          >
            <div className='flex items-center'>
              <div className='w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg mr-4'></div>
              <div className='space-y-2'>
                <div className='h-5 bg-gray-200 rounded-md w-32'></div>
                <div className='h-4 bg-gray-200 rounded-md w-24'></div>
                <div className='h-4 bg-gray-200 rounded-md w-20'></div>
              </div>
            </div>
            <div className='h-5 bg-gray-200 rounded-md w-12'></div>
          </div>
        ))}
      </div>
    </div>
  );
};
