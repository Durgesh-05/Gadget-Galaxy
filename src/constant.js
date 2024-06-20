import Stripe from 'stripe';

export const roles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
