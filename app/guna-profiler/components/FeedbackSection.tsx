'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FeedbackSectionProps {
  feedbackRating: number
  setFeedbackRating: (rating: number) => void
}

export default function FeedbackSection({ feedbackRating, setFeedbackRating }: FeedbackSectionProps) {
  const [comments, setComments] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleStarClick = (rating: number) => {
    setFeedbackRating(rating)
  }

  const handleSubmit = () => {
    if (feedbackRating === 0 && !comments.trim()) {
      alert('Please select a rating or enter a comment.')
      return
    }

    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { rating: feedbackRating, comments })
    
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setComments('')
      setFeedbackRating(0)
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-green-50 border border-green-200 p-6 rounded-lg shadow-md text-center"
      >
        <i className="fas fa-check-circle text-3xl text-green-600 mb-3"></i>
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">Your feedback has been submitted successfully.</p>
      </motion.div>
    )
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-700 mb-2 text-center">
        Share Your Feedback
      </h3>
      <p className="text-gray-600 mb-4 text-center">
        How was your experience? Your feedback helps us improve.
      </p>
      
      {/* Star Rating */}
      <div className="flex justify-center space-x-2 my-4">
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
                  s.classList.remove('text-gray-300')
                } else {
                  s.classList.add('text-gray-300')
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
                  s.classList.remove('text-gray-300')
                } else {
                  s.classList.add('text-gray-300')
                  s.classList.remove('text-yellow-400')
                }
              })
            }}
            className="text-2xl transition-colors duration-200 hover:scale-110 transform"
          >
            <i 
              className={`feedback-star ${
                star <= feedbackRating ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'
              }`}
            ></i>
          </button>
        ))}
      </div>
      
      {/* Comments */}
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg resize-none"
        rows={4}
        placeholder="Your comments..."
      />
      
      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-3 rounded-lg transition-colors duration-200 w-full sm:w-auto"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  )
}
