import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { checkout_session_id } = req.query;

  if (!checkout_session_id || typeof checkout_session_id !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing checkout_session_id' });
  }

  try {
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(checkout_session_id);

    // Retrieve the payment intent details
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);
    // Return the session and payment intent details
    return res.status(200).json({ session, paymentIntent });
  } catch (error) {
    console.error('Error retrieving payment details:', error);
    return res.status(500).json({ error: 'Error retrieving payment details' });
  }
} 