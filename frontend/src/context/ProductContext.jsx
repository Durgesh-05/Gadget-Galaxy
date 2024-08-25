import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import axios from 'axios';
import { url, initialCategories } from '../constants';

export const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState(initialCategories);

  const filterProductsByCategory = useCallback(() => {
    const updatedCategory = { ...initialCategories };
    productData.forEach((data) => {
      if (updatedCategory[data.category]) {
        updatedCategory[data.category].products.push(data);
      }
    });
    setCategory(updatedCategory);
  }, [productData]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/product`);
        const { data } = res.data;
        setProductData(data.products || []);
      } catch (error) {
        console.error('Failed to Fetch product Error: ', error);
      }
    };

    getProductData();
  }, []);

  useEffect(() => {
    if (productData.length > 0) {
      filterProductsByCategory();
    }
  }, [productData, filterProductsByCategory]);

  const value = useMemo(
    () => ({
      productData,
      setProductData,
      category,
      setCategory,
    }),
    [productData, category]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
