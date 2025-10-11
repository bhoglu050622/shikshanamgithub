'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { CourseTheme } from '@/lib/course-themes'
import { useState, useEffect } from 'react'

interface CourseHeroProps {
  title: string
  subtitle?: string
  description: string
  instructor?: string
  duration?: string
  studentsCount?: number
  rating?: number
  price?: string
  ctaText?: string
  ctaAction?: () => void
  backgroundImage?: string
  customContent?: React.ReactNode
}

export default function CourseHero({
  title,
  subtitle,
  description,
  instructor,
  duration,
  studentsCount,
  rating,
  price,
  ctaText = "Enroll Now",
  ctaAction,
  backgroundImage,
  customContent
}: CourseHeroProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !theme) {
    return <div className="min-h-screen bg-gray-900" />
  }

  const renderParticles = () => {
    if (!theme.animations.particles) return null
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-current opacity-20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: theme.colors.accent
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    )
  }

  const renderFloatingElements = () => {
    if (!theme.animations.floating || !theme.imagery.decorativeElements) return null
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {theme.imagery.decorativeElements.slice(0, 3).map((element, i) => (
          <motion.div
            key={element}
            className="absolute text-6xl opacity-5"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
              color: theme.colors.accent
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
          >
            {getElementSymbol(element)}
          </motion.div>
        ))}
      </div>
    )
  }

  const getElementSymbol = (element: string): string => {
    const symbols: Record<string, string> = {
      'om-symbol': 'ॐ',
      'lotus-petals': '🪷',
      'cosmic-rays': '✨',
      'crown-motifs': '👑',
      'chess-patterns': '♔',
      'scroll-borders': '📜',
      'devanagari-borders': 'श्री',
      'sacred-geometry': '🔯',
      'flame-motifs': '🔥',
      'question-marks': '?',
      'spiral-patterns': '🌀',
      'wisdom-eyes': '👁',
      'script-flourishes': '✍️',
      'ink-drops': '💧',
      'manuscript-borders': '📖',
      'atom-models': '⚛️',
      'particle-trails': '✦',
      'molecular-bonds': '🔗',
      'lotus-poses': '🧘',
      'chakra-wheels': '☸️',
      'breathing-flows': '💨',
      'syllogism-trees': '🌳',
      'logic-gates': '⚡',
      'proof-chains': '🔗'
    }
    return symbols[element] || '✨'
  }

  const getLayoutClasses = () => {
    switch (theme.layout.heroStyle) {
      case 'split':
        return 'grid lg:grid-cols-2 gap-12 items-center'
      case 'centered':
        return 'text-center max-w-4xl mx-auto'
      case 'overlay':
      default:
        return 'relative z-10'
    }
  }

  const getSpacingClasses = () => {
    switch (theme.layout.spacing) {
      case 'compact':
        return 'py-16 px-4'
      case 'spacious':
        return 'py-24 px-6'
      case 'comfortable':
      default:
        return 'py-20 px-6'
    }
  }

  return (
    <section 
      className={`relative min-h-screen flex items-center overflow-hidden ${getSpacingClasses()}`}
      style={{
        background: `linear-gradient(135deg, ${theme.gradients.hero})`,
        color: theme.colors.text
      }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Animated Background Elements */}
      {renderParticles()}
      {renderFloatingElements()}

      {/* Content */}
      <div className={`container mx-auto relative z-20 ${getLayoutClasses()}`}>
        <div className="space-y-6">
          {/* Subtitle */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm font-medium tracking-wide uppercase"
              style={{ color: theme.colors.accent }}
            >
              {subtitle}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-4xl md:text-5xl lg:text-6xl ${theme.typography.heading} leading-tight`}
            style={{ color: theme.colors.text }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-lg md:text-xl ${theme.typography.body} leading-relaxed max-w-2xl`}
            style={{ color: theme.colors.muted }}
          >
            {description}
          </motion.p>

          {/* Course Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-6 text-sm"
          >
            {instructor && (
              <div className="flex items-center gap-2">
                <span className="opacity-70">Instructor:</span>
                <span className="font-medium" style={{ color: theme.colors.accent }}>
                  {instructor}
                </span>
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-2">
                <span className="opacity-70">Duration:</span>
                <span className="font-medium">{duration}</span>
              </div>
            )}
            {studentsCount && (
              <div className="flex items-center gap-2">
                <span className="opacity-70">Students:</span>
                <span className="font-medium">{studentsCount.toLocaleString()}</span>
              </div>
            )}
            {rating && (
              <div className="flex items-center gap-2">
                <span className="opacity-70">Rating:</span>
                <span className="font-medium flex items-center gap-1">
                  ⭐ {rating}
                </span>
              </div>
            )}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <button
              onClick={ctaAction}
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${theme.gradients.button})`,
                color: theme.colors.text
              }}
            >
              {ctaText}
            </button>
            
            {price && (
              <div className="text-2xl font-bold" style={{ color: theme.colors.accent }}>
                {price}
              </div>
            )}
          </motion.div>

          {/* Custom Content */}
          {customContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {customContent}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}