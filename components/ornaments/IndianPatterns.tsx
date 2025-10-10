'use client'

import { motion } from 'framer-motion'

interface IndianPatternsProps {
  className?: string
  opacity?: number
  size?: number
}

export function LotusPattern({ className = '', opacity = 0.1, size = 100 }: IndianPatternsProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ opacity }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" className="text-golden-olive">
        <g fill="currentColor">
          {/* Outer petals */}
          <path d="M50 10 L60 30 L80 30 L65 45 L70 65 L50 55 L30 65 L35 45 L20 30 L40 30 Z" />
          {/* Inner petals */}
          <path d="M50 25 L55 35 L65 35 L58 42 L60 52 L50 47 L40 52 L42 42 L35 35 L45 35 Z" />
          {/* Center */}
          <circle cx="50" cy="50" r="8" />
        </g>
      </svg>
    </motion.div>
  )
}

export function MandalaPattern({ className = '', opacity = 0.1, size = 120 }: IndianPatternsProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ opacity }}
      animate={{
        rotate: [0, -360],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg width={size} height={size} viewBox="0 0 120 120" className="text-deep-maroon">
        <g fill="currentColor">
          {/* Outer ring */}
          <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
          
          {/* Decorative elements */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180)
            const x = 60 + Math.cos(angle) * 40
            const y = 60 + Math.sin(angle) * 40
            return (
              <circle key={i} cx={x} cy={y} r="3" />
            )
          })}
          
          {/* Center */}
          <circle cx="60" cy="60" r="8" />
        </g>
      </svg>
    </motion.div>
  )
}

export function PeacockPattern({ className = '', opacity = 0.1, size = 80 }: IndianPatternsProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ opacity }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg width={size} height={size} viewBox="0 0 80 80" className="text-copper-orange">
        <g fill="currentColor">
          {/* Peacock feather */}
          <path d="M40 10 Q30 20 40 30 Q50 20 40 10" />
          <path d="M40 30 Q30 40 40 50 Q50 40 40 30" />
          <path d="M40 50 Q30 60 40 70 Q50 60 40 50" />
          
          {/* Eye patterns */}
          <circle cx="35" cy="25" r="2" fill="currentColor" />
          <circle cx="45" cy="25" r="2" fill="currentColor" />
          <circle cx="35" cy="45" r="2" fill="currentColor" />
          <circle cx="45" cy="45" r="2" fill="currentColor" />
        </g>
      </svg>
    </motion.div>
  )
}

export function OmSymbol({ className = '', opacity = 0.1, size = 60 }: IndianPatternsProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ opacity }}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg width={size} height={size} viewBox="0 0 60 60" className="text-golden-olive">
        <g fill="currentColor">
          {/* Om symbol simplified */}
          <path d="M30 10 Q20 15 30 20 Q40 15 30 10" />
          <path d="M30 20 Q25 25 30 30 Q35 25 30 20" />
          <path d="M30 30 Q25 35 30 40 Q35 35 30 30" />
          <path d="M30 40 Q20 45 30 50 Q40 45 30 40" />
        </g>
      </svg>
    </motion.div>
  )
}

export function SwastikaPattern({ className = '', opacity = 0.1, size = 40 }: IndianPatternsProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ opacity }}
      animate={{
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" className="text-temple-gold">
        <g fill="currentColor">
          {/* Swastika pattern */}
          <rect x="15" y="5" width="10" height="5" />
          <rect x="30" y="15" width="5" height="10" />
          <rect x="15" y="30" width="10" height="5" />
          <rect x="5" y="15" width="5" height="10" />
        </g>
      </svg>
    </motion.div>
  )
}

export function ChakraPattern({ className = '', opacity = 0.1, size = 100 }: IndianPatternsProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ opacity }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" className="text-golden-olive">
        <g fill="currentColor">
          {/* Ashoka Chakra simplified */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15) * (Math.PI / 180)
            const x1 = Math.round((50 + Math.cos(angle) * 40) * 100) / 100
            const y1 = Math.round((50 + Math.sin(angle) * 40) * 100) / 100
            const x2 = Math.round((50 + Math.cos(angle) * 35) * 100) / 100
            const y2 = Math.round((50 + Math.sin(angle) * 35) * 100) / 100
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />
            )
          })}
          <circle cx="50" cy="50" r="8" />
        </g>
      </svg>
    </motion.div>
  )
}

export default function IndianPatterns() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Lotus patterns */}
      <LotusPattern className="top-20 left-20" opacity={0.05} size={80} />
      <LotusPattern className="top-40 right-32" opacity={0.03} size={60} />
      <LotusPattern className="bottom-32 left-40" opacity={0.04} size={70} />
      
      {/* Mandala patterns */}
      <MandalaPattern className="top-60 left-10" opacity={0.03} size={100} />
      <MandalaPattern className="bottom-20 right-20" opacity={0.02} size={80} />
      
      {/* Peacock patterns */}
      <PeacockPattern className="top-32 right-60" opacity={0.04} size={60} />
      <PeacockPattern className="bottom-60 left-60" opacity={0.03} size={50} />
      
      {/* Om symbols */}
      <OmSymbol className="top-80 left-80" opacity={0.02} size={40} />
      <OmSymbol className="bottom-40 right-80" opacity={0.03} size={35} />
      
      {/* Swastika patterns */}
      <SwastikaPattern className="top-60 right-40" opacity={0.02} size={30} />
      <SwastikaPattern className="bottom-60 left-20" opacity={0.02} size={25} />
      
      {/* Chakra patterns */}
      <ChakraPattern className="top-40 left-60" opacity={0.02} size={70} />
      <ChakraPattern className="bottom-40 right-60" opacity={0.02} size={60} />
    </div>
  )
}
