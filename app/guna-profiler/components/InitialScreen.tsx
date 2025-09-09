'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { testimonials } from '../data/questions'

interface InitialScreenProps {
  onStartQuiz: () => void
  userName: string
}

export default function InitialScreen({ onStartQuiz, userName }: InitialScreenProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [reportCount, setReportCount] = useState(0)
  const [footfallVisible, setFootfallVisible] = useState(false)
  const [footfallText, setFootfallText] = useState('')

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Report counter animation
  useEffect(() => {
    const target = 15000
    const duration = 1000
    const increment = target / (duration / 50)
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setReportCount(target)
        clearInterval(timer)
      } else {
        setReportCount(Math.floor(current))
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  // Footfall notifications
  useEffect(() => {
    const names = ["Aman", "Priya", "Rahul", "Anjali", "Vikram", "Sunita", "Deepak", "Pooja", "Rajesh", "Kavita"]
    const cities = ["Mumbai", "Delhi", "Bengaluru", "Kolkata", "Chennai", "Pune", "Hyderabad", "Ahmedabad", "Jaipur", "Lucknow"]
    const events = [
      { text: "just started the assessment.", icon: "🎯" },
      { text: "discovered they are a Balanced Leader (SRT).", icon: "⚖️" },
      { text: "is exploring their results.", icon: "🔍" },
      { text: "just left a 5-star review!", icon: "⭐" }
    ]

    const showFootfall = () => {
      const name = names[Math.floor(Math.random() * names.length)]
      const city = cities[Math.floor(Math.random() * cities.length)]
      const event = events[Math.floor(Math.random() * events.length)]
      
      setFootfallText(`${event.icon} ${name} from ${city} ${event.text}`)
      setFootfallVisible(true)
      
      setTimeout(() => setFootfallVisible(false), 4500)
    }

    const timer = setTimeout(() => {
      showFootfall()
      const interval = setInterval(showFootfall, 6000)
      return () => clearInterval(interval)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* Header */}
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text mb-3">
          Guṇa Profiler
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Discover your inner nature through ancient Vedic wisdom.
        </p>
      </header>

      {/* Main Content */}
      <section className="bg-white shadow-xl rounded-lg p-6 sm:p-8 border-t-4 border-orange-500 mb-8">
        <p className="text-lg text-gray-700 mb-6 text-center">
          If you are on a quest for peace, balance, and spiritual insight, our Guṇa Profiler will simplify your journey.
        </p>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center justify-center gap-2">
            What You'll Discover:
          </h3>
          <ul className="list-none space-y-2 text-gray-600 max-w-md mx-auto">
            <li className="flex items-start">
              🔹 Your Nature: Understand the unique mix of Sattva, Rajas, and Tamas in your personality.
            </li>
            <li className="flex items-start">
              🔹 Personal Insights: See how this combination of the three Guṇas influences your thoughts, decisions, and emotions.
            </li>
            <li className="flex items-start">
              🔹 Path to Balance: Receive simple, practical tips related to diet, colors, daily activities, etc., to support your self-development and balance.
            </li>
          </ul>
        </div>

        {/* Dynamic Testimonial */}
        <div className="text-center mb-8">
          <motion.blockquote
            key={currentTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-md italic shadow-sm max-w-md mx-auto mb-4"
          >
            <p>{testimonials[currentTestimonial].text}</p>
            <footer className="text-right text-sm mt-2">
              {testimonials[currentTestimonial].author}
            </footer>
          </motion.blockquote>
        </div>

        {/* Report Counter */}
        <div className="text-center mb-8">
          <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-800 p-4 rounded-md shadow-sm max-w-sm mx-auto">
            <div className="text-sm font-medium">Total Journeys Decoded</div>
            <motion.div
              className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text"
              animate={{ scale: reportCount === 15000 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {reportCount.toLocaleString()}+
            </motion.div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={onStartQuiz}
            className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 w-full sm:w-auto font-semibold text-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            🔸 Begin My Journey!
          </button>
        </div>
      </section>

      {/* Footfall Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: footfallVisible ? 1 : 0,
          y: footfallVisible ? 0 : 20
        }}
        className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50 max-w-sm"
      >
        {footfallText}
      </motion.div>
    </motion.div>
  )
}
