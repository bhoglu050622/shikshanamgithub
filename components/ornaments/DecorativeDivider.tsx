'use client'

interface DecorativeDividerProps {
  variant?: 'simple' | 'elaborate' | 'medallion'
  color?: 'gold' | 'orange' | 'pink' | 'purple'
  thickness?: 'thin' | 'medium' | 'thick'
  className?: string
}

export default function DecorativeDivider({ 
  variant = 'simple', 
  color = 'gold', 
  thickness = 'medium',
  className = ''
}: DecorativeDividerProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'gold': return 'text-yellow-400'
      case 'orange': return 'text-orange-500'
      case 'pink': return 'text-pink-500'
      case 'purple': return 'text-purple-500'
      default: return 'text-yellow-400'
    }
  }

  const getThicknessClasses = () => {
    switch (thickness) {
      case 'thin': return 'stroke-1'
      case 'medium': return 'stroke-2'
      case 'thick': return 'stroke-4'
      default: return 'stroke-2'
    }
  }

  const getDivider = () => {
    switch (variant) {
      case 'simple':
        return (
          <div className="flex items-center justify-center w-full">
            <div className={`flex-1 h-px bg-gradient-to-r from-transparent via-current to-transparent ${getColorClasses()}`}></div>
          </div>
        )
      case 'elaborate':
        return (
          <div className="flex items-center justify-center w-full">
            <div className={`flex-1 h-px bg-gradient-to-r from-transparent via-current to-transparent ${getColorClasses()}`}></div>
            <div className="mx-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={getColorClasses()}>
                <path d="M12 2L13.09 8.26L20 7L14.74 12L20 17L13.09 15.74L12 22L10.91 15.74L4 17L9.26 12L4 7L10.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className={`flex-1 h-px bg-gradient-to-r from-transparent via-current to-transparent ${getColorClasses()}`}></div>
          </div>
        )
      case 'medallion':
        return (
          <div className="flex items-center justify-center w-full">
            <div className={`flex-1 h-px bg-gradient-to-r from-transparent via-current to-transparent ${getColorClasses()}`}></div>
            <div className="mx-6">
              <div className={`w-12 h-12 rounded-full border-2 ${getColorClasses().split(' ')[1]} flex items-center justify-center bg-white/10 backdrop-blur-sm`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={getColorClasses()}>
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className={`flex-1 h-px bg-gradient-to-r from-transparent via-current to-transparent ${getColorClasses()}`}></div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {getDivider()}
    </div>
  )
}
