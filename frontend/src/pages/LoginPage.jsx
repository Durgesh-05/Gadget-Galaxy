import React, { useState } from 'react';
import { InputBox } from '../components/InputBox';
import axios from 'axios';
import { url } from '../utils';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = ({ heading, text, btnText }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
      const { data } = res.data;
      console.log(data);
      login(data, data.accessToken);

      toast.success(`Welcome ${data.name} to Gadget Galaxy`, {
        autoClose: 3000,
      });
      navigate('/', {
        replace: true,
      });
    } catch (e) {
      toast.error(e.response ? e.response.data.message : e.message, {
        autoClose: 3000,
      });
      console.error('Failed to Login Error: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-100'>
      <div
        id='login-card'
        className='px-8 py-10 border-gray-400 w-full max-w-md shadow-xl bg-white flex flex-col justify-center gap-6 font-inter rounded-lg'
      >
        <div id='content'>
          <h1 className='text-black text-center text-4xl font-extrabold md:text-3xl'>
            {heading}
          </h1>
          <p className='text-gray-600 text-xl text-center md:text-lg'>{text}</p>
        </div>
        <form
          className='flex flex-col justify-center gap-4'
          onSubmit={submitHandler}
        >
          <InputBox
            label='Email'
            text='email'
            placeholder='example@gmail.com'
            value={email}
            setValue={setEmail}
          />
          <div className='relative'>
            <InputBox
              label='Password'
              text='password'
              placeholder='*******'
              value={password}
              setValue={setPassword}
            />
            {/* <Link
              to='/forgot-password'
              className='font-medium text-black text-xs my-2 hover:underline'
            >
              Forgot Password?
            </Link> */}
          </div>
          <button
            className='py-2 border bg-black text-white rounded-md transition duration-200 hover:bg-gray-800 md:py-3 text-lg font-bold'
            type='submit'
          >
            {isLoading ? 'Loading...' : btnText}
          </button>
          <div className='text-center'>
            <Link
              to='/signup'
              className='text-black font-medium text-lg hover:underline'
            >
              Not Registered? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
