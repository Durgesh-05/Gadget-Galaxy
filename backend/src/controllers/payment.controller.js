import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { stripe } from '../constant.js';

const handleCreatePaymentSession = asyncHandler(async (req, res) => {
  const { products } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.productName,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:8000/api/v1/payment/success`,
      cancel_url: `http://localhost:8000/api/v1/payment/success`,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, session.id, 'Session Id of Stripe Gateway'));
  } catch (error) {
    console.error('Failed to create Stipe Session ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

export { handleCreatePaymentSession };
