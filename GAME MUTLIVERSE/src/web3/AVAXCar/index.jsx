import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAVBAR_HEIGHT = 64;

const AVAXCarGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col overflow-hidden" style={{ minHeight: '100vh', height: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 relative z-20"
        style={{ height: NAVBAR_HEIGHT, minHeight: NAVBAR_HEIGHT, display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between' }}
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-orbitron">
            AVAX Nitro Racers
          </h1>
          <p className="text-gray-400 text-xs md:text-sm">
            Blockchain-powered racing game
          </p>
        </div>
        <Link
          to="/"
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-pink-600 transition-all duration-300 neon-glow hover:neon-glow-pink text-sm md:text-base"
        >
          ← Back to Games
        </Link>
      </motion.div>
      <div className="flex-grow relative overflow-hidden z-10" style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-cyan-400 font-semibold">Loading AVAX Nitro Racers...</p>
            </div>
          </div>
        )}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-center">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-white mb-2">Game Load Error</h3>
              <p className="text-gray-400 mb-4">
                Unable to load the game. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Reload Game
              </button>
            </div>
          </div>
        )}
        <iframe
          src="/games/avax-car/AVAXCar.html"
          title="AVAX Nitro Racers"
          className="w-full h-full border-0"
          style={{ display: 'block', width: '100%', height: '100%', minHeight: 0, minWidth: 0, overflow: 'hidden' }}
          onLoad={() => setIsLoading(false)}
          onError={() => { setIsLoading(false); setHasError(true); }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        />
      </div>
    </div>
  );
};

export default AVAXCarGame; 