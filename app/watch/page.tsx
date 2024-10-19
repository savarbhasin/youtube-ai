'use client'
import React from 'react';
import { VideoChatSummary } from '@/components/VideoSummary';
import { useSearchParams } from 'next/navigation';
const Page = () => {
  const searchParams = useSearchParams()
 
  const videoId = searchParams.get('v');
  return (
    <>
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
    </>
    
  );
};

export default Page;