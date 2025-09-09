'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShivaResult } from '../types/shiva-alignment'
import { courseRecommendations } from '../data/archetypes'
import DharmaPathChart from './DharmaPathChart'
import FeedbackSection from './FeedbackSection'
import Image from 'next/image'

interface ResultsScreenProps {
  result: ShivaResult
  userName: string
  onResetQuiz: () => void
  feedbackRating: number
  setFeedbackRating: (rating: number) => void
}

export default function ResultsScreen({
  result,
  userName,
  onResetQuiz,
  feedbackRating,
  setFeedbackRating
}: ResultsScreenProps) {
  const [activeTab, setActiveTab] = useState('path')

  const { dominantArchetype, percentage, archetype, sanskritName, description } = result
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

  const handleContinueDharmaPath = () => {
    window.location.href = '/dharma-path'
  }

  const handleExploreCourse = () => {
    window.open(courseRec.url, '_blank')
  }

  const backgroundStyles = {
    unbound: 'linear-gradient(135deg, hsl(210, 50%, 20%), hsl(230, 60%, 10%))',
    harmonious: 'linear-gradient(135deg, hsl(140, 30%, 20%), hsl(160, 40%, 10%))',
    reflective: 'linear-gradient(135deg, hsl(280, 20%, 20%), hsl(300, 30%, 10%))',
    awakener: 'linear-gradient(135deg, hsl(0, 40%, 20%), hsl(20, 50%, 10%))',
    emerging: 'linear-gradient(135deg, hsl(240, 10%, 15%), hsl(240, 5%, 5%))'
  }

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: backgroundStyles[dominantArchetype as keyof typeof backgroundStyles],
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: "'Cinzel', serif",
              color: 'hsl(50, 90%, 95%)'
            }}
          >
            Your Sacred Alignment Report for {userName}
          </h1>
          <p 
            className="text-xl"
            style={{
              fontFamily: "'Noto Serif', serif",
              color: 'hsl(50, 90%, 95%)'
            }}
          >
            The divine mirror reveals your truth
          </p>
        </div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="p-8 rounded-xl relative overflow-hidden mb-8"
          style={{
            background: 'hsla(240, 30%, 8%, 0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid hsla(43, 45%, 58%, 0.2)'
          }}
        >
          {/* Archetype Title */}
          <h2 
            className="text-5xl md:text-6xl font-bold text-center mb-2"
            style={{
              fontFamily: "'Cinzel', serif",
              color: 'hsl(43, 45%, 58%)',
              textShadow: '0 0 15px hsla(43, 85%, 70%, 0.4), 0 0 5px hsla(50, 90%, 95%, 0.5)'
            }}
          >
            {archetype}
          </h2>

          {/* Sanskrit Name */}
          <p 
            className="text-2xl text-center mb-4"
            style={{
              fontFamily: "'Noto Serif', serif",
              color: 'hsl(24, 85%, 53%)'
            }}
          >
            {sanskritName}
          </p>

          {/* Archetype Badge */}
          <div 
            className="w-fit mx-auto px-6 py-2 rounded-full mb-8"
            style={{
              background: 'hsla(43, 45%, 58%, 0.1)',
              border: '1px solid hsla(43, 45%, 58%, 0.3)',
              color: 'hsl(43, 45%, 58%)'
            }}
          >
            {description}
          </div>

          {/* Percentage Display */}
          <div className="text-center mb-8">
            <h3 
              className="text-lg mb-4"
              style={{ 
                color: 'hsl(50, 30%, 70%)',
                fontFamily: "'Noto Serif', serif"
              }}
            >
              Your Alignment with <strong>{archetype}</strong>
            </h3>
            <div 
              className="text-8xl md:text-9xl font-bold leading-none"
              style={{
                fontFamily: "'Cinzel', serif",
                background: 'linear-gradient(45deg, hsl(43, 85%, 78%), hsl(50, 90%, 95%))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 15px hsla(43, 85%, 70%, 0.4)'
              }}
            >
              {percentage}%
            </div>
          </div>

          {/* Dharma Path Chart */}
          <DharmaPathChart result={result} userName={userName} />

          {/* Tabs Navigation */}
          <div className="flex justify-center border-b mb-8 flex-wrap" style={{ borderColor: 'hsl(240, 20%, 25%)' }}>
            {[
              { id: 'path', label: 'Your Path', icon: '🛤️' },
              { id: 'challenges', label: 'Your Daily Life', icon: '🌅' },
              { id: 'recommendations', label: 'Recommendations', icon: '💎' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-all duration-300 border-b-3 ${
                  activeTab === tab.id
                    ? 'border-yellow-600 text-yellow-600'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1.1rem'
                }}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
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

          {/* Course CTA */}
          <div 
            className="mt-12 p-8 rounded-xl text-center"
            style={{
              background: 'linear-gradient(135deg, hsla(43, 45%, 58%, 0.1), hsla(24, 85%, 53%, 0.1))',
              border: '1px solid hsl(43, 45%, 58%)'
            }}
          >
            <h4 
              className="text-3xl font-bold mb-4"
              style={{
                fontFamily: "'Cinzel', serif",
                color: 'hsl(43, 45%, 58%)'
              }}
            >
              Your Next Step in Awakening
            </h4>
            <p 
              className="text-lg mb-6 max-w-3xl mx-auto leading-relaxed"
              style={{
                fontFamily: "'Noto Serif', serif",
                color: 'hsl(50, 30%, 70%)'
              }}
            >
              {courseRec.description}
            </p>
            <button
              onClick={handleExploreCourse}
              className="px-8 py-4 rounded-full font-semibold text-xl transition-all duration-300 hover:scale-105 mr-4"
              style={{
                background: 'linear-gradient(45deg, hsl(43, 45%, 58%), hsl(24, 85%, 53%))',
                color: 'hsl(260, 50%, 8%)',
                boxShadow: '0 10px 40px -12px hsla(43, 45%, 58%, 0.3)'
              }}
            >
              Explore the Path 🔱
            </button>
            <button
              onClick={handleContinueDharmaPath}
              className="px-8 py-4 rounded-full font-semibold text-xl transition-all duration-300 hover:scale-105 border-2"
              style={{
                background: 'transparent',
                color: 'hsl(43, 45%, 58%)',
                borderColor: 'hsl(43, 45%, 58%)'
              }}
            >
              Continue Dharma Path ➡️
            </button>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-8 text-center">
            <p 
              className="mb-4"
              style={{
                color: 'hsl(50, 30%, 70%)',
                fontFamily: "'Noto Serif', serif"
              }}
            >
              Join our vibrant community for daily insights and support!
            </p>
            <a
              href="https://whatsapp.com/channel/0029Vb6jtsD3gvWisWX1gU00"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: '#25D366',
                color: 'white',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
              }}
            >
              <Image 
                width={24}
                height={24}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png" 
                alt="WhatsApp" 
                className="w-6 h-6"
              />
              Join Community
            </a>
          </div>

          {/* Retake Button */}
          <div className="text-center mt-6">
            <button
              onClick={onResetQuiz}
              className="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: 'transparent',
                color: 'hsl(50, 30%, 70%)',
                border: '1px solid hsl(240, 20%, 25%)'
              }}
            >
              Retake the Journey
            </button>
          </div>
        </motion.div>

        {/* Feedback Section */}
        <FeedbackSection
          feedbackRating={feedbackRating}
          setFeedbackRating={setFeedbackRating}
          userName={userName}
          archetype={archetype}
        />
      </div>

      <style jsx>{`
        .prose h4, .prose h5 {
          color: hsl(43, 45%, 58%) !important;
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
