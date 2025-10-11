'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { useState, useEffect } from 'react'

interface CourseSectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'featured' | 'minimal'
  background?: 'transparent' | 'subtle' | 'accent'
  spacing?: 'compact' | 'comfortable' | 'spacious'
  animation?: boolean
}

export default function CourseSection({
  title,
  subtitle,
  children,
  className = '',
  variant = 'default',
  background = 'transparent',
  spacing = 'comfortable',
  animation = true
}: CourseSectionProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !theme) {
    return <div className="py-16 bg-gray-50" />
  }

  const getSpacingClasses = () => {
    switch (spacing) {
      case 'compact':
        return 'py-12 px-4'
      case 'spacious':
        return 'py-24 px-6'
      case 'comfortable':
      default:
        return 'py-16 px-6'
    }
  }

  const getBackgroundStyles = () => {
    switch (background) {
      case 'subtle':
        return {
          backgroundColor: theme.colors.background + '10',
          borderTop: `1px solid ${theme.colors.primary}20`,
          borderBottom: `1px solid ${theme.colors.primary}20`
        }
      case 'accent':
        return {
          background: `linear-gradient(135deg, ${theme.colors.primary}05, ${theme.colors.accent}05)`,
          borderTop: `1px solid ${theme.colors.accent}20`,
          borderBottom: `1px solid ${theme.colors.accent}20`
        }
      case 'transparent':
      default:
        return {}
    }
  }

  const getTitleClasses = () => {
    switch (variant) {
      case 'featured':
        return `text-3xl md:text-4xl ${theme.typography.heading} font-bold text-center`
      case 'minimal':
        return `text-xl md:text-2xl ${theme.typography.heading} font-semibold`
      case 'default':
      default:
        return `text-2xl md:text-3xl ${theme.typography.heading} font-bold text-center`
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const SectionContent = () => (
    <div className={`${getSpacingClasses()} ${className}`} style={getBackgroundStyles()}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <motion.h2
            variants={animation ? itemVariants : {}}
            className={getTitleClasses()}
            style={{ color: theme.colors.text }}
          >
            {title}
          </motion.h2>
          
          {subtitle && (
            <motion.p
              variants={animation ? itemVariants : {}}
              className={`text-lg ${theme.typography.body} text-center max-w-3xl mx-auto leading-relaxed`}
              style={{ color: theme.colors.muted }}
            >
              {subtitle}
            </motion.p>
          )}
          
          {/* Decorative Line */}
          <motion.div
            variants={animation ? itemVariants : {}}
            className="flex justify-center"
          >
            <div 
              className="w-24 h-1 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.primary})`
              }}
            />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          variants={animation ? itemVariants : {}}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )

  if (animation) {
    return (
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionContent />
      </motion.section>
    )
  }

  return (
    <section>
      <SectionContent />
    </section>
  )
}

// Specialized section components
export function CourseCurriculum({ 
  modules, 
  ...props 
}: { 
  modules: Array<{
    title: string
    description: string
    lessons: string[]
    duration?: string
  }> 
} & Omit<CourseSectionProps, 'children'>) {
  const { theme } = useTheme()

  return (
    <CourseSection {...props}>
      <div className="grid gap-6 md:gap-8">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: theme?.colors.background + '10',
              borderColor: theme?.colors.primary + '20',
              color: theme?.colors.text
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${theme?.gradients.button})`,
                    color: theme?.colors.text
                  }}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                  <p className="text-sm opacity-70">{module.description}</p>
                </div>
              </div>
              {module.duration && (
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: theme?.colors.accent + '20',
                    color: theme?.colors.accent
                  }}
                >
                  {module.duration}
                </span>
              )}
            </div>
            
            <ul className="space-y-2 ml-16">
              {module.lessons.map((lesson, lessonIndex) => (
                <li key={lessonIndex} className="flex items-center text-sm">
                  <div 
                    className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                    style={{ backgroundColor: theme?.colors.accent }}
                  />
                  <span style={{ color: theme?.colors.muted }}>{lesson}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </CourseSection>
  )
}

export function CourseFeatures({ 
  features, 
  ...props 
}: { 
  features: Array<{
    icon: React.ReactNode
    title: string
    description: string
  }> 
} & Omit<CourseSectionProps, 'children'>) {
  const { theme } = useTheme()

  return (
    <CourseSection {...props}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center space-y-4 p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: theme?.colors.background + '05',
              color: theme?.colors.text
            }}
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${theme?.gradients.button})`
              }}
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p 
              className="leading-relaxed"
              style={{ color: theme?.colors.muted }}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </CourseSection>
  )
}