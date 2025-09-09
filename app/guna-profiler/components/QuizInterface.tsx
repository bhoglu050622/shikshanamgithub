'use client'

import { motion } from 'framer-motion'
import { questions } from '../data/questions'
import { GunaScores } from '../types/guna-profiler'

interface QuizInterfaceProps {
  currentQuestionIndex: number
  scores: GunaScores
  handleAnswerSelect: (guna: 'sattva' | 'rajas' | 'tamas') => void
  userName: string
  onQuizComplete: () => void
}

export default function QuizInterface({
  currentQuestionIndex,
  scores,
  handleAnswerSelect,
  userName,
  onQuizComplete
}: QuizInterfaceProps) {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const answeredCount = scores.sattva + scores.rajas + scores.tamas

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const currentQuestion = questions[currentQuestionIndex]
  const shuffledOptions = shuffleArray([
    { text: currentQuestion.a[0], guna: 'sattva' as const, icon: '☀️' },
    { text: currentQuestion.a[1], guna: 'rajas' as const, icon: '🔥' },
    { text: currentQuestion.a[2], guna: 'tamas' as const, icon: '🌙' }
  ])

  return (
    <div style={{ backgroundColor: '#f0f9ff' }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text mb-4">
            Guṇa Profiler
          </h1>
          <p className="text-xl text-gray-600 mb-6">Discover your inner nature through ancient Vedic wisdom</p>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <span className="text-sm">Welcome, {userName}</span>
            <span className="text-sm">•</span>
            <span className="text-sm">Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
        </div>

        {/* Instructions */}
        <section className="bg-white shadow-xl rounded-lg p-6 sm:p-8 border-t-4 border-orange-500 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-3 text-gray-700">
            <i className="fas fa-book-open text-orange-500"></i>
            <span>Instructions:</span>
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Answer each question based on your natural tendencies.</li>
            <li>Choose the response that most authentically reflects you.</li>
            <li>Be honest for accurate self-discovery.</li>
          </ul>
        </section>

        {/* Progress */}
        <section className="mb-8">
          <div className="text-sm flex justify-between items-center mb-2 text-gray-500">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{answeredCount}/{questions.length} answered</span>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-orange-400 to-amber-500 h-3 rounded-full transition-all duration-300 ease-out"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </section>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-transparent p-0 text-center"
        >
          <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 border-t-4 border-orange-500">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">
              {currentQuestion.q}
            </h2>

            <div className="space-y-4">
              {shuffledOptions.map((option, index) => (
                <motion.button
                  key={`${currentQuestionIndex}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswerSelect(option.guna)}
                  className="w-full text-left p-4 sm:p-5 rounded-xl flex justify-between items-center bg-white border-2 border-gray-200 hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
                  style={{
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.1)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-base sm:text-lg font-medium text-gray-700">
                      {option.text}
                    </span>
                  </div>
                  <span className="w-5 h-5 border-2 border-gray-300 rounded-full group-hover:border-amber-500 transition-colors duration-200"></span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Choose the option that most authentically reflects your natural tendencies
          </p>
        </div>
      </div>
    </div>
  )
}