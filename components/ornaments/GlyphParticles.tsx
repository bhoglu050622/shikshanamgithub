'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GlyphParticlesProps {
  count?: number
  className?: string
}

const devanagariGlyphs = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह']

export default function GlyphParticles({ count = 15, className = '' }: GlyphParticlesProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    glyph: string
    x: number
    y: number
    delay: number
    duration: number
  }>>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      glyph: devanagariGlyphs[Math.floor(Math.random() * devanagariGlyphs.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 4
    }))
    setParticles(newParticles)
  }, [count, isClient])

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isClient) {
    return <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} />
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-saffron-500 opacity-6 font-serif text-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, -10, -30, 0],
            x: [0, 10, -5, 15, 0],
            opacity: [0.06, 0.1, 0.08, 0.09, 0.06],
            rotate: [0, 5, -3, 8, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {particle.glyph}
        </motion.div>
      ))}
    </div>
  )
}
