'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function TestDharmaPathPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-indigo via-indigo-900 to-purple-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-saffron-400 via-saffron-500 to-saffron-600 bg-clip-text text-transparent">
              Dharma Path
            </span>
            <br />
            <span className="text-white/90">is Ready!</span>
          </h1>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed">
            Your sacred journey of self-discovery awaits
          </p>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            The Dharma Path feature has been successfully implemented with all components:
            cosmic entry, avatar selection, walk of dharma, quiz gateway, and personal dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-8"
        >
          <Link href="/dharma-path">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-bold py-6 px-12 rounded-full text-xl shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-saffron-400/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center space-x-3">
                <Sparkles className="w-6 h-6" />
                <span>Begin Your Dharma Path</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-white/60 text-sm"
        >
          <p>✨ All data stays private on your device • 🕉️ Premium spiritual experience • 🎯 Personalized recommendations</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
