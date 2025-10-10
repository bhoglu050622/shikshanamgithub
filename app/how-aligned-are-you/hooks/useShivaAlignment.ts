'use client'

import { useState, useEffect } from 'react'
import { ShivaScores, ShivaResult } from '../types/shiva-alignment'
import { archetypeData } from '../data/archetypes'

export function useShivaAlignment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [scores, setScores] = useState<ShivaScores>({ unbound: 0, harmonious: 0, reflective: 0, awakener: 0, emerging: 0 })
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState<ShivaResult | null>(null)
  const [feedbackRating, setFeedbackRating] = useState(0)
  const [answerTags, setAnswerTags] = useState<string[]>([])
  const [sessionId, setSessionId] = useState('')
  const [userName, setUserName] = useState('Seeker')

  // Generate session ID
  useEffect(() => {
    const timestamp = Date.now().toString(36)
    const randomPart = Math.random().toString(36).substr(2, 5)
    setSessionId(`${timestamp}-${randomPart}`)
  }, [])

  // User name is managed within this component
  useEffect(() => {
    // No external profile to load
  }, [])

  const handleAnswerSelect = (answerScores: ShivaScores, tag: string) => {
    // Add scores to current totals
    setScores(prev => ({
      unbound: prev.unbound + answerScores.unbound,
      harmonious: prev.harmonious + answerScores.harmonious,
      reflective: prev.reflective + answerScores.reflective,
      awakener: prev.awakener + answerScores.awakener,
      emerging: prev.emerging + answerScores.emerging
    }))

    // Add answer tag
    setAnswerTags(prev => [...prev, tag])
    
    if (currentQuestionIndex < 19) { // 20 questions total
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      calculateResults(answerScores, tag)
    }
  }

  const calculateResults = (finalAnswerScores: ShivaScores, finalTag: string) => {
    // Include the final answer in calculations
    const finalScores = {
      unbound: scores.unbound + finalAnswerScores.unbound,
      harmonious: scores.harmonious + finalAnswerScores.harmonious,
      reflective: scores.reflective + finalAnswerScores.reflective,
      awakener: scores.awakener + finalAnswerScores.awakener,
      emerging: scores.emerging + finalAnswerScores.emerging
    }

    const finalTags = [...answerTags, finalTag]

    // Find dominant archetype
    const sortedScores = Object.entries(finalScores).sort(([,a], [,b]) => b - a)
    const dominantArchetype = sortedScores[0][0]
    const secondaryArchetype = sortedScores[1][0]

    // Calculate percentage (max possible score is 80)
    const maxPossibleScore = 80
    const userDominantScore = finalScores[dominantArchetype as keyof ShivaScores]
    const percentage = Math.round((userDominantScore / maxPossibleScore) * 100)

    // Find dominant pain point from tags
    const tagCounts = finalTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    const sortedTags = Object.entries(tagCounts).sort(([,a], [,b]) => b - a)
    const dominantPainPoint = sortedTags.length > 0 ? sortedTags[0][0] : 'awareness'

    const archetypeInfo = archetypeData[dominantArchetype as keyof typeof archetypeData]

    const shivaResult: ShivaResult = {
      scores: finalScores,
      percentage,
      dominantArchetype,
      secondaryArchetype,
      dominantPainPoint,
      archetype: archetypeInfo.title,
      sanskritName: archetypeInfo.sanskrit,
      description: archetypeInfo.description,
      pathContent: archetypeInfo.pathContent,
      challengesContent: archetypeInfo.challengesContent,
      recommendationsContent: archetypeInfo.recommendationsContent,
      timestamp: new Date().toISOString()
    }

    setResult(shivaResult)
    setShowResults(true)

    // Save to localStorage
    saveToProfile(shivaResult)
  }

  const saveToProfile = (shivaResult: ShivaResult) => {
    try {
      // Store in dedicated shiva-alignment-results key
      localStorage.setItem('shiva-alignment-results', JSON.stringify(shivaResult))
      localStorage.setItem('shiva-alignment-timestamp', new Date().toISOString())
    } catch (error) {
      console.error('Error saving shiva alignment result:', error)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setScores({ unbound: 0, harmonious: 0, reflective: 0, awakener: 0, emerging: 0 })
    setShowResults(false)
    setResult(null)
    setFeedbackRating(0)
    setAnswerTags([])
  }

  return {
    currentQuestionIndex,
    scores,
    showResults,
    result,
    feedbackRating,
    sessionId,
    userName,
    answerTags,
    handleAnswerSelect,
    resetQuiz,
    setFeedbackRating
  }
}
