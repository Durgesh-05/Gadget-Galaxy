import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import Stripe from 'stripe';

const handleCreatePaymentSession = asyncHandler(async (req, res) => {
  const { products } = req.body;
  const lineItems = products.map((product) => {
    const productPrice = Math.round(product.price - (product.price * 20) / 100);
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: product.productName,
        },
        unit_amount: productPrice * 100,
      },
      quantity: product.quantity,
    };
  });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `https://gadget-galaxy-psi.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://gadget-galaxy-mbwk.onrender.com/api/v1/payment/cancel`,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { sessionId: session.id },
          'Session Id of Stripe Gateway'
        )
      );
  } catch (error) {
    console.error('Failed to create Stipe Session ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

export { handleCreatePaymentSession };
