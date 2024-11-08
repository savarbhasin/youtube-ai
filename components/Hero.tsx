'use client';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useState } from 'react';

const Hero = () => {
  const [url, setUrl] = useState('');
  const router = useRouter();
  const handleUrlChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h1 className="text-5xl sm:text-7xl font-extrabold font-heading text-white mb-6 tracking-tight">
          Unlock the Power of Your Videos with AI
        </h1>

        {/* Subheading */}
        <p className="text-xl font-heading sm:text-2xl text-gray-200 mb-10">
          Analyze, understand, and interact with your video content like never before.
        </p>

        {/* CTA Button */}
        <a
          href='https://www.youtube.com'
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-5 sm:px-10 rounded-full text-lg inline-flex items-center shadow-lg transform hover:scale-105 transition-transform"
        >
          Simply replace{' '}
          <span className="bg-gradient-to-r px-3 py-2 from-purple-500 to-pink-500 mx-2 sm:mx-5">youtube.com</span>{' '}
          with <span className="mx-2 sm:mx-5 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500">youtube.savarbhasin.tech</span> while watching a video
          <ArrowRight className="ml-2" />
        </a>

        <div className="mt-10 text-white text-center text-xl">
          Alternatively, enter URL below
          <div className="flex flex-col md:flex-row gap-2 justify-center items-center mt-4">
            <input
              onChange={handleUrlChange}
              type="text"
              className="outline-none mt-2 mb-2 px-4 py-2 w-full max-w-xs md:max-w-md rounded-lg border border-gray-300 bg-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block"
              placeholder="Enter URL here"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                const modifiedUrl = url.replace('youtube.com', 'youtube.savarbhasin.tech');
                router.push(modifiedUrl);
              }}
              className="mt-2 mb-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-bold text-sm focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 hover:bg-blue-600 transition duration-150 ease-in-out"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
