'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Lightbulb, Heart, Sparkles, Flower, Play, Users, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import Mandala from '../ornaments/Mandala'
import PeacockFeather from '../ornaments/PeacockFeather'
import GlyphParticles from '../ornaments/GlyphParticles'
import Rangoli from '../ornaments/Rangoli'
import DynamicLotus3D from '../3d/DynamicLotus3D'
import DynamicYantra3D from '../3d/DynamicYantra3D'
import MotionWrapper, { StaggerContainer, StaggerItem } from '../motion/MotionWrapper'

const ctaButtons = [
  {
    title: 'Sanskrit',
    description: 'Discover Language',
    icon: BookOpen,
    color: 'from-saffron-500 to-saffron-600',
    hoverColor: 'from-saffron-600 to-saffron-700',
    href: '#sanskrit',
    stats: '500+ Students',
    emoji: '📖',
  },
  {
    title: 'Darshan',
    description: 'Explore Philosophy',
    icon: Lightbulb,
    color: 'from-deep-teal-500 to-deep-teal-600',
    hoverColor: 'from-deep-teal-600 to-deep-teal-700',
    href: '#schools',
    stats: '12 Schools',
    emoji: '🕉',
  },
  {
    title: 'Self-help',
    description: 'Transform Yourself',
    icon: Heart,
    color: 'from-indigo-500 to-indigo-600',
    hoverColor: 'from-indigo-600 to-indigo-700',
    href: '#gurus',
    stats: '50+ Gurus',
    emoji: '🌱',
  },
]

const quickStats = [
  { icon: Users, label: 'Active Students', value: '2,500+' },
  { icon: Award, label: 'Certified Gurus', value: '50+' },
  { icon: BookOpen, label: 'Courses', value: '100+' },
]

export default function Hero() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section id="home" className="section-padding relative min-h-screen flex items-center bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      {/* Background Ornaments */}
      <div className="absolute inset-0 -z-10">
        {/* 3D Elements - Only render on client */}
        {isClient && (
          <>
            <div className="absolute top-20 right-20 opacity-30">
              <DynamicLotus3D />
            </div>
            <div className="absolute bottom-20 left-20 opacity-25">
              <DynamicYantra3D />
            </div>
            
            {/* Slow-rotating mandala */}
            <Mandala 
              size={300} 
              className="top-20 left-10 opacity-20 dark:opacity-10" 
              speed={60}
            />
            <Mandala 
              size={200} 
              className="bottom-20 right-10 opacity-15 dark:opacity-8" 
              speed={80}
            />
            
            {/* Parallax peacock feathers */}
            <PeacockFeather 
              size={120} 
              className="top-40 right-20 opacity-25 dark:opacity-15" 
              parallax={true}
            />
            <PeacockFeather 
              size={100} 
              className="bottom-40 left-20 opacity-20 dark:opacity-12" 
              parallax={true}
            />
            
            {/* Glyph particles */}
            <GlyphParticles count={18} className="opacity-60 dark:opacity-40" />
          </>
        )}
        
        {/* Enhanced background gradients */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-deep-teal-200/15 to-indigo-200/20 dark:from-saffron-400/10 dark:via-deep-teal-400/8 dark:to-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-deep-teal-200/20 via-indigo-200/15 to-saffron-200/20 dark:from-deep-teal-400/10 dark:via-indigo-400/8 dark:to-saffron-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-indigo-200/20 via-saffron-200/15 to-deep-teal-200/20 dark:from-indigo-400/10 dark:via-saffron-400/8 dark:to-deep-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-4000"></div>
        
        {/* Indian pattern overlay */}
        <div className="absolute inset-0 indian-pattern opacity-30 dark:opacity-20"></div>
      </div>

      <div className="container-custom text-center relative z-10">
        <StaggerContainer className="space-y-8">
          <StaggerItem>
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4 text-saffron-500">
                <Sparkles className="w-6 h-6 animate-pulse" />
                <Flower className="w-8 h-8 animate-bounce" />
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 className="text-hero text-high-contrast mb-8">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 dark:from-saffron-500 dark:via-deep-teal-500 dark:to-indigo-500 bg-clip-text text-transparent">
                Eternal India
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-subheading text-medium-contrast mb-16 max-w-5xl mx-auto devanagari-separator">
              Discover Wisdom, Language & Self-Transformation
            </p>
          </StaggerItem>

          {/* Quick Stats */}
          <StaggerItem>
            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap justify-center gap-8">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={`quick-stat-${stat.label}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-3 text-medium-contrast"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-saffron-600 dark:from-saffron-400 dark:to-saffron-500 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-high-contrast">{stat.value}</div>
                      <div className="text-sm text-wisdom-500 dark:text-wisdom-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
              {ctaButtons.map((button, index) => (
                <MotionWrapper
                  key={`cta-button-${button.title}`}
                  variant="micro-scale"
                  delay={0.4 + index * 0.1}
                  className="group cursor-pointer relative tap-target"
                >
                  <a href={button.href} className="block">
                    <div className={`bg-gradient-to-br ${button.color} hover:${button.hoverColor} p-10 rounded-3xl text-white transition-all duration-500 shadow-2xl hover:shadow-3xl border border-white/10 card-premium group-hover:scale-105 group-hover:-translate-y-2`}>
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500 relative overflow-hidden">
                        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                          {button.emoji}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                      
                      <h3 className="text-display mb-3 group-hover:text-white transition-colors duration-300">
                        {button.title}
                      </h3>
                      
                      <p className="text-white mb-4 text-body group-hover:text-white transition-colors duration-300">
                        {button.description}
                      </p>
                      
                      <div className="text-white/80 text-sm mb-6 group-hover:text-white/90 transition-colors duration-300">
                        {button.stats}
                      </div>
                      
                      <div className="flex items-center justify-center space-x-3 text-white group-hover:text-white transition-all duration-300">
                        <span className="text-small font-semibold tracking-wide">Let Us Guide You</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </a>
                </MotionWrapper>
              ))}
            </div>
          </StaggerItem>

          {/* Call to Action Buttons */}
          <StaggerItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-3 px-8 py-4 text-lg"
              >
                <Play className="w-6 h-6" />
                <span>Watch Demo</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center space-x-3 px-8 py-4 text-lg"
              >
                <Users className="w-6 h-6" />
                <span>Join Community</span>
              </motion.button>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col items-center space-y-4">
              <span className="text-medium-contrast text-small font-medium tracking-wide uppercase">
                Scroll to explore
              </span>
              
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-7 h-12 border-2 border-saffron-500 dark:border-saffron-400 rounded-full flex justify-center relative group cursor-pointer tap-target"
              >
                <motion.div
                  animate={{ y: [0, 18, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-4 bg-gradient-to-b from-saffron-500 to-deep-teal-500 dark:from-saffron-400 dark:to-deep-teal-400 rounded-full mt-2"
                />
              </motion.div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
