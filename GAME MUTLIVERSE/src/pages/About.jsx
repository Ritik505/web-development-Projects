import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-orbitron">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              About
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Game Multiverse
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're passionate about creating an immersive gaming experience that brings together 
            classic games and cutting-edge Web3 technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 font-orbitron">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Game Multiverse is dedicated to providing a seamless gaming platform that combines 
                the nostalgia of classic games with the innovation of blockchain technology. 
                We believe in making gaming accessible, secure, and rewarding for everyone.
              </p>
              <p className="text-lg text-gray-300">
                Our platform features a diverse collection of games, from timeless classics 
                like Snake and Tic Tac Toe to modern Web3 experiences with real rewards.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 neon-glow">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-4">Vision</h3>
              <p className="text-gray-300">
                To become the leading platform for both traditional and Web3 gaming, 
                creating a bridge between classic gaming experiences and the future of decentralized entertainment.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-orbitron">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              What We Offer
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎮',
                title: 'Classic Games',
                description: 'Timeless favorites like Snake, Tic Tac Toe, and Space War'
              },
              {
                icon: '🚀',
                title: 'Modern Experiences',
                description: 'Cutting-edge games with stunning graphics and smooth gameplay'
              },
              {
                icon: '🔗',
                title: 'Web3 Integration',
                description: 'Blockchain-powered games with real rewards and transparency'
              },
              {
                icon: '⚡',
                title: 'Instant Play',
                description: 'No downloads required, play directly in your browser'
              },
              {
                icon: '🔒',
                title: 'Secure Platform',
                description: 'Safe and secure gaming environment for all players'
              },
              {
                icon: '📱',
                title: 'Responsive Design',
                description: 'Optimized for all devices, from desktop to mobile'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-cyan-400 transition-all duration-300 neon-glow hover:neon-glow-pink"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 font-orbitron">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-orbitron">
            <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'React', icon: '⚛️', color: 'text-blue-400' },
              { name: 'Web3.js', icon: '🔗', color: 'text-yellow-400' },
              { name: 'Tailwind CSS', icon: '🎨', color: 'text-cyan-400' },
              { name: 'Framer Motion', icon: '✨', color: 'text-pink-400' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl mb-3">{tech.icon}</div>
                <h3 className={`text-lg font-bold ${tech.color}`}>
                  {tech.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
            <h3 className="text-3xl font-bold text-white mb-4 font-orbitron">
              Ready to Start Gaming?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of players in the Game Multiverse and discover your next favorite game.
            </p>
            <a
              href="/#games"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-pink-600 transition-all duration-300 neon-glow hover:neon-glow-pink"
            >
              Explore Games
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 