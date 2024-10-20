const HowItWorks = () => (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Open the Youtube Video</h3>
            <p className="text-gray-400">Simply replace youtube with our url.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Analysis</h3>
            <p className="text-gray-400">Our AI processes and analyzes your video content.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Interact & Learn</h3>
            <p className="text-gray-400">Ask questions, get summaries, and gain insights.</p>
          </div>
        </div>
      </div>
    </section>
);

export default HowItWorks;