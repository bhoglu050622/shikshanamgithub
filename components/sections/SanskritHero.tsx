'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'


// Simple Sanskrit-themed decorative elements
const SanskritDecoration = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Subtle Om symbols */}
    <motion.div
      className="absolute top-20 left-10 text-6xl text-golden-olive/10 font-devanagari"
      animate={{ 
        opacity: [0.05, 0.15, 0.05],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      ॐ
    </motion.div>
    <motion.div
      className="absolute bottom-20 right-10 text-6xl text-deep-maroon/10 font-devanagari"
      animate={{ 
        opacity: [0.05, 0.15, 0.05],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
    >
      ॐ
    </motion.div>
      </div>
)



export default function SanskritHero() {

  return (
    <section className="relative overflow-hidden section-padding bg-parchment-ivory min-h-screen flex items-center">
      {/* Simple Decorative Elements */}
      <SanskritDecoration />
      

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Hero Title */}
          <div className="mb-6">
            <h1 className="text-hero bg-gradient-to-r from-golden-olive via-deep-maroon to-copper-orange bg-clip-text text-transparent mb-2">
              Unlock the Language of the Gods
            </h1>
          </div>
          
          <p className="text-subheading text-dark-text mb-8 max-w-3xl mx-auto leading-relaxed">
            Master the language of wisdom—step by step, joyfully. 
            <span className="text-deep-maroon font-semibold"> Discover the beauty of Sanskrit through interactive learning.</span>
          </p>


          {/* Choice CTAs */}
          <div className="flex flex-col lg:flex-row justify-center gap-6 mb-8">
            <Link
              href="/courses?level=beginner"
              className="relative group bg-gradient-to-r from-golden-olive to-golden-olive/80 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">Beginner</div>
                  <div className="text-sm opacity-90">I'm starting my Sanskrit journey</div>
                </div>
              </div>
            </Link>
            
            <Link
              href="/courses?level=intermediate"
              className="relative group bg-gradient-to-r from-copper-orange to-copper-orange/80 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">Intermediate</div>
                  <div className="text-sm opacity-90">I know the basics, I want practice</div>
                </div>
              </div>
            </Link>
          </div>

          {/* Micro-CTA */}
          <button className="group bg-white/80 border border-golden-olive/30 text-deep-maroon text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-3 mx-auto hover:border-golden-olive/50">
            <div className="w-5 h-5 bg-gradient-to-r from-golden-olive to-deep-maroon rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">?</span>
            </div>
            <div className="text-left">
              <div className="font-medium">Not sure where to start?</div>
              <div className="text-sm opacity-80">Take our 3-minute assessment</div>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

        </motion.div>
      </div>

      {/* Dense Sanskrit-themed background elements - Flowing in center */}
      {/* Primary large elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.12, 0.25, 0.12],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/3 w-24 h-24 bg-gradient-to-r from-golden-olive/15 to-golden-olive/8 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          scale: [1.3, 1, 1.3],
          opacity: [0.12, 0.2, 0.12],
          rotate: [0, -180, -360]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-deep-maroon/15 to-deep-maroon/8 rounded-full blur-sm"
      ></motion.div>
      
      {/* Secondary medium elements */}
      <motion.div
        animate={{ 
          y: [0, -25, 0],
          x: [0, 20, 0],
          opacity: [0.1, 0.18, 0.1],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-r from-copper-orange/12 to-copper-orange/6 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          x: [0, -15, 0],
          opacity: [0.1, 0.16, 0.1],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-1/2 right-1/2 w-22 h-22 bg-gradient-to-r from-golden-olive/12 to-golden-olive/6 rounded-full blur-sm"
      ></motion.div>
      
      {/* Tertiary elements for density */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.08, 0.14, 0.08],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute top-2/5 right-2/5 w-16 h-16 bg-deep-maroon/10 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 22, 0],
          opacity: [0.08, 0.15, 0.08],
          rotate: [0, -90, -180, -270, -360]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 4 }}
        className="absolute bottom-2/5 left-2/5 w-18 h-18 bg-copper-orange/10 rounded-full blur-sm"
      ></motion.div>
      
      {/* Additional elements for richness - Flowing in center */}
      <motion.div
        animate={{ 
          y: [0, -18, 0],
          x: [0, 12, 0],
          opacity: [0.06, 0.12, 0.06],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute top-1/3 left-1/3 w-14 h-14 bg-golden-olive/8 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, -10, 0],
          opacity: [0.06, 0.11, 0.06],
          scale: [1, 1.08, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-deep-maroon/8 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, -12, 0],
          opacity: [0.05, 0.1, 0.05],
          rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 3.5 }}
        className="absolute top-1/2 left-1/2 w-10 h-10 bg-copper-orange/7 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 16, 0],
          opacity: [0.05, 0.09, 0.05],
          rotate: [0, -45, -90, -135, -180, -225, -270, -315, -360]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 7 }}
        className="absolute bottom-1/2 right-1/2 w-8 h-8 bg-golden-olive/7 rounded-full blur-sm"
      ></motion.div>
      
      {/* Even more elements for maximum density - Flowing in center */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          x: [0, 8, 0],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute top-2/5 left-2/5 w-6 h-6 bg-deep-maroon/6 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 14, 0],
          x: [0, -6, 0],
          opacity: [0.04, 0.07, 0.04]
        }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 4.8 }}
        className="absolute bottom-2/5 right-2/5 w-7 h-7 bg-copper-orange/6 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, -8, 0],
          opacity: [0.03, 0.06, 0.03]
        }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 2.8 }}
        className="absolute top-1/3 right-1/3 w-5 h-5 bg-golden-olive/5 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 12, 0],
          opacity: [0.03, 0.05, 0.03]
        }}
        transition={{ duration: 23, repeat: Infinity, ease: "easeInOut", delay: 5.5 }}
        className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-deep-maroon/5 rounded-full blur-sm"
      ></motion.div>
    </section>
  )
}
