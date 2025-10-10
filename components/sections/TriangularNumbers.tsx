'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Users, BookOpen, Cpu, Sparkles, Zap, Brain } from 'lucide-react'

const stats = [
  {
    number: 50,
    label: 'Gurus',
    icon: Users,
    color: 'from-cyan-500 to-cyan-400',
    suffix: '+',
    description: 'Expert teachers guiding your journey',
    glowColor: 'rgba(6, 182, 212, 0.6)'
  },
  {
    number: 2500,
    label: 'Shishyas',
    icon: BookOpen,
    color: 'from-purple-500 to-purple-400',
    suffix: '+',
    description: 'Students learning ancient wisdom',
    glowColor: 'rgba(139, 92, 246, 0.6)'
  },
  {
    number: 100,
    label: 'AI Tools',
    icon: Cpu,
    color: 'from-pink-500 to-pink-400',
    suffix: '+',
    description: 'Intelligent learning assistants',
    glowColor: 'rgba(236, 72, 153, 0.6)'
  }
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-3xl md:text-4xl lg:text-5xl font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function TriangularNumbers() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  return (
    <section id="triangular-numbers" className="section-padding bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Sci-fi Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <motion.div
                key={i}
                className="border border-cyan-400/20"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: i * 0.01, duration: 0.5 }}
              />
            ))}
          </div>
        </div>

        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Energy Beams */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-cyan-400 mr-3 animate-pulse" />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              The{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Future
              </span>{' '}
              of Learning
            </h2>
            <Zap className="w-8 h-8 text-purple-400 ml-3 animate-pulse" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where ancient wisdom meets cutting-edge AI technology to create the ultimate learning experience.
          </p> */}
        </motion.div>

        {/* Enhanced Triangular Layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Triangle Container */}
          <div className="relative w-full h-[500px] flex items-center justify-center">
            {/* Multiple Triangle Layers with Enhanced Animation */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Triangle with Pulsing Effect */}
                <motion.path
                  d="M250 60 L420 360 L80 360 Z"
                  stroke="url(#triangleGradient)"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { 
                    pathLength: 1,
                    strokeWidth: [3, 4, 3],
                  } : { pathLength: 0 }}
                  transition={{ 
                    pathLength: { duration: 2, delay: 0.5 },
                    strokeWidth: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
                
                {/* Middle Triangle */}
                <motion.path
                  d="M250 120 L360 300 L140 300 Z"
                  stroke="url(#innerTriangleGradient)"
                  strokeWidth="2"
                  fill="rgba(139, 92, 246, 0.1)"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { 
                    pathLength: 1,
                    fillOpacity: [0.1, 0.2, 0.1]
                  } : { pathLength: 0 }}
                  transition={{ 
                    pathLength: { duration: 2, delay: 0.8 },
                    fillOpacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }}
                />
                
                {/* Inner Triangle */}
                <motion.path
                  d="M250 180 L310 260 L190 260 Z"
                  stroke="url(#centerTriangleGradient)"
                  strokeWidth="2"
                  fill="rgba(236, 72, 153, 0.1)"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { 
                    pathLength: 1,
                    fillOpacity: [0.1, 0.15, 0.1]
                  } : { pathLength: 0 }}
                  transition={{ 
                    pathLength: { duration: 2, delay: 1.1 },
                    fillOpacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                  }}
                />

                {/* Energy Lines connecting vertices */}
                <motion.line
                  x1="250" y1="60" x2="250" y2="250"
                  stroke="url(#energyLineGradient)"
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
                  x1="420" y1="360" x2="250" y2="250"
                  stroke="url(#energyLineGradient2)"
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
                  x1="80" y1="360" x2="250" y2="250"
                  stroke="url(#energyLineGradient3)"
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
                
                {/* Enhanced Gradient Definitions */}
                <defs>
                  <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <linearGradient id="innerTriangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="centerTriangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="energyLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="energyLineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="energyLineGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Enhanced Stats positioned at triangle vertices */}
            {stats.map((stat, index) => {
              const positions = [
                { top: '5%', left: '50%', transform: 'translateX(-50%)' }, // Top - Gurus
                { bottom: '5%', left: '12%', transform: 'translateX(-50%)' }, // Bottom Left - Shishyas
                { bottom: '5%', right: '12%', transform: 'translateX(50%)' }, // Bottom Right - AI Tools
              ]
              
              return (
                <motion.div
                  key={stat.label}
                  className="absolute text-center"
                  style={positions[index]}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 + index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.15, y: -8 }}
                >
                  {/* Enhanced Glowing Icon Container */}
                  <motion.div
                    className={`w-24 h-24 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl relative overflow-hidden`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${stat.glowColor}`,
                        `0 0 30px ${stat.glowColor}`,
                        `0 0 20px ${stat.glowColor}`,
                      ],
                    }}
                  >
                    <stat.icon className="w-12 h-12 text-white z-10" />
                    
                    {/* Multi-layer glow effects */}
                    <div className="absolute inset-0 bg-white/20 rounded-3xl blur-sm"></div>
                    <div className="absolute inset-0 bg-white/10 rounded-3xl blur-md"></div>
                    
                    {/* Animated border rings */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl border-2 border-cyan-400/50"
                      animate={{
                        rotate: [0, 360],
                        borderColor: ['rgba(6, 182, 212, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(236, 72, 153, 0.5)', 'rgba(6, 182, 212, 0.5)'],
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        borderColor: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-2xl border border-white/30"
                      animate={{
                        rotate: [360, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      }}
                    />

                    {/* Simplified particle effects */}
                    {Array.from({ length: 2 }).map((_, particleIndex) => (
                      <motion.div
                        key={`particle-${index}-${particleIndex}`}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${30 + particleIndex * 30}%`,
                          top: `${30 + particleIndex * 30}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: particleIndex * 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                  
                  {/* Enhanced Number with Holographic Effect */}
                  <motion.div 
                    className="text-cyan-400 mb-2 relative"
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(6, 182, 212, 0.5)',
                        '0 0 20px rgba(139, 92, 246, 0.5)',
                        '0 0 10px rgba(236, 72, 153, 0.5)',
                        '0 0 10px rgba(6, 182, 212, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                    
                    {/* Holographic overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                  
                  {/* Enhanced Label */}
                  <motion.div 
                    className="text-white font-bold text-xl mb-2"
                    animate={{
                      color: ['#ffffff', '#06b6d4', '#8b5cf6', '#ec4899', '#ffffff'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    {stat.label}
                  </motion.div>
                  
                  {/* Enhanced Description */}
                  <div className="text-gray-300 text-sm max-w-40 leading-tight">
                    {stat.description}
                  </div>

                  {/* Connection lines to center */}
                  <motion.div
                    className="absolute w-px bg-gradient-to-b from-cyan-400/50 to-transparent"
                    style={{
                      height: '60px',
                      left: '50%',
                      [index === 0 ? 'bottom' : 'top']: '-60px',
                      transform: 'translateX(-50%)',
                    }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { 
                      scaleY: [0, 1, 0],
                      opacity: [0, 1, 0]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 3 + index * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              )
            })}

            {/* Enhanced Central AI Brain Icon */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 2,
              }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
                animate={{
                  rotate: [0, 360],
                  boxShadow: [
                    '0 0 30px rgba(139, 92, 246, 0.5)',
                    '0 0 50px rgba(236, 72, 153, 0.7)',
                    '0 0 30px rgba(6, 182, 212, 0.5)',
                    '0 0 30px rgba(139, 92, 246, 0.5)',
                  ],
                }}
                transition={{
                  rotate: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  boxShadow: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <Brain className="w-10 h-10 text-white z-10" />
                
                {/* Pulsing core */}
                <motion.div
                  className="absolute inset-2 bg-white/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Rotating rings */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/30 rounded-full"
                  animate={{
                    rotate: [0, -360],
                    borderColor: ['rgba(255,255,255,0.3)', 'rgba(6,182,212,0.6)', 'rgba(255,255,255,0.3)'],
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    borderColor: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
                <motion.div
                  className="absolute inset-1 border border-white/20 rounded-full"
                  animate={{
                    rotate: [360, 0],
                    borderColor: ['rgba(255,255,255,0.2)', 'rgba(236,72,153,0.5)', 'rgba(255,255,255,0.2)'],
                  }}
                  transition={{
                    rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                    borderColor: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                />

                {/* Data streams */}
                {Array.from({ length: 8 }).map((_, streamIndex) => (
                  <motion.div
                    key={`stream-${streamIndex}`}
                    className="absolute w-0.5 h-8 bg-gradient-to-t from-cyan-400 to-transparent"
                    style={{
                      left: '50%',
                      top: '50%',
                      transformOrigin: 'bottom center',
                      transform: `translateX(-50%) translateY(-100%) rotate(${streamIndex * 45}deg)`,
                    }}
                    animate={{
                      scaleY: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: streamIndex * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Floating data particles around the center */}
            {Array.from({ length: 6 }).map((_, particleIndex) => (
              <motion.div
                key={`floating-particle-${particleIndex}`}
                className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, Math.cos(particleIndex * 60 * Math.PI / 180) * 60],
                  y: [0, Math.sin(particleIndex * 60 * Math.PI / 180) * 60],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: particleIndex * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8 text-white max-w-2xl mx-auto border border-cyan-400/30">
            <h3 className="font-serif text-2xl font-bold mb-4 flex items-center justify-center">
              <Zap className="w-6 h-6 mr-2 text-cyan-400" />
              Experience the Future
              <Sparkles className="w-6 h-6 ml-2 text-purple-400" />
            </h3>
            <p className="text-gray-300 mb-6">
              Join the revolution where AI enhances ancient wisdom for modern learners.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Start Your Journey
            </motion.button>
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}
