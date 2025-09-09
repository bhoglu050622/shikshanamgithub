'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Sanskrit Numbers (1-60)
const sanskritNumbers: Record<number, { word: string; transliteration: string }> = {
  1: { word: 'एक', transliteration: 'eka' },
  2: { word: 'द्वि', transliteration: 'dvi' },
  3: { word: 'त्रि', transliteration: 'tri' },
  4: { word: 'चतुर्', transliteration: 'catur' },
  5: { word: 'पञ्च', transliteration: 'pañca' },
  6: { word: 'षट्', transliteration: 'ṣaṭ' },
  7: { word: 'सप्त', transliteration: 'sapta' },
  8: { word: 'अष्ट', transliteration: 'aṣṭa' },
  9: { word: 'नव', transliteration: 'nava' },
  10: { word: 'दश', transliteration: 'daśa' },
  11: { word: 'एकादश', transliteration: 'ekādaśa' },
  12: { word: 'द्वादश', transliteration: 'dvādaśa' },
  13: { word: 'त्रयोदश', transliteration: 'trayodaśa' },
  14: { word: 'चतुर्दश', transliteration: 'caturdaśa' },
  15: { word: 'पञ्चदश', transliteration: 'pañcadaśa' },
  16: { word: 'षोडश', transliteration: 'ṣoḍaśa' },
  17: { word: 'सप्तदश', transliteration: 'saptadaśa' },
  18: { word: 'अष्टादश', transliteration: 'aṣṭādaśa' },
  19: { word: 'एकोनविंशति', transliteration: 'ekonaviṁśati' },
  20: { word: 'विंशति', transliteration: 'viṁśati' },
  21: { word: 'एकविंशति', transliteration: 'ekaviṁśati' },
  22: { word: 'द्वाविंशति', transliteration: 'dvāviṁśati' },
  23: { word: 'त्रयोविंशति', transliteration: 'trayoviṁśati' },
  24: { word: 'चतुर्विंशति', transliteration: 'caturviṁśati' },
  25: { word: 'पञ्चविंशति', transliteration: 'pañcaviṁśati' },
  26: { word: 'षड्विंशति', transliteration: 'ṣaḍviṁśati' },
  27: { word: 'सप्तविंशति', transliteration: 'saptaviṁśati' },
  28: { word: 'अष्टाविंशति', transliteration: 'aṣṭāviṁśati' },
  29: { word: 'एकोनत्रिंशत्', transliteration: 'ekonatriṁśat' },
  30: { word: 'त्रिंशत्', transliteration: 'triṁśat' },
  31: { word: 'एकत्रिंशत्', transliteration: 'ekatriṁśat' },
  32: { word: 'द्वात्रिंशत्', transliteration: 'dvātriṁśat' },
  33: { word: 'त्रयस्त्रिंशत्', transliteration: 'trayastriṁśat' },
  34: { word: 'चतुस्त्रिंशत्', transliteration: 'catustriṁśat' },
  35: { word: 'पञ्चत्रिंशत्', transliteration: 'pañcatriṁśat' },
  36: { word: 'षट्त्रिंशत्', transliteration: 'ṣaṭtriṁśat' },
  37: { word: 'सप्तत्रिंशत्', transliteration: 'saptatriṁśat' },
  38: { word: 'अष्टात्रिंशत्', transliteration: 'aṣṭātriṁśat' },
  39: { word: 'एकोनचत्वारिंशत्', transliteration: 'ekonacatvāriṁśat' },
  40: { word: 'चत्वारिंशत्', transliteration: 'catvāriṁśat' },
  41: { word: 'एकचत्वारिंशत्', transliteration: 'ekacatvāriṁśat' },
  42: { word: 'द्विचत्वारिंशत्', transliteration: 'dvicatvāriṁśat' },
  43: { word: 'त्रयश्चत्वारिंशत्', transliteration: 'trayaścatvāriṁśat' },
  44: { word: 'चतुश्चत्वारिंशत्', transliteration: 'catuścatvāriṁśat' },
  45: { word: 'पञ्चचत्वारिंशत्', transliteration: 'pañcacatvāriṁśat' },
  46: { word: 'षट्चत्वारिंशत्', transliteration: 'ṣaṭcatvāriṁśat' },
  47: { word: 'सप्तचत्वारिंशत्', transliteration: 'saptacatvāriṁśat' },
  48: { word: 'अष्टाचत्वारिंशत्', transliteration: 'aṣṭācatvāriṁśat' },
  49: { word: 'एकोनपञ्चाशत्', transliteration: 'ekonapañcāśat' },
  50: { word: 'पञ्चाशत्', transliteration: 'pañcāśat' },
  51: { word: 'एकपञ्चाशत्', transliteration: 'ekapañcāśat' },
  52: { word: 'द्विपञ्चाशत्', transliteration: 'dvipañcāśat' },
  53: { word: 'त्रयःपञ्चाशत्', transliteration: 'trayaḥpañcāśat' },
  54: { word: 'चतुःपञ्चाशत्', transliteration: 'catuḥpañcāśat' },
  55: { word: 'पञ्चपञ्चाशत्', transliteration: 'pañcapañcāśat' },
  56: { word: 'षट्पञ्चाशत्', transliteration: 'ṣaṭpañcāśat' },
  57: { word: 'सप्तपञ्चाशत्', transliteration: 'saptapañcāśat' },
  58: { word: 'अष्टापञ्चाशत्', transliteration: 'aṣṭāpañcāśat' },
  59: { word: 'एकोनषष्टि', transliteration: 'ekonaṣaṣṭi' },
  60: { word: 'षष्टि', transliteration: 'ṣaṣṭi' }
}

// Sanskrit Hours (0-23)
const sanskritHours: Record<number, { word: string; transliteration: string }> = {
  0: { word: 'शून्य', transliteration: 'śūnya' },
  1: { word: 'एक', transliteration: 'eka' },
  2: { word: 'द्वि', transliteration: 'dvi' },
  3: { word: 'त्रि', transliteration: 'tri' },
  4: { word: 'चतुर्', transliteration: 'catur' },
  5: { word: 'पञ्च', transliteration: 'pañca' },
  6: { word: 'षट्', transliteration: 'ṣaṭ' },
  7: { word: 'सप्त', transliteration: 'sapta' },
  8: { word: 'अष्ट', transliteration: 'aṣṭa' },
  9: { word: 'नव', transliteration: 'nava' },
  10: { word: 'दश', transliteration: 'daśa' },
  11: { word: 'एकादश', transliteration: 'ekādaśa' },
  12: { word: 'द्वादश', transliteration: 'dvādaśa' },
  13: { word: 'त्रयोदश', transliteration: 'trayodaśa' },
  14: { word: 'चतुर्दश', transliteration: 'caturdaśa' },
  15: { word: 'पञ्चदश', transliteration: 'pañcadaśa' },
  16: { word: 'षोडश', transliteration: 'ṣoḍaśa' },
  17: { word: 'सप्तदश', transliteration: 'saptadaśa' },
  18: { word: 'अष्टादश', transliteration: 'aṣṭādaśa' },
  19: { word: 'एकोनविंशति', transliteration: 'ekonaviṁśati' },
  20: { word: 'विंशति', transliteration: 'viṁśati' },
  21: { word: 'एकविंशति', transliteration: 'ekaviṁśati' },
  22: { word: 'द्वाविंशति', transliteration: 'dvāviṁśati' },
  23: { word: 'त्रयोविंशति', transliteration: 'trayoviṁśati' }
}

// Function to generate Sanskrit time expression
function generateSanskritTime(timeString: string): { phrase: string; transliteration: string; meaning: string } {
  const [hours, minutes] = timeString.split(':').map(Number)
  
  // Special cases
  if (hours === 0 && minutes === 0) {
    return {
      phrase: 'मध्यरात्रि',
      transliteration: 'madhyarātri',
      meaning: 'midnight'
    }
  }
  
  if (hours === 12 && minutes === 0) {
    return {
      phrase: 'मध्याह्न',
      transliteration: 'madhyāhna',
      meaning: 'midday/noon'
    }
  }
  
  // Get hour in Sanskrit
  const hourSanskrit = sanskritHours[hours]
  const hourWord = hourSanskrit.word + 'वादनम्'
  const hourTransliteration = hourSanskrit.transliteration + 'vādanam'
  
  // Generate time expression based on minutes
  if (minutes === 0) {
    // Exactly o'clock
    return {
      phrase: hourWord,
      transliteration: hourTransliteration,
      meaning: `${hours} o'clock`
    }
  } else if (minutes >= 1 && minutes <= 29) {
    // Minutes past the hour
    const minuteSanskrit = sanskritNumbers[minutes]
    const phrase = `${minuteSanskrit.word}अधिक ${hourWord}`
    const transliteration = `${minuteSanskrit.transliteration}adhika ${hourTransliteration}`
    return {
      phrase,
      transliteration,
      meaning: `${minutes} minutes past ${hours}`
    }
  } else if (minutes === 30) {
    // Half past
    const phrase = `सार्ध ${hourWord}`
    const transliteration = `sārdha ${hourTransliteration}`
    return {
      phrase,
      transliteration,
      meaning: `half past ${hours}`
    }
  } else if (minutes >= 31 && minutes <= 59) {
    // Minutes to next hour
    const minutesToNext = 60 - minutes
    const nextHour = (hours + 1) % 24
    const nextHourSanskrit = sanskritHours[nextHour]
    const minuteSanskrit = sanskritNumbers[minutesToNext]
    
    const phrase = `${minuteSanskrit.word}ऊन ${nextHourSanskrit.word}वादनम्`
    const transliteration = `${minuteSanskrit.transliteration}ūna ${nextHourSanskrit.transliteration}vādanam`
    return {
      phrase,
      transliteration,
      meaning: `${minutesToNext} minutes to ${nextHour}`
    }
  }
  
  // Fallback
  return {
    phrase: hourWord,
    transliteration: hourTransliteration,
    meaning: `${hours}:${minutes}`
  }
}

function ClockSVG({ time }: { time: string }) {
  const [hours, minutes] = time.split(':').map(Number)
  const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30
  const minuteAngle = minutes * 6

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
      {/* Clock face */}
      <circle cx="100" cy="100" r="90" fill="white" stroke="hsl(var(--teal-primary))" strokeWidth="4" />
      
      {/* Hour markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30) - 90
        const x1 = 100 + 75 * Math.cos(angle * Math.PI / 180)
        const y1 = 100 + 75 * Math.sin(angle * Math.PI / 180)
        const x2 = 100 + 85 * Math.cos(angle * Math.PI / 180)
        const y2 = 100 + 85 * Math.sin(angle * Math.PI / 180)
        
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="hsl(var(--teal-primary))"
            strokeWidth="3"
          />
        )
      })}
      
      {/* Center dot */}
      <circle cx="100" cy="100" r="6" fill="hsl(var(--teal-primary))" />
      
      {/* Hour hand */}
      <line
        x1="100"
        y1="100"
        x2={100 + 40 * Math.cos((hourAngle - 90) * Math.PI / 180)}
        y2={100 + 40 * Math.sin((hourAngle - 90) * Math.PI / 180)}
        stroke="hsl(var(--teal-primary))"
        strokeWidth="6"
        strokeLinecap="round"
      />
      
      {/* Minute hand */}
      <line
        x1="100"
        y1="100"
        x2={100 + 60 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
        y2={100 + 60 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
        stroke="hsl(var(--coral-primary))"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function AIClockWidget() {
  const [time, setTime] = useState('14:30')
  const [sanskritPhrase, setSanskritPhrase] = useState<{ phrase: string; transliteration: string; meaning: string } | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [activeMode, setActiveMode] = useState<'pronunciation' | 'drills' | 'doubts'>('pronunciation')
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Set initial time to current time
  useEffect(() => {
    const now = new Date()
    const timeString = now.toTimeString().slice(0, 5)
    setTime(timeString)
  }, [])

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setTime(inputValue)
    setIsRevealed(false)
    setSanskritPhrase(null)
  }

  const revealSanskrit = useCallback(() => {
    const phrase = generateSanskritTime(time)
    setSanskritPhrase(phrase)
    setIsRevealed(true)
  }, [time])

  const handleModeChange = (mode: 'pronunciation' | 'drills' | 'doubts') => {
    setActiveMode(mode)
  }

  const handleStartSession = () => {
    setIsSessionActive(true)
    // Simulate session start - in real implementation, this would connect to AI service
    setTimeout(() => {
      setIsSessionActive(false)
    }, 5000) // 5 minute session simulation
  }

  const useCurrentTime = () => {
    const now = new Date()
    const timeString = now.toTimeString().slice(0, 5)
    setTime(timeString)
    setIsRevealed(false)
    setSanskritPhrase(null)
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display text-dark-text mb-4">
            AI is your Guru
          </h2>
          <p className="text-body text-muted-gray max-w-2xl mx-auto">
            A friendly AI tutor for drill practice and doubts. Get instant feedback 
            on pronunciation, practice drills, and clear your doubts.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-primary/20">
            {/* Clock Widget */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <ClockSVG time={time} />
              </div>
              
              {/* Current Time Display */}
              <div className="mb-4">
                <div className="text-sm text-muted-gray mb-2">Current Time:</div>
                <div className="text-2xl font-bold text-teal-primary">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
                <div className="text-xs text-muted-gray mt-1">
                  Processing: {time} (24-hour format)
                </div>
              </div>

              {/* Time Input */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <label htmlFor="time-input" className="text-dark-text font-medium">
                    Time:
                  </label>
                  <input
                    id="time-input"
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                    className="px-4 py-2 border border-teal-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-primary/25 text-dark-text"
                    aria-label="Enter time in 24-hour format"
                  />
                </div>
                
                <button
                  onClick={useCurrentTime}
                  className="px-4 py-2 border border-teal-primary/30 rounded-xl text-teal-primary hover:bg-teal-primary/10 transition-colors"
                >
                  Use Current Time
                </button>
                
                <button
                  onClick={revealSanskrit}
                  className="btn-sanskrit-primary px-6 py-2"
                >
                  Reveal Sanskrit
                </button>
              </div>
            </div>

            {/* Sanskrit Phrase Display */}
            <AnimatePresence>
              {isRevealed && sanskritPhrase && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.26 }}
                  className="text-center p-6 bg-light-cyan rounded-xl border border-teal-primary/20"
                  role="region"
                  aria-live="polite"
                  aria-label="Sanskrit phrase for the selected time"
                >
                  <div className="text-2xl font-bold font-devanagari text-teal-primary mb-2">
                    {sanskritPhrase.phrase}
                  </div>
                  <div className="text-lg text-muted-gray mb-2">
                    {sanskritPhrase.transliteration}
                  </div>
                  <div className="text-dark-text font-medium">
                    {sanskritPhrase.meaning}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mode Tabs */}
            <div className="flex justify-center space-x-1 bg-light-cyan rounded-2xl p-1 mb-6">
              {[
                { key: 'pronunciation', label: 'Pronunciation Coach', icon: '🎤' },
                { key: 'drills', label: 'Declension/Conjugation Drills', icon: '🎯' },
                { key: 'doubts', label: 'Quick Doubt Solver', icon: '❓' }
              ].map((mode) => (
                <button
                  key={mode.key}
                  onClick={() => handleModeChange(mode.key as 'pronunciation' | 'drills' | 'doubts')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    activeMode === mode.key 
                      ? 'bg-white text-teal-primary shadow-sm' 
                      : 'text-muted-gray hover:text-teal-primary hover:bg-white/50'
                  }`}
                >
                  <span>{mode.icon}</span>
                  <span className="hidden sm:inline">{mode.label}</span>
                  <span className="sm:hidden">{mode.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Mode Content */}
            <div className="mb-6 p-4 bg-light-cyan rounded-xl">
              {activeMode === 'pronunciation' && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-dark-text mb-2">🎤 Pronunciation Coach</h3>
                  <p className="text-muted-gray mb-4">Practice Sanskrit pronunciation with AI feedback</p>
                  <div className="text-sm text-muted-gray">
                    • Real-time pronunciation analysis<br/>
                    • Phonetic guidance for difficult sounds<br/>
                    • Progress tracking and improvement tips
                  </div>
                </div>
              )}
              {activeMode === 'drills' && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-dark-text mb-2">🎯 Grammar Drills</h3>
                  <p className="text-muted-gray mb-4">Master declensions and conjugations through practice</p>
                  <div className="text-sm text-muted-gray">
                    • Interactive declension exercises<br/>
                    • Verb conjugation practice<br/>
                    • Instant feedback and corrections
                  </div>
                </div>
              )}
              {activeMode === 'doubts' && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-dark-text mb-2">❓ Quick Doubt Solver</h3>
                  <p className="text-muted-gray mb-4">Get instant answers to your Sanskrit questions</p>
                  <div className="text-sm text-muted-gray">
                    • Ask questions about grammar, vocabulary, or usage<br/>
                    • Contextual explanations with examples<br/>
                    • Related concept suggestions
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="text-center">
              <button 
                onClick={handleStartSession}
                disabled={isSessionActive}
                className={`btn-sanskrit-primary text-lg px-8 py-4 transition-all duration-300 ${
                  isSessionActive 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:scale-105 hover:shadow-lg'
                }`}
              >
                {isSessionActive ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Session Active - 5 minutes</span>
                  </div>
                ) : (
                  `Try a 5-minute ${activeMode} session (no signup for first run)`
                )}
              </button>
              
              {isSessionActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl"
                >
                  <p className="text-green-700 text-sm">
                    🎉 Your AI {activeMode} session is now active! Practice and learn with personalized feedback.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
