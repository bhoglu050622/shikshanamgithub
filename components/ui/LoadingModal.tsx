'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

// Temporarily disabled framer-motion dynamic imports to troubleshoot
// const MotionDiv = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.div })), { ssr: false })
// const MotionPresence = dynamic(() => import('framer-motion').then(mod => ({ default: mod.AnimatePresence })), { ssr: false })

// Simple fallback components
const MotionDiv = ({ children, className, style, ...props }: any) => (
  <div className={className} style={style} {...props}>{children}</div>
)
const MotionPresence = ({ children }: any) => <>{children}</>

interface LoadingModalProps {
  isVisible: boolean
  progress: number
  message?: string
  onComplete?: () => void
}

export function LoadingModal({ 
  isVisible, 
  progress, 
  message = "Loading your dashboard...", 
  onComplete 
}: LoadingModalProps) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    if (isVisible) {
      setDisplayProgress(0)
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible && progress > displayProgress) {
      const timer = setTimeout(() => {
        setDisplayProgress(prev => Math.min(prev + 2, progress))
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [progress, displayProgress, isVisible])

  useEffect(() => {
    if (displayProgress >= 100 && onComplete) {
      const timer = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [displayProgress, onComplete])

  return (
    <MotionPresence>
      {isVisible && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-slate-200"
          >
            {/* Header with Shikshanam branding */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                शि
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Shikshanam</h2>
              <p className="text-slate-600 text-sm">Ancient Indian Knowledge Platform</p>
            </div>

            {/* Loading message */}
            <div className="text-center mb-6">
              <p className="text-slate-700 font-medium mb-2">{message}</p>
              <p className="text-slate-500 text-sm">
                Preparing your personalized learning experience...
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Loading</span>
                <span>{Math.round(displayProgress)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <MotionDiv
                  className="h-full bg-gradient-to-r from-saffron-500 to-orange-600 rounded-full relative"
                  style={{ width: `${displayProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Shimmer effect */}
                  <MotionDiv
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                </MotionDiv>
              </div>
            </div>

            {/* Loading steps */}
            <div className="space-y-3">
              {[
                { id: 1, text: "Authenticating user", completed: displayProgress > 20 },
                { id: 2, text: "Fetching course data", completed: displayProgress > 50 },
                { id: 3, text: "Loading progress reports", completed: displayProgress > 80 },
                { id: 4, text: "Preparing recommendations", completed: displayProgress > 95 }
              ].map((step) => (
                <MotionDiv
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: step.id * 0.1 }}
                  className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
                    step.completed ? 'text-green-600' : 'text-slate-500'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    step.completed 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step.completed ? (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <div className="w-2 h-2 bg-current rounded-full" />
                    )}
                  </div>
                  <span>{step.text}</span>
                </MotionDiv>
              ))}
            </div>

            {/* Decorative elements */}
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <MotionDiv
                    key={i}
                    className="w-2 h-2 bg-saffron-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.2 
                    }}
                  />
                ))}
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </MotionPresence>
  )
}

export default LoadingModal
