'use client'

import { motion } from 'framer-motion'

interface RangoliProps {
  width?: number
  height?: number
  className?: string
  animated?: boolean
}

export default function Rangoli({ 
  width = 300, 
  height = 60, 
  className = '', 
  animated = false 
}: RangoliProps) {
  const rangoliPath = "M10,30 Q50,10 90,30 T170,30 Q190,20 200,30 L200,40 Q190,50 170,40 T90,40 Q50,60 10,40 Z"
  
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 300 60"
      className={`absolute pointer-events-none ${className}`}
      initial={animated ? { x: -width, opacity: 0 } : {}}
      animate={animated ? { x: width, opacity: [0, 1, 0] } : {}}
      transition={animated ? { duration: 2, ease: "easeInOut" } : {}}
    >
      <defs>
        <linearGradient id="rangoliGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6F00" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#C49B0B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1A237E" stopOpacity="0.3" />
        </linearGradient>
        <pattern id="rangoliDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="#C49B0B" opacity="0.2" />
        </pattern>
      </defs>
      
      {/* Main rangoli pattern */}
      <path
        d={rangoliPath}
        fill="url(#rangoliGradient)"
        stroke="#FF6F00"
        strokeWidth="0.5"
        opacity="0.6"
      />
      
      {/* Decorative dots */}
      <g fill="url(#rangoliDots)">
        {Array.from({ length: 15 }).map((_, i) => (
          <circle
            key={`rangoli-dot-${i}`}
            cx={i * 20 + 10}
            cy={30}
            r="0.8"
            opacity="0.4"
          />
        ))}
      </g>
      
      {/* Temple bell wave curves */}
      <path
        d="M0,45 Q75,35 150,45 T300,45"
        fill="none"
        stroke="#0C3B3C"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M0,50 Q75,40 150,50 T300,50"
        fill="none"
        stroke="#0C3B3C"
        strokeWidth="0.5"
        opacity="0.2"
      />
    </motion.svg>
  )
}
