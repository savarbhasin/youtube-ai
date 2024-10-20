import React, { useState, useCallback, useRef, useEffect } from 'react';
import { CardTitle, Card, CardContent, CardDescription, CardHeader } from './ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import ReactMarkdown from 'react-markdown';

const ChatSection = ({ videoId }: { videoId: string }) => {
  const [messages, setMessages] = useState<{ user: string; content: string }[]>([
    { user: 'AI', content: 'Hello! I\'m here to answer any questions you have about the video. What would you like to know?' },
  ]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [latestResponse, setLatestResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, latestResponse]);
  const receiveAIResponse = async (question: string) => {
    setLoading(true);
    let conversation_id = conversationId;

    try {
      if (!conversation_id) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/start-conversation`);
        const { conversation_id: newConversationId } = await res.json();
        setConversationId(newConversationId);
        conversation_id = newConversationId;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id,
          question,
          video_id: videoId,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.body) {
        throw new Error('Response body is undefined');
      }
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      let responseText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const lines = value.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonData = line.slice(5).trim();
              if (jsonData) {
                const data = JSON.parse(jsonData);
                if (data.content) {
                  responseText += data.content;
                  setLatestResponse(responseText);
                }
              }
            } catch (error) {
              console.error('Error parsing JSON:', error, 'Raw data:', line.slice(5));
            }
          }
        }
      }
      setMessages((prev) => [...prev, { user: 'AI', content: responseText }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLatestResponse('');
      setLoading(false);
    }
  };

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, { user: 'You', content: newMessage.trim() }]);
      setNewMessage('');
      receiveAIResponse(newMessage.trim());
    }
  }, [newMessage, receiveAIResponse]);

  return (
    <Card className="flex flex-col h-[550px] bg-gray-900 text-white border-gray-700">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg font-semibold text-gray-100">AI Video Assistant</CardTitle>
        <CardDescription className="text-sm text-gray-400">Ask questions about the video content</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden ">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-4 mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.user === 'You' ? 'text-right' : 'text-left'}`}>
              <div className="font-semibold text-sm">{message.user}</div>
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.user === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {latestResponse !== '' && (
            <div className="mb-4 text-left">
              <div className="font-semibold text-sm">AI</div>
              <div className="inline-block p-3 rounded-lg bg-gray-800 text-gray-300">
                <ReactMarkdown>{latestResponse}</ReactMarkdown>
              </div>
            </div>
          )}
          {loading && <div className="text-sm text-gray-500 italic">AI is thinking...</div>}
        </div>
        <div className="flex items-center mt-auto">
          <Input
            placeholder="Ask a question about the video..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 mr-2 bg-gray-700 text-white border-gray-600"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={loading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatSection;
