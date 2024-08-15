import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   console.log(userData);

  const value = {
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
