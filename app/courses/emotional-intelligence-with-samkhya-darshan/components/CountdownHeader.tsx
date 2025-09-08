'use client'

import { useState, useEffect } from 'react'

export default function CountdownHeader() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const targetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 14, 30, 0)) // 8 PM IST is 14:30 UTC

      if (now.getTime() > targetTime.getTime()) {
        targetTime.setUTCDate(targetTime.getUTCDate() + 1)
      }

      const timeRemaining = targetTime.getTime() - now.getTime()

      if (timeRemaining > 0) {
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60))
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

        setTimeLeft({ hours, minutes, seconds })
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <header 
      id="countdown-header"
      className="fixed top-0 left-0 w-full bg-parchment-ivory flex items-center justify-center p-3 z-[9998] border-b border-temple-gold/20 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2">
        <span className="text-sm font-medium tracking-wide text-text-secondary">Special Offer Ends In</span>
        
        <div id="timer" className="flex items-baseline gap-x-2 sm:gap-x-3 text-center">
          {/* Hours */}
          <div className="flex items-baseline gap-x-1">
            <span 
              id="hours" 
              className="text-2xl font-bold text-temple-gold font-mono"
            >
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-xs text-text-tertiary tracking-wider font-medium">HRS</span>
          </div>
          
          <span className="text-xl font-light text-text-tertiary">:</span>

          {/* Minutes */}
          <div className="flex items-baseline gap-x-1">
            <span 
              id="minutes" 
              className="text-2xl font-bold text-temple-gold font-mono"
            >
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs text-text-tertiary tracking-wider font-medium">MIN</span>
          </div>

          <span className="text-xl font-light text-text-tertiary">:</span>

          {/* Seconds */}
          <div className="flex items-baseline gap-x-1">
            <span 
              id="seconds" 
              className="text-2xl font-bold text-temple-gold font-mono"
            >
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs text-text-tertiary tracking-wider font-medium">SEC</span>
          </div>
        </div>
      </div>
    </header>
  )
}
