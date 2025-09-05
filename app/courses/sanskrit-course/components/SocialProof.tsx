'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Star, Award, BookOpen } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: '+',
    label: 'Students Learned',
    sublabel: 'छात्रों ने सीखा',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '/5',
    label: 'Rating',
    sublabel: 'रेटिंग',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Award,
    value: 95,
    suffix: '%',
    label: 'Success Rate',
    sublabel: 'सफलता दर',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: BookOpen,
    value: 12,
    suffix: '+',
    label: 'Years Experience',
    sublabel: 'साल का अनुभव',
    color: 'from-purple-500 to-purple-600'
  }
]

const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  decimals = 0 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  decimals?: number 
}) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      setIsVisible(true)
      let startTime: number
      let animationFrame: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = end * easeOutQuart
        
        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}{suffix}
    </span>
  )
}

export default function SocialProof() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h2
          id="social-proof-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display text-indigo-900 dark:text-wisdom-50"
        >
          Our Success Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          Numbers speak for our quality and student satisfaction
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center space-y-4">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                  className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Counter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-3xl font-bold text-indigo-900 dark:text-wisdom-50"
                >
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    decimals={stat.value === 4.9 ? 1 : 0}
                  />
                </motion.div>

                {/* Label */}
                <div className="space-y-1">
                  <p className="font-semibold text-indigo-800 dark:text-wisdom-100">
                    {stat.label}
                  </p>
                  <p className="text-sm text-indigo-600 dark:text-wisdom-400 font-devanagari">
                    {stat.sublabel}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Testimonial Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center max-w-4xl mx-auto"
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-saffron-50 to-saffron-100 dark:from-saffron-900/20 dark:to-saffron-800/20">
          <CardContent className="p-8">
            <blockquote className="text-lg text-indigo-800 dark:text-wisdom-100 italic leading-relaxed">
              "I never thought I could learn Sanskrit so easily. Learning in English made everything clear and understandable."
            </blockquote>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">P</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-indigo-900 dark:text-wisdom-50">Priya Sharma</p>
                <p className="text-sm text-indigo-600 dark:text-wisdom-400">Sanskrit Student</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Partner Logos Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-sm text-indigo-600 dark:text-wisdom-400 mb-4">
          Trusted by our partners
        </p>
        <div className="flex items-center justify-center gap-8 opacity-60">
          {/* Placeholder for partner logos */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-20 h-12 bg-gray-200 dark:bg-wisdom-700 rounded flex items-center justify-center"
            >
              <span className="text-xs text-gray-500 dark:text-wisdom-400">Logo {i}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
