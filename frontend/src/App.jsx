import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className='bg-white p-0 m-0 box-border h-screen'>
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
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
