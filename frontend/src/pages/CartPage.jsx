import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { CartContext } from '../context/CartContext';
import { FrownIcon } from './NotFoundPage';
import { ProductContext } from '../context/ProductContext';
import { DialogBox } from '../components/Dialog';

export const CartPage = () => {
  const { productInCart, incrementHandler, decrementHandler, removeFromCart } =
    useContext(CartContext);
  const { productData } = useContext(ProductContext);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const subtotal = productInCart.reduce(
    (total, product) => total + product.productPrice * product.count,
    0
  );
  const shipping = 10.0;
  const discount = (subtotal * 20) / 100; // 20% fixed Discount
  const total = subtotal + shipping - discount;

  const getStockOfProduct = (productId) => {
    const [productToFind] = productData.filter(
      (product) => product._id === productId
    );
    if (productToFind) {
      return productToFind.stock;
    }
    return -1;
  };

  const handleCheckOut = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className='font-inter'>
      <Header />
      {productInCart.length > 0 ? (
        <main className='min-h-screen pt-16'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-6'>
            <div className='lg:col-span-2'>
              <div
                id='cards'
                className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-12'
              >
                {productInCart.map(
                  ({
                    productName,
                    count,
                    productPrice,
                    productImage,
                    productId,
                  }) => {
                    if (productName === '') return;
                    const stockCount = getStockOfProduct(productId);
                    return (
                      <CartCard
                        key={productId}
                        productImage={productImage}
                        productName={productName}
                        count={count}
                        price={productPrice}
                        productId={productId}
                        incrementHandler={() =>
                          incrementHandler(productId, stockCount)
                        }
                        decrementHandler={() => decrementHandler(productId)}
                        removeFromCart={() => removeFromCart(productId)}
                      />
                    );
                  }
                )}
              </div>
            </div>
            <div className='lg:col-span-1 mt-12'>
              <div className='bg-gray-100 p-6 rounded-lg'>
                <h2 className='text-2xl font-bold mb-4'>Order Summary</h2>
                <div className='grid gap-4'>
                  <div className='flex items-center justify-between'>
                    <div className='text-gray-950 font-semibold'>Subtotal</div>
                    <div className='font-medium'>${subtotal.toFixed(2)}</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-gray-950 font-semibold'>Shipping</div>
                    <div className='font-medium'>${shipping.toFixed(2)}</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-gray-950 font-semibold'>
                      Discount: 20%
                    </div>
                    <div className='font-medium text-green-600'>
                      - ${discount.toFixed(2)}
                    </div>
                  </div>
                  <div className='border-t border-gray-200 my-4'></div>
                  <div className='flex items-center justify-between'>
                    <div className='text-xl font-bold'>Total</div>
                    <div className='text-lg font-bold'>${total.toFixed(2)}</div>
                  </div>
                </div>
                <button
                  className='bg-black text-white rounded-lg font-semibold hover:bg-gray-900 py-4 px-6 w-full mt-4 text-lg'
                  onClick={handleCheckOut}
                >
                  Proceed to Checkout
                </button>
              </div>
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

      {isDialogOpen && <DialogBox onClose={closeDialog} totalAmount={total} />}
      <Footer />
    </div>
  );
};

const CartCard = ({
  productName,
  count,
  price,
  productImage,
  incrementHandler,
  decrementHandler,
  removeFromCart,
}) => {
  return (
    <div
      className='flex flex-col sm:flex-row justify-between items-center w-full bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4
    transition-transform duration-300 transform hover:scale-105 hover:cursor-pointer'
    >
      <div className='flex items-center gap-4 w-full md:w-auto'>
        <img
          src={productImage}
          alt={productName}
          className='w-24 h-24 sm:w-32 sm:h-32 rounded-md object-contain'
        />
        <div className='flex flex-col gap-2'>
          <p className='text-lg font-semibold text-gray-900'>{productName}</p>
          <div className='flex items-center gap-2'>
            <button
              className='text-gray-600 hover:text-gray-900'
              onClick={decrementHandler}
            >
              <CiSquareMinus size={28} />
            </button>
            <p className='text-xl font-semibold'>{count}</p>
            <button
              className='text-gray-600 hover:text-gray-900'
              onClick={incrementHandler}
            >
              <CiSquarePlus size={28} />
            </button>
          </div>
          <button
            className='text-xs font-semibold bg-red-200 text-red-600 hover:bg-red-300 transition-colors duration-200 rounded-md px-4 py-2 w-fit'
            onClick={removeFromCart}
          >
            Remove
          </button>
        </div>
      </div>
      <div className='text-end mt-2 sm:mt-0'>
        <p className='text-2xl font-semibold text-gray-900'>${price}</p>
      </div>
    </div>
  );
};
