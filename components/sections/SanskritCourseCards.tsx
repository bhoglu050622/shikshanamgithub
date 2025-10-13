'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, Users, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  students: string
  rating: number
  image?: string
  url: string
}

// Sanskrit courses data
const sanskritCourses: Course[] = [
  {
    id: 'sanskrit-basics',
    title: 'Sanskrit Alphabet & Script',
    description: 'Master Devanagari script with interactive lessons and pronunciation guides',
    duration: '4 weeks',
    level: 'Beginner',
    students: '2,500+',
    rating: 4.9,
    url: '/courses/sanskrit-basics'
  },
  {
    id: 'sanskrit-grammar',
    title: 'Sanskrit Grammar Foundation',
    description: 'Essential grammar concepts, declensions, and sentence formation',
    duration: '6 weeks',
    level: 'Beginner',
    students: '1,800+',
    rating: 4.8,
    url: '/courses/sanskrit-grammar'
  },
  {
    id: 'sanskrit-conversation',
    title: 'Sanskrit Conversation Practice',
    description: 'Develop speaking skills through guided conversations',
    duration: '8 weeks',
    level: 'Intermediate',
    students: '1,200+',
    rating: 4.7,
    url: '/courses/sanskrit-conversation'
  },
  {
    id: 'sanskrit-live-class',
    title: 'Living Sanskrit - Live Classes',
    description: 'Advanced conversations and spiritual discourse with expert teachers',
    duration: '12 weeks',
    level: 'Intermediate',
    students: '800+',
    rating: 4.9,
    url: '/courses/sanskrit-live-class'
  },
  {
    id: 'vedic-sanskrit',
    title: 'Vedic Sanskrit Mastery',
    description: 'Study classical Vedic texts and understand ancient wisdom',
    duration: '10 weeks',
    level: 'Advanced',
    students: '500+',
    rating: 4.8,
    url: '/courses/vedic-sanskrit'
  }
]

interface SanskritCourseCardsProps {
  selectedLevel?: 'beginner' | 'intermediate' | null
}

export default function SanskritCourseCards({ selectedLevel }: SanskritCourseCardsProps) {
  // Filter courses based on selected level
  const filteredCourses = selectedLevel 
    ? sanskritCourses.filter(course => 
        selectedLevel === 'beginner' 
          ? course.level === 'Beginner' 
          : course.level === 'Intermediate' || course.level === 'Advanced'
      )
    : sanskritCourses.slice(0, 3) // Show first 3 if no selection

  return (
    <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display text-dark-text mb-4">
            Recommended Courses
            {selectedLevel && (
              <span className="block text-lg text-muted-gray mt-2">
                Perfect for {selectedLevel === 'beginner' ? 'Beginners' : 'Intermediate Learners'}
              </span>
            )}
          </h2>
          <p className="text-body text-muted-gray max-w-2xl mx-auto">
            Build your Sanskrit mastery with these carefully designed courses
          </p>
        </motion.div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={course.url}>
                <div className="card-premium h-full flex flex-col overflow-hidden cursor-pointer">
                  {/* Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-golden-olive to-deep-maroon flex items-center justify-center relative overflow-hidden">
                    <BookOpen className="w-20 h-20 text-white/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    
                    {/* Level Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        course.level === 'Beginner' 
                          ? 'bg-green-500 text-white' 
                          : course.level === 'Intermediate'
                            ? 'bg-orange-500 text-white'
                            : 'bg-red-500 text-white'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-dark-text mb-3 group-hover:text-golden-olive transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-muted-gray mb-4 leading-relaxed flex-1">
                      {course.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-gray mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-golden-olive font-semibold group-hover:text-deep-maroon transition-colors">
                        Learn More
                      </span>
                      <ArrowRight className="w-5 h-5 text-golden-olive group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Join the School CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-golden-olive/10 to-deep-maroon/10 rounded-2xl p-8 max-w-2xl mx-auto border border-golden-olive/20">
            <h3 className="text-2xl font-bold text-dark-text mb-4">
              Ready to Join the School?
            </h3>
            <p className="text-muted-gray mb-6">
              Start your Sanskrit journey today with our comprehensive courses and expert guidance
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Scroll to course cards
                const element = document.getElementById('course-cards')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-gradient-to-r from-golden-olive to-deep-maroon text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

