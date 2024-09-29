import axios from 'axios';
import { useAuth } from './context/AuthContext';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET);

export const url = 'https://gadget-galaxy-mbwk.onrender.com';
// export const url = 'http://localhost:8000';

export const initCartObject = (
  productId,
  productName,
  productImage,
  productPrice,
  count = 1
) => {
  return {
    productId,
    productName,
    productImage,
    productPrice,
    count,
  };
};

export const initialCategories = {
  TV: {
    description: 'Latest range of high-definition televisions.',
    imageUrl:
      'https://img.freepik.com/free-photo/smart-tv-screen-with-copy-space-wooden-table_53876-102019.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid',
    products: [],
  },
  'Home Appliances': {
    description: 'Essential home appliances for everyday convenience.',
    imageUrl:
      'https://img.freepik.com/free-vector/household-appliances-realistic-composition_1284-65307.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid',
    products: [],
  },
  'Computing Devices': {
    description: 'Powerful computing devices for work and play.',
    imageUrl:
      'https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid',
    products: [],
  },
  'Audio Devices': {
    description: 'High-quality audio devices for immersive sound.',
    imageUrl:
      'https://img.freepik.com/free-photo/modern-wireless-earphones-with-case-displayed-round-podium-with-soft-shadows_23-2150808014.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid',
    products: [],
  },
  'Gaming Devices': {
    description: 'Top-of-the-line gaming devices for ultimate entertainment.',
    imageUrl:
      'https://img.freepik.com/free-photo/view-3d-vr-gaming-set_23-2151005781.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid',
    products: [],
  },
};

export const fetchProfileData = async (token) => {
  try {
    const res = await axios.get(`${url}/api/v1/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = res.data;
    return data;
  } catch (e) {
    console.error('Failed to fetch profile Error: ', e);
    return null;
  }
};

export const handleCashOnDelivery = async (
  productInCart,
  totalAmount,
  navigate,
  setProductInCart,
  token
) => {
  const orderItem = getOrderItem(productInCart);
  const orderObject = {
    orderPrice: totalAmount,
    orderItem,
  };

  try {
    const profileData = await fetchProfileData(token);
    if (profileData.address.trim() === '') {
      toast.warning('Update Address Details', { autoClose: 1000 });
    }

    const res = await axios.post(`${url}/api/v1/order`, orderObject, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 201) {
      toast.success('Congratulations! Order Created', { autoClose: 1000 });
      setProductInCart([]);
      navigate('/order');
    }
  } catch (e) {
    console.error('Failed to Create Order Error ', e);
    toast.error(e);
  }
};

export const handleCheckout = async (productInCart) => {
  const products = productInCart.map((product) => {
    const { productName, productPrice, count, productId } = product;
    return { productName, price: productPrice, quantity: count, productId };
  });
  try {
    const response = await axios.post(`${url}/api/v1/payment/session`, {
      products,
    });
    const { sessionId } = response.data.data;

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      toast.error('Failed to redirect to Stripe checkout');
      console.error('Stripe checkout error:', error);
    }
  } catch (error) {
    toast.error('Failed to initiate payment');
    console.error('Checkout error:', error);
  }
};

export const getTotalAmount = (productInCart) => {
  const subtotal = productInCart.reduce(
    (total, product) => total + product.productPrice * product.count,
    0
  );
  const shipping = 10.0;
  const discount = (subtotal * 20) / 100; // 20% fixed Discount
  const total = subtotal + shipping - discount;
  return total;
};

export const getOrderItem = (productInCart) => {
  return productInCart.map((product) => {
    const { productId, count } = product;
    return { productId, quantity: count };
  });
};
