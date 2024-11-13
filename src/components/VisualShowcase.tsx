import React from 'react';
import { Play, ExternalLink } from 'lucide-react';

const showcaseItems = [
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800',
    title: 'Fan Reactions'
  },
  {
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800',
    title: 'Unboxing Experience'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=800',
    title: 'Live Events'
  },
  {
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    title: 'Artist Stories'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800',
    title: 'Community Moments'
  }
];

export const VisualShowcase: React.FC = () => {
  return (
    <div id="visual-showcase" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            See MINY in Action
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Get inspired by the excitement of MINY. Explore unboxings, fan reactions, and artist highlights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg aspect-video"
            >
              <img
                src={item.type === 'video' ? item.thumbnail : item.url}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                {item.type === 'video' ? (
                  <button className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                    <Play className="h-8 w-8 text-white" />
                  </button>
                ) : (
                  <button className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                    <ExternalLink className="h-8 w-8 text-white" />
                  </button>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 text-lg font-semibold text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition">
            View Gallery
            <ExternalLink className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}