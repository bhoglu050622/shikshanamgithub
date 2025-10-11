'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Star, ArrowRight, Users, Award, Sparkles, Target } from 'lucide-react'
import Link from 'next/link'
import LevelSelector, { LevelType } from './LevelSelector'

// Sanskrit courses data with level categorization
const sanskritCourses = [
  {
    id: 'card-a',
    title: 'संस्कृत: प्रारंभ से संभाषण तक: Level-1: Package',
    type: 'Premium Course',
    description: 'Complete Sanskrit foundation course from basics to conversation level',
    status: 'available',
    price: '₹2,898',
    duration: '12-15 weeks',
    level: 'beginner' as LevelType,
    features: ['Grammar Fundamentals', 'Vocabulary Building', 'Conversation Practice', 'Cultural Context'],
    link: '/courses/sanskrit-bhasha-pragya'
  },
  {
    id: 'card-b',
    title: 'संस्कृत संभाषण: Speak Sanskrit Without Grammar: Level-1',
    type: 'Premium Course',
    description: 'Learn to speak Sanskrit naturally without getting bogged down by complex grammar rules',
    status: 'available',
    price: '₹399',
    duration: '4-6 weeks',
    level: 'beginner' as LevelType,
    features: ['Conversational Sanskrit', 'Practical Usage', 'Audio Lessons', 'Speaking Practice'],
    link: '/courses/sanskrit-conversation'
  },
  {
    id: 'card-c',
    title: 'संस्कृत भाषा प्रज्ञा: Advanced Sanskrit Mastery',
    type: 'Premium Course',
    description: 'Advanced Sanskrit course for intermediate learners focusing on classical texts',
    status: 'available',
    price: '₹3,999',
    duration: '16-20 weeks',
    level: 'intermediate' as LevelType,
    features: ['Classical Texts', 'Advanced Grammar', 'Literary Analysis', 'Sanskrit Composition'],
    link: '/courses/sanskrit-bhasha-pragya'
  }
]

const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }
}

const getLevelIcon = (level: string) => {
  switch (level.toLowerCase()) {
    case 'beginner': return BookOpen
    case 'intermediate': return Users
    case 'advanced': return Award
    default: return BookOpen
  }
}

export default function SanskritCourseListing() {
  const [selectedLevel, setSelectedLevel] = useState<LevelType>('beginner')

  // Filter courses based on selected level - show max 3 courses
  const filteredCourses = sanskritCourses
    .filter(course => course.level === selectedLevel)
    .slice(0, 3)

  return (
    <section id="course-cards" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Featured Sanskrit Courses
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Start your journey into the language of the gods with our carefully curated Sanskrit courses
          </p>
          
          {/* Join the School CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Link
              href="#course-cards"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-golden-olive to-deep-maroon text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              <span>Join the School</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Level Selector */}
        <LevelSelector selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCourses.map((course, index) => {
            const LevelIcon = getLevelIcon(course.level)
            
            return (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  {/* Course Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  {/* Course Meta */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getLevelColor(course.level)}`}>
                      <LevelIcon className="w-3 h-3" />
                      {course.level}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-medium">
                      {course.type}
                    </span>
                  </div>

                  {/* Course Features */}
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {course.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-golden-olive rounded-full mr-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Course Details */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        4.8
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {course.price}
                      </div>
                    </div>
                  </div>

                  {/* Course Action */}
                  <Link
                    href={course.link}
                    className="w-full bg-gradient-to-r from-golden-olive to-deep-maroon hover:from-golden-olive/90 hover:to-deep-maroon/90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105"
                  >
                    <span>View Course</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* AI Tools and View All Courses CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/personality-test"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-saffron-500 to-deep-teal-500 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <Target className="w-5 h-5" />
            <span>Explore more AI tools!</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border-2 border-golden-olive text-golden-olive hover:bg-golden-olive hover:text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <BookOpen className="w-5 h-5" />
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
