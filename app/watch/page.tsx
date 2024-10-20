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
      {videoId === null ? <div>Video not found</div> : <VideoChatSummary videoId={videoId} />}
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