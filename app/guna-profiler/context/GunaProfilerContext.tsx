'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { QuizResult } from '../types/guna-profiler'

interface GunaProfilerData {
  completedQuizzes: QuizResult[]
  currentQuizAnswers: { [questionId: string]: 'sattva' | 'rajas' | 'tamas' }
  currentQuestionIndex: number
  isQuizCompleted: boolean
  lastUpdated: string
}

interface GunaProfilerContextType {
  profilerData: GunaProfilerData | null
  setProfilerData: React.Dispatch<React.SetStateAction<GunaProfilerData | null>>
  updateQuizAnswers: (questionId: string, answer: 'sattva' | 'rajas' | 'tamas') => void
  completeQuiz: (result: QuizResult) => void
  resetQuiz: () => void
  getCompletedQuizzes: () => QuizResult[]
}

const GunaProfilerContext = createContext<GunaProfilerContextType | undefined>(undefined)

export const GunaProfilerProvider = ({ children }: { children: ReactNode }) => {
  const [profilerData, setProfilerData] = useState<GunaProfilerData | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem('guna-profiler-data')
    if (storedData) {
      setProfilerData(JSON.parse(storedData))
    } else {
      // Initialize with default data
      const defaultData: GunaProfilerData = {
        completedQuizzes: [],
        currentQuizAnswers: {},
        currentQuestionIndex: 0,
        isQuizCompleted: false,
        lastUpdated: new Date().toISOString(),
      }
      setProfilerData(defaultData)
      localStorage.setItem('guna-profiler-data', JSON.stringify(defaultData))
    }
  }, [])

  const updateProfilerData = (updates: Partial<GunaProfilerData>) => {
    setProfilerData(prevData => {
      if (!prevData) return null
      
      const updatedData = {
        ...prevData,
        ...updates,
        lastUpdated: new Date().toISOString(),
      }
      
      localStorage.setItem('guna-profiler-data', JSON.stringify(updatedData))
      return updatedData
    })
  }

  const updateQuizAnswers = (questionId: string, answer: 'sattva' | 'rajas' | 'tamas') => {
    if (!profilerData) return

    const updatedAnswers = {
      ...profilerData.currentQuizAnswers,
      [questionId]: answer,
    }

    updateProfilerData({
      currentQuizAnswers: updatedAnswers,
    })
  }

  const completeQuiz = (result: QuizResult) => {
    if (!profilerData) return

    const updatedCompletedQuizzes = [...profilerData.completedQuizzes, result]

    updateProfilerData({
      completedQuizzes: updatedCompletedQuizzes,
      currentQuizAnswers: {},
      currentQuestionIndex: 0,
      isQuizCompleted: true,
    })
  }

  const resetQuiz = () => {
    updateProfilerData({
      currentQuizAnswers: {},
      currentQuestionIndex: 0,
      isQuizCompleted: false,
    })
  }

  const getCompletedQuizzes = (): QuizResult[] => {
    return profilerData?.completedQuizzes || []
  }

  return (
    <GunaProfilerContext.Provider
      value={{
        profilerData,
        setProfilerData,
        updateQuizAnswers,
        completeQuiz,
        resetQuiz,
        getCompletedQuizzes,
      }}
    >
      {children}
    </GunaProfilerContext.Provider>
  )
}

export const useGunaProfiler = () => {
  const context = useContext(GunaProfilerContext)
  if (context === undefined) {
    throw new Error('useGunaProfiler must be used within a GunaProfilerProvider')
  }
  return context
}

