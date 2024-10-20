import Features from "@/components/features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/how-it-works";

export default function Home() {
  return (
    <div className="bg-gradient-to-br font-heading from-gray-600 to-gray-800 min-h-screen relative overflow-hidden">
      {/* Global Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tl from-purple-500 to-pink-400 opacity-25 blur-3xl" />
      
      {/* Content Sections */}
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
}
