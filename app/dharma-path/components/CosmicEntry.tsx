'use client'

import { motion } from 'framer-motion'
import { Sparkles, Star, Moon, Sun } from 'lucide-react'

interface CosmicEntryProps {
  onBegin: () => void
}

export default function CosmicEntry({ onBegin }: CosmicEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center relative"
    >
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Rotating mandala */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-96 h-96 border border-saffron-400/20 rounded-full">
            <div className="w-80 h-80 border border-saffron-400/30 rounded-full m-8">
              <div className="w-64 h-64 border border-saffron-400/40 rounded-full m-8">
                <div className="w-48 h-48 border border-saffron-400/50 rounded-full m-8">
                  <div className="w-32 h-32 border border-saffron-400/60 rounded-full m-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-saffron-400/20 to-saffron-600/30 rounded-full m-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating cosmic elements */}
        <motion.div
          className="absolute top-20 left-20"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sun className="w-12 h-12 text-saffron-400/60" />
        </motion.div>

        <motion.div
          className="absolute top-32 right-32"
          animate={{ y: [0, 15, 0], rotate: [0, -90, -180] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Moon className="w-10 h-10 text-saffron-300/50" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-32"
          animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="w-8 h-8 text-saffron-500/70" />
        </motion.div>

        {/* Particle effects */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-saffron-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-full flex items-center justify-center shadow-2xl"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 text-shadow-lg">
            <span className="bg-gradient-to-r from-saffron-400 via-saffron-500 to-saffron-600 bg-clip-text text-transparent">
              Dharma
            </span>
            <br />
            <span className="text-white/90">Path</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed">
            Embark on a sacred journey of self-discovery
          </p>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            Connect with your chosen divine archetype, explore your spiritual nature through ancient wisdom, 
            and discover your personalized path to enlightenment.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mb-8"
        >
          <motion.button
            onClick={onBegin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-bold py-6 px-12 rounded-full text-xl shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-saffron-400/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center space-x-3">
              <Sparkles className="w-6 h-6" />
              <span>Begin Your Dharma Path</span>
              <Sparkles className="w-6 h-6" />
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-white/60 text-sm"
        >
          <p>Your journey is private and sacred - all data stays on your device</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
