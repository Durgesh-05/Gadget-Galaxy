import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

function App() {
  return (
    <div className='bg-white'>
      <Routes>
        <Route
          path='/auth/signup'
          element={
            <SignupPage
              heading='Sign Up'
              text='Create an account to start using our product.'
              btnText='Sign Up'
            />
          }
        />
        <Route
          path='/auth/login'
          element={
            <LoginPage heading='Login' text='Welcome back!' btnText='Login' />
          }
        />
        <Route
          path='/'
          element={
            <h1 className='text-3xl font-bold underline'>Hello world!</h1>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
