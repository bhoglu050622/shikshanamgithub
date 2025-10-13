'use client'

import { motion } from 'framer-motion'
import { Users, BookOpen, Cpu } from 'lucide-react'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  {
    number: 50,
    label: 'Gurus',
    icon: Users,
    color: '#06b6d4', // cyan
    position: 'top'
  },
  {
    number: 2500,
    label: 'Shishyas',
    icon: BookOpen,
    color: '#8b5cf6', // purple
    position: 'bottom-left'
  },
  {
    number: 100,
    label: 'AI Tools',
    icon: Cpu,
    color: '#ec4899', // pink
    position: 'bottom-right'
  }
]

export default function TriangularStatsIcon() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto h-64 mb-8">
      {/* SVG Triangle */}
      <svg
        className="w-full h-full"
        viewBox="0 0 300 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Triangle with gradient stroke */}
        <motion.path
          d="M150 30 L270 230 L30 230 Z"
          stroke="url(#triangleGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { 
            pathLength: 1,
            strokeWidth: [2, 3, 2],
          } : { pathLength: 0 }}
          transition={{ 
            pathLength: { duration: 2, delay: 0.3 },
            strokeWidth: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        
        {/* Inner Triangle */}
        <motion.path
          d="M150 70 L230 190 L70 190 Z"
          stroke="url(#innerGradient)"
          strokeWidth="1.5"
          fill="rgba(139, 92, 246, 0.05)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { 
            pathLength: 1,
            fillOpacity: [0.05, 0.1, 0.05]
          } : { pathLength: 0 }}
          transition={{ 
            pathLength: { duration: 2, delay: 0.5 },
            fillOpacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Energy lines connecting to center */}
        <motion.line
          x1="150" y1="30" x2="150" y2="150"
          stroke="url(#energyGradient1)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={isInView ? { 
            pathLength: [0, 1, 0],
            opacity: [0, 1, 0]
          } : {}}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: 2,
            ease: "easeInOut"
          }}
        />
        <motion.line
          x1="270" y1="230" x2="150" y2="150"
          stroke="url(#energyGradient2)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={isInView ? { 
            pathLength: [0, 1, 0],
            opacity: [0, 1, 0]
          } : {}}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: 2.5,
            ease: "easeInOut"
          }}
        />
        <motion.line
          x1="30" y1="230" x2="150" y2="150"
          stroke="url(#energyGradient3)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={isInView ? { 
            pathLength: [0, 1, 0],
            opacity: [0, 1, 0]
          } : {}}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: 3,
            ease: "easeInOut"
          }}
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="energyGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="energyGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="energyGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Stats at vertices */}
      <div className="absolute inset-0">
        {/* Top - Gurus */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-2xl p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-white" />
              <div className="text-white">
                <div className="text-lg font-bold">50+</div>
                <div className="text-xs">Gurus</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Left - Shishyas */}
        <motion.div
          className="absolute bottom-0 left-6"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.7 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="bg-gradient-to-br from-purple-500 to-purple-400 rounded-2xl p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-white" />
              <div className="text-white">
                <div className="text-lg font-bold">2500+</div>
                <div className="text-xs">Shishyas</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Right - AI Tools */}
        <motion.div
          className="absolute bottom-0 right-6"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="bg-gradient-to-br from-pink-500 to-pink-400 rounded-2xl p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-white" />
              <div className="text-white">
                <div className="text-lg font-bold">100+</div>
                <div className="text-xs">AI Tools</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-xl"></div>
        </motion.div>
      </div>
    </div>
  )
}

