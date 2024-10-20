'use client'
import React from 'react';
import { VideoChatSummary } from '@/components/VideoSummary';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const Fallback = () =>{
  return (
    <div>
            <h1 className="text-3xl font-semibold text-gray-900">No video found</h1>
            <p className="text-gray-700">Please enter the correct query parameters.</p>
      </div>
  )
}

const Page = () => {
  const searchParams = useSearchParams()
 
  const videoId = searchParams.get('v');
  return (
    <Suspense fallback={<Fallback/>}>
      
      {
        videoId ? (
          <div>
            <VideoChatSummary videoId={videoId} />
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">No video found</h1>
            <p className="text-gray-700">Please enter the correct query parameters.</p>
          </div>
        )
      }
    </Suspense>
    
  );
};

export default Page;