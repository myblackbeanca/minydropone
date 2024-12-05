import React from 'react';
import { ArrowRight, Sparkles, Music2, User } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSlider = () => {
    document.querySelector('#miny-slider')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Launch Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              MINY Journey
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Craft meaningful experiences, reach super-fans, and bring your artistry to life with MINY Drops.
          </p>
          <div className="mt-10">
            <button 
              onClick={scrollToSlider}
              className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition"
            >
              Start Your Drop Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
              <Sparkles className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Exclusive Events</h3>
              <p className="mt-2 text-gray-600">Create immersive experiences that bring fans closer to your art.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
              <Music2 className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Music Launches</h3>
              <p className="mt-2 text-gray-600">Build anticipation for your releases with interactive teasers.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
              <User className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Fan Community</h3>
              <p className="mt-2 text-gray-600">Foster meaningful connections with your most dedicated supporters.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}