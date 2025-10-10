'use client'

interface SacredGeometryProps {
  pattern?: 'mandala' | 'yantra' | 'lotus' | 'om'
  size?: 'small' | 'medium' | 'large'
  opacity?: number
  color?: 'gold' | 'orange' | 'pink' | 'purple'
  className?: string
}

export default function SacredGeometry({ 
  pattern = 'mandala', 
  size = 'medium', 
  opacity = 0.1,
  color = 'gold',
  className = ''
}: SacredGeometryProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'w-16 h-16'
      case 'medium': return 'w-32 h-32'
      case 'large': return 'w-64 h-64'
      default: return 'w-32 h-32'
    }
  }

  const getColorClasses = () => {
    switch (color) {
      case 'gold': return 'text-yellow-400'
      case 'orange': return 'text-orange-500'
      case 'pink': return 'text-pink-500'
      case 'purple': return 'text-purple-500'
      default: return 'text-yellow-400'
    }
  }

  const getPattern = () => {
    switch (pattern) {
      case 'mandala':
        return (
          <svg viewBox="0 0 100 100" fill="currentColor" className={`${getSizeClasses()} ${getColorClasses()}`} style={{ opacity }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="5" fill="currentColor"/>
            {/* Petals */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45) * (Math.PI / 180)
              const x1 = 50 + 40 * Math.cos(angle)
              const y1 = 50 + 40 * Math.sin(angle)
              const x2 = 50 + 30 * Math.cos(angle)
              const y2 = 50 + 30 * Math.sin(angle)
              return (
                <ellipse key={i} cx={x1} cy={y1} rx="8" ry="4" fill="currentColor" transform={`rotate(${i * 45} ${x1} ${y1})`}/>
              )
            })}
          </svg>
        )
      case 'yantra':
        return (
          <svg viewBox="0 0 100 100" fill="currentColor" className={`${getSizeClasses()} ${getColorClasses()}`} style={{ opacity }}>
            {/* Outer square */}
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1"/>
            {/* Inner square */}
            <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1"/>
            {/* Center diamond */}
            <polygon points="50,15 65,50 50,85 35,50" fill="none" stroke="currentColor" strokeWidth="1"/>
            {/* Center dot */}
            <circle cx="50" cy="50" r="3" fill="currentColor"/>
            {/* Corner triangles */}
            <polygon points="10,10 25,25 10,40" fill="currentColor"/>
            <polygon points="90,10 75,25 90,40" fill="currentColor"/>
            <polygon points="10,60 25,75 10,90" fill="currentColor"/>
            <polygon points="90,60 75,75 90,90" fill="currentColor"/>
          </svg>
        )
      case 'lotus':
        return (
          <svg viewBox="0 0 100 100" fill="currentColor" className={`${getSizeClasses()} ${getColorClasses()}`} style={{ opacity }}>
            {/* Outer petals */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180)
              const x = 50 + 40 * Math.cos(angle)
              const y = 50 + 40 * Math.sin(angle)
              return (
                <ellipse key={i} cx={x} cy={y} rx="12" ry="6" fill="currentColor" transform={`rotate(${i * 30} ${x} ${y})`}/>
              )
            })}
            {/* Inner petals */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45) * (Math.PI / 180)
              const x = 50 + 25 * Math.cos(angle)
              const y = 50 + 25 * Math.sin(angle)
              return (
                <ellipse key={i} cx={x} cy={y} rx="8" ry="4" fill="currentColor" transform={`rotate(${i * 45} ${x} ${y})`}/>
              )
            })}
            {/* Center */}
            <circle cx="50" cy="50" r="8" fill="currentColor"/>
          </svg>
        )
      case 'om':
        return (
          <svg viewBox="0 0 100 100" fill="currentColor" className={`${getSizeClasses()} ${getColorClasses()}`} style={{ opacity }}>
            {/* Om symbol simplified */}
            <path d="M20 50 Q30 30 40 50 Q50 70 60 50 Q70 30 80 50" stroke="currentColor" strokeWidth="3" fill="none"/>
            <circle cx="50" cy="50" r="8" fill="currentColor"/>
            <path d="M45 45 L55 45 M45 55 L55 55" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {getPattern()}
      </div>
    </div>
  )
}
