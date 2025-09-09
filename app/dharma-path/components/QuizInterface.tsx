'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { Quiz, QuizResult } from '../types/dharma-path'

interface QuizInterfaceProps {
  quiz: Quiz
  onComplete: (result: QuizResult) => void
  onBack: () => void
}

export default function QuizInterface({ quiz, onComplete, onBack }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQ = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId })
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate results
      const scores: Record<string, number> = {}
      
      // Initialize scores
      Object.keys(quiz.scoring).forEach(key => {
        scores[key] = 0
      })

      // Calculate scores based on answers
      Object.entries(answers).forEach(([questionId, answerId]) => {
        const question = quiz.questions.find(q => q.id === questionId)
        const selectedOption = question?.options.find(opt => opt.id === answerId)
        
        if (selectedOption) {
          Object.entries(selectedOption.score).forEach(([key, value]) => {
            scores[key] += value
          })
        }
      })

      // Find interpretation
      let interpretation = ''
      let description = ''
      let maxScore = 0
      let dominantTrait = ''

      Object.entries(scores).forEach(([key, score]) => {
        if (score > maxScore) {
          maxScore = score
          dominantTrait = key
        }
      })

      if (dominantTrait && quiz.scoring[dominantTrait]) {
        interpretation = quiz.scoring[dominantTrait].interpretation
        description = quiz.scoring[dominantTrait].description
      }

      const result: QuizResult = {
        quizId: quiz.id,
        answers,
        scores,
        interpretation,
        description,
        completedAt: new Date().toISOString()
      }

      setIsCompleted(true)
      setTimeout(() => onComplete(result), 2000)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const canProceed = answers[currentQ.id] !== undefined

  if (isCompleted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="min-h-screen flex items-center justify-center py-12 px-6"
      >
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
          </motion.div>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Quiz Completed!
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-white/80"
          >
            Your {quiz.title} assessment is complete. Returning to the gateway...
          </motion.p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Gateway</span>
          </motion.button>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {quiz.title}
            </h1>
            <p className="text-lg text-white/80">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-3 mb-8">
            <motion.div
              className="bg-gradient-to-r from-saffron-400 to-saffron-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(currentQ.id, option.id)}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  answers[currentQ.id] === option.id
                    ? 'border-saffron-400 bg-saffron-400/20 text-white'
                    : 'border-white/20 bg-white/5 hover:border-saffron-400/50 hover:bg-saffron-400/10 text-white/90'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQ.id] === option.id
                      ? 'border-saffron-400 bg-saffron-400'
                      : 'border-white/40'
                  }`}>
                    {answers[currentQ.id] === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-lg font-medium">{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            whileHover={{ scale: currentQuestion === 0 ? 1 : 1.05 }}
            whileTap={{ scale: currentQuestion === 0 ? 1 : 0.95 }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              currentQuestion === 0
                ? 'text-white/40 cursor-not-allowed'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!canProceed}
            whileHover={{ scale: canProceed ? 1.05 : 1 }}
            whileTap={{ scale: canProceed ? 0.95 : 1 }}
            className={`flex items-center space-x-2 px-8 py-4 rounded-full font-bold transition-all duration-300 ${
              canProceed
                ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white shadow-lg'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            <span>
              {currentQuestion === quiz.questions.length - 1 ? 'Complete Quiz' : 'Next'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
