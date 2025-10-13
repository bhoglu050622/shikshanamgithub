'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ShivaResult } from '../types/shiva-alignment'
import { saveQuizResult, getCompletedQuizzes, areAllQuizzesCompleted, getRemainingQuizzes, getQuizDisplayName, getQuizUrl } from '@/lib/quiz-tracking'
import { courseRecommendations } from '../data/archetypes'
import DharmaPathChart from './DharmaPathChart'
import FeedbackSection from './FeedbackSection'
import Image from 'next/image'

interface ResultsScreenProps {
  result: ShivaResult
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
  const [showCelebration, setShowCelebration] = useState(true)
  const [currentInsight, setCurrentInsight] = useState(0)
  const [navigationState, setNavigationState] = useState<{
    allCompleted: boolean
    remainingQuizzes: string[]
    nextQuizName: string
    nextQuizUrl: string
  } | null>(null)
  
  const router = useRouter()
  const { dominantArchetype, percentage, archetype, sanskritName, description, scores } = result
  const courseRec = courseRecommendations[dominantArchetype as keyof typeof courseRecommendations]

  // Apply background based on archetype
  useEffect(() => {
    const body = document.body
    body.className = 'elementor-page'
    body.classList.add(`${dominantArchetype}-bg`)
    
    return () => {
      body.className = 'elementor-page'
    }
  }, [dominantArchetype])

  // Hide celebration after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Rotate insights every 5 seconds
  useEffect(() => {
    const insights = [
      "Your spiritual journey is unique and sacred",
      "Every step forward is a step toward enlightenment",
      "Your consciousness is expanding beautifully",
      "You are exactly where you need to be"
    ]
    const interval = setInterval(() => {
      setCurrentInsight(prev => (prev + 1) % insights.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Save quiz result and check navigation state
  useEffect(() => {
    if (!userEmail) return
    
    // Save the quiz result with user email
    saveQuizResult('shiva-alignment', result, userName, userEmail)
    
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

  const handleExploreCourse = () => {
    window.open(courseRec.url, '_blank')
  }

  const handleNavigation = () => {
    if (navigationState?.allCompleted) {
      router.push('/my-journey')
    } else if (navigationState?.nextQuizUrl) {
      router.push(navigationState.nextQuizUrl)
    }
  }

  const backgroundStyles = {
    unbound: 'linear-gradient(135deg, hsl(210, 50%, 20%), hsl(230, 60%, 10%))',
    harmonious: 'linear-gradient(135deg, hsl(140, 30%, 20%), hsl(160, 40%, 10%))',
    reflective: 'linear-gradient(135deg, hsl(280, 20%, 20%), hsl(300, 30%, 10%))',
    awakener: 'linear-gradient(135deg, hsl(0, 40%, 20%), hsl(20, 50%, 10%))',
    emerging: 'linear-gradient(135deg, hsl(240, 10%, 15%), hsl(240, 5%, 5%))'
  }

  const getArchetypeColor = () => {
    const colors = {
      unbound: 'hsl(210, 70%, 60%)',
      harmonious: 'hsl(140, 60%, 50%)',
      reflective: 'hsl(280, 50%, 60%)',
      awakener: 'hsl(0, 60%, 50%)',
      emerging: 'hsl(240, 30%, 50%)'
    }
    return colors[dominantArchetype as keyof typeof colors] || 'hsl(43, 45%, 58%)'
  }

  const getScoreBreakdown = () => {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
    return Object.entries(scores).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value,
      percentage: Math.round((value / total) * 100)
    })).sort((a, b) => b.value - a.value)
  }

  const insights = [
    "Your spiritual journey is unique and sacred",
    "Every step forward is a step toward enlightenment", 
    "Your consciousness is expanding beautifully",
    "You are exactly where you need to be"
  ]

  return (
    <div 
      className="min-h-screen py-8 px-4 relative overflow-hidden"
      style={{
        background: backgroundStyles[dominantArchetype as keyof typeof backgroundStyles],
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{ backgroundColor: getArchetypeColor() }}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{ 
              y: [null, -100],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="text-9xl">🎉</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.8, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
              style={{ 
                background: `linear-gradient(45deg, ${getArchetypeColor()}, hsl(43, 45%, 58%))`,
                boxShadow: `0 0 30px ${getArchetypeColor()}40`
              }}
            >
              🔱
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{
              fontFamily: "'Cinzel', serif",
              background: `linear-gradient(45deg, ${getArchetypeColor()}, hsl(50, 90%, 95%))`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: `0 0 20px ${getArchetypeColor()}40`
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Your Sacred Alignment
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl mb-8"
            style={{
              fontFamily: "'Noto Serif', serif",
              color: 'hsl(50, 90%, 95%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            The divine mirror reveals your truth, {userName}
          </motion.p>

          {/* Rotating Insights */}
          <motion.div
            key={currentInsight}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-lg italic"
            style={{ color: getArchetypeColor() }}
          >
            "{insights[currentInsight]}"
          </motion.div>
        </motion.div>

        {/* Main Result Card with Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.5, type: "spring", stiffness: 100 }}
          className="relative overflow-hidden mb-12"
          style={{
            background: 'hsla(240, 30%, 8%, 0.8)',
            backdropFilter: 'blur(20px)',
            border: `2px solid ${getArchetypeColor()}40`,
            borderRadius: '24px',
            boxShadow: `0 20px 60px ${getArchetypeColor()}20, inset 0 1px 0 ${getArchetypeColor()}30`
          }}
        >
          {/* Animated Border */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-50"
            style={{
              background: `conic-gradient(from 0deg, ${getArchetypeColor()}, transparent, ${getArchetypeColor()})`,
              animation: 'spin 3s linear infinite'
            }}
          />

          <div className="relative p-8 md:p-12">
            {/* Archetype Display */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 2, type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <div 
                  className="inline-block px-8 py-4 rounded-full text-2xl font-bold mb-4"
                  style={{
                    background: `linear-gradient(45deg, ${getArchetypeColor()}, hsl(43, 45%, 58%))`,
                    color: 'hsl(260, 50%, 8%)',
                    boxShadow: `0 10px 30px ${getArchetypeColor()}40`
                  }}
                >
                  {archetype}
                </div>
                <p 
                  className="text-3xl font-semibold"
                  style={{ color: getArchetypeColor() }}
                >
                  {sanskritName}
                </p>
                <p 
                  className="text-lg mt-2"
                  style={{ color: 'hsl(50, 30%, 70%)' }}
                >
                  {description}
                </p>
              </motion.div>

              {/* Enhanced Percentage Display */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 2.5, type: "spring", stiffness: 150 }}
                className="relative mb-8"
              >
                <div className="relative w-48 h-48 mx-auto">
                  {/* Circular Progress */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="hsla(240, 20%, 25%, 0.3)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke={getArchetypeColor()}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="565"
                      initial={{ strokeDashoffset: 565 }}
                      animate={{ strokeDashoffset: 565 - (565 * percentage / 100) }}
                      transition={{ duration: 2, delay: 3, ease: "easeOut" }}
                      style={{
                        filter: `drop-shadow(0 0 10px ${getArchetypeColor()})`
                      }}
                    />
                  </svg>
                  
                  {/* Percentage Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1, delay: 3.5, type: "spring", stiffness: 200 }}
                      className="text-center"
                    >
                      <div 
                        className="text-6xl font-bold"
                        style={{ 
                          color: getArchetypeColor(),
                          textShadow: `0 0 20px ${getArchetypeColor()}40`
                        }}
                      >
                        {percentage}%
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: 'hsl(50, 30%, 70%)' }}
                      >
                        Alignment
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Score Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 4 }}
                className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
              >
                {getScoreBreakdown().map((score, index) => (
                  <motion.div
                    key={score.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 4.2 + index * 0.1 }}
                    className="text-center p-4 rounded-xl"
                    style={{
                      background: index === 0 ? `${getArchetypeColor()}20` : 'hsla(240, 20%, 15%, 0.5)',
                      border: index === 0 ? `1px solid ${getArchetypeColor()}` : '1px solid hsla(240, 20%, 25%, 0.3)'
                    }}
                  >
                    <div 
                      className="text-lg font-bold"
                      style={{ color: index === 0 ? getArchetypeColor() : 'hsl(50, 90%, 95%)' }}
                    >
                      {score.value}
                    </div>
                    <div 
                      className="text-xs"
                      style={{ color: 'hsl(50, 30%, 70%)' }}
                    >
                      {score.name}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Enhanced Tabs Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4.5 }}
              className="flex justify-center border-b mb-8 flex-wrap"
              style={{ borderColor: 'hsl(240, 20%, 25%)' }}
            >
              {[
                { id: 'overview', label: 'Overview', icon: '🌟', color: getArchetypeColor() },
                { id: 'path', label: 'Your Path', icon: '🛤️', color: 'hsl(140, 60%, 50%)' },
                { id: 'challenges', label: 'Daily Life', icon: '🌅', color: 'hsl(280, 50%, 60%)' },
                { id: 'recommendations', label: 'Guidance', icon: '💎', color: 'hsl(43, 45%, 58%)' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-all duration-300 border-b-3 relative ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '1.1rem',
                    borderBottomColor: activeTab === tab.id ? tab.color : 'transparent'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Enhanced Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  {/* Archetype Overview */}
                  <div className="text-center">
                    <h3 
                      className="text-3xl font-bold mb-4"
                      style={{ 
                        color: getArchetypeColor(),
                        fontFamily: "'Cinzel', serif"
                      }}
                    >
                      Your Spiritual Signature
                    </h3>
                    <p 
                      className="text-lg leading-relaxed max-w-4xl mx-auto"
                      style={{ color: 'hsla(50, 90%, 95%, 0.9)' }}
                    >
                      {result.pathContent.split('\n')[0]}
                    </p>
                  </div>

                  {/* Key Qualities */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div 
                      className="p-6 rounded-xl"
                      style={{
                        background: 'hsla(240, 20%, 15%, 0.5)',
                        border: `1px solid ${getArchetypeColor()}30`
                      }}
                    >
                      <h4 
                        className="text-xl font-bold mb-4"
                        style={{ color: getArchetypeColor() }}
                      >
                        Your Strengths
                      </h4>
                      <ul className="space-y-2">
                        {['Inner Wisdom', 'Spiritual Awareness', 'Emotional Balance', 'Life Integration'].map((strength, index) => (
                          <motion.li
                            key={strength}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center"
                            style={{ color: 'hsl(50, 90%, 95%)' }}
                          >
                            <span className="mr-3">✨</span>
                            {strength}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div 
                      className="p-6 rounded-xl"
                      style={{
                        background: 'hsla(240, 20%, 15%, 0.5)',
                        border: `1px solid ${getArchetypeColor()}30`
                      }}
                    >
                      <h4 
                        className="text-xl font-bold mb-4"
                        style={{ color: getArchetypeColor() }}
                      >
                        Growth Areas
                      </h4>
                      <ul className="space-y-2">
                        {['Daily Practice', 'Mindful Living', 'Inner Peace', 'Spiritual Connection'].map((area, index) => (
                          <motion.li
                            key={area}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center"
                            style={{ color: 'hsl(50, 90%, 95%)' }}
                          >
                            <span className="mr-3">🌱</span>
                            {area}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'path' && (
                <motion.div
                  key="path"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="prose prose-invert max-w-none"
                  style={{ color: 'hsla(50, 90%, 95%, 0.9)' }}
                  dangerouslySetInnerHTML={{ __html: result.pathContent.replace(/<span class='user-name'><\/span>/g, userName) }}
                />
              )}
              
              {activeTab === 'challenges' && (
                <motion.div
                  key="challenges"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="prose prose-invert max-w-none"
                  style={{ color: 'hsla(50, 90%, 95%, 0.9)' }}
                  dangerouslySetInnerHTML={{ __html: result.challengesContent }}
                />
              )}
              
              {activeTab === 'recommendations' && (
                <motion.div
                  key="recommendations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="prose prose-invert max-w-none"
                  style={{ color: 'hsla(50, 90%, 95%, 0.9)' }}
                  dangerouslySetInnerHTML={{ __html: result.recommendationsContent.replace(/<span class='user-name'><\/span>/g, userName) }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Enhanced Dharma Path Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 5 }}
        >
          <DharmaPathChart result={result} userName={userName} />
        </motion.div>

        {/* Enhanced Course CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 5.5 }}
          className="mt-12 p-8 rounded-2xl text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${getArchetypeColor()}20, hsla(43, 45%, 58%, 0.1))`,
            border: `2px solid ${getArchetypeColor()}40`,
            boxShadow: `0 20px 60px ${getArchetypeColor()}20`
          }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                style={{ backgroundColor: getArchetypeColor() }}
                initial={{ 
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  scale: 0
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <motion.h4 
              className="text-4xl font-bold mb-4"
              style={{
                fontFamily: "'Cinzel', serif",
                color: getArchetypeColor()
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 6, type: "spring", stiffness: 200 }}
            >
              Your Next Step in Awakening
            </motion.h4>
            <motion.p 
              className="text-lg mb-8 max-w-3xl mx-auto leading-relaxed"
              style={{
                fontFamily: "'Noto Serif', serif",
                color: 'hsl(50, 30%, 70%)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 6.2 }}
            >
              {courseRec.description}
            </motion.p>
            <motion.button
              onClick={handleExploreCourse}
              className="px-10 py-5 rounded-full font-semibold text-xl transition-all duration-300 hover:scale-105 mr-4"
              style={{
                background: `linear-gradient(45deg, ${getArchetypeColor()}, hsl(43, 45%, 58%))`,
                color: 'hsl(260, 50%, 8%)',
                boxShadow: `0 15px 50px ${getArchetypeColor()}40`
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 6.5, type: "spring", stiffness: 200 }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: `0 20px 60px ${getArchetypeColor()}60`
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore the Path 🔱
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 7 }}
          className="mt-8 text-center"
        >
          <motion.p 
            className="mb-6 text-lg"
            style={{
              color: 'hsl(50, 30%, 70%)',
              fontFamily: "'Noto Serif', serif"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 7.2 }}
          >
            Join our vibrant community for daily insights and support!
          </motion.p>
          <motion.a
            href="https://whatsapp.com/channel/0029Vb6jtsD3gvWisWX1gU00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#25D366',
              color: 'white',
              boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)'
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 7.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image 
              width={24}
              height={24}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png" 
              alt="WhatsApp" 
              className="w-6 h-6"
            />
            Join Community
          </motion.a>
        </motion.div>

        {/* Smart Navigation Button */}
        {navigationState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 7.5 }}
            className="text-center mt-8"
          >
            <motion.button
              onClick={handleNavigation}
              className="px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 mr-4"
              style={{
                background: `linear-gradient(45deg, ${getArchetypeColor()}, hsl(43, 45%, 58%))`,
                color: 'hsl(260, 50%, 8%)',
                boxShadow: `0 10px 40px -12px ${getArchetypeColor()}40`
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 15px 50px -12px ${getArchetypeColor()}60`
              }}
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
          </motion.div>
        )}

        {/* Enhanced Retake Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 8 }}
          className="text-center mt-8"
        >
          <motion.button
            onClick={onResetQuiz}
            className="px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'transparent',
              color: 'hsl(50, 30%, 70%)',
              border: `2px solid ${getArchetypeColor()}40`
            }}
            whileHover={{ 
              scale: 1.05,
              borderColor: getArchetypeColor(),
              color: getArchetypeColor()
            }}
            whileTap={{ scale: 0.95 }}
          >
            Retake the Journey
          </motion.button>
        </motion.div>

        {/* Enhanced Feedback Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 8.5 }}
        >
          <FeedbackSection
            feedbackRating={feedbackRating}
            setFeedbackRating={setFeedbackRating}
            userName={userName}
            archetype={archetype}
          />
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .prose h4, .prose h5 {
          color: ${getArchetypeColor()} !important;
          font-family: 'Cinzel', serif !important;
          font-weight: 700 !important;
          font-size: 1.3rem !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
        }
        .prose p, .prose li {
          color: hsla(50, 90%, 95%, 0.9) !important;
          margin-bottom: 1rem;
          line-height: 1.8;
        }
        .prose ul {
          list-style-type: '🔱 ';
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .prose strong {
          color: hsla(50, 90%, 95%, 1) !important;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}