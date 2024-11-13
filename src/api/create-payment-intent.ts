import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51PECm7I38Ba0SBvHrguPAAdVdurKWdwXurP1cAntoe3r7snXxDNc0TWFK4pVKnct8G95dAfMzKwE0NKW87UgT3wf00JVDsbNTl', {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const { amount, quantity, designFee } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        quantity,
        designFee: designFee ? 'yes' : 'no',
      },
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create payment intent' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}