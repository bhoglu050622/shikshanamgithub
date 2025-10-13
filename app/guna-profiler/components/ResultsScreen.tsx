'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { GunaResult } from '../types/guna-profiler'
import { saveQuizResult, getCompletedQuizzes, areAllQuizzesCompleted, getRemainingQuizzes, getQuizDisplayName, getQuizUrl } from '@/lib/quiz-tracking'
import OverviewTab from './tabs/OverviewTab'
import AnalysisTab from './tabs/AnalysisTab'
import RecommendationsTab from './tabs/RecommendationsTab'
import ColorTherapyTab from './tabs/ColorTherapyTab'
import ShareModal from './modals/ShareModal'
import UpsellModal from './modals/UpsellModal'
import FeedbackSection from './FeedbackSection'

interface ResultsScreenProps {
  result: GunaResult
  userName: string
  userEmail: string
  onResetQuiz: () => void
  feedbackRating: number
  setFeedbackRating: (rating: number) => void
}

export default function ResultsScreen({
  result,
  userName,
  userEmail,
  onResetQuiz,
  feedbackRating,
  setFeedbackRating
}: ResultsScreenProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showUpsellModal, setShowUpsellModal] = useState(false)
  const [navigationState, setNavigationState] = useState<{
    allCompleted: boolean
    remainingQuizzes: string[]
    nextQuizName: string
    nextQuizUrl: string
  } | null>(null)
  
  const router = useRouter()
  const { scores, percentages, archetype, description, dominantGuna } = result

  // Save quiz result and check navigation state
  useEffect(() => {
    if (!userEmail) return
    
    // Save the quiz result with user email
    saveQuizResult('guna-profiler', result, userName, userEmail)
    
    // Check navigation state for this user
    const allCompleted = areAllQuizzesCompleted(userEmail)
    const remainingQuizzes = getRemainingQuizzes(userEmail)
    
    setNavigationState({
      allCompleted,
      remainingQuizzes,
      nextQuizName: remainingQuizzes.length > 0 ? getQuizDisplayName(remainingQuizzes[0]) : '',
      nextQuizUrl: remainingQuizzes.length > 0 ? getQuizUrl(remainingQuizzes[0]) : ''
    })
  }, [result, userName, userEmail])

  const handleExploreCourses = () => {
    // Track CTA click and redirect to course
    window.open('https://shikshanam.in/emotional-intelligence-with-samkhya-darshan/', '_blank')
  }

  const handleNavigation = () => {
    if (navigationState?.allCompleted) {
      router.push('/my-journey')
    } else if (navigationState?.nextQuizUrl) {
      router.push(navigationState.nextQuizUrl)
    }
  }


  return (
    <div style={{ backgroundColor: '#fffbeb' }} className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-orange-600">
            Your Guṇa Profile
          </h2>
          <p className="text-md sm:text-lg text-gray-500">
            Discovered for {userName}
          </p>
        </div>

        {/* Results Container */}
        <section className="mt-8 bg-gray-50 rounded-xl shadow-2xl p-4 sm:p-6 md:p-8">
          {/* Personality Card */}
          <div 
            className="text-center text-white rounded-2xl p-8 mb-8 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            <h2 className="text-3xl font-bold mb-4">{archetype}</h2>
            <div className="text-lg font-medium bg-white bg-opacity-15 inline-block px-4 py-1 rounded-full mb-4">
              {result.gunaTraitCode}
            </div>
            <div className="text-sm opacity-80 mb-4">
              Trait Breakdown: S: {percentages.sattva}% R: {percentages.rajas}% T: {percentages.tamas}%
            </div>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto opacity-90">
              {description}
            </p>
          </div>

          {/* Guna Scores Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {[
              { 
                guna: 'sattva', 
                label: 'Sattva', 
                icon: '☀️', 
                color: 'amber',
                bgColor: 'bg-amber-500',
                textColor: 'text-amber-600',
                borderColor: 'border-amber-500'
              },
              { 
                guna: 'rajas', 
                label: 'Rajas', 
                icon: '🔥', 
                color: 'pink',
                bgColor: 'bg-pink-500',
                textColor: 'text-pink-600',
                borderColor: 'border-pink-500'
              },
              { 
                guna: 'tamas', 
                label: 'Tamas', 
                icon: '🌙', 
                color: 'violet',
                bgColor: 'bg-violet-500',
                textColor: 'text-violet-600',
                borderColor: 'border-violet-500'
              }
            ].map(({ guna, label, icon, bgColor, textColor, borderColor }) => (
              <div key={guna} className={`bg-white rounded-xl shadow-md p-5 border-t-4 ${borderColor}`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`text-xl font-semibold ${textColor} flex items-center gap-2`}>
                    <span>{icon}</span>
                    <span>{label}</span>
                  </h3>
                  <span className="font-bold text-lg">{percentages[guna as keyof typeof percentages]}%</span>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
                  <motion.div
                    className={`${bgColor} rounded-full h-3 transition-all duration-1200`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentages[guna as keyof typeof percentages]}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
                <p className={`text-3xl font-bold ${textColor.replace('text-', 'text-')} mt-2 text-center`}>
                  {scores[guna as keyof typeof scores]}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6 sm:mb-8 border-b border-gray-300">
            <nav className="flex flex-wrap sm:flex-nowrap justify-center -mb-px" aria-label="Tabs">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'analysis', label: 'In-Depth Analysis', icon: '🔍' },
                { id: 'recommendations', label: 'Suggestions', icon: '💡' },
                { id: 'colorTherapy', label: 'Color Therapy', icon: '🎨' },
                { id: 'advanced', label: 'Advanced Reporting', icon: '🔒', locked: true }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => tab.locked ? setShowUpsellModal(true) : setActiveTab(tab.id)}
                  className={`px-4 py-3 font-medium transition-all duration-300 text-sm sm:text-base border-b-2 rounded-t-lg mx-1 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-orange-500 border-orange-500 font-bold bg-white shadow-md relative z-10'
                      : tab.locked
                      ? 'text-gray-500 border-transparent bg-gray-100 hover:bg-gray-200 hover:text-gray-700'
                      : 'text-gray-500 border-transparent hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <OverviewTab key="overview" result={result} />
              )}
              {activeTab === 'analysis' && (
                <AnalysisTab key="analysis" result={result} />
              )}
              {activeTab === 'recommendations' && (
                <RecommendationsTab key="recommendations" result={result} />
              )}
              {activeTab === 'colorTherapy' && (
                <ColorTherapyTab key="colorTherapy" result={result} />
              )}
            </AnimatePresence>
          </div>

          {/* CTA Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl p-8 text-center shadow-lg border border-amber-200">
              <motion.div
                animate={{
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    '0 0 15px rgba(249, 115, 22, 0.3)',
                    '0 0 25px rgba(249, 115, 22, 0.5)',
                    '0 0 15px rgba(249, 115, 22, 0.3)'
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <i className="fas fa-gem text-5xl text-orange-400 mb-4"></i>
                <h3 className="text-3xl font-extrabold text-gray-800 mb-3">
                  Transform Your {dominantGuna === 'sattva' ? 'Vision' : dominantGuna === 'rajas' ? 'Fire' : 'Stability'} Into {dominantGuna === 'sattva' ? 'Reality' : dominantGuna === 'rajas' ? 'Focus' : 'Strength'}
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                  Your {dominantGuna === 'sattva' ? 'Sattvic clarity is a gift, but it can lead to inaction' : dominantGuna === 'rajas' ? 'Rajasic drive is a superpower, but it can lead to burnout' : 'Tamasic stability is your foundation, but it can lead to feeling stuck'}. Our Sāṅkhya EI journey will {dominantGuna === 'sattva' ? 'give you the practical tools to overcome this challenge' : dominantGuna === 'rajas' ? 'teach you to channel that fire effectively' : 'give you the spark to overcome inertia'}.
                </p>
                <button
                  onClick={handleExploreCourses}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-10 rounded-lg text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Overcome Your Challenges <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Smart Navigation Button */}
            {navigationState && (
              <button
                onClick={handleNavigation}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                {navigationState.allCompleted ? (
                  <>
                    <i className="fas fa-arrow-right mr-2"></i>
                    Continue to My Journey
                  </>
                ) : (
                  <>
                    <i className="fas fa-play mr-2"></i>
                    Take {navigationState.nextQuizName}
                  </>
                )}
              </button>
            )}
            
            <button
              onClick={onResetQuiz}
              className="bg-white border-2 border-gray-300 text-gray-700 w-full sm:w-auto text-base font-medium rounded-lg px-6 py-3 text-center flex items-center justify-center gap-2 hover:bg-gray-100 hover:border-gray-400 transition-colors"
            >
              <i className="fas fa-redo"></i>
              <span>Retake Assessment</span>
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-white border-2 border-gray-300 text-gray-700 w-full sm:w-auto text-base font-medium rounded-lg px-6 py-3 text-center flex items-center justify-center gap-2 hover:bg-gray-100 hover:border-gray-400 transition-colors"
            >
              <i className="fas fa-share-alt"></i>
              <span>Share Results</span>
            </button>
          </div>

          {/* WhatsApp Community */}
          <div className="mt-6 text-center">
            <a
              href="https://whatsapp.com/channel/0029Vb6jtsD3gvWisWX1gU00"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Join Community on WhatsApp
            </a>
          </div>

          {/* Feedback Section */}
          <FeedbackSection
            feedbackRating={feedbackRating}
            setFeedbackRating={setFeedbackRating}
          />
        </section>
      </div>

      {/* Modals */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        result={result}
      />
      <UpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
      />
    </div>
  )
}