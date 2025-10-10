'use client'

import { ReactNode } from 'react'

interface DecorativeBorderProps {
  children: ReactNode
  variant?: 'lotus' | 'mandala' | 'paisley' | 'simple'
  color?: 'gold' | 'orange' | 'pink' | 'purple'
  thickness?: 'thin' | 'medium' | 'thick'
  corners?: boolean
  className?: string
}

export default function DecorativeBorder({ 
  children, 
  variant = 'lotus', 
  color = 'gold', 
  thickness = 'medium',
  corners = true,
  className = ''
}: DecorativeBorderProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'gold': return 'text-yellow-400 border-yellow-400/50'
      case 'orange': return 'text-orange-500 border-orange-500/50'
      case 'pink': return 'text-pink-500 border-pink-500/50'
      case 'purple': return 'text-purple-500 border-purple-500/50'
      default: return 'text-yellow-400 border-yellow-400/50'
    }
  }

  const getThicknessClasses = () => {
    switch (thickness) {
      case 'thin': return 'border'
      case 'medium': return 'border-2'
      case 'thick': return 'border-4'
      default: return 'border-2'
    }
  }

  const getCornerOrnament = () => {
    if (!corners) return null

    const cornerSize = thickness === 'thick' ? 'w-8 h-8' : thickness === 'medium' ? 'w-6 h-6' : 'w-4 h-4'
    
    switch (variant) {
      case 'lotus':
        return (
          <>
            {/* Top Left */}
            <div className={`absolute -top-2 -left-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2L13.09 8.26L20 7L14.74 12L20 17L13.09 15.74L12 22L10.91 15.74L4 17L9.26 12L4 7L10.91 8.26L12 2Z" />
              </svg>
            </div>
            {/* Top Right */}
            <div className={`absolute -top-2 -right-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2L13.09 8.26L20 7L14.74 12L20 17L13.09 15.74L12 22L10.91 15.74L4 17L9.26 12L4 7L10.91 8.26L12 2Z" />
              </svg>
            </div>
            {/* Bottom Left */}
            <div className={`absolute -bottom-2 -left-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2L13.09 8.26L20 7L14.74 12L20 17L13.09 15.74L12 22L10.91 15.74L4 17L9.26 12L4 7L10.91 8.26L12 2Z" />
              </svg>
            </div>
            {/* Bottom Right */}
            <div className={`absolute -bottom-2 -right-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2L13.09 8.26L20 7L14.74 12L20 17L13.09 15.74L12 22L10.91 15.74L4 17L9.26 12L4 7L10.91 8.26L12 2Z" />
              </svg>
            </div>
          </>
        )
      case 'mandala':
        return (
          <>
            {/* Top Left */}
            <div className={`absolute -top-2 -left-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>
            {/* Top Right */}
            <div className={`absolute -top-2 -right-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>
            {/* Bottom Left */}
            <div className={`absolute -bottom-2 -left-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>
            {/* Bottom Right */}
            <div className={`absolute -bottom-2 -right-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>
          </>
        )
      case 'paisley':
        return (
          <>
            {/* Top Left */}
            <div className={`absolute -top-2 -left-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
              </svg>
            </div>
            {/* Top Right */}
            <div className={`absolute -top-2 -right-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
              </svg>
            </div>
            {/* Bottom Left */}
            <div className={`absolute -bottom-2 -left-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
              </svg>
            </div>
            {/* Bottom Right */}
            <div className={`absolute -bottom-2 -right-2 ${cornerSize} ${getColorClasses()}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
              </svg>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`relative ${getThicknessClasses()} ${getColorClasses().split(' ')[1]} rounded-lg bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border-dashed`}>
        {getCornerOrnament()}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
