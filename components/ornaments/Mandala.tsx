'use client'

import { motion } from 'framer-motion'

interface MandalaProps {
  size?: number
  className?: string
  speed?: number
}

export default function Mandala({ size = 200, className = '', speed = 60 }: MandalaProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`absolute pointer-events-none ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" }}
      style={{ willChange: 'transform' }}
    >
      <defs>
        <radialGradient id="mandalaGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6F00" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#C49B0B" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#1A237E" stopOpacity="0.02" />
        </radialGradient>
        <pattern id="mandalaPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="#FF6F00" opacity="0.1" />
          <circle cx="20" cy="20" r="1" fill="#C49B0B" opacity="0.2" />
        </pattern>
      </defs>
      
      {/* Outer ring */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="url(#mandalaGradient)" strokeWidth="1" opacity="0.3" />
      <circle cx="100" cy="100" r="85" fill="none" stroke="url(#mandalaGradient)" strokeWidth="0.5" opacity="0.2" />
      
      {/* Inner mandala pattern */}
      <g fill="url(#mandalaPattern)">
        {/* Petal-like shapes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180)
          const x = (100 + Math.cos(angle) * 60).toFixed(2)
          const y = (100 + Math.sin(angle) * 60).toFixed(2)
          return (
            <ellipse
              key={`petal-${i}`}
              cx={x}
              cy={y}
              rx="8"
              ry="20"
              transform={`rotate(${i * 45} ${x} ${y})`}
              opacity="0.1"
            />
          )
        })}
        
        {/* Center lotus */}
        <circle cx="100" cy="100" r="15" fill="#FF6F00" opacity="0.1" />
        <circle cx="100" cy="100" r="8" fill="#C49B0B" opacity="0.15" />
        <circle cx="100" cy="100" r="3" fill="#1A237E" opacity="0.2" />
      </g>
      
      {/* Decorative dots */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180)
        const x = (100 + Math.cos(angle) * 75).toFixed(2)
        const y = (100 + Math.sin(angle) * 75).toFixed(2)
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r="1.5"
            fill="#C49B0B"
            opacity="0.2"
          />
        )
      })}
    </motion.svg>
  )
}
