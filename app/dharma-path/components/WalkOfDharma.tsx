'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Quote } from 'lucide-react'
import { Avatar } from '../types/dharma-path'

interface WalkOfDharmaProps {
  avatar: Avatar
  onContinue: () => void
}

export default function WalkOfDharma({ avatar, onContinue }: WalkOfDharmaProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center relative py-12 px-6"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Avatar's aura effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className="w-96 h-96 bg-gradient-to-br from-saffron-400/20 to-saffron-600/30 rounded-full blur-3xl" />
        </motion.div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-saffron-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
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

      <div className="max-w-4xl mx-auto text-center">
        {/* Avatar Display */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            {/* Glowing aura */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-saffron-400/30 to-saffron-600/40 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Avatar symbol */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-saffron-400/20 to-saffron-600/30 rounded-full flex items-center justify-center border-4 border-saffron-400/50 shadow-2xl">
              <span className="text-6xl">{avatar.symbol}</span>
            </div>
          </div>
        </motion.div>

        {/* Avatar Information */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {avatar.name}
          </h1>
          <p className="text-2xl md:text-3xl text-saffron-400 mb-6 font-medium">
            {avatar.sanskritName}
          </p>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {avatar.essence}
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            {avatar.description}
          </p>
        </motion.div>

        {/* Sacred Verse */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Quote className="w-8 h-8 text-saffron-400" />
            </div>
            
            {/* Sanskrit Verse */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-6"
            >
              <p className="text-2xl md:text-3xl text-saffron-300 font-medium leading-relaxed">
                {avatar.verse.sanskrit}
              </p>
            </motion.div>

            {/* English Translation */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-4"
            >
              <p className="text-lg md:text-xl text-white/90 italic leading-relaxed">
                "{avatar.verse.english}"
              </p>
            </motion.div>

            {/* Meaning */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                {avatar.verse.translation}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Attributes */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Sacred Qualities</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {avatar.attributes.map((attribute, index) => (
              <motion.div
                key={attribute}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="px-6 py-3 bg-gradient-to-r from-saffron-400/20 to-saffron-600/20 border border-saffron-400/30 rounded-full text-saffron-300 font-medium shadow-lg"
              >
                {attribute}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-bold py-6 px-12 rounded-full text-xl shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-saffron-400/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center space-x-3">
              <Sparkles className="w-6 h-6" />
              <span>Continue My Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </motion.button>
        </motion.div>

        {/* Reflection Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8"
        >
          <p className="text-white/60 text-sm max-w-2xl mx-auto leading-relaxed">
            Take a moment to reflect on how {avatar.name}'s qualities resonate with your own spiritual journey. 
            This divine guide will accompany you through your Dharma Path.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
