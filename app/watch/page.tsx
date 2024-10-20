'use client'
import React from 'react';
import { VideoChatSummary } from '@/components/VideoSummary';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';


const VidComponent = ()=>{
  const searchParams = useSearchParams()
 
  const videoId = searchParams.get('v');
  
  return (
    <>
      {videoId === null ? 
      <div className='min-h-screen text-7xl py-[7rem] bg-gray-900 text-gray-100 font-heading flex flex-col justify-center items-center'>
        Video not found
      </div> : <VideoChatSummary videoId={videoId} />}
    </>
  )
}

const Page = () => {
  
  return (
    <Suspense>
      
      <VidComponent />
          
        
    </Suspense>
    
  );
};

export default Page;