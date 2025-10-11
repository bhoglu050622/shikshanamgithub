'use client'

import Image from 'next/image'

interface InstructorCardProps {
  name: string
  title: string
  description: string
  image: string
  credentials?: string[]
  socialStats?: {
    followers?: number
    students?: number
    rating?: number
  }
  videoThumbnail?: string
  videoId?: string
  theme?: string
  className?: string
}

export default function InstructorCard({
  name,
  title,
  description,
  image,
  credentials = [],
  socialStats,
  videoThumbnail,
  videoId,
  theme = 'default',
  className = ''
}: InstructorCardProps) {
  function getThemeColors(theme: string) {
    const colors = {
      'chanakya': {
        accent: 'text-orange-600',
        background: 'bg-orange-50',
        border: 'border-orange-200'
      },
      'samkhya': {
        accent: 'text-amber-600',
        background: 'bg-amber-50',
        border: 'border-amber-200'
      },
      'isha': {
        accent: 'text-teal-600',
        background: 'bg-teal-50',
        border: 'border-teal-200'
      },
      'prashna': {
        accent: 'text-blue-600',
        background: 'bg-blue-50',
        border: 'border-blue-200'
      },
      'sanskrit': {
        accent: 'text-amber-600',
        background: 'bg-amber-50',
        border: 'border-amber-200'
      },
      'vaisheshik': {
        accent: 'text-emerald-600',
        background: 'bg-emerald-50',
        border: 'border-emerald-200'
      },
      'yoga': {
        accent: 'text-green-600',
        background: 'bg-green-50',
        border: 'border-green-200'
      },
      'nyaya': {
        accent: 'text-purple-600',
        background: 'bg-purple-50',
        border: 'border-purple-200'
      },
      'default': {
        accent: 'text-gray-600',
        background: 'bg-gray-50',
        border: 'border-gray-200'
      }
    }
    return colors[theme as keyof typeof colors] || colors.default
  }

  const themeColors = getThemeColors(theme)

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image/Video Section */}
        <div className="relative h-64 lg:h-full">
          {videoId ? (
            <div className="relative w-full h-full group cursor-pointer">
              <Image
                src={videoThumbnail || image}
                alt={name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://placehold.co/400x500/FBBF24/FFFFFF?text=${name.split(' ')[0]}`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-60 transition-all duration-300">
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://placehold.co/400x500/FBBF24/FFFFFF?text=${name.split(' ')[0]}`
              }}
            />
          )}
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
            <p className={`text-lg font-medium ${themeColors.accent} mb-4`}>{title}</p>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Credentials */}
          {credentials.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Qualifications</h4>
              <ul className="space-y-2">
                {credentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm">{credential}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Stats */}
          {socialStats && (
            <div className={`${themeColors.background} ${themeColors.border} border rounded-lg p-4 mb-6`}>
              <div className="grid grid-cols-3 gap-4 text-center">
                {socialStats.followers && (
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{socialStats.followers.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Followers</div>
                  </div>
                )}
                {socialStats.students && (
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{socialStats.students.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                )}
                {socialStats.rating && (
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{socialStats.rating}</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
