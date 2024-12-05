import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const runtime = 'edge';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(req.url);
  const checkout_session_id = url.searchParams.get('checkout_session_id');

  if (!checkout_session_id) {
    return new Response(JSON.stringify({ error: 'Invalid or missing checkout_session_id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(checkout_session_id);
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);
    
    return new Response(JSON.stringify({ session, paymentIntent }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error retrieving payment details:', error);
    return new Response(JSON.stringify({ error: 'Error retrieving payment details' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 