import React, { useState } from 'react';
import { InputBox } from '../components/InputBox';
import axios from 'axios';
import { url } from '../utils';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

export const SignupPage = ({ heading, text, btnText }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${url}/api/v1/user/signup`,
        {
          fullName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message, { autoClose: 3000 });
      setTimeout(() => navigate('/login', { replace: true }), 1000);
    } catch (e) {
      toast.error(e.response ? e.response.data.message : e.message, {
        autoClose: 3000,
      });
      console.error('Failed to Signup Error: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-100 font-inter'>
      <div
        id='signup-card'
        className='px-8 py-10 border-gray-400 w-full max-w-md shadow-xl bg-white flex flex-col justify-center gap-6 rounded-lg'
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
            label='Full Name'
            text='fullName'
            placeholder='John Doe'
            value={fullName}
            setValue={setFullName}
          />
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
            className='py-2 border bg-black text-white rounded-md transition duration-200 hover:bg-gray-800 md:py-3 text-lg font-bold'
            type='submit'
          >
            {isLoading ? 'Loading...' : btnText}
          </button>
          <div className='text-center'>
            <Link
              to='/login'
              className='text-black font-medium text-lg hover:underline'
            >
              Already Registered? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
