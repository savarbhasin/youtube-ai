'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatSection from './ChatSection';
import ReactMarkdown from 'react-markdown';

const Shimmer = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-700 ${className}`}></div>
);

export function VideoChatSummary({ videoId }: { videoId: string }) {
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState<{
    title: string;
    description: string;
    summary: string;
  }>();
  const prevVideoIdRef = useRef<string | null>(null);

  const fetchSummary = useCallback(async () => {
    if (prevVideoIdRef.current === videoId) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/${videoId}`);
      const { summary, title, description } = await res.json();
      setVideoData({ summary, title, description });
    } catch (error) {
      console.error('Error fetching video summary:', error);
      setVideoData({
        summary: 'Error fetching video summary. Please try again later.',
        title: 'Error',
        description: 'Couldn\'t fetch video data. Please try again later.',
      });
    } finally {
      setLoading(false);
      prevVideoIdRef.current = videoId;
    }
  }, [videoId]);

  useEffect(() => {
    if (prevVideoIdRef.current !== videoId) {
      fetchSummary();
    }
    prevVideoIdRef.current = videoId;
  }, [fetchSummary, videoId]);

  return (
    <div className="flex flex-col min-h-screen py-[7rem] bg-gray-900 text-gray-100 font-sans">
      <main className="flex-1 p-6 grid grid-cols-3 gap-6 px-4 md:px-8 lg:px-16">
        <div className="col-span-3 lg:col-span-2 space-y-6">
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full object-cover"
              src={`https://youtube.com/embed/${videoId}`}
              allowFullScreen
            />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            {loading ? (
              <>
                <Shimmer className="h-8 w-3/4 mb-2 rounded" />
                <Shimmer className="h-4 w-full mb-2 rounded" />
                <Shimmer className="h-4 w-2/3 rounded" />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2 font-heading">{videoData?.title}</h2>
                <p className="text-gray-400 mb-4 font-body">
                  {videoData?.description?.slice(0, 200)}{videoData?.description && videoData?.description?.length > 200 && '...'}
                </p>
              </>
            )}
          </div>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white font-heading">Video Summary</CardTitle>
              <CardDescription className="text-gray-400">AI-generated summary of the video content</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Shimmer className="h-4 w-full mb-2 rounded" />
                  <Shimmer className="h-4 w-5/6 mb-2 rounded" />
                  <Shimmer className="h-4 w-4/5 mb-2 rounded" />
                  <Shimmer className="h-4 w-full mb-2 rounded" />
                  <Shimmer className="h-4 w-3/4 rounded" />
                </>
              ) : (
                videoData?.summary && (
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown className={'markdown'}>{videoData.summary}</ReactMarkdown>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3 lg:col-span-1 h-full">
          <ChatSection videoId={videoId} />
        </div>
      </main>
    </div>
  );
}