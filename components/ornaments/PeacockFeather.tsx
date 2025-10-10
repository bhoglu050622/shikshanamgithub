'use client'

import { motion } from 'framer-motion'

interface PeacockFeatherProps {
  size?: number
  className?: string
  parallax?: boolean
}

export default function PeacockFeather({ 
  size = 150, 
  className = '', 
  parallax = false 
}: PeacockFeatherProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      className={`absolute pointer-events-none ${className}`}
      animate={parallax ? { 
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0]
      } : {}}
      transition={parallax ? { 
        duration: 8, 
        repeat: Infinity, 
        ease: "easeInOut" 
      } : {}}
    >
      <defs>
        <radialGradient id="peacockGradient" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#0C3B3C" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#1A237E" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FF6F00" stopOpacity="0.1" />
        </radialGradient>
        <linearGradient id="featherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0C3B3C" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#1A237E" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C49B0B" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Main feather shape */}
      <path
        d="M75,10 Q85,30 80,50 Q75,70 70,90 Q65,110 60,130 Q55,140 50,145 Q45,140 40,130 Q35,110 30,90 Q25,70 20,50 Q15,30 25,10 Q50,5 75,10 Z"
        fill="url(#peacockGradient)"
        stroke="url(#featherGradient)"
        strokeWidth="0.5"
        opacity="0.6"
      />
      
      {/* Eye patterns */}
      {Array.from({ length: 5 }).map((_, i) => {
        const y = 30 + i * 20
        return (
          <g key={`peacock-eye-${i}`}>
            <ellipse
              cx="75"
              cy={y}
              rx="8"
              ry="4"
              fill="#FF6F00"
              opacity="0.2"
            />
            <ellipse
              cx="75"
              cy={y}
              rx="4"
              ry="2"
              fill="#C49B0B"
              opacity="0.3"
            />
            <circle
              cx="75"
              cy={y}
              r="1"
              fill="#1A237E"
              opacity="0.4"
            />
          </g>
        )
      })}
      
      {/* Feather barbs */}
      {Array.from({ length: 8 }).map((_, i) => {
        const x = 30 + i * 6
        const startY = 20 + i * 2
        const endY = 120 + i * 3
        return (
          <line
            key={`peacock-barb-${i}`}
            x1={x}
            y1={startY}
            x2={x}
            y2={endY}
            stroke="#0C3B3C"
            strokeWidth="0.3"
            opacity="0.2"
          />
        )
      })}
    </motion.svg>
  )
}
