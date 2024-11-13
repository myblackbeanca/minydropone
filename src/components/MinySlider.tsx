import React, { useState } from 'react';
import { Upload, DollarSign, Calculator, Info } from 'lucide-react';

declare const Stripe: any;

const stripe = Stripe('pk_test_51PECm7I38Ba0SBvH8MDMi6GjUJoVklJgilsuRMnEDAi9at26QelrjNnQJU46TUH9qUTzcZTE8eAsRgylCuZRQtn900aAlx25tp');

const dropTypes = [
  'Exclusive Event Page',
  'Unreleased Music Launch',
  'MINY Holder Merch',
  'Music Cause Fundraiser',
  'Virtual Event Experience',
  'Festival Ticket Access'
];

interface MinySliderProps {
  selectedDropType: string;
}

export const MinySlider: React.FC<MinySliderProps> = ({ selectedDropType }) => {
  const [quantity, setQuantity] = useState(20);
  const [designFee, setDesignFee] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dropType, setDropType] = useState(selectedDropType);

  // Update dropType when selectedDropType changes
  React.useEffect(() => {
    if (selectedDropType) {
      setDropType(selectedDropType);
    }
  }, [selectedDropType]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const totalCost = (quantity * 4.99) + (designFee ? 1000 : 0);

  const handlePayment = async () => {
    if (!dropType) {
      alert('Please select a MINY drop type');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(totalCost * 100),
          quantity,
          designFee,
          dropType
        }),
      });

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: await stripe.elements().create('card'),
          billing_details: {
            name: 'MINY Customer',
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      alert('Payment successful! Your MINY drop will be processed.');
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="miny-slider" className="py-16 bg-gradient-to-br from-indigo-100 via-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your MINY Investment
          </h2>
          <p className="text-xl text-gray-600">
            Create your unique MINY drop and set your investment parameters
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-indigo-100">
          <div className="space-y-8">
            <div className="group relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Select MINY Drop Type
                <div className="relative ml-2">
                  <Info className="h-4 w-4 text-gray-400" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    Choose the type of experience you want to create for your fans
                  </div>
                </div>
              </label>
              <select
                value={dropType}
                onChange={(e) => setDropType(e.target.value)}
                className="mt-1 block w-full rounded-xl border-2 border-indigo-100 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
                required
              >
                <option value="">Choose a drop type...</option>
                {dropTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="group relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Upload MINY Design
                <div className="relative ml-2">
                  <Info className="h-4 w-4 text-gray-400" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    PNG or PDF format, 2" hexagon shape required
                  </div>
                </div>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-indigo-100 border-dashed rounded-xl hover:border-indigo-500 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-indigo-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".png,.pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG or PDF up to 10MB</p>
                </div>
              </div>
              {file && (
                <p className="mt-2 text-sm text-indigo-600">
                  Selected file: {file.name}
                </p>
              )}
            </div>

            <div className="group relative">
              <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={designFee}
                  onChange={(e) => setDesignFee(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span>Add design fee ($1,000)</span>
                <div className="relative">
                  <Info className="h-4 w-4 text-gray-400" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    Professional design service for your MINY
                  </div>
                </div>
              </label>
            </div>

            <div className="group relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Quantity (20-1,000)
                <div className="relative ml-2">
                  <Info className="h-4 w-4 text-gray-400" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    Choose how many MINYs you want to create
                  </div>
                </div>
              </label>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="range"
                  min="20"
                  max="1000"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  min="20"
                  max="1000"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-24 px-3 py-2 border-2 border-indigo-100 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="flex items-center">
                  <Calculator className="h-6 w-6 mr-2 text-indigo-600" />
                  Total Investment
                </span>
                <span className="flex items-center text-indigo-600 text-xl">
                  <DollarSign className="h-6 w-6" />
                  {totalCost.toFixed(2)}
                </span>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Investment breakdown:</p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mr-2" />
                    {quantity} MINYs @ $4.99 each: ${(quantity * 4.99).toFixed(2)}
                  </li>
                  {designFee && (
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mr-2" />
                      Design fee: $1,000.00
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              disabled={loading || !file || !dropType}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] ${
                loading || !file || !dropType
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg'
              }`}
            >
              {loading ? 'Processing...' : 'Go Live with Your MINY'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}