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

  const incrementHandler = (productId) => {
    setProductInCart((prevCartData) => {
      return prevCartData.map((product) =>
        product.productId === productId
          ? { ...product, count: product.count + 1 }
          : product
      );
    });
  };

  const decrementHandler = (productId) => {
    setProductInCart((prevCartData) => {
      const cartData = [...prevCartData];
      const indexOfProduct = cartData.findIndex(
        (product) => product.productId === productId
      );

      if (indexOfProduct !== -1) {
        const product = cartData[indexOfProduct];
        if (product.count > 1) {
          product.count -= 1;
        } else {
          cartData.splice(indexOfProduct, 1);
        }
      }
      return cartData;
    });
  };

  const value = {
    productInCart,
    setProductInCart,
    incrementHandler,
    decrementHandler,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
