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
      {productInCart.length > 1 ? (
        <main className='min-h-screen pt-16'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-6'>
            <div className='lg:col-span-2'>
              <div
                id='cards'
                className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-12'
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
                <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
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
                    <div className='text-lg font-bold'>Total</div>
                    <div className='text-lg font-bold'>${total.toFixed(2)}</div>
                  </div>
                </div>
                <button
                  className='bg-black text-white rounded-lg font-medium hover:bg-gray-900 py-3 px-6 w-full mt-4'
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
      id='card'
      className='flex justify-between items-center w-full bg-white border border-gray-200 rounded-lg p-4'
    >
      <div id='left' className='flex items-center gap-4'>
        <img
          src={productImage}
          alt='Product'
          className='w-16 h-16 rounded-md object-cover'
        />
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-semibold text-gray-900'>{productName}</p>
          <div id='counter' className='flex items-center gap-2'>
            <button
              className='text-gray-600 hover:text-gray-900'
              onClick={decrementHandler}
            >
              <CiSquareMinus size={20} />
            </button>
            <p className='text-lg font-semibold'>{count}</p>
            <button
              className='text-gray-600 hover:text-gray-900'
              onClick={incrementHandler}
            >
              <CiSquarePlus size={20} />
            </button>
          </div>
          <button
            className='text-xs bg-red-200 text-red-600 hover:cursor-pointer rounded-md px-4 py-1 w-fit'
            onClick={removeFromCart}
          >
            Remove
          </button>
        </div>
      </div>
      <div id='right' className='text-end'>
        <p className='text-lg font-semibold text-gray-900'>${price}</p>
      </div>
    </div>
  );
};
