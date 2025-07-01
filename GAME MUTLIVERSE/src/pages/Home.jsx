import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const games = [
    {
      id: 'car-game',
      name: 'Car Racing',
      description: 'High-speed racing action with stunning graphics and smooth controls.',
      path: '/games/car-game',
      category: 'action',
      icon: '🏎️'
    },
    {
      id: 'quiz-game',
      name: 'Quiz Challenge',
      description: 'Test your knowledge with our interactive quiz game featuring multiple categories.',
      path: '/games/quiz-game',
      category: 'puzzle',
      icon: '🧠'
    },
    {
      id: 'rock-paper-scissor',
      name: 'Rock Paper Scissors',
      description: 'Classic game with a modern twist. Challenge the AI or play with friends!',
      path: '/games/rock-paper-scissor',
      category: 'casual',
      icon: '✂️'
    },
    {
      id: 'snake',
      name: 'Snake Game',
      description: 'The timeless classic. Grow your snake and avoid the walls!',
      path: '/games/snake',
      category: 'arcade',
      icon: '🐍'
    },
    {
      id: 'space-war',
      name: 'Space War',
      description: 'Epic space battles with multiple enemies and power-ups.',
      path: '/games/space-war',
      category: 'action',
      icon: '🚀'
    },
    {
      id: 'tic-tac-toe',
      name: 'Tic Tac Toe',
      description: 'Strategic gameplay with AI opponent. Can you beat the computer?',
      path: '/games/tic-tac-toe',
      category: 'puzzle',
      icon: '⭕'
    },
    {
      id: 'guess-number',
      name: 'Guess Number',
      description: 'Test your intuition and logic in this number guessing game.',
      path: '/games/guess-number',
      category: 'puzzle',
      icon: '🎯'
    },
    {
      id: 'lottery',
      name: 'Web3 Lottery',
      description: 'Blockchain-powered lottery game with real rewards and transparency.',
      path: '/games/lottery',
      category: 'web3',
      icon: '🎰'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative">
      <motion.section 
        style={{ y, opacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,198,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,122,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-bold mb-6 font-orbitron"
            >
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-500 bg-clip-text text-transparent">
                GAME
              </span>
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                MULTIVERSE
              </span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover a universe of games where every click opens a new adventure. 
              From classic arcade games to cutting-edge Web3 experiences.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#games"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-pink-600 transition-all duration-300 neon-glow hover:neon-glow-pink text-lg"
              >
                Explore Games
              </a>
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <section id="games" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4 font-orbitron">
              <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                Game Collection
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose from our diverse collection of games, each offering a unique experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group"
              >
                <Link to={game.path}>
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-cyan-400 transition-all duration-300 neon-glow group-hover:neon-glow-pink">
                    <div className="text-4xl mb-4">{game.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                      {game.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {game.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        game.category === 'web3' ? 'bg-purple-500/20 text-purple-400' :
                        game.category === 'action' ? 'bg-red-500/20 text-red-400' :
                        game.category === 'puzzle' ? 'bg-blue-500/20 text-blue-400' :
                        game.category === 'casual' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {game.category.toUpperCase()}
                      </span>
                      <span className="text-cyan-400 font-semibold group-hover:text-pink-400 transition-colors">
                        Play Now →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="web3-games" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4 font-orbitron">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Web3 Games
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience blockchain-powered gaming with real rewards and NFT assets
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group"
            >
              <Link to="/games/lottery">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-800 hover:border-cyan-400 transition-all duration-300 neon-glow group-hover:neon-glow-pink">
                  <div className="text-4xl mb-4">🎰</div>
                  <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                    Blockchain Lottery
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Enter the decentralized lottery and win real crypto rewards!
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400">
                      WEB3
                    </span>
                    <span className="text-cyan-400 font-semibold group-hover:text-pink-400 transition-colors">
                      Play Now →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div> 
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group"
            >
              <Link to="/games/avax-racing">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-800 hover:border-cyan-400 transition-all duration-300 neon-glow group-hover:neon-glow-pink">
                  <div className="text-4xl mb-4">🏎️</div>
                  <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                    AVAX Nitro Racers
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Mint, race, and own NFT cars on the blockchain. Fuel the chain!
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400">
                      WEB3
                    </span>
                    <span className="text-cyan-400 font-semibold group-hover:text-pink-400 transition-colors">
                      Play Now →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 