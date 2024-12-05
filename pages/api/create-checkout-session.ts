import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface CreateCheckoutSessionBody {
  origin: string;
  dropType: string;
  DesignUrl: string;
  couponCode: string;
  DesignFee: boolean;
  quantity: number;
}

export const runtime = 'edge';

export default async function POST(request: Request): Promise<Response> {
  console.log('Request method:', request.method);
  
  try {
    // Parse the request body as JSON
    const body: CreateCheckoutSessionBody = await request.json();
    const { origin, dropType, DesignUrl, DesignFee, quantity, couponCode } = body;

    // Define coupon discounts with a specific type
    const couponDiscounts: { [key in 'COOL10' | 'SUPER25' | 'BIG50' | 'MEGA70' | 'ULTIMATE80']: number } = {
      COOL10: 10,
      SUPER25: 25,
      BIG50: 50,
      MEGA70: 70,
      ULTIMATE80: 80,
    };

    // Ensure quantity is a valid number within specified limits
    const numQuantity = Number(quantity);
    if (isNaN(numQuantity) || numQuantity < 20 || numQuantity > 1000) {
      console.log('Invalid quantity provided');
      return new Response(JSON.stringify({ error: 'Invalid quantity' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Calculate price and amount
    const pricePerUnit = 4.99;
    const originalAmount = Math.round(numQuantity * pricePerUnit * 100); // Amount in cents
    let finalAmount = originalAmount;

    // Add design fee if applicable
    if (DesignFee) {
      finalAmount += 100000; // Additional $1000 in cents
    }

    // Create a new customer
    const customer = await stripe.customers.create();

    // Initialize couponId
    let couponId: string | null = null;

    // Handle coupon validation and creation
    if (couponCode && couponDiscounts[couponCode as keyof typeof couponDiscounts]) {
      try {
        // Check for existing coupon or create a new one
        const existingCoupons = await stripe.coupons.list({ limit: 100 });
        const existingCoupon = existingCoupons.data.find(
          coupon => coupon.id === couponCode
        );

        if (existingCoupon) {
          couponId = existingCoupon.id;
        } else {
          const newCoupon = await stripe.coupons.create({
            percent_off: couponDiscounts[couponCode as keyof typeof couponDiscounts],
            duration: 'once',
            id: couponCode,
          });
          couponId = newCoupon.id;
        }
      } catch (error) {
        console.error('Error checking or creating coupon:', error);
        return new Response(
          JSON.stringify({ error: 'Error checking or creating coupon.' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Set up product details for checkout session
    const productName = `MINY Drop Order for ${dropType}`;
    const productDescription = `${numQuantity} MINYs @ $4.99 each for ${dropType}${
      DesignFee ? ' - Design Fee Included ($1000.00)' : ''
    }`;

    // Create the checkout session with discount if coupon is applied
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: finalAmount,
            product_data: {
              name: productName,
              description: productDescription,
              images: ['https://minyfy.subwaymusician.xyz/9.png'],
              metadata: {
                dropType,
                quantity: numQuantity,
                DesignFee: DesignFee ? 'Included' : 'Not Included',
                DesignUrl,
              },
            },
          },
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: origin,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'JP'],
      },
      payment_intent_data: {
        metadata: {
          order_name: productName,
          dropType,
          quantity: numQuantity,
          DesignFee: DesignFee ? 'Included' : 'Not Included',
          DesignUrl,
        },
      },
      ...(couponId && {
        discounts: [{ coupon: couponId }],
      }),
    });

    // Return session URL as response
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: (error as any).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
