'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FeedbackSectionProps {
  feedbackRating: number
  setFeedbackRating: (rating: number) => void
  userName: string
  archetype: string
}

export default function FeedbackSection({ 
  feedbackRating, 
  setFeedbackRating, 
  userName, 
  archetype 
}: FeedbackSectionProps) {
  const [comments, setComments] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleStarClick = (rating: number) => {
    setFeedbackRating(rating)
    setShowForm(true)
  }

  const handleSubmit = () => {
    // Store feedback in localStorage
    const feedbackData = {
      rating: feedbackRating,
      comments,
      userName,
      archetype,
      timestamp: new Date().toISOString()
    }
    
    try {
      // Get existing feedback or create new array
      const existingFeedback = localStorage.getItem('shiva-alignment-feedback')
      const feedbackArray = existingFeedback ? JSON.parse(existingFeedback) : []
      
      // Add new feedback
      feedbackArray.push(feedbackData)
      
      // Save back to localStorage
      localStorage.setItem('shiva-alignment-feedback', JSON.stringify(feedbackArray))
      
      console.log('Feedback stored in localStorage:', feedbackData)
    } catch (error) {
      console.error('Error storing feedback in localStorage:', error)
    }
    
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setComments('')
      setFeedbackRating(0)
      setShowForm(false)
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 text-center"
      >
        <div 
          className="p-6 rounded-lg inline-block"
          style={{
            background: 'hsla(140, 60%, 20%, 0.3)',
            border: '1px solid hsla(140, 60%, 30%, 0.5)',
            color: 'hsl(140, 60%, 70%)'
          }}
        >
          <i className="text-3xl mb-3 block">✓</i>
          <h3 className="text-xl font-bold mb-2">Thank You!</h3>
          <p>Your feedback has been received.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <section className="mt-12 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 
          className="text-3xl font-bold mb-6"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'hsl(50, 90%, 95%)'
          }}
        >
          Did you find this insightful?
        </h2>
        
        {/* Star Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => {
                // Temporarily highlight stars on hover
                const stars = document.querySelectorAll('.feedback-star')
                stars.forEach((s, index) => {
                  if (index < star) {
                    s.classList.add('text-yellow-400')
                    s.classList.remove('text-gray-500')
                  } else {
                    s.classList.add('text-gray-500')
                    s.classList.remove('text-yellow-400')
                  }
                })
              }}
              onMouseLeave={() => {
                // Restore actual rating on mouse leave
                const stars = document.querySelectorAll('.feedback-star')
                stars.forEach((s, index) => {
                  if (index < feedbackRating) {
                    s.classList.add('text-yellow-400')
                    s.classList.remove('text-gray-500')
                  } else {
                    s.classList.add('text-gray-500')
                    s.classList.remove('text-yellow-400')
                  }
                })
              }}
              className="text-4xl transition-all duration-200 hover:scale-110 transform"
            >
              <span 
                className={`feedback-star ${
                  star <= feedbackRating ? 'text-yellow-400' : 'text-gray-500'
                }`}
              >
                ★
              </span>
            </button>
          ))}
        </div>

        {feedbackRating > 0 && !showForm && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              color: 'hsl(43, 45%, 58%)',
              fontStyle: 'italic'
            }}
          >
            Thank you for your feedback!
          </motion.p>
        )}

        {/* Feedback Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 rounded-lg mb-4 min-h-24 transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  background: 'hsla(240, 20%, 15%, 0.8)',
                  border: '1px solid hsl(240, 20%, 25%)',
                  color: 'hsl(50, 90%, 95%)'
                }}
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'hsl(43, 45%, 58%)',
                  color: 'hsl(260, 50%, 8%)'
                }}
              >
                Submit Feedback
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
