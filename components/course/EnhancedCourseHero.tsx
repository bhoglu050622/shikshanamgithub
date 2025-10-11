'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Play,
  Star,
  Users,
  Clock,
  Award,
  Languages,
  CheckCircle,
  Crown,
  PlayCircle,
  TrendingUp,
  Zap,
  BookOpen
} from 'lucide-react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'

interface EnhancedCourseHeroProps {
  title: string
  subtitle?: string
  description: string
  type: string
  price: string
  originalPrice?: string
  duration: string
  level: string
  language: string
  rating: number
  studentsCount: number
  features?: string[]
  image?: string
  videoPreview?: string
  onEnroll?: () => void
  onPreview?: () => void
}

export default function EnhancedCourseHero({
  title,
  subtitle,
  description,
  type,
  price,
  originalPrice,
  duration,
  level,
  language,
  rating,
  studentsCount,
  features = [],
  image,
  videoPreview,
  onEnroll,
  onPreview
}: EnhancedCourseHeroProps) {
  const [isHovered, setIsHovered] = useState(false)

  const courseStats = [
    { icon: Users, label: 'Students', value: studentsCount.toLocaleString() },
    { icon: Clock, label: 'Duration', value: duration },
    { icon: Languages, label: 'Language', value: language },
    { icon: Award, label: 'Level', value: level }
  ]

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-200/10 to-blue-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <HydrationSafeMotion
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              {/* Course Type Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Crown className="w-4 h-4" />
                {type}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
              >
                {title}
              </motion.h1>

              {/* Subtitle */}
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {subtitle}
                </motion.p>
              )}

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed"
              >
                {description}
              </motion.p>

              {/* Course Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6"
              >
                {courseStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="text-center p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <stat.icon className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                    <div className="font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Rating & Students */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{rating}</span>
                  <span className="text-gray-500 dark:text-gray-400">({studentsCount.toLocaleString()} students)</span>
                </div>
              </motion.div>

              {/* Price Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex items-center gap-4"
              >
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{price}</div>
                {originalPrice && (
                  <div className="text-xl text-gray-500 line-through">{originalPrice}</div>
                )}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button
                  onClick={onEnroll}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Enroll Now
                </Button>
                
                {videoPreview && (
                  <Button
                    variant="outline"
                    onClick={onPreview}
                    className="border-2 border-gray-300 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 py-4 px-8 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  >
                    <Play className="w-5 h-5" />
                    Preview Course
                  </Button>
                )}
              </motion.div>

              {/* Key Features */}
              {features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="pt-6"
                >
                  <div className="flex flex-wrap gap-2">
                    {features.slice(0, 4).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </HydrationSafeMotion>

          {/* Right Column - Visual */}
          <HydrationSafeMotion
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Course Visual */}
              <div 
                className="relative bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm">
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-white/70" />
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  {videoPreview && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: isHovered ? 1.1 : 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <button
                        onClick={onPreview}
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 group"
                      >
                        <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform duration-300" />
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
              </div>

              {/* Floating Elements */}
              <HydrationSafeMotion
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Trending</span>
                </div>
              </HydrationSafeMotion>

              <HydrationSafeMotion
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Fast Track</span>
                </div>
              </HydrationSafeMotion>

              {/* Additional Floating Badge */}
              <HydrationSafeMotion
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute top-1/2 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-3 shadow-lg transform -rotate-12"
              >
                <div className="text-center">
                  <div className="text-xs font-bold">BESTSELLER</div>
                  <div className="text-xs opacity-90">#{Math.floor(Math.random() * 10) + 1}</div>
                </div>
              </HydrationSafeMotion>
            </div>
          </HydrationSafeMotion>
        </div>
      </div>
    </section>
  )
}
