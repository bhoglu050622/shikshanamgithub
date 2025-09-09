'use client'

import { useState, useEffect } from 'react'
import { DharmaPathData } from '../dharma-path/types/dharma-path'

export default function TestGunaProfilerPage() {
  const [userProfile, setUserProfile] = useState<DharmaPathData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has Dharma Path profile
    const storedProfile = localStorage.getItem('dharma-path-profile')
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile))
    }
    setIsLoading(false)
  }, [])

  const createTestProfile = () => {
    const testProfile: DharmaPathData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      selectedAvatar: {
        id: 'krishna',
        name: 'Krishna',
        sanskritName: 'कृष्ण',
        essence: 'The Divine Lover and Protector',
        description: 'The eighth avatar of Vishnu, embodying love, compassion, and divine play',
        verse: {
          sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत',
          english: 'Whenever there is a decline in righteousness, O Arjuna',
          translation: 'Whenever there is a decline in righteousness, O Arjuna'
        },
        color: 'blue',
        symbol: 'lotus',
        attributes: ['compassion', 'wisdom', 'divine love', 'protection']
      },
      quizResults: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    }
    
    localStorage.setItem('dharma-path-profile', JSON.stringify(testProfile))
    setUserProfile(testProfile)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-deep-indigo via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-indigo via-indigo-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-lotus-white mb-8 text-center">
          Guna Profiler Test Page
        </h1>

        {!userProfile ? (
          <div className="bg-lotus-white/10 backdrop-blur-sm rounded-2xl p-8 border border-lotus-white/20 text-center">
            <h2 className="text-2xl font-semibold text-lotus-white mb-4">
              No Dharma Path Profile Found
            </h2>
            <p className="text-lotus-white/80 mb-6">
              You need to complete the Dharma Path first to access the Guna Profiler.
            </p>
            <div className="space-y-4">
              <button
                onClick={createTestProfile}
                className="px-6 py-3 bg-saffron-primary hover:bg-saffron-primary/80 text-deep-indigo rounded-lg font-medium transition-all duration-300 mr-4"
              >
                Create Test Profile
              </button>
              <a
                href="/dharma-path"
                className="px-6 py-3 bg-lotus-white/10 hover:bg-lotus-white/20 text-lotus-white rounded-lg font-medium transition-all duration-300 border border-lotus-white/20"
              >
                Go to Dharma Path
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-lotus-white/10 backdrop-blur-sm rounded-2xl p-6 border border-lotus-white/20">
              <h2 className="text-2xl font-semibold text-lotus-white mb-4">
                Current Profile
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-lotus-white/80">
                <div>
                  <strong>Name:</strong> {userProfile.name}
                </div>
                <div>
                  <strong>Email:</strong> {userProfile.email}
                </div>
                <div>
                  <strong>Avatar:</strong> {userProfile.selectedAvatar?.name}
                </div>
                <div>
                  <strong>Quiz Results:</strong> {userProfile.quizResults.length} completed
                </div>
              </div>
            </div>

            <div className="bg-lotus-white/10 backdrop-blur-sm rounded-2xl p-6 border border-lotus-white/20">
              <h2 className="text-2xl font-semibold text-lotus-white mb-4">
                Test Actions
              </h2>
              <div className="space-y-4">
                <a
                  href="/guna-profiler"
                  className="block px-6 py-3 bg-saffron-primary hover:bg-saffron-primary/80 text-deep-indigo rounded-lg font-medium transition-all duration-300 text-center"
                >
                  Launch Guna Profiler
                </a>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      localStorage.removeItem('dharma-path-profile')
                      setUserProfile(null)
                    }}
                    className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg font-medium transition-all duration-300 border border-red-500/30"
                  >
                    Clear Profile
                  </button>
                  
                  <button
                    onClick={() => {
                      localStorage.removeItem('guna-profiler-data')
                      alert('Guna Profiler data cleared!')
                    }}
                    className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-lg font-medium transition-all duration-300 border border-orange-500/30"
                  >
                    Clear Guna Data
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-lotus-white/10 backdrop-blur-sm rounded-2xl p-6 border border-lotus-white/20">
              <h2 className="text-2xl font-semibold text-lotus-white mb-4">
                Navigation Links
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="/dharma-path"
                  className="px-6 py-3 bg-lotus-white/10 hover:bg-lotus-white/20 text-lotus-white rounded-lg font-medium transition-all duration-300 border border-lotus-white/20 text-center"
                >
                  Dharma Path
                </a>
                <a
                  href="/courses"
                  className="px-6 py-3 bg-lotus-white/10 hover:bg-lotus-white/20 text-lotus-white rounded-lg font-medium transition-all duration-300 border border-lotus-white/20 text-center"
                >
                  Courses
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
