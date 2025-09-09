'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CosmicEntry from './components/CosmicEntry'
import AvatarSelection from './components/AvatarSelection'
import WalkOfDharma from './components/WalkOfDharma'
import QuizGateway from './components/QuizGateway'
import PersonalDharmaDashboard from './components/PersonalDharmaDashboard'
import { DharmaPathProvider } from './context/DharmaPathContext'
import { DharmaPathData, Avatar, QuizResult } from './types/dharma-path'

export default function DharmaPathPage() {
  const [currentStep, setCurrentStep] = useState<'entry' | 'avatar' | 'walk' | 'quiz' | 'dashboard'>('entry')
  const [userProfile, setUserProfile] = useState<DharmaPathData | null>(null)

  // Load user profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('dharma-path-profile')
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile)
        setUserProfile(profile)
        // If user has completed avatar selection, go to dashboard
        if (profile.selectedAvatar && profile.quizResults && profile.quizResults.length > 0) {
          setCurrentStep('dashboard')
        } else if (profile.selectedAvatar) {
          setCurrentStep('walk')
        }
      } catch (error) {
        console.error('Error loading Dharma Path profile:', error)
      }
    }
  }, [])

  const handleStepChange = (step: typeof currentStep) => {
    setCurrentStep(step)
  }

  const handleProfileUpdate = (profile: Partial<DharmaPathData>) => {
    const updatedProfile = { ...userProfile, ...profile } as DharmaPathData
    setUserProfile(updatedProfile)
    localStorage.setItem('dharma-path-profile', JSON.stringify(updatedProfile))
  }

  const handleResetJourney = () => {
    localStorage.removeItem('dharma-path-profile')
    setUserProfile(null)
    setCurrentStep('entry')
  }

  return (
    <DharmaPathProvider>
      <div className="min-h-screen bg-gradient-to-br from-deep-indigo via-indigo-900 to-purple-900 relative overflow-hidden">
        {/* Cosmic Background Elements */}
        <div className="absolute inset-0 -z-10">
          {/* Animated stars */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-saffron-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Floating mandala patterns */}
          <div className="absolute top-20 left-20 opacity-20">
            <motion.div
              className="w-32 h-32 border border-saffron-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="absolute bottom-20 right-20 opacity-15">
            <motion.div
              className="w-48 h-48 border border-saffron-400/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-deep-indigo/50 via-transparent to-purple-900/30" />
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 'entry' && (
            <CosmicEntry 
              key="entry"
              onBegin={() => handleStepChange('avatar')}
            />
          )}
          
          {currentStep === 'avatar' && (
            <AvatarSelection
              key="avatar"
              onAvatarSelected={(avatar, profile) => {
                handleProfileUpdate({ selectedAvatar: avatar, ...profile })
                handleStepChange('walk')
              }}
            />
          )}
          
          {currentStep === 'walk' && userProfile?.selectedAvatar && (
            <WalkOfDharma
              key="walk"
              avatar={userProfile.selectedAvatar}
              onContinue={() => handleStepChange('quiz')}
            />
          )}
          
          {currentStep === 'quiz' && (
            <QuizGateway
              key="quiz"
              onQuizComplete={(results) => {
                handleProfileUpdate({ quizResults: results })
                handleStepChange('dashboard')
              }}
            />
          )}
          
          {currentStep === 'dashboard' && userProfile && (
            <PersonalDharmaDashboard
              key="dashboard"
              profile={userProfile}
              onResetJourney={handleResetJourney}
              onRetakeQuiz={() => handleStepChange('quiz')}
            />
          )}
        </AnimatePresence>
      </div>
    </DharmaPathProvider>
  )
}
