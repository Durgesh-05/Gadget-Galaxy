import React from 'react';
import { InputBox } from '../components/InputBox';

export const LoginPage = ({ heading, text, placeholder, btnText }) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div
        id='signup-card'
        className='px-6 py-8 border-gray-400 w-fit shadow-xl bg-white flex flex-col  justify-center gap-6 font-inter'
      >
        <div id='content'>
          <h1 className='text-black font-bold text-center text-2xl'>
            {heading}
          </h1>
          <p className='text-gray-400 text-xs text-center'>{text}</p>
        </div>
        <form action='' className='flex flex-col  justify-center gap-3 '>
          <InputBox
            label='Email'
            text='email'
            placeholder='example@gmail.com'
          />
          <InputBox label='Password' text='password' placeholder='*******' />
          <button className='border py-2 bg-black text-white text-xs rounded-md font-semibold'>
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
};
