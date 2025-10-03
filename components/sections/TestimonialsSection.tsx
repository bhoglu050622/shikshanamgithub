'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MotionWrapper, { MotionDiv } from '@/components/motion/MotionWrapper'
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import testimonialsData from '@/data/testimonials.json'
import ugcData from '@/data/ugc_content.json'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'
import { API_CONFIG } from '@/lib/config/api'

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

interface TestimonialsData {
  title: string;
  subtitle: string;
  description: string;
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ 
  showStats = true, 
  maxTestimonials = 6,
  autoPlay = true,
  autoPlayInterval = 5000
}: TestimonialsSectionProps) {
  const mounted = useHydrationSafeAnimation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [cmsTestimonialsData, setCmsTestimonialsData] = useState<TestimonialsData | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch CMS data
  useEffect(() => {
    const fetchTestimonialsData = async () => {
      try {
        const apiUrl = API_CONFIG.getCmsApiUrl('content')
        console.log('Fetching testimonials data from:', apiUrl)
        
        const response = await fetch(apiUrl)
        const result = await response.json()
        
        if (result.success && result.data.testimonials) {
          setCmsTestimonialsData(result.data.testimonials)
        }
      } catch (error) {
        console.error('Failed to fetch testimonials data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTestimonialsData()
  }, [])

  // Use CMS data or fallback to default
  const sectionTitle = cmsTestimonialsData?.title || "What Our Students Say"
  const sectionSubtitle = cmsTestimonialsData?.subtitle || "Real experiences from our learning community"
  const sectionDescription = cmsTestimonialsData?.description || "Hear from our students about their transformative learning experiences."
  
  // Combine testimonials from both sources
  const allTestimonials = [...testimonialsData.testimonials, ...ugcData.userReviews]
  const testimonials = allTestimonials.slice(0, maxTestimonials)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlayInterval, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
  <MotionWrapper>
    <section className="py-16 sm:py-20 bg-gradient-to-br from-sand-beige/5 to-golden-olive/5">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-light-contrast-primary mb-4 sm:mb-6">
              {sectionTitle}
            </h2>
            <p className="text-lg sm:text-xl text-light-contrast-secondary max-w-3xl mx-auto leading-relaxed">
              {sectionSubtitle}
            </p>
          </MotionDiv>
        </div>

        {/* Stats Section */}
        {showStats && (
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16"
          >
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-golden-olive/10 rounded-full mx-auto mb-3">
                <Users className="w-6 h-6 text-golden-olive" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-premium-text">
                {ugcData.stats.totalStudents.toLocaleString('en-US')}+
              </div>
              <div className="text-sm text-sand-beige">Students</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-golden-olive/10 rounded-full mx-auto mb-3">
                <Star className="w-6 h-6 text-golden-olive" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-premium-text">
                {ugcData.stats.averageRating}
              </div>
              <div className="text-sm text-sand-beige">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-golden-olive/10 rounded-full mx-auto mb-3">
                <Award className="w-6 h-6 text-golden-olive" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-premium-text">
                {ugcData.stats.satisfactionRate}%
              </div>
              <div className="text-sm text-sand-beige">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-golden-olive/10 rounded-full mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-golden-olive" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-premium-text">
                {ugcData.stats.communityMembers.toLocaleString('en-US')}
              </div>
              <div className="text-sm text-sand-beige">Reviews</div>
            </div>
          </MotionDiv>
        )}

        {/* Testimonials Carousel */}
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
            <AnimatePresence mode="wait">
              <MotionDiv
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Card className="border-0 shadow-2xl bg-white/80 dark:bg-black/20 backdrop-blur-sm">
                  <CardContent className="p-8 sm:p-12">
                    <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
                      {/* Quote Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-golden-olive/10 rounded-full flex items-center justify-center">
                          <Quote className="w-8 h-8 text-golden-olive" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start mb-4">
                          {renderStars(testimonials[currentIndex].rating)}
                        </div>
                        
                        <blockquote className="text-lg sm:text-xl text-premium-text leading-relaxed mb-6 sm:mb-8">
                          "{testimonials[currentIndex].text}"
                        </blockquote>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-golden-olive to-sand-beige rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {testimonials[currentIndex].name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-premium-text">
                                {testimonials[currentIndex].name}
                              </div>
                              <div className="text-sm text-sand-beige">
                                {testimonials[currentIndex].role}
                              </div>
                              <div className="text-xs text-sand-beige/70">
                                {testimonials[currentIndex].location}
                              </div>
                            </div>
                          </div>
                          
                          <div className="hidden sm:block w-px h-12 bg-sand-beige/20"></div>
                          
                          <div className="text-center sm:text-left">
                            <div className="text-sm font-medium text-golden-olive">
                              Course Taken
                            </div>
                            <div className="text-sm text-premium-text">
                              {testimonials[currentIndex].course}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 sm:mt-12">
            <Button
              variant="outline"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-premium-border hover:bg-golden-olive/10 hover:border-golden-olive transition-all duration-200 p-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-golden-olive scale-125'
                      : 'bg-sand-beige/30 hover:bg-sand-beige/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-premium-border hover:bg-golden-olive/10 hover:border-golden-olive transition-all duration-200 p-0"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </MotionDiv>

        {/* All Testimonials Grid */}
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
          className="mt-16 sm:mt-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-premium-text text-center mb-8 sm:mb-12">
            More Student Reviews
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.slice(1).map((testimonial, index) => (
              <MotionDiv
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 }
                }}
              >
                <Card className="h-full border-premium-border bg-white/70 dark:bg-black/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <blockquote className="text-sm text-premium-text leading-relaxed mb-4">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-golden-olive to-sand-beige rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-premium-text text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-sand-beige">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  </MotionWrapper>
  )
}
