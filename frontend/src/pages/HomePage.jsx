import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heading } from '../components/Heading';
import { Card } from '../components/Card';

export const HomePage = () => {
  // UseEffect code to fetch Category and Product details
  return (
    <div className='font-inter'>
      <Header />
      <main className='min-h-screen'>
        {/* Intro Section */}
        <div
          id='intro-section'
          className='bg-gray-100 flex flex-col items-center px-6 py-8 gap-8 mb-12 lg:flex-row lg:items-center lg:justify-around'
        >
          <div
            id='content'
            className='flex flex-col gap-4 max-w-md text-center lg:text-left lg:gap-6'
          >
            <Heading
              text={'Discover the Latest Tech Gadgets'}
              className='text-4xl'
            />
            <p className='text-sm text-gray-600'>
              Explore our curated collection of cutting-edge tech products for
              your home, office, and on-the-go needs.
            </p>
            <button className='rounded-md bg-black text-white py-3 px-6 w-fit text-xs font-semibold'>
              Shop Now
            </button>
          </div>
          <div id='image' className='w-full max-w-xs lg:max-w-sm'>
            <img
              src='https://generated.vusercontent.net/placeholder.svg'
              alt='image'
              className='w-full h-auto rounded-lg'
            />
          </div>
        </div>

        {/* Category Section */}
        <div className='flex flex-col text-center mb-12'>
          <Heading text='Featured Category' size={2} />
          <div
            id='cards'
            className='flex flex-wrap justify-center items-center gap-10 mt-4'
          >
            <Card
              imgSrc='https://generated.vusercontent.net/placeholder.svg'
              title='Laptops'
              content='Discover the latest laptops for work, play, and everything in between.'
            />
            <Card
              imgSrc='https://generated.vusercontent.net/placeholder.svg'
              title='Laptops'
              content='Discover the latest laptops for work, play, and everything in between.'
            />
            <Card
              imgSrc='https://generated.vusercontent.net/placeholder.svg'
              title='Laptops'
              content='Discover the latest laptops for work, play, and everything in between.'
            />
            <Card
              imgSrc='https://generated.vusercontent.net/placeholder.svg'
              title='Laptops'
              content='Discover the latest laptops for work, play, and everything in between.'
            />
          </div>
        </div>

        {/* Product Section */}

        <div className=' bg-gray-100'>
          <div className='flex flex-col text-center'>
            <Heading text='Featured Products' className='text-2xl mt-8' />
            <div
              id='cards'
              className='flex flex-wrap justify-center items-center gap-10 mt-4 mb-8'
            >
              <Card
                imgSrc='https://generated.vusercontent.net/placeholder.svg'
                title='Laptops'
                content='Discover the latest laptops for work, play, and everything in between.'
              />
              <Card
                imgSrc='https://generated.vusercontent.net/placeholder.svg'
                title='Laptops'
                content='Discover the latest laptops for work, play, and everything in between.'
              />
              <Card
                imgSrc='https://generated.vusercontent.net/placeholder.svg'
                title='Laptops'
                content='Discover the latest laptops for work, play, and everything in between.'
              />
              <Card
                imgSrc='https://generated.vusercontent.net/placeholder.svg'
                title='Laptops'
                content='Discover the latest laptops for work, play, and everything in between.'
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
