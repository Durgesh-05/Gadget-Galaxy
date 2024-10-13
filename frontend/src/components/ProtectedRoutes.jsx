import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className=' h-screen w-screen flex justify-center items-center'></div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to='/login' />;
  }
  return <Outlet />;
};
