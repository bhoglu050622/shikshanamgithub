'use client'

import { ReactNode } from 'react'

interface PricingCardProps {
  title: string
  subtitle?: string
  price: string
  originalPrice?: string
  savings?: string
  features: string[]
  ctaText: string
  ctaLink: string
  isHighlighted?: boolean
  badge?: string
  theme?: string
  className?: string
}

export default function PricingCard({
  title,
  subtitle,
  price,
  originalPrice,
  savings,
  features,
  ctaText,
  ctaLink,
  isHighlighted = false,
  badge,
  theme = 'default',
  className = ''
}: PricingCardProps) {
  function getThemeColors(theme: string) {
    const colors = {
      'chanakya': {
        primary: 'from-orange-600 to-red-600',
        secondary: 'from-orange-500 to-red-500',
        accent: 'text-orange-600',
        border: 'border-orange-200'
      },
      'samkhya': {
        primary: 'from-amber-600 to-yellow-600',
        secondary: 'from-amber-500 to-yellow-500',
        accent: 'text-amber-600',
        border: 'border-amber-200'
      },
      'isha': {
        primary: 'from-teal-600 to-cyan-600',
        secondary: 'from-teal-500 to-cyan-500',
        accent: 'text-teal-600',
        border: 'border-teal-200'
      },
      'prashna': {
        primary: 'from-blue-600 to-sky-600',
        secondary: 'from-blue-500 to-sky-500',
        accent: 'text-blue-600',
        border: 'border-blue-200'
      },
      'sanskrit': {
        primary: 'from-amber-600 to-orange-600',
        secondary: 'from-amber-500 to-orange-500',
        accent: 'text-amber-600',
        border: 'border-amber-200'
      },
      'vaisheshik': {
        primary: 'from-emerald-600 to-teal-600',
        secondary: 'from-emerald-500 to-teal-500',
        accent: 'text-emerald-600',
        border: 'border-emerald-200'
      },
      'yoga': {
        primary: 'from-green-600 to-emerald-600',
        secondary: 'from-green-500 to-emerald-500',
        accent: 'text-green-600',
        border: 'border-green-200'
      },
      'nyaya': {
        primary: 'from-purple-600 to-indigo-600',
        secondary: 'from-purple-500 to-indigo-500',
        accent: 'text-purple-600',
        border: 'border-purple-200'
      },
      'default': {
        primary: 'from-gray-600 to-gray-700',
        secondary: 'from-gray-500 to-gray-600',
        accent: 'text-gray-600',
        border: 'border-gray-200'
      }
    }
    return colors[theme as keyof typeof colors] || colors.default
  }

  const themeColors = getThemeColors(theme)

  return (
    <div className={`
      relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
      ${isHighlighted ? `border-${theme}-500` : themeColors.border}
      ${className}
    `}>
      {badge && (
        <div className={`
          absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold text-white
          bg-gradient-to-r ${themeColors.primary}
        `}>
          {badge}
        </div>
      )}
      
      <div className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          {subtitle && (
            <p className="text-gray-600 text-sm">{subtitle}</p>
          )}
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl font-bold text-gray-900">{price}</span>
            {originalPrice && (
              <span className="text-xl text-gray-500 line-through">{originalPrice}</span>
            )}
          </div>
          {savings && (
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${themeColors.accent} bg-${theme}-100`}>
              {savings}
            </span>
          )}
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            block w-full text-center py-3 px-6 rounded-lg font-bold text-white transition-all duration-300
            bg-gradient-to-r ${themeColors.secondary} hover:shadow-lg hover:scale-105
          `}
        >
          {ctaText}
        </a>
      </div>
    </div>
  )
}
