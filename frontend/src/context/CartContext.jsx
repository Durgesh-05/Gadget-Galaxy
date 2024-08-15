import React, { useState, createContext } from 'react';

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [productInCart, setProductInCart] = useState([
    {
      productId: '',
      productName: '',
      count: 0,
      productImage: '',
      productPrice: 0,
    },
  ]);

  const value = {
    productInCart,
    setProductInCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
