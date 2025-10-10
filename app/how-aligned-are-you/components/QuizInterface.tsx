'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { shivaQuestions, questionTexts } from '../data/questions'
import { ShivaScores } from '../types/shiva-alignment'

interface QuizInterfaceProps {
  currentQuestionIndex: number
  scores: ShivaScores
  handleAnswerSelect: (scores: ShivaScores, tag: string) => void
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
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const progress = ((currentQuestionIndex + 1) / shivaQuestions.length) * 100
  const currentQuestion = shivaQuestions[currentQuestionIndex]

  // Trishul flash effect
  const triggerTrishulFlash = () => {
    const trishul = document.getElementById('trishul-flash')
    if (trishul) {
      trishul.style.opacity = '0.3'
      trishul.style.transform = 'translate(-50%, -50%) scale(1.2)'
      setTimeout(() => {
        trishul.style.opacity = '0'
        trishul.style.transform = 'translate(-50%, -50%) scale(0.5)'
      }, 500)
    }
  }

  // Particle effect
  const createParticles = (x: number, y: number) => {
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div')
      particle.className = 'fixed w-1 h-1 bg-yellow-600 rounded-full pointer-events-none z-50'
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`
      
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 50 + 20
      const dx = Math.cos(angle) * distance
      const dy = Math.sin(angle) * distance
      
      document.body.appendChild(particle)
      
      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
      ], {
        duration: 800,
        easing: 'ease-out'
      }).onfinish = () => particle.remove()
    }
  }

  const handleAnswer = (answer: any, event: React.MouseEvent) => {
    if (isAnswerSelected) return
    
    setIsAnswerSelected(true)
    setSelectedAnswer(answer.aKey)
    
    // Create particle effect
    createParticles(event.clientX, event.clientY)
    
    // Trigger trishul flash
    setTimeout(() => {
      triggerTrishulFlash()
    }, 500)
    
    // Wait for animations then proceed
    setTimeout(() => {
      handleAnswerSelect(answer.scores, answer.tag)
      setIsAnswerSelected(false)
      setSelectedAnswer(null)
    }, 1500)
  }

  return (
    <div 
      className="min-h-screen py-16 px-4"
      style={{
        background: 'linear-gradient(135deg, hsl(210, 50%, 20%), hsl(230, 60%, 10%))'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'linear-gradient(45deg, hsl(43, 85%, 78%) 0%, hsl(50, 90%, 95%) 30%, hsl(43, 75%, 65%) 70%, hsl(35, 85%, 65%) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 15px hsla(43, 85%, 70%, 0.4), 0 0 5px hsla(50, 90%, 95%, 0.5), 0 0 30px hsla(35, 85%, 65%, 0.3)',
              backgroundSize: '200% auto',
              animation: 'shine 3s linear infinite'
            }}
          >
            How Aligned Are You?
          </h1>
          <p 
            className="text-xl"
            style={{
              fontFamily: "'Noto Serif', serif",
              color: 'hsl(50, 90%, 95%)'
            }}
          >
            A spiritual mirror reflecting your inner state
          </p>
        </div>

        {/* Progress Mandala */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsla(43, 45%, 58%, 0.1)"
                strokeWidth="4"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(43, 45%, 58%)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * progress / 100) }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className="text-sm font-medium"
                style={{ color: 'hsl(50, 90%, 95%)' }}
              >
                {currentQuestionIndex + 1}/20
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, rotateX: -90, y: -50 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: 90 }}
          transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
          className="p-8 rounded-xl relative overflow-hidden"
          style={{
            background: 'hsla(240, 30%, 8%, 0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid hsla(43, 45%, 58%, 0.2)'
          }}
        >
          <h2 
            className="text-2xl md:text-3xl font-semibold mb-8 text-center leading-relaxed"
            style={{ 
              color: 'white',
              fontFamily: "'Noto Serif', serif"
            }}
          >
            {questionTexts[currentQuestion.qKey as keyof typeof questionTexts]}
          </h2>

          <div className="space-y-4">
            {currentQuestion.answers.map((answer, index) => (
              <motion.button
                key={answer.aKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={(e) => handleAnswer(answer, e)}
                disabled={isAnswerSelected}
                className={`w-full p-6 rounded-lg border transition-all duration-300 text-left relative overflow-hidden ${
                  selectedAnswer === answer.aKey
                    ? 'transform scale-105'
                    : 'hover:transform hover:-translate-y-1'
                }`}
                style={{
                  background: selectedAnswer === answer.aKey 
                    ? 'hsl(43, 45%, 58%)' 
                    : 'hsla(240, 30%, 8%, 0.5)',
                  border: selectedAnswer === answer.aKey
                    ? '1px solid hsl(43, 45%, 58%)'
                    : '1px solid hsla(43, 45%, 58%, 0.3)',
                  backdropFilter: 'blur(8px)',
                  color: selectedAnswer === answer.aKey 
                    ? 'hsl(260, 50%, 8%)' 
                    : 'hsl(50, 90%, 95%)',
                  boxShadow: selectedAnswer === answer.aKey
                    ? '0 0 20px hsla(43, 45%, 58%, 0.2)'
                    : 'none'
                }}
                whileHover={!isAnswerSelected ? {
                  boxShadow: '0 0 20px hsla(43, 45%, 58%, 0.2)'
                } : {}}
              >
                <span className="relative z-10 text-base md:text-lg leading-relaxed">
                  {questionTexts[answer.aKey as keyof typeof questionTexts]}
                </span>
                
                {selectedAnswer === answer.aKey && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 border-4 rounded-lg"
                    style={{ borderColor: 'hsla(43, 45%, 58%, 0.4)' }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  )
}
