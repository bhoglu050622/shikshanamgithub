'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface BonusFeature {
  id: string
  title: string
  description: string
  iconUrl: string
  iconAlt: string
  pillText: string
  cardType: 'yellow' | 'blue'
  delay: number
}

interface BonusCardProps {
  feature: BonusFeature
}

const BonusCard = ({ feature }: BonusCardProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Preload the image
  useEffect(() => {
    const img = document.createElement('img')
    img.src = feature.iconUrl
    img.onload = () => setImageLoaded(true)
    img.onerror = () => setImageLoaded(true)
  }, [feature.iconUrl])

  const cardStyles = {
    yellow: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      pill: 'bg-orange-200 text-orange-600',
      iconBg: 'bg-orange-100'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      pill: 'bg-blue-200 text-blue-600',
      iconBg: 'bg-blue-100'
    }
  }

  const styles = cardStyles[feature.cardType]

  return (
    <div 
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
        transition: `opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${feature.delay}s, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${feature.delay}s`
      }}
    >
      {/* Ribbon */}
      <div className="absolute -top-1 -left-1 w-32 h-32 overflow-hidden z-20">
        <div className="absolute top-7 -left-7 w-32 h-5 bg-red-500 text-white text-xs font-bold text-center leading-5 transform -rotate-45 shadow-lg">
          BONUS
        </div>
      </div>

      {/* Card Content */}
      <div className={`${styles.bg} ${styles.border} border rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl`}>
        {/* Card Header */}
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
            {!imageLoaded && (
              <div className={`w-16 h-16 ${styles.iconBg} rounded-lg animate-pulse flex items-center justify-center`}>
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin opacity-50"></div>
              </div>
            )}
            <Image
              src={feature.iconUrl}
              alt={feature.iconAlt}
              width={64}
              height={64}
              className={`w-16 h-16 object-contain transition-all duration-300 icon-wobble ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://placehold.co/64x64/${feature.cardType === 'yellow' ? 'fdebd0/e67e22' : 'd6eaf8/3498db'}?text=Icon`
                setImageLoaded(true)
              }}
            />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles.pill}`}>
            {feature.pillText}
          </span>
        </div>

        {/* Card Title */}
        <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">
          {feature.title}
        </h3>

        {/* Card Description */}
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  )
}

export default function BonusFeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const bonusFeatures: BonusFeature[] = [
    {
      id: 'guna-profiler',
      title: 'Guna Profiler Tool',
      description: 'Personalized assessment to understand your dominant mental qualities',
      iconUrl: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-207.png',
      iconAlt: 'Guna Profiler Tool Icon',
      pillText: 'Interactive',
      cardType: 'yellow',
      delay: 0.4
    },
    {
      id: 'emotional-journal',
      title: 'Emotional Journal Template',
      description: 'Structured daily practice for emotional awareness and growth',
      iconUrl: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-202.png',
      iconAlt: 'Emotional Journal Template Icon',
      pillText: 'Downloadable',
      cardType: 'yellow',
      delay: 0.5
    },
    {
      id: 'whatsapp-group',
      title: 'Private WhatsApp Group',
      description: 'Connect with fellow seekers and get ongoing support',
      iconUrl: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-208.png',
      iconAlt: 'Private WhatsApp Group Icon',
      pillText: 'Community',
      cardType: 'yellow',
      delay: 0.6
    },
    {
      id: 'year-access',
      title: '1-Year Access',
      description: 'Revisit the teachings whenever you need guidance',
      iconUrl: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-210.png',
      iconAlt: '1-Year Access Icon',
      pillText: '1 Year',
      cardType: 'blue',
      delay: 0.7
    },
    {
      id: 'certificate',
      title: 'Certificate of Completion',
      description: 'Recognition of your journey through ancient wisdom',
      iconUrl: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-206.png',
      iconAlt: 'Certificate of Completion Icon',
      pillText: 'Achievement',
      cardType: 'blue',
      delay: 0.8
    },
    {
      id: 'guna-assessment',
      title: 'Guna-Based Assessment',
      description: 'A custom "Emotional Roadmap" based on your reflections.',
      iconUrl: 'https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-203-1.png',
      iconAlt: 'Guna-Based Assessment Icon',
      pillText: 'Personalized',
      cardType: 'blue',
      delay: 0.9
    }
  ]

  return (
    <>
      <style jsx>{`
        @keyframes icon-wobble-shine {
          0% {
            transform: rotate(0deg);
            filter: brightness(1);
          }
          25% {
            transform: rotate(5deg);
          }
          50% {
            filter: brightness(1.3);
          }
          75% {
            transform: rotate(-5deg);
          }
          100% {
            transform: rotate(0deg);
            filter: brightness(1);
          }
        }
        .icon-wobble:hover {
          animation: icon-wobble-shine 0.8s ease-in-out;
        }
      `}</style>
      <section 
        ref={sectionRef}
        className="py-20 bg-parchment-ivory text-slate-800"
      >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-12 text-center">
          {/* Main Heading */}
          <h2 
            className="text-4xl font-bold text-orange-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
              transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            Exclusive Bonus Features! 🎉
          </h2>
          
          {/* Sub Heading */}
          <p 
            className="text-lg text-slate-600 max-w-2xl -mt-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
              transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
            }}
          >
            Enhanced learning tools and community support to deepen your practice
          </p>

          {/* Bonus Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
            {bonusFeatures.map((feature) => (
              <BonusCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </div>
      </section>
    </>
  )
}