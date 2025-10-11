'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Crown,
  CheckCircle,
  Clock,
  Star,
  Users,
  Zap,
  Gift,
  TrendingUp,
  Shield,
  Award,
  PlayCircle,
  Download,
  Headphones,
  BookOpen,
  Video,
  FileText
} from 'lucide-react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'

interface EnhancedCoursePricingProps {
  price: string
  originalPrice?: string
  savings?: string
  features: string[]
  duration: string
  level: string
  studentsCount: number
  rating: number
  onEnroll?: () => void
  urgencyMessage?: string
  guaranteeText?: string
  bonusItems?: string[]
}

export default function EnhancedCoursePricing({
  price,
  originalPrice,
  savings,
  features,
  duration,
  level,
  studentsCount,
  rating,
  onEnroll,
  urgencyMessage = "Limited Time Offer",
  guaranteeText = "30-Day Money Back Guarantee",
  bonusItems = []
}: EnhancedCoursePricingProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const courseIncludes = [
    { icon: Video, text: "HD Video Lectures", highlight: true },
    { icon: FileText, text: "Downloadable Resources", highlight: false },
    { icon: Headphones, text: "Audio Lessons", highlight: false },
    { icon: BookOpen, text: "Course Materials", highlight: true },
    { icon: Award, text: "Certificate of Completion", highlight: true },
    { icon: Users, text: "Community Access", highlight: false },
    ...features.slice(0, 6).map(feature => ({ 
      icon: CheckCircle, 
      text: feature, 
      highlight: false 
    }))
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Crown className="w-4 h-4" />
              {urgencyMessage}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Enroll Today & Transform Your Future
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join {studentsCount.toLocaleString()} students who are already mastering ancient wisdom
            </p>
          </HydrationSafeMotion>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Pricing Card */}
            <HydrationSafeMotion
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-orange-200 dark:border-orange-800 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full"></div>

                {/* Bestseller Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                  BESTSELLER
                </div>

                <div className="relative z-10">
                  {/* Course Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-bold text-gray-900 dark:text-white">{rating}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">({studentsCount.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {duration}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-end gap-3 mb-2">
                      <div className="text-4xl font-bold text-gray-900 dark:text-white">
                        {price}
                      </div>
                      {originalPrice && (
                        <div className="text-xl text-gray-500 line-through mb-1">
                          {originalPrice}
                        </div>
                      )}
                    </div>
                    {savings && (
                      <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-bold">
                        <Gift className="w-4 h-4" />
                        Save {savings}
                      </div>
                    )}
                  </div>

                  {/* Countdown Timer */}
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-4 mb-6 text-white">
                    <div className="text-center">
                      <div className="text-sm font-medium mb-2">Offer expires in:</div>
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                          <div className="text-xs opacity-80">Hours</div>
                        </div>
                        <div className="text-xl">:</div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                          <div className="text-xs opacity-80">Minutes</div>
                        </div>
                        <div className="text-xl">:</div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                          <div className="text-xs opacity-80">Seconds</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={onEnroll}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Enroll Now - Start Learning
                  </Button>

                  {/* Guarantee */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Shield className="w-4 h-4 text-green-500" />
                    {guaranteeText}
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{studentsCount.toLocaleString()}+ Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending</span>
                    </div>
                  </div>
                </div>
              </div>
            </HydrationSafeMotion>

            {/* Right Column - What's Included */}
            <HydrationSafeMotion
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {/* Course Includes */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-orange-500" />
                    This Course Includes:
                  </h3>
                  <div className="space-y-3">
                    {courseIncludes.slice(0, 8).map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-300 ${
                          item.highlight ? 'bg-orange-50 dark:bg-orange-900/20' : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          item.highlight 
                            ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' 
                            : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className={`font-medium ${
                          item.highlight 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {item.text}
                        </span>
                        {item.highlight && (
                          <div className="ml-auto">
                            <Zap className="w-4 h-4 text-yellow-500" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bonus Items */}
                {bonusItems.length > 0 && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Gift className="w-5 h-5 text-purple-500" />
                      Bonus Materials:
                    </h3>
                    <div className="space-y-2">
                      {bonusItems.map((bonus, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          <span className="font-medium">{bonus}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Level Badge */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-bold text-lg mb-1">Course Level</div>
                  <div className="text-blue-100">{level}</div>
                </div>
              </div>
            </HydrationSafeMotion>
          </div>

          {/* Bottom CTA */}
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-orange-100 mb-6">
                Join thousands of students who have transformed their lives with ancient wisdom
              </p>
              <Button
                onClick={onEnroll}
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Start Learning Today
              </Button>
            </div>
          </HydrationSafeMotion>
        </div>
      </div>
    </section>
  )
}
