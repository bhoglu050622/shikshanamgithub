import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Floating Sanskrit symbols component
const FloatingSymbol = ({ symbol, delay, duration, positionClass, size }: { symbol: string; delay: number; duration: number; positionClass: string; size: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, rotate: 0 }}
    animate={{ 
      opacity: [0, 0.8, 0], 
      y: [-30, 30, -30], 
      rotate: [0, 360, 0],
      scale: [0.8, 1.2, 0.8]
    }}
    transition={{
      delay,
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className={`absolute ${positionClass} ${size} text-golden-olive/60 font-serif select-none pointer-events-none drop-shadow-lg`}
    style={{ 
      fontFamily: 'serif',
      textShadow: '0 0 10px rgba(218, 165, 32, 0.3)'
    }}
  >
    {symbol}
  </motion.div>
)

// Lotus petal animation
const LotusPetal = ({ delay, duration, positionClass, rotation }: { delay: number; duration: number; positionClass: string; rotation: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotate: rotation }}
    animate={{ 
      opacity: [0, 0.9, 0], 
      scale: [0, 1.2, 0],
      rotate: [rotation, rotation + 180, rotation + 360],
      y: [-10, 10, -10]
    }}
    transition={{
      delay,
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className={`absolute ${positionClass} w-10 h-10 bg-gradient-to-br from-golden-olive/60 to-copper-orange/50 rounded-full mix-blend-multiply filter blur-sm shadow-lg`}
    style={{
      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      boxShadow: '0 0 20px rgba(218, 165, 32, 0.3)'
    }}
  />
)

// Sacred geometry pattern
const SacredGeometry = ({ delay, duration, positionClass, size }: { delay: number; duration: number; positionClass: string; size: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0], 
      scale: [0, 1, 0],
      rotate: [0, 360]
    }}
    transition={{
      delay,
      duration,
      repeat: Infinity,
      ease: 'linear',
    }}
    className={`absolute ${positionClass} ${size} border border-golden-olive/40 rounded-full`}
  >
    <div className="w-full h-full border border-golden-olive/30 rounded-full m-2">
      <div className="w-full h-full border border-golden-olive/20 rounded-full m-2">
        <div className="w-full h-full border border-golden-olive/10 rounded-full m-2"></div>
      </div>
    </div>
  </motion.div>
)

// Floating knowledge particles
const KnowledgeParticle = ({ delay, duration, positionClass, size }: { delay: number; duration: number; positionClass: string; size: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, y: 0 }}
    animate={{ 
      opacity: [0, 0.8, 0], 
      scale: [0, 1, 0],
      y: [0, -30, 0]
    }}
    transition={{
      delay,
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className={`absolute ${positionClass} ${size} bg-gradient-to-br from-golden-olive/60 to-copper-orange/50 rounded-full mix-blend-screen filter blur-sm`}
  />
)

export default function HeroBackground() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  // Sanskrit symbols for gurukul theme
  const sanskritSymbols = ['ॐ', 'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ']
  
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Enhanced gurukul-themed gradients */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 1, 
          delay: 0.2,
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-golden-olive/35 via-deep-maroon/25 to-copper-orange/30 rounded-full mix-blend-multiply filter blur-3xl opacity-90"
      />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: [1, 1.2, 1],
          rotate: [0, -180, -360]
        }}
        transition={{ 
          duration: 1, 
          delay: 0.4,
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-deep-maroon/35 via-copper-orange/25 to-golden-olive/30 rounded-full mix-blend-multiply filter blur-3xl opacity-90"
      />
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          scale: [1, 1.15, 1],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ 
          duration: 1, 
          delay: 0.6,
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 30, repeat: Infinity, ease: "linear" }
        }}
        className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-copper-orange/35 via-golden-olive/25 to-deep-maroon/30 rounded-full mix-blend-multiply filter blur-3xl opacity-90"
      />

      {/* Floating Sanskrit symbols */}
      {sanskritSymbols.map((symbol, index) => (
        <FloatingSymbol
          key={`sanskrit-${index}`}
          symbol={symbol}
          delay={index * 0.5}
          duration={8 + (index % 3)}
          positionClass={`top-${Math.floor(Math.random() * 80) + 10}% left-${Math.floor(Math.random() * 80) + 10}%`}
          size="text-2xl sm:text-3xl md:text-4xl"
        />
      ))}

      {/* Lotus petals */}
      {Array.from({ length: 12 }).map((_, index) => (
        <LotusPetal
          key={`lotus-${index}`}
          delay={index * 0.3}
          duration={6 + (index % 4)}
          positionClass={`top-${Math.floor(Math.random() * 70) + 15}% left-${Math.floor(Math.random() * 70) + 15}%`}
          rotation={index * 30}
        />
      ))}

      {/* Sacred geometry patterns */}
      {Array.from({ length: 6 }).map((_, index) => (
        <SacredGeometry
          key={`geometry-${index}`}
          delay={index * 0.8}
          duration={12 + (index % 3)}
          positionClass={`top-${Math.floor(Math.random() * 60) + 20}% left-${Math.floor(Math.random() * 60) + 20}%`}
          size="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
        />
      ))}

      {/* Knowledge particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <KnowledgeParticle
          key={`knowledge-${index}`}
          delay={index * 0.2}
          duration={4 + (index % 3)}
          positionClass={`top-${Math.floor(Math.random() * 90) + 5}% left-${Math.floor(Math.random() * 90) + 5}%`}
          size="w-2 h-2 sm:w-3 sm:h-3"
        />
      ))}

      {/* Subtle mandala pattern overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 0.15, 
          scale: [1, 1.1, 1],
          rotate: [0, 360]
        }}
        transition={{ 
          duration: 2, 
          delay: 1,
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 40, repeat: Infinity, ease: "linear" }
        }}
        className="absolute inset-0 bg-gradient-radial from-golden-olive/8 via-transparent to-transparent"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(218, 165, 32, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Additional floating elements for gurukul theme */}
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`floating-element-${index}`}
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 6 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
          className="absolute w-4 h-4 bg-gradient-to-br from-golden-olive/30 to-copper-orange/20 rounded-full mix-blend-multiply filter blur-sm"
          style={{
            top: `${Math.floor(Math.random() * 80) + 10}%`,
            left: `${Math.floor(Math.random() * 80) + 10}%`,
            boxShadow: '0 0 15px rgba(218, 165, 32, 0.2)'
          }}
        />
      ))}

      {/* Traditional Indian pattern overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 3, delay: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23daa520' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  )
}
