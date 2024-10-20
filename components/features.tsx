import React from 'react';
import { Video, Brain, MessageCircle } from 'lucide-react';

const Feature = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
    <div className="text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 font-poppins font-light">{description}</p>
  </div>
);

const Features = () => (
  <section id="features" className="py-20 ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-white mb-12 text-center">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Feature
          icon={<Video size={40} />}
          title="Intelligent Video Analysis"
          description="Our AI analyzes your videos to extract key information, topics, and insights."
        />
        <Feature
          icon={<Brain size={40} />}
          title="Smart Summarization"
          description="Get concise summaries of your video content, saving you time and effort."
        />
        <Feature
          icon={<MessageCircle size={40} />}
          title="Interactive Q&A"
          description="Ask questions about your video and get instant, accurate answers from our AI."
        />
      </div>
    </div>
  </section>
);

export default Features;
