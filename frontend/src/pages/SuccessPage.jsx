import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { getOrderItem, getTotalAmount, url } from '../utils';
import { toast } from 'react-toastify';
import axios from 'axios';

export const SuccessPage = () => {
  const location = useLocation();
  const { productInCart, setProductInCart } = useContext(CartContext);
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId && productInCart.length > 0) {
      console.log('Session ID:', sessionId);
      console.log('Creating order.....');

      const createOrderOnSuccess = async () => {
        const orderItem = getOrderItem(productInCart);
        const totalAmount = getTotalAmount(productInCart);
        const orderObject = {
          orderPrice: totalAmount,
          orderItem,
          paymentType: 'ONLINE',
          paymentStatus: 'PAID',
        };

        try {
          const res = await axios.post(`${url}/api/v1/order`, orderObject, {
            withCredentials: true,
          });
          if (res.status === 201) {
            console.log('Online order created');
            console.log(res.data);

            toast.success('Congratulations! Payment Success & Order Created', {
              autoClose: 1000,
            });
            setProductInCart([]);
          }
        } catch (e) {
          console.error('Failed to Create Order Error ', e);
          toast.error(e.message || 'Order creation failed');
        }
      };

      createOrderOnSuccess();
    }
  }, [sessionId, productInCart]);

  const handleHomeClick = () => {
    navigate('/', { replace: true });
  };

  const handleOrderClick = () => {
    navigate('/order', { replace: true });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='flex flex-col items-center bg-white shadow-lg rounded-lg p-8'>
        <CheckCircle className='text-green-500 w-16 h-16 mb-4' />
        <h1 className='text-2xl font-semibold mb-2'>Payment Successful</h1>
        <p className='text-lg text-gray-700 mb-6'>
          Your payment has been cleared successfully!
        </p>
        <div className='flex space-x-4'>
          <button
            onClick={handleHomeClick}
            className='bg-gray-950 text-white py-2 px-4 rounded-lg hover:bg-gray-800'
          >
            Move to Homepage
          </button>
          <button
            onClick={handleOrderClick}
            className='bg-gray-950 text-white py-2 px-4 rounded-lg hover:bg-gray-800'
          >
            Move to Order Page
          </button>
        </div>
      </div>
    </div>
  );
};
