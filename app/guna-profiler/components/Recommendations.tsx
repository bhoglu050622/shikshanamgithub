'use client'

import { motion } from 'framer-motion'
import { DharmaPathData } from '../../dharma-path/types/dharma-path'
import { GunaAnalysis, CourseRecommendation, BookRecommendation } from '../types/guna-profiler'

interface RecommendationsProps {
  analysis: GunaAnalysis
  userProfile: DharmaPathData
}

export default function Recommendations({ analysis, userProfile }: RecommendationsProps) {
  const getRecommendations = (): { courses: CourseRecommendation[], books: BookRecommendation[] } => {
    const courses: CourseRecommendation[] = [
      {
        id: 'sanskrit-basics',
        title: 'Sanskrit for Beginners',
        description: 'Learn the fundamentals of Sanskrit language and script',
        href: '/courses/sanskrit-course',
        image: '/images/sanskrit-course.jpg',
        level: 'beginner',
        duration: '8 weeks',
        price: 2999
      },
      {
        id: 'emotional-intelligence',
        title: 'Emotional Intelligence with Sāṅkhya',
        description: 'Master your emotions through ancient wisdom',
        href: '/courses/emotional-intelligence-with-samkhya-darshan',
        image: '/images/emotional-intelligence.jpg',
        level: 'intermediate',
        duration: '12 weeks',
        price: 4999
      },
      {
        id: 'yoga-philosophy',
        title: 'Yoga Darshan',
        description: 'Explore the philosophical foundations of yoga',
        href: '/courses/yoga-darshan',
        image: '/images/yoga-philosophy.jpg',
        level: 'intermediate',
        duration: '10 weeks',
        price: 3999
      },
      {
        id: 'meditation-practices',
        title: 'Meditation & Mindfulness',
        description: 'Develop a consistent meditation practice',
        href: '/courses/meditation-practices',
        image: '/images/meditation.jpg',
        level: 'beginner',
        duration: '6 weeks',
        price: 1999
      }
    ]

    const books: BookRecommendation[] = [
      {
        id: 'bhagavad-gita',
        title: 'Bhagavad Gita',
        author: 'Vyasa',
        description: 'The timeless wisdom of the Gita for modern living',
        image: '/images/bhagavad-gita.jpg',
        href: '/books/bhagavad-gita',
        price: 599
      },
      {
        id: 'yoga-sutras',
        title: 'Yoga Sutras of Patanjali',
        author: 'Patanjali',
        description: 'The foundational text of classical yoga philosophy',
        image: '/images/yoga-sutras.jpg',
        href: '/books/yoga-sutras',
        price: 399
      },
      {
        id: 'inner-engineering',
        title: 'Inner Engineering',
        author: 'Sadhguru',
        description: 'A Yogi\'s Guide to Joy and Inner Peace',
        image: '/images/inner-engineering.jpg',
        href: '/books/inner-engineering',
        price: 299
      },
      {
        id: 'autobiography-yogi',
        title: 'Autobiography of a Yogi',
        author: 'Paramahansa Yogananda',
        description: 'The spiritual journey of a modern yogi',
        image: '/images/autobiography-yogi.jpg',
        href: '/books/autobiography-yogi',
        price: 499
      }
    ]

    // Filter recommendations based on dominant guna
    let filteredCourses = courses
    let filteredBooks = books

    switch (analysis.dominantGuna) {
      case 'sattva':
        filteredCourses = courses.filter(c => c.level === 'advanced' || c.id.includes('philosophy'))
        filteredBooks = books.filter(b => b.id.includes('yoga') || b.id.includes('gita'))
        break
      case 'rajas':
        filteredCourses = courses.filter(c => c.level === 'intermediate')
        filteredBooks = books.filter(b => b.id.includes('autobiography'))
        break
      case 'tamas':
        filteredCourses = courses.filter(c => c.level === 'beginner')
        filteredBooks = books.filter(b => b.id.includes('inner'))
        break
    }

    return {
      courses: filteredCourses.slice(0, 3),
      books: filteredBooks.slice(0, 3)
    }
  }

  const { courses, books } = getRecommendations()

  const getAnalysisFramework = () => {
    const dominantGuna = analysis.dominantGuna
    
    const frameworks = {
      sattva: {
        what: 'Sattvic courses focus on wisdom, clarity, and spiritual growth. These programs help you develop deeper understanding and inner peace.',
        how: 'Through philosophical study, meditation practices, and contemplative exercises, you\'ll learn to cultivate clarity and wisdom in daily life.',
        why: 'As someone with sattvic tendencies, you\'ll find fulfillment in understanding the deeper truths of existence and helping others find their path.'
      },
      rajas: {
        what: 'Rajasic courses emphasize action, achievement, and practical application. These programs help you channel your energy effectively.',
        how: 'Through structured learning, goal-setting, and practical exercises, you\'ll learn to direct your drive toward meaningful outcomes.',
        why: 'Your natural energy and ambition will be channeled into productive growth, helping you achieve your goals while maintaining balance.'
      },
      tamas: {
        what: 'Tamasic courses provide gentle, foundational learning that builds confidence and stability. These programs help you establish strong roots.',
        how: 'Through step-by-step learning, repetition, and gradual progression, you\'ll build a solid foundation for future growth.',
        why: 'Your natural stability and persistence will help you master these fundamentals, creating a strong base for continued learning.'
      }
    }

    return frameworks[dominantGuna]
  }

  const framework = getAnalysisFramework()

  return (
    <div className="space-y-8">
      {/* 3-Layer Analysis Framework */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-saffron-primary/10 to-gold-primary/10 rounded-xl p-6 border border-saffron-primary/20"
      >
        <h3 className="text-2xl font-bold text-lotus-white mb-6 text-center">
          Your Personalized Learning Path
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="text-lg font-semibold text-saffron-primary mb-3">WHAT</h4>
            <p className="text-lotus-white/80 text-sm">{framework.what}</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-3">🔄</div>
            <h4 className="text-lg font-semibold text-saffron-primary mb-3">HOW</h4>
            <p className="text-lotus-white/80 text-sm">{framework.how}</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-3">💫</div>
            <h4 className="text-lg font-semibold text-saffron-primary mb-3">WHY</h4>
            <p className="text-lotus-white/80 text-sm">{framework.why}</p>
          </div>
        </div>
      </motion.div>

      {/* Course Recommendations */}
      <div>
        <h3 className="text-2xl font-bold text-lotus-white mb-6 flex items-center gap-2">
          <span>📚</span>
          Recommended Courses
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-lotus-white/5 rounded-xl p-6 border border-lotus-white/10 hover:border-saffron-primary/30 transition-all duration-300 group"
            >
              <div className="aspect-video bg-gradient-to-br from-saffron-primary/20 to-gold-primary/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">📖</span>
              </div>
              
              <h4 className="text-lg font-semibold text-lotus-white mb-2 group-hover:text-saffron-primary transition-colors">
                {course.title}
              </h4>
              
              <p className="text-lotus-white/70 text-sm mb-4">
                {course.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-lotus-white/60 mb-4">
                <span className="capitalize">{course.level}</span>
                <span>{course.duration}</span>
                <span>₹{course.price}</span>
              </div>
              
              <a
                href={course.href}
                className="block w-full text-center py-2 bg-saffron-primary/20 hover:bg-saffron-primary/30 text-saffron-primary rounded-lg font-medium transition-all duration-300"
              >
                Explore Course
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Book Recommendations */}
      <div>
        <h3 className="text-2xl font-bold text-lotus-white mb-6 flex items-center gap-2">
          <span>📖</span>
          Recommended Books
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + courses.length) * 0.1 }}
              className="bg-lotus-white/5 rounded-xl p-6 border border-lotus-white/10 hover:border-saffron-primary/30 transition-all duration-300 group"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-saffron-primary/20 to-gold-primary/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">📚</span>
              </div>
              
              <h4 className="text-lg font-semibold text-lotus-white mb-1 group-hover:text-saffron-primary transition-colors">
                {book.title}
              </h4>
              
              <p className="text-saffron-primary text-sm mb-2">
                by {book.author}
              </p>
              
              <p className="text-lotus-white/70 text-sm mb-4">
                {book.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-lotus-white/60 mb-4">
                <span>Book</span>
                <span>₹{book.price}</span>
              </div>
              
              <a
                href={book.href}
                className="block w-full text-center py-2 bg-saffron-primary/20 hover:bg-saffron-primary/30 text-saffron-primary rounded-lg font-medium transition-all duration-300"
              >
                View Details
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-saffron-primary/20 to-gold-primary/20 rounded-xl p-8 text-center border border-saffron-primary/30"
      >
        <h3 className="text-2xl font-bold text-lotus-white mb-4">
          Ready to Begin Your Journey?
        </h3>
        <p className="text-lotus-white/80 mb-6 max-w-2xl mx-auto">
          Your Guṇa profile is just the beginning. Choose a course or book that resonates with you and start your transformation today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/courses"
            className="px-8 py-3 bg-saffron-primary hover:bg-saffron-primary/80 text-deep-indigo rounded-lg font-medium transition-all duration-300"
          >
            Browse All Courses
          </a>
          <button
            onClick={() => {
              // Check if user came from Dharma Path
              const referrer = document.referrer
              if (referrer.includes('/dharma-path')) {
                window.history.back()
              } else {
                window.location.href = '/dharma-path'
              }
            }}
            className="px-8 py-3 bg-lotus-white/10 hover:bg-lotus-white/20 text-lotus-white rounded-lg font-medium transition-all duration-300 border border-lotus-white/20"
          >
            Continue Dharma Path
          </button>
        </div>
      </motion.div>
    </div>
  )
}

