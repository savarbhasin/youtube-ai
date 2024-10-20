'use client';
import React from 'react';

const Navbar = () => (
  <nav className="fixed font-heading f top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-blue-500 to-indigo-600 bg-opacity-90 backdrop-blur-sm rounded-full px-8 py-3 shadow-lg">
    <div className="max-w-7xl mx-auto gap-[200px] flex items-center justify-between h-10">
      <div className="flex items-center">
          <a href='/'>
          <span className="text-white text-xl font">VideoAI</span>
          </a>
      </div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          <a href="/#features" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Features
          </a>
          <a href="/#how-it-works" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            How It Works
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
