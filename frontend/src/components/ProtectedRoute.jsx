import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!user && !isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return <Outlet />;
};
