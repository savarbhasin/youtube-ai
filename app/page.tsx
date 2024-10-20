import Features from "@/components/features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/how-it-works";

export default function Home() {


  const keepServerAlive = async () => {
    try{
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`)
    } catch(e){
      console.log('Error keeping server alive:', e)
    }
  }

  // This line sets an interval to call the keepServerAlive function every 2 days.
  setInterval(keepServerAlive, 1000 * 60 * 60 * 12 * 2)

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
