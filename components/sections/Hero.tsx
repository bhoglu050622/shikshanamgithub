'use client'

import { motion } from 'framer-motion'
import { BookOpen, Sparkles, Flower, Users, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '../motion/MotionWrapper'
import { useScrollAnimations, useStaggeredAnimations } from '@/lib/hooks/useProgressiveAnimations'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'
import { API_CONFIG, logApiCall } from '@/lib/config/api'

interface HeroData {
  title: string
  subtitle: string
  ctaButtons: {
    sanskrit: { text: string; link: string }
    darshan: { text: string; link: string }
    lifeSkills: { text: string; link: string }
  }
}

export default function Hero() {
  const mounted = useHydrationSafeAnimation()
  const [heroData, setHeroData] = useState<HeroData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const apiUrl = API_CONFIG.getCmsApiUrl('content')
        logApiCall(apiUrl, 'GET')
        
        const response = await fetch(apiUrl)
        const result = await response.json()
        console.log('Hero API Response:', result)
        if (result.success && result.data.hero) {
          console.log('Setting hero data:', result.data.hero)
          setHeroData(result.data.hero)
        } else {
          console.log('No hero data found in response')
        }
      } catch (error) {
        console.error('Failed to fetch hero data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroData()
  }, [])
  
  // Progressive animations
  const titleRef = useScrollAnimations('fadeIn', { delay: 200 })
  const subtitleRef = useScrollAnimations('slideUp', { delay: 400 })
  const statsRef = useStaggeredAnimations('fadeIn', 150, { delay: 600 })
  const ctaRef = useStaggeredAnimations('scaleIn', 200, { delay: 800 })

  
  return (
    <section id="home" className="section-padding relative min-h-screen flex items-center bg-background transition-colors duration-300">
      <div className="container-custom text-center relative z-20">
        <StaggerContainer className="space-y-readable">
          <StaggerItem>
            <div className="flex justify-center mb-8">
              {mounted ? (
                <motion.div 
                  className="flex items-center space-x-4 text-brand-primary"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-6 h-6 animate-glow" />
                  </motion.div>
                  <motion.div
                    animate={{ 
                      y: [-3, 3, -3]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Flower className="w-8 h-8 animate-pulse-slow" />
                  </motion.div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <Sparkles className="w-6 h-6 animate-glow" />
                  </motion.div>
                </motion.div>
              ) : (
                <div className="flex items-center space-x-4 text-golden-olive">
                  <Sparkles className="w-6 h-6 animate-glow" />
                  <Flower className="w-8 h-8 animate-pulse-slow" />
                  <Sparkles className="w-6 h-6 animate-glow" />
                </div>
              )}
            </div>
          </StaggerItem>

          <StaggerItem>
            {loading ? (
              <div className="text-mobile-hero text-high-contrast mb-6 sm:mb-8 text-shadow-sm">
                <div className="animate-pulse bg-gray-300 h-12 w-96 mx-auto rounded"></div>
              </div>
            ) : mounted ? (
              <motion.h1 
                ref={titleRef} 
                className="text-mobile-hero text-high-contrast mb-6 sm:mb-8 text-shadow-sm"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {heroData?.title || "Welcome to Shikshanam (Fallback)"}
              </motion.h1>
            ) : (
              <h1 
                ref={titleRef} 
                className="text-mobile-hero text-high-contrast mb-6 sm:mb-8 text-shadow-sm"
              >
                {heroData?.title || "Welcome to Shikshanam (Fallback)"}
              </h1>
            )}
          </StaggerItem>

          <StaggerItem>
            {loading ? (
              <div className="text-mobile-subheading text-high-contrast mb-12 sm:mb-16 max-w-4xl sm:max-w-5xl mx-auto devanagari-separator text-readable">
                <div className="animate-pulse bg-gray-300 h-6 w-80 mx-auto rounded"></div>
              </div>
            ) : mounted ? (
              <motion.p 
                ref={subtitleRef} 
                className="text-mobile-subheading text-high-contrast mb-12 sm:mb-16 max-w-4xl sm:max-w-5xl mx-auto devanagari-separator text-readable"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="inline">{heroData?.subtitle || "Where AI meets Ancient India"}</span>
                </motion.span>
              </motion.p>
            ) : (
              <p 
                ref={subtitleRef} 
                className="text-mobile-subheading text-high-contrast mb-12 sm:mb-16 max-w-4xl sm:max-w-5xl mx-auto devanagari-separator text-readable"
              >
                <span className="inline">{heroData?.subtitle || "Where AI meets Ancient India"}</span>
              </p>
            )}
          </StaggerItem>

          {/* Quick Stats removed as requested */}

          <StaggerItem>
            <motion.h2 
              initial={mounted ? { opacity: 0, y: 20, scale: 0.9 } : false}
              animate={mounted ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
              transition={mounted ? { delay: 0.8, duration: 0.8 } : { duration: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-serif text-high-contrast mb-12 sm:mb-16 text-shadow-sm"
            >
              <motion.span
                animate={mounted ? { 
                  textShadow: [
                    '0 0 0px rgba(218, 165, 32, 0)',
                    '0 0 20px rgba(218, 165, 32, 0.3)',
                    '0 0 0px rgba(218, 165, 32, 0)'
                  ]
                } : { textShadow: '0 0 0px rgba(218, 165, 32, 0)' }}
                transition={mounted ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
              >
                <span className="inline">What do you seek?</span>
              </motion.span>
            </motion.h2>
          </StaggerItem>

          <StaggerItem>
            <div ref={ctaRef} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-16 md:mb-20 w-full max-w-sm md:max-w-none mx-auto px-4 md:px-0">
              <motion.button
                initial={mounted ? { opacity: 0, x: -50 } : false}
                animate={mounted ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                transition={mounted ? { delay: 1, duration: 0.6 } : { duration: 0 }}
                whileHover={mounted ? { 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(218, 165, 32, 0.3)"
                } : {}}
                whileTap={mounted ? { scale: 0.95 } : {}}
                onClick={() => {
                  const sanskritSchool = document.getElementById('school-of-sanskrit');
                  if (sanskritSchool) {
                    sanskritSchool.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center',
                      inline: 'nearest'
                    });
                    // Add temporary highlight effect
                    sanskritSchool.style.transition = 'box-shadow 0.3s ease';
                    sanskritSchool.style.boxShadow = '0 0 30px rgba(218, 165, 32, 0.6)';
                    setTimeout(() => {
                      sanskritSchool.style.boxShadow = '';
                    }, 3000);
                  }
                }}
                className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground px-6 md:px-8 py-4 rounded-2xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/20 hover:border-primary/40 relative overflow-hidden cursor-pointer no-underline w-full md:w-auto"
              >
                <motion.span 
                  className="relative z-10"
                  animate={mounted ? { textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 10px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0)'] } : { textShadow: '0 0 0px rgba(255,255,255,0)' }}
                  transition={mounted ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
                >
                  <span className="inline">{heroData?.ctaButtons?.sanskrit?.text || "School of Sanskrit"}</span>
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  initial={mounted ? { x: '-100%' } : { x: '-100%' }}
                  whileHover={mounted ? { x: '100%' } : {}}
                  transition={{ duration: 0.7 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100"
                  transition={mounted ? { duration: 0.3 } : { duration: 0 }}
                />
              </motion.button>
              
              <motion.button
                initial={mounted ? { opacity: 0, y: 50 } : false}
                animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={mounted ? { delay: 1.2, duration: 0.6 } : { duration: 0 }}
                whileHover={mounted ? { 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(139, 69, 19, 0.3)"
                } : {}}
                whileTap={mounted ? { scale: 0.95 } : {}}
                onClick={() => {
                  const darshanSchool = document.getElementById('school-of-darshan');
                  if (darshanSchool) {
                    darshanSchool.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center',
                      inline: 'nearest'
                    });
                    // Add temporary highlight effect
                    darshanSchool.style.transition = 'box-shadow 0.3s ease';
                    darshanSchool.style.boxShadow = '0 0 30px rgba(139, 69, 19, 0.6)';
                    setTimeout(() => {
                      darshanSchool.style.boxShadow = '';
                    }, 3000);
                  }
                }}
                className="group bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 text-secondary-foreground px-6 md:px-8 py-4 rounded-2xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-secondary/20 hover:border-secondary/40 relative overflow-hidden cursor-pointer no-underline w-full md:w-auto"
              >
                <motion.span 
                  className="relative z-10"
                  animate={mounted ? { textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 10px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0)'] } : { textShadow: '0 0 0px rgba(255,255,255,0)' }}
                  transition={mounted ? { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 } : { duration: 0 }}
                >
                  <span className="inline">{heroData?.ctaButtons?.darshan?.text || "School of Darshan"}</span>
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  initial={mounted ? { x: '-100%' } : { x: '-100%' }}
                  whileHover={mounted ? { x: '100%' } : {}}
                  transition={{ duration: 0.7 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-0 group-hover:opacity-100"
                  transition={mounted ? { duration: 0.3 } : { duration: 0 }}
                />
              </motion.button>
              
              <motion.button
                initial={mounted ? { opacity: 0, x: 50 } : false}
                animate={mounted ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                transition={mounted ? { delay: 1.4, duration: 0.6 } : { duration: 0 }}
                whileHover={mounted ? { 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(255, 140, 0, 0.3)"
                } : {}}
                whileTap={mounted ? { scale: 0.95 } : {}}
                onClick={() => {
                  const lifeSkillsSchool = document.getElementById('school-of-life-skills');
                  if (lifeSkillsSchool) {
                    lifeSkillsSchool.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center',
                      inline: 'nearest'
                    });
                    // Add temporary highlight effect
                    lifeSkillsSchool.style.transition = 'box-shadow 0.3s ease';
                    lifeSkillsSchool.style.boxShadow = '0 0 30px rgba(255, 140, 0, 0.6)';
                    setTimeout(() => {
                      lifeSkillsSchool.style.boxShadow = '';
                    }, 3000);
                  }
                }}
                className="group bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-accent-foreground px-6 md:px-8 py-4 rounded-2xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-accent/20 hover:border-accent/40 relative overflow-hidden cursor-pointer no-underline w-full md:w-auto"
              >
                <motion.span 
                  className="relative z-10"
                  animate={mounted ? { textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 10px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0)'] } : { textShadow: '0 0 0px rgba(255,255,255,0)' }}
                  transition={mounted ? { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 } : { duration: 0 }}
                >
                  <span className="inline">{heroData?.ctaButtons?.lifeSkills?.text || "School of Life Skills"}</span>
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  initial={mounted ? { x: '-100%' } : { x: '-100%' }}
                  whileHover={mounted ? { x: '100%' } : {}}
                  transition={{ duration: 0.7 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100"
                  transition={mounted ? { duration: 0.3 } : { duration: 0 }}
                />
              </motion.button>
            </div>
          </StaggerItem>


        </StaggerContainer>
      </div>
    </section>
  )
}
