import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

export const Card = ({
  imgSrc,
  price,
  title,
  productId,
  isCategory,
  content,
}) => {
  const { productInCart, setProductInCart } = useContext(CartContext);
  const clickHandler = () => {
    const cartObject = {
      productId,
      productName: title,
      productImage: imgSrc,
      productPrice: price,
      count: 1,
    };
    setProductInCart((prevCartData) => {
      const existingProductIndex = prevCartData.findIndex(
        (data) => data.productId === productId
      );

      if (existingProductIndex !== -1) {
        // Product exist
        const cartToUpdate = [...prevCartData];
        cartToUpdate[existingProductIndex].count += 1;
        return cartToUpdate;
      } else {
        // New Product
        return [...prevCartData, cartObject];
      }
    });
    toast.success('Product is added to Cart', { autoClose: 1000 });
    console.log(productInCart);
  };
  return isCategory ? (
    <div className='w-60 bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 transform hover:scale-105 md:h-80 md:w-80 p-4 flex flex-col justify-between hover:cursor-pointer'>
      <img src={imgSrc} alt='image' className='w-full h-32 object-contain' />

      <div id='content'>
        <p className='text-sm font-bold text-gray-900 mb-2'>{title}</p>
        <p className='text-gray-600 text-sm mb-4'>{content}</p>
      </div>
    </div>
  ) : (
    <div className='w-60 bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl md:h-80 md:w-80 p-4 flex flex-col justify-between transition-transform duration-300 transform hover:scale-105 hover:cursor-pointer'>
      <Link to={`/product/${productId}`} className='block'>
        <img src={imgSrc} alt='image' className='w-full h-32 object-contain' />
      </Link>
      <div id='content'>
        <p className='text-sm font-bold text-gray-900 mb-2'>{title}</p>
        <p className='text-gray-600 text-sm mb-4'>Price: ${price}</p>
      </div>

      <button
        className='w-full rounded-md bg-black text-white py-2 px-3 text-sm font-semibold hover:bg-gray-900 '
        onClick={clickHandler}
      >
        Add to cart
      </button>
    </div>
  );
};
