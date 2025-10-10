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
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
    const now = new Date()
    setCurrentTime(now)
    const timeString = now.toTimeString().slice(0, 5)
    setTime(timeString)
  }, [])

  // Update current time every second
  useEffect(() => {
    if (!mounted) return
    
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [mounted])

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


  const useCurrentTime = () => {
    if (!mounted) return
    
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
                  {currentTime ? currentTime.toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  }) : 'Loading...'}
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



          </div>
        </div>
      </div>
    </section>
  )
}
