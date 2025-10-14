'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MotionDiv } from '@/components/motion/MotionWrapper'
import { Star, Quote, Users, Award, TrendingUp, MessageCircle, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import testimonialsData from '@/data/testimonials.json'
import ugcData from '@/data/ugc_content.json'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'

interface Testimonial {
  id: number
  name: string
  role: string
  location: string
  rating: number
  text: string
  course: string
  image: string
  featured: boolean
}

interface TestimonialsSectionProps {
  showStats?: boolean
  maxTestimonials?: number
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function TestimonialsSection({ 
  showStats = true, 
  maxTestimonials = 6,
  autoPlay = true,
  autoPlayInterval = 5000
}: TestimonialsSectionProps) {
  const mounted = useHydrationSafeAnimation()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Hardcoded testimonials data
  const sectionTitle = "What Our Students Say"
  const sectionSubtitle = "Real experiences from our learning community"
  
  // Combine testimonials from both sources
  const allTestimonials = [...testimonialsData.testimonials, ...ugcData.userReviews]
  const testimonials = allTestimonials.slice(0, maxTestimonials)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-gray-900 dark:via-orange-950/20 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
          animate={mounted ? {
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={mounted ? {
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          } : {}}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"
        />
        
        {/* Decorative Sparkles */}
        {mounted && [1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${(i * 20) % 100}%`,
              top: `${(i * 15) % 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-6 h-6 text-orange-400/40" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 dark:bg-orange-900/30 backdrop-blur-sm mb-6"
          >
            <MessageCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Student Testimonials
            </span>
          </motion.div>
          
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center mx-auto">
            {sectionTitle}
          </h2>
          <p className="font-sans text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center">
            {sectionSubtitle}
          </p>
        </MotionDiv>

        {/* Stats Section */}
        {showStats && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {[
              { 
                icon: Users, 
                value: `${ugcData.stats.totalStudents.toLocaleString('en-US')}+`, 
                label: 'Students',
                color: 'from-orange-500 to-amber-500'
              },
              { 
                icon: Star, 
                value: ugcData.stats.averageRating, 
                label: 'Average Rating',
                color: 'from-amber-500 to-yellow-500'
              },
              { 
                icon: Award, 
                value: `${ugcData.stats.satisfactionRate}%`, 
                label: 'Satisfaction',
                color: 'from-orange-600 to-amber-600'
              },
              { 
                icon: TrendingUp, 
                value: ugcData.stats.communityMembers.toLocaleString('en-US'), 
                label: 'Reviews',
                color: 'from-amber-600 to-orange-600'
              }
            ].map((stat, index) => (
              <MotionDiv
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-full">
          {testimonials.map((testimonial, index) => (
            <MotionDiv
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="max-w-full"
            >
              <Card className={`h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden group relative max-w-full ${
                hoveredCard === index ? 'scale-105' : ''
              }`}>
                {/* Gradient Overlay on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <CardContent className="p-6 sm:p-8 relative z-10 max-w-full">
                  {/* Quote Icon */}
                  <div className="mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl flex items-center justify-center">
                      <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4 flex-wrap">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="font-sans text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm sm:text-base break-words overflow-wrap-anywhere hyphens-auto">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-6" />

                  {/* User Info */}
                  <div className="flex items-start gap-3 sm:gap-4 max-w-full">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mb-2 truncate">
                        {testimonial.location}
                      </div>
                      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">
                          Course Taken
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 break-words">
                          {testimonial.course}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
