import React from 'react';
import { Calendar, Music, ShoppingBag, Heart, Video, Ticket } from 'lucide-react';

const drops = [
  {
    title: 'Exclusive Event Page',
    icon: Calendar,
    description: 'Create immersive event experiences with interactive features like RSVP, countdown timers, and fan walls.',
    features: ['Location & lineup display', 'Dynamic countdown', 'RSVP & rewards', 'Message wall', 'Setlist polls', '3D venue tour'],
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Unreleased Music Launch',
    icon: Music,
    description: 'Build anticipation for your music releases with exclusive previews and interactive fan engagement.',
    features: ['Audio snippets', 'Lyric games', 'Visual timeline', 'Fan voice messages'],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'MINY Holder Merch',
    icon: ShoppingBag,
    description: 'Offer exclusive merchandise with special pricing for MINY holders.',
    features: ['360° product views', 'Exclusive pricing', 'Design voting', 'Community showcase'],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Music Cause Fundraiser',
    icon: Heart,
    description: 'Create impact by connecting your art with meaningful causes.',
    features: ['Cause overview', 'Progress tracking', 'Tiered rewards', 'Social sharing'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Virtual Event Experience',
    icon: Video,
    description: 'Host engaging virtual events with interactive features and exclusive access.',
    features: ['Interactive agenda', 'Fan submissions', 'Digital meet-and-greet', 'Event badges'],
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Festival Ticket Access',
    icon: Ticket,
    description: 'Provide special access to festival tickets with exclusive MINY holder perks.',
    features: ['VIP pricing tiers', 'Festival roadmap', 'Fan groups', 'Accommodation info'],
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800'
  }
];

export const DropOptions: React.FC = () => {
  const scrollToShowcase = () => {
    document.querySelector('#visual-showcase')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Select Your MINY Drop
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drops.map((drop, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl border border-gray-100 hover:border-indigo-500 transition-all duration-300">
              <div className="absolute inset-0">
                <img
                  src={drop.image}
                  alt={drop.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              </div>
              <div className="relative p-6 h-full flex flex-col justify-end">
                <drop.icon className="h-8 w-8 text-indigo-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{drop.title}</h3>
                <p className="text-gray-300 mb-4">{drop.description}</p>
                <ul className="space-y-2">
                  {drop.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={scrollToShowcase}
                  className="mt-6 w-full py-3 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white font-semibold transition"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}