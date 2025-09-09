'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { DharmaPathData, Avatar, Quiz, QuizResult } from '../types/dharma-path'

interface DharmaPathContextType {
  userProfile: DharmaPathData | null
  setUserProfile: (profile: DharmaPathData | null) => void
  updateProfile: (updates: Partial<DharmaPathData>) => void
}

const DharmaPathContext = createContext<DharmaPathContextType | undefined>(undefined)

export function DharmaPathProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<DharmaPathData | null>(null)

  useEffect(() => {
    // Load profile from localStorage on mount
    const storedProfile = localStorage.getItem('dharma-path-profile')
    if (storedProfile) {
      try {
        setUserProfile(JSON.parse(storedProfile))
      } catch (error) {
        console.error('Error parsing stored profile:', error)
      }
    }
  }, [])

  const updateProfile = (updates: Partial<DharmaPathData>) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...updates, lastUpdated: new Date().toISOString() }
      setUserProfile(updatedProfile)
      localStorage.setItem('dharma-path-profile', JSON.stringify(updatedProfile))
    }
  }

  return (
    <DharmaPathContext.Provider value={{ userProfile, setUserProfile, updateProfile }}>
      {children}
    </DharmaPathContext.Provider>
  )
}

export function useDharmaPath() {
  const context = useContext(DharmaPathContext)
  if (context === undefined) {
    throw new Error('useDharmaPath must be used within a DharmaPathProvider')
  }
  return context
}
