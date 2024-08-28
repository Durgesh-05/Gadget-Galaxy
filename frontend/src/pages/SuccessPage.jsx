// Example of handling the session ID on the success page
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SuccessPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');

  useEffect(() => {
    // You can use the session ID to fetch details from your backend or display a confirmation
    console.log('Session ID:', sessionId);
  }, [sessionId]);

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Thank you for your purchase! Your payment was successful.</p>
    </div>
  );
};
