'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Time to Sanskrit phrase mapping
const timeToSanskritMap: Record<string, { phrase: string; transliteration: string; meaning: string }> = {
  '00:00': { phrase: 'मध्यरात्रिः', transliteration: 'madhyarātriḥ', meaning: 'midnight' },
  '00:30': { phrase: 'मध्यरात्र्यर्धम्', transliteration: 'madhyarātryardham', meaning: 'half past midnight' },
  '01:00': { phrase: 'एकवादनम्', transliteration: 'ekavādanam', meaning: 'one o\'clock' },
  '01:30': { phrase: 'एकवादनमर्धम्', transliteration: 'ekavādanamardham', meaning: 'half past one' },
  '02:00': { phrase: 'द्विवादनम्', transliteration: 'dvivādanam', meaning: 'two o\'clock' },
  '02:30': { phrase: 'द्विवादनमर्धम्', transliteration: 'dvivādanamardham', meaning: 'half past two' },
  '03:00': { phrase: 'त्रिवादनम्', transliteration: 'trivādanam', meaning: 'three o\'clock' },
  '03:30': { phrase: 'त्रिवादनमर्धम्', transliteration: 'trivādanamardham', meaning: 'half past three' },
  '04:00': { phrase: 'चतुर्वादनम्', transliteration: 'caturvādanam', meaning: 'four o\'clock' },
  '04:30': { phrase: 'चतुर्वादनमर्धम्', transliteration: 'caturvādanamardham', meaning: 'half past four' },
  '05:00': { phrase: 'पञ्चवादनम्', transliteration: 'pañcavādanam', meaning: 'five o\'clock' },
  '05:30': { phrase: 'पञ्चवादनमर्धम्', transliteration: 'pañcavādanamardham', meaning: 'half past five' },
  '06:00': { phrase: 'प्रातःकालः', transliteration: 'prātaḥkālaḥ', meaning: 'morning' },
  '06:30': { phrase: 'प्रातःकाल्यर्धम्', transliteration: 'prātaḥkālyardham', meaning: 'half past six' },
  '07:00': { phrase: 'सप्तवादनम्', transliteration: 'saptavādanam', meaning: 'seven o\'clock' },
  '07:30': { phrase: 'सप्तवादनमर्धम्', transliteration: 'saptavādanamardham', meaning: 'half past seven' },
  '08:00': { phrase: 'अष्टवादनम्', transliteration: 'aṣṭavādanam', meaning: 'eight o\'clock' },
  '08:30': { phrase: 'अष्टवादनमर्धम्', transliteration: 'aṣṭavādanamardham', meaning: 'half past eight' },
  '09:00': { phrase: 'नववादनम्', transliteration: 'navavādanam', meaning: 'nine o\'clock' },
  '09:30': { phrase: 'नववादनमर्धम्', transliteration: 'navavādanamardham', meaning: 'half past nine' },
  '10:00': { phrase: 'दशवादनम्', transliteration: 'daśavādanam', meaning: 'ten o\'clock' },
  '10:30': { phrase: 'दशवादनमर्धम्', transliteration: 'daśavādanamardham', meaning: 'half past ten' },
  '11:00': { phrase: 'एकादशवादनम्', transliteration: 'ekādaśavādanam', meaning: 'eleven o\'clock' },
  '11:30': { phrase: 'एकादशवादनमर्धम्', transliteration: 'ekādaśavādanamardham', meaning: 'half past eleven' },
  '12:00': { phrase: 'मध्यान्हम्', transliteration: 'madhyānham', meaning: 'noon' },
  '12:30': { phrase: 'मध्यान्हमर्धम्', transliteration: 'madhyānhamardham', meaning: 'half past twelve' },
  '13:00': { phrase: 'त्रयोदशवादनम्', transliteration: 'trayodaśavādanam', meaning: 'one o\'clock pm' },
  '13:30': { phrase: 'त्रयोदशवादनमर्धम्', transliteration: 'trayodaśavādanamardham', meaning: 'half past one pm' },
  '14:00': { phrase: 'चतुर्दशवादनम्', transliteration: 'chaturdaśavādanam', meaning: 'two o\'clock pm' },
  '14:30': { phrase: 'चतुर्दशवादनमर्धम्', transliteration: 'chaturdaśavādanamardham', meaning: 'half past two pm' },
  '15:00': { phrase: 'पञ्चदशवादनम्', transliteration: 'pañcadaśavādanam', meaning: 'three o\'clock pm' },
  '15:30': { phrase: 'पञ्चदशवादनमर्धम्', transliteration: 'pañcadaśavādanamardham', meaning: 'half past three pm' },
  '16:00': { phrase: 'षोडशवादनम्', transliteration: 'ṣoḍaśavādanam', meaning: 'four o\'clock pm' },
  '16:30': { phrase: 'षोडशवादनमर्धम्', transliteration: 'ṣoḍaśavādanamardham', meaning: 'half past four pm' },
  '17:00': { phrase: 'सप्तदशवादनम्', transliteration: 'saptadaśavādanam', meaning: 'five o\'clock pm' },
  '17:30': { phrase: 'सप्तदशवादनमर्धम्', transliteration: 'saptadaśavādanamardham', meaning: 'half past five pm' },
  '18:00': { phrase: 'सायं', transliteration: 'sāyaṃ', meaning: 'evening' },
  '18:30': { phrase: 'सायमर्धम्', transliteration: 'sāyamardham', meaning: 'half past six pm' },
  '19:00': { phrase: 'एकोनविंशतिवादनम्', transliteration: 'ekonaviṁśativādanam', meaning: 'seven o\'clock pm' },
  '19:30': { phrase: 'एकोनविंशतिवादनमर्धम्', transliteration: 'ekonaviṁśativādanamardham', meaning: 'half past seven pm' },
  '20:00': { phrase: 'विंशतिवादनम्', transliteration: 'viṁśativādanam', meaning: 'eight o\'clock pm' },
  '20:30': { phrase: 'विंशतिवादनमर्धम्', transliteration: 'viṁśativādanamardham', meaning: 'half past eight pm' },
  '21:00': { phrase: 'एकविंशतिवादनम्', transliteration: 'ekaviṁśativādanam', meaning: 'nine o\'clock pm' },
  '21:30': { phrase: 'एकविंशतिवादनमर्धम्', transliteration: 'ekaviṁśativādanamardham', meaning: 'half past nine pm' },
  '22:00': { phrase: 'द्वाविंशतिवादनम्', transliteration: 'dvāviṁśativādanam', meaning: 'ten o\'clock pm' },
  '22:30': { phrase: 'द्वाविंशतिवादनमर्धम्', transliteration: 'dvāviṁśativādanamardham', meaning: 'half past ten pm' },
  '23:00': { phrase: 'त्रयोविंशतिवादनम्', transliteration: 'trayoviṁśativādanam', meaning: 'eleven o\'clock pm' },
  '23:30': { phrase: 'त्रयोविंशतिवादनमर्धम्', transliteration: 'trayoviṁśativādanamardham', meaning: 'half past eleven pm' }
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

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
    setIsRevealed(false)
    setSanskritPhrase(null)
  }

  const revealSanskrit = () => {
    const phrase = timeToSanskritMap[time]
    if (phrase) {
      setSanskritPhrase(phrase)
      setIsRevealed(true)
    }
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
                  onClick={revealSanskrit}
                  className="btn-sanskrit-primary px-6 py-2"
                  disabled={!timeToSanskritMap[time]}
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
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 bg-white text-teal-primary shadow-sm"
                >
                  <span>{mode.icon}</span>
                  <span className="hidden sm:inline">{mode.label}</span>
                  <span className="sm:hidden">{mode.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <button className="btn-sanskrit-primary text-lg px-8 py-4">
                Try a 5-minute session (no signup for first run)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
