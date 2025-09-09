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
import { useScrollAnimations, useStaggeredAnimations } from '@/lib/hooks/useProgressiveAnimations'

const ctaButtons = [
  {
    title: 'Sanskrit',
    description: 'Discover Language',
    icon: BookOpen,
    color: 'from-golden-olive to-golden-olive/90',
    hoverColor: 'from-golden-olive/90 to-golden-olive/80',
    href: '#sanskrit',
    stats: '500+ Students',
    emoji: '📖',
  },
  {
    title: 'Darshan',
    description: 'Explore Philosophy',
    icon: Lightbulb,
    color: 'from-deep-maroon to-deep-maroon/90',
    hoverColor: 'from-deep-maroon/90 to-deep-maroon/80',
    href: '#schools',
    stats: '12 Schools',
    emoji: '🕉',
  },
  {
    title: 'Self-help',
    description: 'Transform Yourself',
    icon: Heart,
    color: 'from-copper-orange to-copper-orange/90',
    hoverColor: 'from-copper-orange/90 to-copper-orange/80',
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
  
  // Progressive animations
  const titleRef = useScrollAnimations('fadeIn', { delay: 200 })
  const subtitleRef = useScrollAnimations('slideUp', { delay: 400 })
  const statsRef = useStaggeredAnimations('fadeIn', 150, { delay: 600 })
  const ctaRef = useStaggeredAnimations('scaleIn', 200, { delay: 800 })

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section id="home" className="section-padding relative min-h-screen flex items-center bg-parchment-ivory transition-colors duration-300">
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
            
            {/* Slow-rotating mandala with golden olive color */}
            <Mandala 
              size={300} 
              className="top-20 left-10 opacity-20 dark:opacity-10 text-golden-olive" 
              speed={60}
            />
            <Mandala 
              size={200} 
              className="bottom-20 right-10 opacity-15 dark:opacity-8 text-golden-olive" 
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
        
        {/* Enhanced background gradients with Shikshanam colors */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-golden-olive/10 via-deep-maroon/8 to-copper-orange/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-deep-maroon/10 via-copper-orange/8 to-golden-olive/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-copper-orange/10 via-golden-olive/8 to-deep-maroon/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-4000"></div>
        
        {/* Indian pattern overlay */}
        <div className="absolute inset-0 indian-pattern opacity-30 dark:opacity-20"></div>
      </div>

      <div className="container-custom text-center relative z-10">
        <StaggerContainer className="space-y-readable">
          <StaggerItem>
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4 text-golden-olive">
                <Sparkles className="w-6 h-6 animate-pulse" />
                <Flower className="w-8 h-8 animate-bounce" />
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 ref={titleRef} className="text-mobile-hero text-high-contrast mb-6 sm:mb-8 text-shadow-sm">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-golden-olive via-deep-maroon to-copper-orange bg-clip-text text-transparent">
                Eternal India
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p ref={subtitleRef} className="text-mobile-subheading text-medium-contrast mb-12 sm:mb-16 max-w-4xl sm:max-w-5xl mx-auto devanagari-separator text-readable">
              Discover Wisdom, Language & Self-Transformation
            </p>
          </StaggerItem>

          {/* Quick Stats */}
          <StaggerItem>
            <div ref={statsRef} className="flex justify-center mb-8 sm:mb-12">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={`quick-stat-${stat.label}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-2 sm:space-x-3 text-high-contrast"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-golden-olive to-golden-olive/90 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold text-high-contrast">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-medium-contrast">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div ref={ctaRef} className="grid-cards-featured max-w-6xl mx-auto mb-16 sm:mb-20">
              {ctaButtons.map((button, index) => (
                <MotionWrapper
                  key={`cta-button-${button.title}`}
                  variant="micro-scale"
                  delay={0.4 + index * 0.1}
                  className="group cursor-pointer relative tap-target"
                >
                  <a href={button.href} className="block focus-visible-enhanced">
                    <div className={`bg-gradient-to-br ${button.color} hover:${button.hoverColor} card-featured text-white transition-all duration-500 shadow-2xl hover:shadow-3xl border border-white/10 card-premium group-hover:scale-105 group-hover:-translate-y-2 focus-visible-enhanced hover-lift-smooth`}>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500 relative overflow-hidden">
                        <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                          {button.emoji}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                      
                      <h3 className="text-mobile-display mb-2 sm:mb-3 group-hover:text-white transition-colors duration-300 text-shadow-sm">
                        {button.title}
                      </h3>
                      
                      <p className="text-white mb-3 sm:mb-4 text-mobile-body group-hover:text-white transition-colors duration-300 text-readable">
                        {button.description}
                      </p>
                      
                      <div className="text-white/90 text-responsive-sm mb-4 sm:mb-6 group-hover:text-white transition-colors duration-300">
                        {button.stats}
                      </div>
                      
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-white group-hover:text-white transition-all duration-300">
                        <span className="text-responsive-xs font-semibold tracking-wide">Let Us Guide You</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </a>
                </MotionWrapper>
              ))}
            </div>
          </StaggerItem>

          {/* Call to Action Buttons */}
          <StaggerItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-shikshanam-primary flex items-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto justify-center focus-ring tap-target hover-lift-smooth"
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Watch Demo</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-shikshanam-outline flex items-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto justify-center focus-ring tap-target hover-lift-smooth"
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Join Community</span>
              </motion.button>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <span className="text-medium-contrast text-responsive-xs tracking-wide uppercase">
                Scroll to explore
              </span>
              
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 sm:w-7 sm:h-12 border-2 border-golden-olive rounded-full flex justify-center relative group cursor-pointer tap-target"
              >
                <motion.div
                  animate={{ y: [0, 18, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-3 sm:w-1.5 sm:h-4 bg-gradient-to-b from-golden-olive to-deep-maroon rounded-full mt-1.5 sm:mt-2"
                />
              </motion.div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
