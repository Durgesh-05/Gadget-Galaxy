import React, { useContext } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heading } from '../components/Heading';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { CartContext } from '../context/CartContext';

export const CartPage = () => {
  const { productInCart, setProductInCart } = useContext(CartContext);

  const incrementHandler = (productId) => {
    setProductInCart((prevCartData) => {
      const updatedCart = prevCartData.map((product) =>
        product.productId === productId
          ? { ...product, count: product.count + 1 }
          : product
      );
      return updatedCart;
    });
  };
  const decrementHandler = () => {
    console.log('btn clicked');
  };
  return (
    <div className='font-inter'>
      <Header />
      <main className='min-h-screen pt-16'>
        <div>
          <Heading text='Your Cart' className='text-2xl px-4 mt-4' />
          <div id='cards' className='grid grid-cols-3 gap-4 px-6'>
            {productInCart.length > 1
              ? productInCart.map(
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
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                      />
                    );
                  }
                )
              : ''}
          </div>
        </div>
      </main>
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
