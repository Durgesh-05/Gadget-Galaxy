import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heading } from '../components/Heading';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { CartContext } from '../context/CartContext';
import { FrownIcon } from './NotFoundPage';

export const CartPage = () => {
  const { productInCart, incrementHandler, decrementHandler } =
    useContext(CartContext);

  return (
    <div className='font-inter'>
      <Header />
      {productInCart.length > 1 ? (
        <main className='min-h-screen pt-16'>
          <div>
            <Heading text='Your Cart' className='text-2xl px-4 mt-4' />
            <div id='cards' className='grid grid-cols-3 gap-4 px-6'>
              {productInCart.map(
                ({
                  productName,
                  count,
                  productPrice,
                  productImage,
                  productId,
                }) => {
                  if (productName === '') return;
                  return (
                    <CartCard
                      key={productId}
                      productImage={productImage}
                      productName={productName}
                      count={count}
                      price={productPrice}
                      productId={productId}
                      incrementHandler={() => incrementHandler(productId)}
                      decrementHandler={() => decrementHandler(productId)}
                    />
                  );
                }
              )}
              {/* ):""} */}
            </div>
          </div>
        </main>
      ) : (
        <div className='flex flex-col items-center justify-center min-h-screen gap-6 px-4 md:px-6 font-inter'>
          <FrownIcon className='h-20 w-20 text-gray-500 dark:text-gray-400' />
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
            Products Not Added Yet
          </h1>

          <Link
            to='/products'
            className='inline-flex h-10 items-center justify-center rounded-md bg-black px-6 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-900'
          >
            Go to Product Page to add Products
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
};

const CartCard = ({
  productName,
  count,
  price,
  productImage,
  productId,
  incrementHandler,
  decrementHandler,
}) => {
  return (
    <div
      id='card'
      className='flex  justify-between items-center w-full max-w-md bg-white border border-gray-200 rounded-lg p-2 mt-4 '
    >
      <div id='left' className='flex items-center gap-4'>
        <img
          src={productImage}
          alt='Product'
          className='w-16 h-16 rounded-md object-cover'
        />
        <div className='flex flex-col gap-2'>
          <p className='text-[10px] font-semibold text-gray-900'>
            {productName}
          </p>
          <div id='counter' className='flex items-center gap-2'>
            <button
              className='text-gray-600 hover:text-gray-900'
              onClick={() => decrementHandler()}
            >
              <CiSquareMinus size={20} />
            </button>
            <p className='text-lg font-semibold'>{count}</p>
            <button
              className='text-gray-600 hover:text-gray-900'
              onClick={() => incrementHandler(productId)}
            >
              <CiSquarePlus size={20} />
            </button>
          </div>
          <div className='flex gap-2'>
            <button className='text-xs bg-red-200 text-red-600 hover:cursor-pointer rounded-md px-4 py-1 w-fit'>
              Remove
            </button>
            <p className='border border-gray-300 bg-green-100 text-green-700 rounded-lg w-fit px-4 py-1 text-[9px] whitespace-nowrap font-semibold'>
              In stock
            </p>
          </div>
        </div>
      </div>
      <div id='right' className='text-start'>
        <p className='text-lg font-semibold text-gray-900'>${price}</p>
      </div>
    </div>
  );
};
