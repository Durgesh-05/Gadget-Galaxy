import React, { useContext, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heading } from '../components/Heading';
import { Card } from '../components/Card';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { productData, category } = useContext(ProductContext);
  return (
    <div className='font-inter'>
      <Header />
      <main className='min-h-screen pt-16'>
        {/* Intro Section */}
        <div
          id='intro-section'
          className='bg-gray-100 flex flex-col  px-6 py-12 gap-8 mb-12 md:flex-row md:items-center md:justify-around'
        >
          <div
            id='content'
            className='flex flex-col gap-4 max-w-md  lg:text-left lg:gap-6'
          >
            <Heading
              text={'Discover the Latest Tech Gadgets'}
              className='text-4xl lg:text-5xl lg:font-extrabold'
            />
            <p className='text-lg lg:text-xl text-gray-600'>
              Explore our curated collection of cutting-edge tech products for
              your home, office, and on-the-go needs.
            </p>
            <Link to='/products'>
              <button className='rounded-md bg-black text-white py-3 px-6 w-fit text-lg font-semibold'>
                Shop Now
              </button>
            </Link>
          </div>
          <div id='image' className='w-full  lg:max-w-xl'>
            <img
              src='https://img.freepik.com/premium-photo/order-online-shopping-customer-with-gift-mobile-pay-with-credit-card-isolated-white-background_1262710-35753.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid'
              alt='image'
              className='w-full h-auto rounded-lg'
            />
          </div>
        </div>

        {/* Category Section */}
        <div className='max-w-screen px-6 mt-6'>
          <div className='flex flex-col text-center mb-12 '>
            <Heading
              text='Featured Category'
              className='text-3xl lg:text-4xl lg:font-bold'
            />
            <div
              id='cards'
              className='flex justify-center items-center gap-8 mt-4 flex-wrap'
            >
              {Object.keys(category).map((data) => {
                return (
                  <Card
                    title={data}
                    content={category[data].description}
                    imgSrc={category[data].imageUrl}
                    isBtn={false}
                    isCategory={true}
                    key={data}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Section */}

        <div className=' bg-gray-100 '>
          <div className='flex flex-col text-center'>
            <Heading
              text='Featured Products'
              className='text-3xl lg:text-4xl lg:font-bold my-6'
            />
            <div
              id='cards'
              className='flex flex-wrap justify-center items-center gap-10 mt-4 mb-8'
            >
              {productData.slice(0, 10).map((data) => {
                return (
                  <Card
                    title={data.productName}
                    price={data.price}
                    imgSrc={data.productImageURL}
                    key={data._id}
                    productId={data._id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
