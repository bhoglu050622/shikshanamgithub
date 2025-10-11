'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { CourseTheme } from '@/lib/course-themes'
import { useState, useEffect } from 'react'

interface CourseCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  features?: string[]
  duration?: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
  price?: string
  instructor?: string
  rating?: number
  studentsCount?: number
  onClick?: () => void
  className?: string
  variant?: 'default' | 'featured' | 'compact'
}

export default function CourseCard({
  title,
  description,
  icon,
  features = [],
  duration,
  level,
  price,
  instructor,
  rating,
  studentsCount,
  onClick,
  className = '',
  variant = 'default'
}: CourseCardProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !theme) {
    return <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
  }

  const getCardClasses = () => {
    const baseClasses = 'relative overflow-hidden transition-all duration-300 cursor-pointer group'
    
    switch (theme.layout.cardStyle) {
      case 'traditional':
        return `${baseClasses} rounded-2xl border-2 shadow-lg hover:shadow-2xl transform hover:scale-[1.02]`
      case 'minimal':
        return `${baseClasses} rounded-lg border shadow-sm hover:shadow-lg`
      case 'modern':
      default:
        return `${baseClasses} rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02]`
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'featured':
        return 'p-8'
      case 'compact':
        return 'p-4'
      case 'default':
      default:
        return 'p-6'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' }
      case 'Intermediate':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' }
      case 'Advanced':
        return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${getCardClasses()} ${getVariantClasses()} ${className}`}
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${theme.gradients.card})`,
        borderColor: theme.colors.primary + '20',
        color: theme.colors.text
      }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.colors.accent} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${theme.gradients.button})`
                }}
              >
                {icon}
              </div>
            )}
            <div>
              <h3 
                className={`text-lg font-bold ${theme.typography.heading} line-clamp-2`}
                style={{ color: theme.colors.text }}
              >
                {title}
              </h3>
              {instructor && (
                <p className="text-sm opacity-70 mt-1">by {instructor}</p>
              )}
            </div>
          </div>
          
          {level && (
            <span 
              className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(level).bg} ${getLevelColor(level).text} ${getLevelColor(level).border} border`}
            >
              {level}
            </span>
          )}
        </div>

        {/* Description */}
        <p 
          className={`text-sm ${theme.typography.body} line-clamp-3 leading-relaxed`}
          style={{ color: theme.colors.muted }}
        >
          {description}
        </p>

        {/* Features */}
        {features.length > 0 && (
          <div className="space-y-2">
            <ul className="space-y-1">
              {features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm">
                  <div 
                    className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                  <span style={{ color: theme.colors.muted }}>{feature}</span>
                </li>
              ))}
            </ul>
            {features.length > 3 && (
              <p 
                className="text-xs font-medium"
                style={{ color: theme.colors.accent }}
              >
                +{features.length - 3} more features
              </p>
            )}
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            {duration && (
              <div className="flex items-center gap-1 opacity-70">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{duration}</span>
              </div>
            )}
            {studentsCount && (
              <div className="flex items-center gap-1 opacity-70">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>{studentsCount.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          {rating && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 fill-current" style={{ color: theme.colors.accent }} viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="font-medium">{rating}</span>
            </div>
          )}
        </div>

        {/* Price and CTA */}
        {(price || onClick) && (
          <div className="flex items-center justify-between pt-2 border-t border-opacity-20" style={{ borderColor: theme.colors.primary }}>
            {price && (
              <div 
                className="text-xl font-bold"
                style={{ color: theme.colors.accent }}
              >
                {price}
              </div>
            )}
            
            <button
              className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${theme.gradients.button})`,
                color: theme.colors.text
              }}
            >
              View Details
            </button>
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary})`
        }}
      />
    </motion.div>
  )
}