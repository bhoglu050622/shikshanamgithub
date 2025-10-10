'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MotionWrapper, { MotionDiv } from '@/components/motion/MotionWrapper'
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import testimonialsDataRaw from '@/data/testimonials.json'

interface TestimonialsDataType {
  testimonials?: any[];
}

const testimonialsData = (testimonialsDataRaw as TestimonialsDataType) || { testimonials: [] };
import ugcDataRaw from '@/data/ugc_content.json'

interface UGCDataType {
  userReviews?: any[];
  stats?: {
    totalStudents?: number;
    averageRating?: number;
    satisfactionRate?: number;
    communityMembers?: number;
  };
}

const ugcData = (ugcDataRaw as UGCDataType) || { userReviews: [], stats: {} };
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        // Mock data - replace with appropriate mock data for each component
        setCmsTestimonialsData({
          title: 'What Our Students Say',
          subtitle: 'Real Experiences, Real Results',
          description: 'Hear from students who have transformed their lives through our courses.',
          testimonials: [
            {
              id: 1,
              name: 'Sarah Johnson',
              role: 'Software Engineer',
              location: 'San Francisco, USA',
              course: 'Sanskrit Basics',
              text: 'The Sanskrit course exceeded my expectations. The teaching methodology is excellent and the content is comprehensive.',
              rating: 5,
              image: '/assets/testimonials/sarah.jpg',
              featured: true
            },
            {
              id: 2,
              name: 'Michael Chen',
              role: 'Yoga Instructor',
              location: 'Los Angeles, USA',
              course: 'Yoga Philosophy',
              text: 'This course deepened my understanding of yoga philosophy. The instructors are knowledgeable and passionate.',
              rating: 5,
              image: '/assets/testimonials/michael.jpg',
              featured: true
            }
          ]
        })
      } catch (error) {
        console.error('Failed to load testimonials data:', error)
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
  const allTestimonials = [...(testimonialsData?.testimonials || []), ...(ugcData?.userReviews || [])]
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
    <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden" style={{ backgroundColor: 'var(--section-testimonials-bg)' }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-testimonials-primary-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-testimonials-secondary-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-testimonials-primary-50/20 rounded-full blur-3xl"></div>
      </div>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              {sectionTitle}
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
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
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-testimonials-secondary-100 rounded-full mx-auto mb-3">
                <Users className="w-6 h-6 text-testimonials-secondary-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                {(ugcData?.stats?.totalStudents || 0).toLocaleString('en-US')}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Students</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-testimonials-secondary-100 rounded-full mx-auto mb-3">
                <Star className="w-6 h-6 text-testimonials-secondary-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                {ugcData?.stats?.averageRating || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-testimonials-secondary-100 rounded-full mx-auto mb-3">
                <Award className="w-6 h-6 text-testimonials-secondary-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                {ugcData?.stats?.satisfactionRate || 0}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-testimonials-secondary-100 rounded-full mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-testimonials-secondary-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                {(ugcData?.stats?.communityMembers || 0).toLocaleString('en-US')}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Reviews</div>
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
                <Card className="border border-gray-200/50 shadow-2xl bg-white/98 dark:bg-gray-900/95 backdrop-blur-sm">
                  <CardContent className="p-8 sm:p-12">
                    <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
                      {/* Quote Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-testimonials-secondary-100 rounded-full flex items-center justify-center">
                          <Quote className="w-8 h-8 text-testimonials-secondary-600" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start mb-4">
                          {renderStars(testimonials[currentIndex]?.rating || 0)}
                        </div>
                        
                        <blockquote className="text-lg sm:text-xl text-gray-800 dark:text-gray-100 leading-relaxed mb-6 sm:mb-8 font-medium">
                          "{testimonials[currentIndex]?.text || ''}"
                        </blockquote>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-golden-olive to-sand-beige rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {testimonials[currentIndex]?.name?.charAt(0) || '?'}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800 dark:text-gray-100">
                                {testimonials[currentIndex]?.name || 'Anonymous'}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                {testimonials[currentIndex]?.role || 'Student'}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {testimonials[currentIndex]?.location || 'India'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="hidden sm:block w-px h-12 bg-sand-beige/20"></div>
                          
                          <div className="text-center sm:text-left">
                            <div className="text-sm font-medium text-golden-olive">
                              Course Taken
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-100">
                              {testimonials[currentIndex]?.course || 'Sanskrit Course'}
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
          <div className="flex items-center justify-between mt-6 sm:mt-8">
            <Button
              variant="outline"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-gray-300 dark:border-gray-600 hover:bg-golden-olive/10 hover:border-golden-olive transition-all duration-200 p-0 focus:ring-2 focus:ring-golden-olive focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 focus:ring-2 focus:ring-golden-olive focus:ring-offset-2 ${
                    index === currentIndex
                      ? 'bg-golden-olive scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-gray-300 dark:border-gray-600 hover:bg-golden-olive/10 hover:border-golden-olive transition-all duration-200 p-0 focus:ring-2 focus:ring-golden-olive focus:ring-offset-2"
              aria-label="Next testimonial"
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
          className="mt-8 sm:mt-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6 sm:mb-8">
            More Student Reviews
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                <Card className="h-full border border-gray-200/50 bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonial?.rating || 0)}
                    </div>
                    
                    <blockquote className="text-sm text-gray-800 dark:text-gray-100 leading-relaxed mb-4 font-medium">
                      "{testimonial?.text || ''}"
                    </blockquote>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-golden-olive to-sand-beige rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">
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
