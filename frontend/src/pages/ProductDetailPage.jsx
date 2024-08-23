import React, { useContext, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heading } from '../components/Heading';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../constants';
import { CartContext } from '../context/CartContext';
import { initCartObject } from '../constants';

export const ProductDetailPage = () => {
  const [productDetail, setProductDetail] = useState({});
  const [review, setReview] = useState('');
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const submitHandler = (e) => {
    e.preventDefault();
    // Fetch user name id and make a post request
  };

  const clickHandler = () => {
    const { _id, productName, productImageURL, price } = productDetail;
    const cartObject = initCartObject(_id, productName, productImageURL, price);
    addToCart(cartObject);
    toast.success('Product is added to Cart', { autoClose: 1000 });
    console.log(productInCart);
    console.log('hello');
  };

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/product/${id}`);
        const { data } = res.data;
        setProductDetail({ ...data });
      } catch (error) {
        console.error('Failed to get product details Error: ', error);
      }
    };

    getProductDetail();

    return () => {
      setProductDetail({});
    };
  }, [id]);

  return (
    <div className='font-inter'>
      <Header />
      <main className='min-h-screen pt-16'>
        <div
          id='product'
          className='flex flex-col items-center justify-center my-8 gap-6 lg:flex-row lg:mt-8 lg:mb-0'
        >
          <img
            src={productDetail.productImageURL}
            alt='Product Image'
            className='w-full lg:w-1/2 rounded-lg object-cover'
          />

          <div
            id='content'
            className='flex flex-col gap-4 mx-4 lg:mx-0 lg:w-1/2'
          >
            <Heading text={productDetail.productName} className='text-3xl' />
            <div className='flex gap-2 items-center'>
              <p className='text-4xl text-gray-950 font-bold'>
                ${productDetail.price}
              </p>
              {productDetail.stock > 0 ? (
                <p className='border border-gray-300 bg-white rounded-2xl w-fit px-4 py-1 text-xs'>
                  In Stock
                </p>
              ) : (
                <p className='border border-gray-300 bg-white rounded-2xl w-fit px-4 py-1 text-xs'>
                  Out of Stock
                </p>
              )}
            </div>
            <div id='btns' className='flex gap-3'>
              <button
                className='rounded-md bg-black text-white py-3 px-6 text-xs font-semibold'
                onClick={clickHandler}
              >
                Add to Cart
              </button>
              <button className='rounded-md bg-black text-white py-3 px-6 text-xs font-semibold'>
                Buy Now
              </button>
            </div>
            <div
              id='product-details'
              className='flex flex-col gap-4 text-sm mt-4'
            >
              <h3 className='text-2xl text-gray-950 font-medium lg:text-3xl'>
                Product Details
              </h3>
              <div className='flex flex-col gap-2'>
                <p className='text-gray-600'>
                  {productDetail.productDescription}
                </p>
              </div>
            </div>

            {/* Feedback */}
            <div id='reviews' className='mb-4'>
              <form className='flex flex-col gap-2' onSubmit={submitHandler}>
                <label htmlFor='reviewText' className='text-sm font-semibold'>
                  Write your review
                </label>
                <textarea
                  name='reviewText'
                  id='reviewText'
                  className='border border-gray-400 rounded-lg h-20 w-full lg:w-80 p-4 text-xs'
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <button
                  className='rounded-md w-full lg:w-fit bg-black text-white py-2 px-8 text-xs font-semibold'
                  type='submit'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
