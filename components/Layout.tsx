import React from 'react';
import { Menu, Music2, User } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Music2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MINY</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Explore</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Features</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Pricing</a>
            </div>
            <div className="md:hidden flex items-center space-x-4">
              <User className="h-6 w-6 text-gray-700" />
              <Menu className="h-6 w-6 text-gray-700" />
            </div>
          </div>
        </div>
      </nav>
      <main>
        {children}
      </main>
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest from MINY</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800" 
                alt="Blog 1" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">How MINY is Revolutionizing Fan Engagement</h3>
                <p className="text-gray-600 mb-4">Discover how artists are creating unique experiences for their superfans...</p>
                <a href="#" className="text-indigo-600 font-medium hover:text-indigo-700">Read More →</a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=800" 
                alt="Blog 2" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">Success Stories: Artists Using MINY</h3>
                <p className="text-gray-600 mb-4">Learn from artists who have transformed their fan engagement strategy...</p>
                <a href="#" className="text-indigo-600 font-medium hover:text-indigo-700">Read More →</a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800" 
                alt="Blog 3" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">The Future of Digital Fan Communities</h3>
                <p className="text-gray-600 mb-4">Exploring how MINY is shaping the future of artist-fan relationships...</p>
                <a href="#" className="text-indigo-600 font-medium hover:text-indigo-700">Read More →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <Music2 className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">MINY</span>
              </div>
              <p className="mt-4 text-gray-400">Empowering artists to create unforgettable fan experiences.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition">Discord</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MINY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}