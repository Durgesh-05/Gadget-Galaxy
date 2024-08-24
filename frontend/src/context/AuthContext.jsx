import React, { useState, createContext, useEffect, useContext } from 'react';
import axios from 'axios';
import { url } from '../constants';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/user/auth-state`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          const { user } = res.data.data;
          setIsAuthenticated(true);
          setUser(user);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error('Failed to Fetch Auth State Error: ', e);
        setIsAuthenticated(false);
        setUser({});
        setIsLoggedIn(false);
      }
    };

    if (isLoggedIn) {
      fetchAuthState();
    }
  }, [isLoggedIn]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
