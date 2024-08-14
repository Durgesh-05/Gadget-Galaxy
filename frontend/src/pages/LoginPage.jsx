import React, { useState } from 'react';
import { InputBox } from '../components/InputBox';
import axios from 'axios';
import { url } from '../baseUrl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const LoginPage = ({ heading, text, btnText }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${url}/api/v1/user/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setTimeout(
        () =>
          navigate('/', {
            replace: true,
          }),
        1000
      );
    } catch (e) {
      toast.error(e.response ? e.response.data.message : e.message);
      console.error('Failed to Login Error: ', e);
    } finally {
      setIsLoading(false);
    }
  };

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
        <form
          className='flex flex-col  justify-center gap-3 '
          onSubmit={submitHandler}
        >
          <InputBox
            label='Email'
            text='email'
            placeholder='example@gmail.com'
            value={email}
            setValue={setEmail}
          />
          <InputBox
            label='Password'
            text='password'
            placeholder='*******'
            value={password}
            setValue={setPassword}
          />
          <button
            className='border py-2 bg-black text-white text-xs rounded-md font-semibold'
            type='submit'
          >
            {isLoading ? 'Loading...' : btnText}
          </button>
        </form>
      </div>
    </div>
  );
};