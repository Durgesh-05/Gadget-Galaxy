import React, { useState, createContext, useEffect } from 'react';

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [productInCart, setProductInCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCart) {
      setProductInCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(productInCart));
  }, [productInCart]);

  const incrementHandler = (productId, stockCount) => {
    setProductInCart((prevCartData) => {
      return prevCartData.map((product) =>
        product.productId === productId
          ? {
              ...product,
              count:
                product.count === stockCount
                  ? product.count
                  : product.count + 1,
            }
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
        // Product exists
        const cartToUpdate = [...prevCartData];
        cartToUpdate[indexOfProduct].count += 1;
        return cartToUpdate;
      } else {
        // New product
        return [...prevCartData, cartObject];
      }
    });
  };

  const removeFromCart = (productId) => {
    setProductInCart((prevCartData) => {
      const cartData = [...prevCartData];
      const indexOfProduct = cartData.findIndex(
        (product) => product.productId === productId
      );
      if (indexOfProduct !== -1) {
        cartData.splice(indexOfProduct, 1);
      }
      return cartData;
    });
  };

  const value = {
    productInCart,
    setProductInCart,
    incrementHandler,
    decrementHandler,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
