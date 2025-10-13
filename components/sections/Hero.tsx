'use client'

import { motion } from 'framer-motion'
import { BookOpen, Sparkles, GraduationCap, Users, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FloatingParticle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function Hero() {
  const [particles, setParticles] = useState<FloatingParticle[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Generate floating particles with more variety
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3, // Larger particles: 3-11px
      duration: Math.random() * 8 + 10, // Faster: 10-18s
      delay: Math.random() * 3
    }))
    setParticles(newParticles)
  }, [])

  // Prevent animation on SSR
  const animationProps = mounted
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: false, animate: { opacity: 1, y: 0 } }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      const schoolsSection = document.getElementById('schools')
      if (schoolsSection) {
        schoolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
  
  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-950 dark:to-amber-950">
        {/* Animated gradient overlays */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-300/30 via-transparent to-transparent dark:from-orange-500/20"
          animate={{ 
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-300/30 via-transparent to-transparent dark:from-amber-500/20"
          animate={{
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
        
        {/* Animated mesh gradient effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(at 20% 30%, rgba(251, 146, 60, 0.3) 0px, transparent 50%),
              radial-gradient(at 80% 70%, rgba(245, 158, 11, 0.3) 0px, transparent 50%),
              radial-gradient(at 50% 50%, rgba(251, 191, 36, 0.2) 0px, transparent 50%)
            `
          }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
              </div>

      {/* Floating Sparkles - Accent Elements */}
      {mounted && [1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-6 h-6 text-orange-400/60" />
        </motion.div>
      ))}

      {/* Sacred Geometry Mandala - Enhanced */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-25">
        {/* Outer rotating circle */}
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full border-2 border-orange-400/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle rotating circle - opposite direction */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full border-2 border-amber-400/50"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full border-2 border-orange-300/40 rotate-45" />
        </motion.div>
        
        {/* Inner pulsing circle */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full border-2 border-orange-500/60"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-orange-400/30 to-amber-400/30"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
          </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          {mounted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-orange-200/50 dark:border-orange-700/50 mb-8"
            >
              <Sparkles className="w-4 h-4 text-orange-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-100">
                Unlock Ancient Wisdom
              </span>
              <Sparkles className="w-4 h-4 text-orange-500" aria-hidden="true" />
            </motion.div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-orange-200/50 dark:border-orange-700/50 mb-8">
              <Sparkles className="w-4 h-4 text-orange-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-100">
                Unlock Ancient Wisdom
              </span>
              <Sparkles className="w-4 h-4 text-orange-500" aria-hidden="true" />
              </div>
          )}

          {/* Main Heading */}
          {mounted ? (
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-orange-800 to-amber-900 dark:from-white dark:via-orange-200 dark:to-amber-200 bg-clip-text text-transparent">
                शिक्षणम्
              </span>
              <br />
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-gray-700 dark:text-gray-300">
                Shikshanam
              </span>
            </motion.h1>
          ) : (
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-orange-800 to-amber-900 dark:from-white dark:via-orange-200 dark:to-amber-200 bg-clip-text text-transparent">
                शिक्षणम्
              </span>
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-gray-700 dark:text-gray-100">
                Shikshanam
              </span>
              </h1>
            )}

          {/* Subtitle */}
          {mounted ? (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-100 mb-4 font-light"
          >
            Ancient Indian Knowledge Platform
          </motion.p>
          ) : (
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-100 mb-4 font-light">
              Ancient Indian Knowledge Platform
            </p>
          )}

          {/* Description */}
          {mounted ? (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm sm:text-lg text-gray-500 dark:text-gray-200 mb-12 max-w-3xl mx-auto"
            >
              Explore the timeless wisdom of Sanskrit, Darshanas, and Self-development through our comprehensive learning platform
            </motion.p>
          ) : (
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-200 mb-12 max-w-3xl mx-auto">
              Explore the timeless wisdom of Sanskrit, Darshanas, and Self-development through our comprehensive learning platform
            </p>
          )}

          {/* CTA Cards */}
          <motion.div
            initial={mounted ? { opacity: 0, y: 40 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            {/* Sanskrit Card */}
            <button
              onClick={() => scrollToSection('schools')}
              className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-orange-200/50 dark:border-orange-700/50 p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer text-left w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                  Learn Sanskrit
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-100 mb-4">
                  Master the divine language
                </p>
                <div className="flex items-center text-orange-600 dark:text-orange-200 font-medium text-sm">
                  Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </div>
              </div>
            </button>

            {/* Darshanas Card */}
            <button
              onClick={() => scrollToSection('schools')}
              className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-amber-200/50 dark:border-amber-700/50 p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer text-left w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                  Explore Darshanas
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-100 mb-4">
                  Study six classical schools
                </p>
                <div className="flex items-center text-amber-600 dark:text-amber-200 font-medium text-sm">
                  Discover <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </div>
          </div>
            </button>

            {/* Self Development Card */}
            <button
              onClick={() => scrollToSection('schools')}
              className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-orange-200/50 dark:border-orange-700/50 p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer text-left w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                  Self Development
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-100 mb-4">
                  Transform your life
                </p>
                <div className="flex items-center text-orange-600 dark:text-orange-200 font-medium text-sm">
                  Begin <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </div>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={mounted ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Live Classes Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span>10,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>50+ Courses</span>
          </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
            fill="currentColor" 
            className="text-background"
          />
        </svg>
      </div>

    </section>
  )
}
