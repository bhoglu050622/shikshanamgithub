'use client'

import { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  spacing?: 'compact' | 'comfortable' | 'spacious'
  background?: 'transparent' | 'subtle' | 'accent' | 'dark'
  theme?: string
  id?: string
}

export default function SectionWrapper({ 
  children, 
  className = '',
  spacing = 'comfortable',
  background = 'transparent',
  theme = 'default',
  id
}: SectionWrapperProps) {
  const spacingClasses = {
    compact: 'py-12',
    comfortable: 'py-16',
    spacious: 'py-20'
  }

  const backgroundClasses = {
    transparent: 'bg-transparent',
    subtle: 'bg-gray-50 dark:bg-gray-900/50',
    accent: getAccentBackground(theme),
    dark: 'bg-gray-900 text-white'
  }

  function getAccentBackground(theme: string): string {
    const backgrounds = {
      'chanakya': 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      'samkhya': 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
      'isha': 'bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20',
      'prashna': 'bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20',
      'sanskrit': 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
      'vaisheshik': 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
      'yoga': 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      'nyaya': 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
      'default': 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20'
    }
    return backgrounds[theme as keyof typeof backgrounds] || backgrounds.default
  }

  return (
    <section 
      id={id}
      className={`
        ${spacingClasses[spacing]} 
        ${backgroundClasses[background]}
        ${className}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
