'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Users, BookOpen, Cpu, Sparkles, Zap, Brain } from 'lucide-react'

const stats = [
  {
    number: 50,
    label: 'Certified Gurus',
    icon: Users,
    color: 'from-golden-olive to-golden-olive/90',
    suffix: '+',
    description: 'Expert teachers guiding your journey'
  },
  {
    number: 2500,
    label: 'Active Shishyas',
    icon: BookOpen,
    color: 'from-deep-maroon to-deep-maroon/90',
    suffix: '+',
    description: 'Students learning ancient wisdom'
  },
  {
    number: 100,
    label: 'AI Tools',
    icon: Cpu,
    color: 'from-copper-orange to-copper-orange/90',
    suffix: '+',
    description: 'Intelligent learning assistants'
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

        {/* Triangular Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Triangle Container */}
          <div className="relative w-full h-96 flex items-center justify-center">
            {/* Triangle Background */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Triangle */}
                <motion.path
                  d="M200 50 L350 300 L50 300 Z"
                  stroke="url(#triangleGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                {/* Inner Triangle */}
                <motion.path
                  d="M200 100 L300 250 L100 250 Z"
                  stroke="url(#innerTriangleGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2, delay: 0.8 }}
                />
                {/* Center Triangle */}
                <motion.path
                  d="M200 150 L250 200 L150 200 Z"
                  stroke="url(#centerTriangleGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2, delay: 1.1 }}
                />
                
                {/* Gradient Definitions */}
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
                </defs>
              </svg>
            </motion.div>

            {/* Stats positioned at triangle vertices */}
            {stats.map((stat, index) => {
              const positions = [
                { top: '10%', left: '50%', transform: 'translateX(-50%)' }, // Top
                { bottom: '10%', left: '15%', transform: 'translateX(-50%)' }, // Bottom Left
                { bottom: '10%', right: '15%', transform: 'translateX(50%)' }, // Bottom Right
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
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  {/* Glowing Icon Container */}
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl relative overflow-hidden`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-10 h-10 text-white z-10" />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50"
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(6, 182, 212, 0.5)',
                          '0 0 40px rgba(139, 92, 246, 0.5)',
                          '0 0 20px rgba(6, 182, 212, 0.5)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                  
                  {/* Number */}
                  <div className="text-cyan-400 mb-2">
                    <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                  </div>
                  
                  {/* Label */}
                  <div className="text-white font-semibold text-lg mb-1">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-gray-400 text-sm max-w-32">
                    {stat.description}
                  </div>
                </motion.div>
              )
            })}

            {/* Central AI Brain Icon */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 1,
                delay: 2,
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </motion.div>
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
