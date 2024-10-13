import React, { useContext, useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductContext } from '../context/ProductContext';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';
import { FrownIcon } from './NotFoundPage';
import { SkeletonCard } from '../components/SkeletonCard';

export const ProductsPage = () => {
  const { productData } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productData.length > 0) {
      setLoading(false);
    }
  }, [productData.length]);

  return (
    <div className='font-inter'>
      <Header />
      {loading ? (
        <main className='min-h-screen px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center mt-12'>
          {[...Array(15)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </main>
      ) : productData.length > 0 ? (
        <main className='min-h-screen px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center mt-12'>
          {productData.map((data) => (
            <Card
              key={data._id}
              title={data.productName}
              price={data.price}
              isCategory={false}
              imgSrc={data.productImageURL}
              productId={data._id}
            />
          ))}
        </main>
      ) : (
        <div className='flex flex-col items-center justify-center h-screen gap-6 px-4 md:px-6 font-inter'>
          <FrownIcon className='h-20 w-20 text-gray-500 dark:text-gray-400' />
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
            Unable to Fetch Products
          </h1>
          <p className='text-gray-500 dark:text-gray-400 max-w-md text-center'>
            Sorry for the inconvenience. We will get back to you!
          </p>
          <Link
            to='/'
            className='inline-flex h-10 items-center justify-center rounded-md bg-black px-6 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-900'
          >
            Go to Homepage
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
};
