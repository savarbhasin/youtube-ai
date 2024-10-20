'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => (
  <div className="relative min-h-screen overflow-hidden flex items-center">
    {/* Animated Background Gradient */}
    {/* <motion.div
      className="absolute inset-0 bg-gradient-to-tl from-purple-500 to-pink-400 opacity-25 blur-3xl"
    /> */}

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* Heading */}
      <h1
        className="text-5xl sm:text-7xl font-extrabold font-heading text-white mb-6 tracking-tight"
      >
        Unlock the Power of Your Videos with AI
      </h1>

      {/* Subheading */}
      <p
        className="text-xl font-heading sm:text-2xl text-gray-200 mb-10"
      >
        Analyze, understand, and interact with your video content like never before.
      </p>

      {/* CTA Button */}
      <button
        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-full text-lg inline-flex items-center shadow-lg transform hover:scale-105 transition-transform"
      >
        Get Started
        <ArrowRight className="ml-2" />
      </button>
    </div>

   
  </div>
);

export default Hero;
