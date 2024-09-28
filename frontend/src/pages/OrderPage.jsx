import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../utils';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { logout, token } = useAuth();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data.data);
      } catch (e) {
        console.error('Failed to Fetch Order Details Error: ', e);
        if (e.response?.data?.statusCode === 401) {
          toast.warning('Token Expired! Please Login', { autoClose: 1000 });
          logout();
          navigate('/login', { replace: true });
        }
      }
    };

    fetchOrderDetails();
  }, []);

  if (orders.length === 0) {
    return (
      <div className='text-white text-center mt-10'>
        <Header />
        <div className='min-h-screen flex items-center justify-center'>
          Loading...
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='font-inter'>
      <Header />
      <div className='min-h-screen bg-white pt-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-950 text-center my-8'>
            Order Details
          </h1>
          {orders.map((order) => (
            <div
              key={order._id}
              className='bg-white text-black shadow-xl border border-gray-400 rounded-lg p-4 sm:p-6 mb-8'
            >
              <div className='flex justify-between items-center border-b border-gray-300 pb-2 sm:pb-4 mb-4'>
                <div>
                  <h2 className='text-lg sm:text-xl font-semibold'>
                    Order ID: {order._id}
                  </h2>
                  <p className='text-gray-600 text-sm sm:text-base'>
                    Placed on: {formatDate(order.createdAt)}
                  </p>
                  <p className='text-gray-600 text-sm sm:text-base'>
                    Payment Type: {order.paymentType}
                  </p>
                  <p className='text-gray-600 text-sm sm:text-base'>
                    Order Status: {order.orderStatus}
                  </p>
                  <p className='text-gray-600 text-sm sm:text-base'>
                    Payment Status: {order.paymentStatus}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-lg sm:text-xl font-bold'>
                    ${order.orderPrice}
                  </p>
                </div>
              </div>
              {order.orderItem.map((item, index) => (
                <div
                  key={item._id}
                  className={`flex justify-between items-center ${
                    index < order.orderItem.length - 1
                      ? 'border-b border-gray-300'
                      : ''
                  } pb-2 sm:pb-4 mb-4`}
                >
                  <div className='flex items-center'>
                    <img
                      src={item.productId.productImageURL}
                      alt={item.productId.productName}
                      className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mr-4'
                    />
                    <div>
                      <h3 className='text-base sm:text-lg font-semibold'>
                        {item.productId.productName}
                      </h3>
                      <p className='text-gray-600 text-sm sm:text-base'>
                        {item.productId.category}
                      </p>
                      <p className='text-gray-600 text-sm sm:text-base'>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-lg sm:text-xl font-bold'>
                      ${item.productId.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
