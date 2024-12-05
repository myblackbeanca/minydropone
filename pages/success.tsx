// pages/success.tsx
import { useSearchParams } from 'next/navigation'; // Adjust for Next.js, use `next/navigation`
import { CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export default function Success() {
  // Get search params from the URL
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('status') === 'success'; // Check if 'status' is 'success'

  useEffect(() => {
    if (isSuccess) {
      // Trigger confetti animation if the purchase was successful
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isSuccess]); // Run the effect whenever `isSuccess` changes

  // If not a successful purchase, render nothing
  if (!isSuccess) {
    return null;
  }

  return (
    <div className='min-h-[85vh] justify-center flex items-center bg-gradient-to-b from-indigo-50 to-white'>
      <div className='text-center space-y-4 px-4'>
        <div className='flex justify-center'>
          <CheckCircle className='w-16 h-16 text-indigo-500 animate-bounce' />
        </div>
        <h1 className='text-4xl font-bold text-gray-800'>
          Purchase Successful!
        </h1>
        <p className='text-gray-600 text-xl max-w-md'>
          Thank you for your order. Your MINY purchase has been confirmed. We will update you shortly.
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
