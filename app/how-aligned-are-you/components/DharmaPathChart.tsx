'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ShivaResult } from '../types/shiva-alignment'
import { courseExists, getCourseBySlug } from '@/lib/courses'

interface DharmaPathChartProps {
  result: ShivaResult
  userName: string
}

interface DharmaPathData {
  name?: string
  selectedAvatar?: any
  quizResults?: any[]
  gunaResult?: any
}

export default function DharmaPathChart({ result, userName }: DharmaPathChartProps) {
  const [dharmaProfile, setDharmaProfile] = useState<DharmaPathData | null>(null)
  const [recommendedCourses, setRecommendedCourses] = useState<any[]>([])
  const [recommendedBooks, setRecommendedBooks] = useState<any[]>([])

  const generateRecommendations = useCallback((profile: DharmaPathData) => {
    const courses = []
    const books = []

    // Note: Course URLs are validated against the dynamic course registry
    // If a course doesn't exist, it will gracefully handle the missing link
    // All courses are auto-discovered from /app/courses/ directory

    // Recommendations based on Shiva alignment result
    switch (result.dominantArchetype) {
      case 'unbound':
        courses.push(
          {
            title: 'Kashmir Shaivism: Advanced Practices',
            description: 'Deepen your realization with advanced Tantric practices',
            url: '/courses/kashmir-shaivism',
            level: 'Advanced',
            duration: '12 weeks'
          },
          {
            title: 'Advaita Vedanta: Non-dual Wisdom',
            description: 'Explore the ultimate reality beyond duality',
            url: '/courses/advaita-vedanta',
            level: 'Advanced',
            duration: '10 weeks'
          }
        )
        books.push(
          {
            title: 'Spanda Karikas',
            author: 'Vasugupta',
            description: 'The fundamental text on the vibration of consciousness',
            why: 'Perfect for your advanced understanding of consciousness'
          },
          {
            title: 'I Am That',
            author: 'Nisargadatta Maharaj',
            description: 'Direct pointers to your true nature',
            why: 'Resonates with your natural state of being'
          }
        )
        break

      case 'harmonious':
        courses.push(
          {
            title: 'Emotional Intelligence with Samkhya',
            description: 'Bridge spiritual wisdom with daily emotional mastery',
            url: '/courses/emotional-intelligence-with-samkhya-darshan',
            level: 'Intermediate',
            duration: '8 weeks'
          },
          {
            title: 'Yoga Darshan: The Science of Integration',
            description: 'Learn to integrate spiritual practice with modern life',
            url: '/courses/yoga-darshan-course',
            level: 'Intermediate',
            duration: '8 weeks'
          }
        )
        books.push(
          {
            title: 'The Yoga Sutras of Patanjali',
            author: 'Patanjali',
            description: 'Classical guide to spiritual practice and integration',
            why: 'Provides practical steps for your balancing journey'
          },
          {
            title: 'The Power of Now',
            author: 'Eckhart Tolle',
            description: 'Bringing presence into everyday moments',
            why: 'Helps bridge the gap between knowing and being'
          }
        )
        break

      case 'reflective':
        courses.push(
          {
            title: 'Nyaya Darshan: Logic and Reasoning',
            description: 'Use your analytical mind as a spiritual tool',
            url: '/courses/nyaya-darshan',
            level: 'Intermediate',
            duration: '6 weeks'
          },
          {
            title: 'Prashna Upanishad: The Art of Inquiry',
            description: 'Transform intellectual seeking into direct knowing',
            url: '/courses/prashna-upanishad',
            level: 'Intermediate',
            duration: '8 weeks'
          }
        )
        books.push(
          {
            title: 'The Heart of Buddhist Meditation',
            author: 'Nyanaponika Thera',
            description: 'Move from thinking about meditation to experiencing it',
            why: 'Helps transition from intellectual understanding to direct experience'
          },
          {
            title: 'The Wisdom of Insecurity',
            author: 'Alan Watts',
            description: 'Embrace the unknown with intellectual elegance',
            why: 'Speaks to your philosophical nature while encouraging surrender'
          }
        )
        break

      case 'awakener':
        courses.push(
          {
            title: 'Samkhya Darshan: Understanding Duality',
            description: 'Learn to work skillfully with the forces of nature',
            url: '/courses/samkhya-darshan',
            level: 'Beginner',
            duration: '6 weeks'
          },
          {
            title: 'Yoga Darshan: The Science of Letting Go',
            description: 'Transform control into conscious surrender',
            url: '/courses/yoga-darshan',
            level: 'Intermediate',
            duration: '8 weeks'
          }
        )
        books.push(
          {
            title: 'Letting Go: The Pathway of Surrender',
            author: 'David R. Hawkins',
            description: 'A practical guide to releasing control',
            why: 'Directly addresses your core challenge of control and surrender'
          },
          {
            title: 'The Untethered Soul',
            author: 'Michael A. Singer',
            description: 'Freedom from the voice in your head',
            why: 'Helps you understand the difference between control and conscious choice'
          }
        )
        break

      case 'emerging':
        courses.push(
          {
            title: 'Gentle Introduction to Sanskrit',
            description: 'Reconnect with the sacred through language',
            url: '/courses/sanskrit-course',
            level: 'Beginner',
            duration: '4 weeks'
          },
          {
            title: 'Isha Upanishad: Finding Your Center',
            description: 'Gentle exploration of your essential nature',
            url: '/courses/isha-upanishad',
            level: 'Beginner',
            duration: '6 weeks'
          }
        )
        books.push(
          {
            title: 'The Body Keeps the Score',
            author: 'Bessel van der Kolk',
            description: 'Understanding trauma and healing',
            why: 'Provides compassionate understanding of your protective patterns'
          },
          {
            title: 'Refuge Recovery',
            author: 'Refuge Recovery Community',
            description: 'Buddhist approach to healing and recovery',
            why: 'Offers gentle, non-judgmental tools for emerging from protective states'
          }
        )
        break
    }

    // Add recommendations based on Guna profile if available
    if (profile.gunaResult) {
      const dominantGuna = profile.gunaResult.dominantGuna
      if (dominantGuna === 'sattva') {
        courses.push({
          title: 'Advanced Meditation Practices',
          description: 'Deepen your natural sattvic clarity',
          url: '/courses/meditation-advanced',
          level: 'Advanced',
          duration: '10 weeks'
        })
      } else if (dominantGuna === 'rajas') {
        courses.push({
          title: 'Karma Yoga: Action in Stillness',
          description: 'Channel your dynamic energy skillfully',
          url: '/courses/karma-yoga',
          level: 'Intermediate',
          duration: '8 weeks'
        })
      } else if (dominantGuna === 'tamas') {
        courses.push({
          title: 'Grounding and Stability Practices',
          description: 'Transform inertia into powerful presence',
          url: '/courses/grounding-practices',
          level: 'Beginner',
          duration: '6 weeks'
        })
      }
    }

    setRecommendedCourses(courses.slice(0, 4)) // Limit to 4 courses
    setRecommendedBooks(books.slice(0, 4)) // Limit to 4 books
  }, [result])

  useEffect(() => {
    // Load guna profiler result
    const storedResult = localStorage.getItem('guna-profiler-result')
    if (storedResult) {
      try {
        const profile = JSON.parse(storedResult)
        setDharmaProfile(profile)
        generateRecommendations(profile)
      } catch (error) {
        console.error('Error loading guna profile:', error)
      }
    }
  }, [result, generateRecommendations])

  const getJourneySteps = () => {
    const steps = []
    
    if (dharmaProfile?.selectedAvatar) {
      steps.push({
        title: 'Avatar Selection',
        description: `Chose ${dharmaProfile.selectedAvatar.name} as spiritual guide`,
        icon: dharmaProfile.selectedAvatar.symbol,
        status: 'completed'
      })
    }

    if (dharmaProfile?.gunaResult) {
      steps.push({
        title: 'Guna Profile',
        description: `Discovered ${dharmaProfile.gunaResult.archetype} nature`,
        icon: '⚖️',
        status: 'completed'
      })
    }

    steps.push({
      title: 'Shiva Consciousness',
      description: `Revealed as ${result.archetype}`,
      icon: '🕉️',
      status: 'completed'
    })

    steps.push({
      title: 'Integrated Practice',
      description: 'Apply insights in daily life',
      icon: '🌟',
      status: 'next'
    })

    return steps
  }

  const journeySteps = getJourneySteps()

  return (
    <div className="mb-12">
      {/* Journey Visualization */}
      <div 
        className="p-6 rounded-xl mb-8"
        style={{
          background: 'hsla(240, 30%, 8%, 0.3)',
          border: '1px solid hsla(240, 20%, 25%, 0.5)'
        }}
      >
        <h4 
          className="text-2xl font-bold text-center mb-6"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'hsl(24, 85%, 53%)'
          }}
        >
          Your Dharma Path Journey
        </h4>

        {/* Journey Steps */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {journeySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col items-center p-4 rounded-xl border-2 ${
                step.status === 'completed' 
                  ? 'border-green-500 bg-green-500/10' 
                  : step.status === 'next'
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-gray-500 bg-gray-500/10'
              }`}
            >
              <div className="text-3xl mb-2">{step.icon}</div>
              <h5 
                className="font-semibold text-center mb-1"
                style={{ color: 'hsl(50, 90%, 95%)' }}
              >
                {step.title}
              </h5>
              <p 
                className="text-sm text-center"
                style={{ color: 'hsl(50, 30%, 70%)' }}
              >
                {step.description}
              </p>
              {step.status === 'completed' && (
                <div className="mt-2 text-green-400">✓</div>
              )}
              {step.status === 'next' && (
                <div className="mt-2 text-yellow-400">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div 
        className="p-6 rounded-xl mb-8"
        style={{
          background: 'hsla(240, 30%, 8%, 0.3)',
          border: '1px solid hsla(240, 20%, 25%, 0.5)'
        }}
      >
        <h4 
          className="text-2xl font-bold text-center mb-6"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'hsl(24, 85%, 53%)'
          }}
        >
          Recommended Courses for {userName}
        </h4>
        
        <div className="grid md:grid-cols-2 gap-6">
          {recommendedCourses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg border transition-all duration-300 hover:scale-105"
              style={{
                background: 'hsla(43, 45%, 58%, 0.05)',
                border: '1px solid hsla(43, 45%, 58%, 0.2)'
              }}
            >
              <h5 
                className="text-xl font-bold mb-2"
                style={{ color: 'hsl(43, 45%, 58%)' }}
              >
                {course.title}
              </h5>
              <p 
                className="text-sm mb-4"
                style={{ color: 'hsl(50, 90%, 95%)' }}
              >
                {course.description}
              </p>
              <div className="flex justify-between items-center text-xs mb-4">
                <span style={{ color: 'hsl(50, 30%, 70%)' }}>Level: {course.level}</span>
                <span style={{ color: 'hsl(50, 30%, 70%)' }}>Duration: {course.duration}</span>
              </div>
              <div 
                className="text-sm p-3 rounded border-l-4"
                style={{
                  background: 'hsla(24, 85%, 53%, 0.1)',
                  borderColor: 'hsl(24, 85%, 53%)',
                  color: 'hsl(50, 30%, 70%)'
                }}
              >
                <strong style={{ color: 'hsl(24, 85%, 53%)' }}>Why this helps:</strong> {course.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended Books */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'hsla(240, 30%, 8%, 0.3)',
          border: '1px solid hsla(240, 20%, 25%, 0.5)'
        }}
      >
        <h4 
          className="text-2xl font-bold text-center mb-6"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'hsl(24, 85%, 53%)'
          }}
        >
          Recommended Books for {userName}
        </h4>
        
        <div className="grid md:grid-cols-2 gap-6">
          {recommendedBooks.map((book, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg border transition-all duration-300 hover:scale-105"
              style={{
                background: 'hsla(43, 45%, 58%, 0.05)',
                border: '1px solid hsla(43, 45%, 58%, 0.2)'
              }}
            >
              <h5 
                className="text-xl font-bold mb-1"
                style={{ color: 'hsl(43, 45%, 58%)' }}
              >
                {book.title}
              </h5>
              <p 
                className="text-sm mb-3"
                style={{ color: 'hsl(24, 85%, 53%)' }}
              >
                by {book.author}
              </p>
              <p 
                className="text-sm mb-4"
                style={{ color: 'hsl(50, 90%, 95%)' }}
              >
                {book.description}
              </p>
              <div 
                className="text-sm p-3 rounded border-l-4"
                style={{
                  background: 'hsla(24, 85%, 53%, 0.1)',
                  borderColor: 'hsl(24, 85%, 53%)',
                  color: 'hsl(50, 30%, 70%)'
                }}
              >
                <strong style={{ color: 'hsl(24, 85%, 53%)' }}>Why this helps:</strong> {book.why}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Integration Insights */}
      {dharmaProfile?.gunaResult && (
        <div 
          className="mt-8 p-6 rounded-xl"
          style={{
            background: 'hsla(140, 30%, 20%, 0.3)',
            border: '1px solid hsla(140, 40%, 30%, 0.5)'
          }}
        >
          <h4 
            className="text-xl font-bold text-center mb-4"
            style={{
              fontFamily: "'Cinzel', serif",
              color: 'hsl(140, 60%, 70%)'
            }}
          >
            Integration Insights: Guna + Shiva Consciousness
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold mb-2" style={{ color: 'hsl(43, 45%, 58%)' }}>
                Your Guna Profile: {dharmaProfile.gunaResult.archetype}
              </h5>
              <p className="text-sm" style={{ color: 'hsl(50, 90%, 95%)' }}>
                Dominant Guna: {dharmaProfile.gunaResult.dominantGuna.charAt(0).toUpperCase() + dharmaProfile.gunaResult.dominantGuna.slice(1)} ({dharmaProfile.gunaResult.percentages[dharmaProfile.gunaResult.dominantGuna]}%)
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2" style={{ color: 'hsl(43, 45%, 58%)' }}>
                Your Shiva Alignment: {result.archetype}
              </h5>
              <p className="text-sm" style={{ color: 'hsl(50, 90%, 95%)' }}>
                Consciousness Level: {result.percentage}% aligned
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded" style={{ background: 'hsla(140, 40%, 30%, 0.2)' }}>
            <p className="text-sm" style={{ color: 'hsl(50, 30%, 70%)' }}>
              <strong style={{ color: 'hsl(140, 60%, 70%)' }}>Integration Insight:</strong> Your {dharmaProfile.gunaResult.dominantGuna} nature combined with {result.archetype} consciousness suggests a path that balances {dharmaProfile.gunaResult.dominantGuna === 'sattva' ? 'wisdom with action' : dharmaProfile.gunaResult.dominantGuna === 'rajas' ? 'energy with stillness' : 'stability with growth'}. This unique combination is your spiritual signature.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
