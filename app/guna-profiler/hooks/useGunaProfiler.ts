'use client'

import { useState, useEffect } from 'react'
import { GunaScores, GunaResult } from '../types/guna-profiler'
import { archetypes } from '../data/archetypes'

export function useGunaProfiler() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [scores, setScores] = useState<GunaScores>({ sattva: 0, rajas: 0, tamas: 0 })
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState<GunaResult | null>(null)
  const [feedbackRating, setFeedbackRating] = useState(0)
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

  const handleAnswerSelect = (guna: 'sattva' | 'rajas' | 'tamas') => {
    setScores(prev => ({ ...prev, [guna]: prev[guna] + 1 }))
    
    if (currentQuestionIndex < 19) { // 20 questions total
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    // The final scores should already include all answers
    const finalScores = { ...scores }
    const total = finalScores.sattva + finalScores.rajas + finalScores.tamas

    const percentages = {
      sattva: Math.round((finalScores.sattva / total) * 100),
      rajas: Math.round((finalScores.rajas / total) * 100),
      tamas: Math.round((finalScores.tamas / total) * 100)
    }

    const sortedGunas = Object.entries(finalScores).sort(([,a],[,b]) => b - a)
    const dominantGuna = sortedGunas[0][0] as 'sattva' | 'rajas' | 'tamas'
    const gunaTraitCode = sortedGunas.map(([key]) => key.charAt(0).toUpperCase()).join('')

    // Determine personality archetype code
    const highestScore = sortedGunas[0][1]
    const lowestScore = sortedGunas[2][1]
    
    let personalityArchetypeCode = gunaTraitCode
    
    if (lowestScore < highestScore * 0.35 && highestScore > 0) {
      // It's a 2-guna type
      personalityArchetypeCode = gunaTraitCode.substring(0, 2)
    } else {
      // It's a 3-guna type, check for combined archetype
      const combinedCode = `${gunaTraitCode}-${gunaTraitCode.substring(0, 2)}`
      if (archetypes[combinedCode as keyof typeof archetypes]) {
        personalityArchetypeCode = combinedCode
      }
    }

    const archetypeData = archetypes[personalityArchetypeCode as keyof typeof archetypes] || archetypes.SRT

    const gunaResult: GunaResult = {
      scores: finalScores,
      percentages,
      dominantGuna,
      gunaTraitCode,
      personalityArchetypeCode,
      archetype: archetypeData.archetype,
      description: archetypeData.description,
      timestamp: new Date().toISOString()
    }

    setResult(gunaResult)
    setShowResults(true)

    // Save result to localStorage
    saveToLocalStorage(gunaResult)
  }


  const saveToLocalStorage = (gunaResult: GunaResult) => {
    try {
      localStorage.setItem('guna-profiler-result', JSON.stringify(gunaResult))
      localStorage.setItem('guna-profiler-timestamp', new Date().toISOString())
    } catch (error) {
      console.error('Error saving guna result:', error)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setScores({ sattva: 0, rajas: 0, tamas: 0 })
    setShowResults(false)
    setResult(null)
    setFeedbackRating(0)
  }

  return {
    currentQuestionIndex,
    scores,
    showResults,
    result,
    feedbackRating,
    sessionId,
    userName,
    handleAnswerSelect,
    resetQuiz,
    setFeedbackRating
  }
}
