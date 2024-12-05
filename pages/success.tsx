// pages/success.tsx
import { useSearchParams } from 'next/navigation'; // Adjust for Next.js, use `next/navigation`
import { CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';

interface PaymentDetails {
  session: any;
  paymentIntent: any;
}

export default function Success() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('status') === 'success';
  const sessionId = searchParams.get('session_id');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

  console.log(paymentDetails);

  const sendConfirmationEmail = async (paymentDetails: any) => {
    const emailHtml = `
      <div style="max-width: 600px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif;">
        <!-- Header with MINY branding -->
        <div style="padding: 32px 24px; background: linear-gradient(to right, #4f46e5, #9333ea); text-align: center; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; font-size: 28px; margin: 0;">Thank You for Your MINY Drop Purchase!</h1>
        </div>
        
        <!-- Main content -->
        <div style="padding: 32px 24px; background: white; border-radius: 0 0 16px 16px; border: 1px solid #e5e7eb;">
          <p style="color: #374151; font-size: 16px; line-height: 24px;">
            Dear ${paymentDetails.session.shipping_details.name},
          </p>
          
          <p style="color: #374151; font-size: 16px; line-height: 24px;">
            Your MINY Drop purchase has been confirmed and processed successfully. We're excited to have you join our creative community!
          </p>

          <!-- Order Details -->
          <div style="background: #f9fafb; padding: 16px; border-radius: 12px; margin: 24px 0;">
            <h2 style="color: #111827; font-size: 18px; margin: 0 0 16px 0;">Order Details</h2>
            <p style="color: #374151; font-size: 14px; margin: 4px 0;">
              <strong>Amount Paid:</strong> $${paymentDetails.paymentIntent.amount / 100}
            </p>
            <p style="color: #374151; font-size: 14px; margin: 4px 0;">
              <strong>Order Type:</strong> ${paymentDetails.paymentIntent.metadata.dropType}
            </p>
            <p style="color: #374151; font-size: 14px; margin: 4px 0;">
              <strong>Quantity:</strong> ${paymentDetails.paymentIntent.metadata.quantity}
            </p>
            <p style="color: #374151; font-size: 14px; margin: 16px 0 4px 0;">
              <strong>Shipping Address:</strong><br>
              ${paymentDetails.session.shipping_details.address.line1}<br>
              ${paymentDetails.session.shipping_details.address.line2 ? paymentDetails.session.shipping_details.address.line2 + '<br>' : ''}
              ${paymentDetails.session.shipping_details.address.city}, ${paymentDetails.session.shipping_details.address.state} ${paymentDetails.session.shipping_details.address.postal_code}<br>
              ${paymentDetails.session.shipping_details.address.country}
            </p>
          </div>

          <!-- Footer -->
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px;">
              Best regards,<br>
              The MINY Team <br>
               <a href="https://minyvinyl.com" style="color: #4f46e5; text-decoration: none;">minyvinyl.com</a>
            </p>
          </div>
        </div>
      </div>
    `;

    try {
      const response = await fetch('https://send-email.alet8891.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: paymentDetails.paymentIntent.receipt_email,
          subject: 'Your MINY Drop Purchase Confirmation',
          html: emailHtml
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Trigger confetti animation if the purchase was successful
    if (isSuccess) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Fetch payment details if session_id is available
    if (sessionId) {
      fetch(`/api/get-payment-details?checkout_session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setPaymentDetails(data);
          // Send confirmation email after getting payment details
          sendConfirmationEmail(data)
            .catch(error => console.error('Error sending confirmation email:', error));
        })
        .catch(error => console.error('Error fetching payment details:', error));
    }
  }, [isSuccess, sessionId]); // Run the effect whenever `isSuccess` changes

  // If not a successful purchase, render nothing
  if (!isSuccess) {
    return null;
  }

  return (
    <div className='min-h-[85vh] justify-center pt-20 flex items-center bg-gradient-to-b from-indigo-50 to-white'>
      <div className='text-center space-y-4 px-4'>
        <div className='flex justify-center'>
          <CheckCircle className='w-16 h-16 text-indigo-500 animate-bounce' />
        </div>
        <h1 className='text-4xl font-bold text-gray-800'>
          Purchase Successful!
        </h1>
        {paymentDetails && (
          <div className='text-left bg-white p-6 rounded-lg shadow-sm'>
            <h2 className='text-2xl font-semibold mb-4'>Order Details</h2>
            <p className='text-gray-600'>
              Order Amount: ${paymentDetails.paymentIntent.amount / 100}
            </p>
            <p className='text-gray-600'>
              Order Status: {paymentDetails.paymentIntent.status}
            </p>
            <p className='text-gray-600'>
              Order Type: {paymentDetails.paymentIntent.metadata.dropType}
            </p>
            <p className='text-gray-600'>
              Quantity: {paymentDetails.paymentIntent.metadata.quantity}
            </p>
           
            {paymentDetails.session.shipping_details && (
              <div className='mt-4'>
                <h3 className='text-xl font-semibold'>Shipping Details</h3>
                <p className='text-gray-600'>
                  {paymentDetails.session.shipping_details.name}
                </p>
                <p className='text-gray-600'>
                  {paymentDetails.session.shipping_details.address.line1}
                </p>
                <p className='text-gray-600'>
                  {paymentDetails.session.shipping_details.address.city}, {paymentDetails.session.shipping_details.address.state} {paymentDetails.session.shipping_details.address.postal_code}
                </p>
                <p className='text-gray-600'>
                  {paymentDetails.session.shipping_details.address.country}
                </p>
              </div>
            )}
          </div>
        )}
        <p className='text-gray-600 text-xl max-w-md'>
          Thank you for your order. Your MINY purchase has been confirmed. A confirmation email has been sent to you. We will update you shortly.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className='mt-6 px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-700 transition-colors'
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}
