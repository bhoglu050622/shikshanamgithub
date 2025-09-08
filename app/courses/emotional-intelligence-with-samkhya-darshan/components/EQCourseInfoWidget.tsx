'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCardProps {
  target: number
  suffix: string
  description: string
  color: 'red' | 'blue' | 'green'
  delay: number
}

const StatCard = ({ target, suffix, description, color, delay }: StatCardProps) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
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
      { threshold: 0.5 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const animationDuration = 2000 // 2 seconds
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)
      const currentValue = Math.floor(progress * target)
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    // Add delay for staggered animation
    const timer = setTimeout(animate, delay)
    return () => clearTimeout(timer)
  }, [isVisible, target, delay])

  const colorClasses = {
    red: 'text-red-500',
    blue: 'text-blue-500', 
    green: 'text-green-500'
  }

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-3xl shadow-lg p-8 text-center flex-1 min-w-[220px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
      }}
    >
      <p className={`text-4xl font-bold mb-2 leading-none ${colorClasses[color]}`}>
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-base text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default function EQCourseInfoWidget() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Main Information Card */}
      <div 
        className="bg-white rounded-3xl shadow-lg p-12 text-center mb-8"
        style={{
          opacity: 0,
          animation: 'fadeInUp 0.8s ease-out forwards'
        }}
      >
        <h1 className="text-4xl font-bold text-slate-800 leading-tight mb-3">
          Emotional Intelligence through the Lens of Vedic Sāṅkhya
        </h1>
        <p className="text-lg font-semibold text-red-500 mb-8">
          Decode Your Mind with India's oldest Psychological Science
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <span className="px-5 py-2 rounded-full text-sm font-semibold bg-orange-100 text-orange-600 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
            16 Modules
          </span>
          <span className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-600 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
            1yr Access
          </span>
          <span className="px-5 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-600 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
            Guaranteed Results
          </span>
          <span className="px-5 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-600 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
            Sequential Path Learning
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        <StatCard
          target={100000}
          suffix="+"
          description="Monthly Active Learners"
          color="red"
          delay={200}
        />
        <StatCard
          target={500}
          suffix="K+"
          description="Minutes Learned Monthly"
          color="blue"
          delay={400}
        />
        <StatCard
          target={95}
          suffix="%"
          description="Success Rate<br/>Student satisfaction"
          color="green"
          delay={600}
        />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 1.5rem 1rem;
          }
          .info-card {
            padding: 2rem;
          }
          .course-title {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          .stats-container {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  )
}
