import React, { useContext } from 'react';
import { ProductContext } from './context/ProductContext';

export const getStockOfProduct = (productId) => {
  const { productData } = useContext(ProductContext);
  const [productToFind] = productData.filter(
    (product) => product._id === productId
  );
  if (productToFind) {
    return productToFind.stock;
  }
  return -1;
};
