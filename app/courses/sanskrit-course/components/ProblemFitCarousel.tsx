'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, BookOpen, Users, Clock, Award } from 'lucide-react'

const carouselData = [
  {
    id: 1,
    type: 'problem',
    icon: BookOpen,
    title: 'Sanskrit seems difficult to learn?',
    subtitle: 'संस्कृत सीखना मुश्किल लगता है?',
    description: 'Learning Sanskrit in English seems difficult and grammar is hard to understand.',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 2,
    type: 'problem',
    icon: Users,
    title: 'No proper guidance available?',
    subtitle: 'कोई मार्गदर्शन नहीं मिलता?',
    description: 'Online content is available but no one to clear doubts and provide guidance.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 3,
    type: 'solution',
    icon: BookOpen,
    title: 'Easy understanding in English',
    subtitle: 'अंग्रेजी में आसान समझ',
    description: 'Learn Sanskrit in English with clear explanations and easy-to-understand grammar.',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 4,
    type: 'solution',
    icon: Award,
    title: 'Expert guidance & certification',
    subtitle: 'विशेषज्ञ मार्गदर्शन',
    description: 'Learn from experienced teachers with 12+ years of experience and get certified.',
    color: 'from-blue-500 to-blue-600'
  }
]

export default function ProblemFitCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselData.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h2
          id="problem-fit-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display text-indigo-900 dark:text-wisdom-50"
        >
          Problem → Solution
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          We understand your problems and provide the right solutions
        </motion.p>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-wisdom-800/90 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-wisdom-800/90 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Carousel Container */}
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {carouselData.map((item, index) => (
              <div key={item.id} className="w-full flex-shrink-0 px-2">
                <Card className="h-full border-0 shadow-lg">
                  <CardContent className="p-8 text-center space-y-6">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Type Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === 'problem' 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      }`}>
                        {item.type === 'problem' ? 'Problem' : 'Solution'}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl font-semibold text-indigo-900 dark:text-wisdom-50"
                    >
                      {item.title}
                    </motion.h3>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm text-indigo-600 dark:text-wisdom-400 italic font-devanagari"
                    >
                      {item.subtitle}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-indigo-700 dark:text-wisdom-200 leading-relaxed"
                    >
                      {item.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-saffron-600 w-8'
                  : 'bg-gray-300 dark:bg-wisdom-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Keyboard Navigation Info */}
      <div className="text-center">
        <p className="text-sm text-indigo-600 dark:text-wisdom-400">
          Use ← → arrow keys or swipe to navigate
        </p>
      </div>
    </div>
  )
}
