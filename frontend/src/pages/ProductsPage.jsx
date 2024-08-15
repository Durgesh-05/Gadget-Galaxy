import React, { useContext } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductContext } from '../context/ProductContext';
import { Card } from '../components/Card';

export const ProductsPage = () => {
  const { productData } = useContext(ProductContext);
  return (
    <div className='font-inter'>
      <Header />
      <main className='min-h-screen grid grid-cols-1 place-items-center gap-6 my-4 pt-16 lg:grid lg:grid-cols-3 lg:gap-4'>
        {productData.map((data) => {
          return (
            <Card
              key={data._id}
              title={data.productName}
              price={data.price}
              isCategory={false}
              imgSrc={data.productImageURL}
              productId={data._id}
            />
          );
        })}
      </main>
      <Footer />
    </div>
  );
};
