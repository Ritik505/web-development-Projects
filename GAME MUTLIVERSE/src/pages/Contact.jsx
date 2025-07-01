import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-lg z-10"
      >
        <div className="relative rounded-2xl p-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 shadow-2xl">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-bold text-center mb-8 font-orbitron bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
            >
              Contact Us
            </motion.h2>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center text-green-400 font-semibold text-lg py-12 flex flex-col items-center"
              >
                <FaPaperPlane className="text-5xl mb-4 animate-bounce" />
                Thank you for reaching out!<br />We'll get back to you soon.
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 text-xl animate-fadeIn" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-black-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    placeholder="  Your name"
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-xl animate-fadeIn" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="relative">
                  <FaCommentDots className="absolute left-3 top-5 text-purple-400 text-xl animate-fadeIn" />
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 resize-none transition-all"
                    placeholder="How can we help you?"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 16px #00FFC6, 0 0 32px #FF007A' }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-cyan-600 hover:to-pink-600 transition-all duration-300 neon-glow hover:neon-glow-pink text-lg"
                >
                  <FaPaperPlane className="text-xl" />
                  Send Message
                </motion.button>
              </motion.form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact; 