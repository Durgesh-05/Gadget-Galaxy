import React, { useState, useContext } from 'react';
import { InputBox } from '../components/InputBox';
import axios from 'axios';
import { url } from '../constants';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const LoginPage = ({ heading, text, btnText }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

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
      setIsLoggedIn(true);
      const { data } = res.data;
      toast.success(`Welcome ${data.name} to Gadget Galaxy`, {
        autoClose: 3000,
      });
      setTimeout(
        () =>
          navigate('/', {
            replace: true,
          }),
        1000
      );
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
    <div className='w-screen h-screen flex justify-center items-center'>
      <div
        id='login-card'
        className='px-6 py-8 border-gray-400 w-fit shadow-xl bg-white flex flex-col justify-center gap-6 font-inter'
      >
        <div id='content'>
          <h1 className='text-black font-bold text-center text-2xl'>
            {heading}
          </h1>
          <p className='text-gray-400 text-xs text-center'>{text}</p>
        </div>
        <form
          className='flex flex-col justify-center gap-3'
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
            <Link
              to='/forgot-password'
              className=' font-medium text-black text-[10px] my-2 hover:underline'
            >
              Forgot Password?
            </Link>
          </div>
          <button
            className='border py-2 bg-black text-white text-xs rounded-md font-semibold'
            type='submit'
          >
            {isLoading ? 'Loading...' : btnText}
          </button>
          <div className='text-center'>
            <Link
              to='/signup'
              className='text-black text-xs font-medium hover:underline'
            >
              Not Registered? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
