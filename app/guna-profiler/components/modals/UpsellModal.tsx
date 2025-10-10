'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface UpsellModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UpsellModal({ isOpen, onClose }: UpsellModalProps) {
  const benefits = [
    "Transform knowledge into wisdom with guided practices.",
    "Learn to manage emotions and reduce stress effectively.",
    "Build deeper, more meaningful relationships.",
    "Master decision-making for a purpose-driven life."
  ]

  const handleEnrollClick = () => {
    window.open('https://shikshanam.in/emotional-intelligence-with-samkhya-darshan/', '_blank')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative mx-auto p-6 border-0 w-full max-w-lg shadow-2xl rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #f5f3ff, #eef2ff)'
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ×
            </button>
            
            <div className="text-center">
              <i className="fas fa-rocket text-4xl text-orange-500 mb-3"></i>
              <h3 className="text-2xl font-bold text-gray-800">
                Unlock Your Full Potential
              </h3>
              <p className="text-gray-600 mt-2 mb-6">
                Your Guṇa profile is just the beginning. The 'Emotional Intelligence with Sāṅkhya' journey is your next step to mastering your inner world.
              </p>
            </div>
            
            <div className="space-y-3 text-left mb-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-800 p-4 rounded-r-lg mb-6">
              <p className="font-bold">Why Enroll Now?</p>
              <p>Understanding your Guṇas is the first step. True transformation happens when you apply this knowledge. Start today to build lasting balance and inner peace.</p>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleEnrollClick}
                className="text-white font-bold py-3 px-8 rounded-full text-lg w-full transition-all duration-300 transform hover:scale-105"
                style={{
                  background: 'linear-gradient(to right, #f97316, #fb923c)',
                  boxShadow: '0 4px 15px rgba(249, 115, 22, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.4)'
                }}
              >
                Enroll & Transform Now <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
