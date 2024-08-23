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

  const addToCart = (cartObject) => {
    setProductInCart((prevCartData) => {
      const indexOfProduct = prevCartData.findIndex(
        (product) => product.productId === cartObject.productId
      );

      if (indexOfProduct !== -1) {
        // Product exist
        const cartToUpdate = [...prevCartData];
        cartToUpdate[indexOfProduct].count += 1;
        return cartToUpdate;
      } else {
        // New Product
        return [...prevCartData, cartObject];
      }
    });
  };

  const value = {
    productInCart,
    setProductInCart,
    incrementHandler,
    decrementHandler,
    addToCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
