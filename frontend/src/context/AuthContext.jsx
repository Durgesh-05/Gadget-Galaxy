import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', JSON.stringify(authToken));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const savedToken = JSON.parse(localStorage.getItem('token'));
    if (savedToken) {
      setToken(savedToken);
      setIsLoading(false);
    }
  }, [token]);

  const isAuthenticated = () => !!token;
  const value = {
    user,
    setUser,
    token,
    setToken,
    isAuthenticated,
    login,
    logout,
    isLoading,
    setIsLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
