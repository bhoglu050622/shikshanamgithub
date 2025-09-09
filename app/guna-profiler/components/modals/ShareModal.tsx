'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { GunaResult } from '../../types/guna-profiler'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  result: GunaResult
}

export default function ShareModal({ isOpen, onClose, result }: ShareModalProps) {
  const getShareText = () => {
    const siteUrl = "https://shikshanam.in/guna-profiler/"
    return `I just discovered my Vedic personality type on the Guṇa Profiler! My result: ${result.gunaTraitCode} (${result.archetype}). Find out yours! ${siteUrl}`
  }

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getShareText())
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const handleTwitterShare = () => {
    const text = encodeURIComponent(getShareText())
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://shikshanam.in/guna-profiler/")
      // You could add a toast notification here
      alert('Link copied to clipboard!')
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = "https://shikshanam.in/guna-profiler/"
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        alert('Link copied to clipboard!')
      } catch (err) {
        alert('Could not copy link')
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative mx-auto p-5 border w-full max-w-sm shadow-lg rounded-2xl bg-white"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Share Your Results</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppShare}
                className="w-full flex items-center justify-center padding-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                WhatsApp
              </button>
              
              <button
                onClick={handleTwitterShare}
                className="w-full flex items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <i className="fab fa-twitter mr-2"></i>
                X / Twitter
              </button>
              
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center p-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
              >
                <i className="fas fa-link mr-2"></i>
                Copy Link
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
