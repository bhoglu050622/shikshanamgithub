'use client';

import { useEffect, useState } from 'react';

export default function CountdownHeader() {
  const [timeLeft, setTimeLeft] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      // 8 PM IST is 14:30 UTC
      const targetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 14, 30, 0));

      if (now.getTime() > targetTime.getTime()) {
        targetTime.setUTCDate(targetTime.getUTCDate() + 1);
      }

      const timeRemaining = targetTime.getTime() - now.getTime();

      if (timeRemaining > 0) {
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setTimeLeft({
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0')
        });
      } else {
        setTimeLeft({
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header 
      id="countdown-header" 
      className="fixed top-0 left-0 w-full bg-[#fcf8f3] flex items-center justify-center p-3 z-[9998] border-b border-amber-200/60 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2">
        <span className="text-sm font-medium tracking-wide text-[#4A4A4A]">
          Special Offer Ends In
        </span>
        
        <div id="timer" className="flex items-baseline gap-x-2 sm:gap-x-3 text-center">
          {/* Hours */}
          <div className="flex items-baseline gap-x-1">
            <span 
              id="hours" 
              className="font-mono-timer text-2xl font-bold" 
              style={{ color: '#c55a11' }}
            >
              {timeLeft.hours}
            </span>
            <span className="text-xs text-gray-500 tracking-wider font-medium">HRS</span>
          </div>
          
          <span className="text-xl font-light text-gray-300">:</span>

          {/* Minutes */}
          <div className="flex items-baseline gap-x-1">
            <span 
              id="minutes" 
              className="font-mono-timer text-2xl font-bold" 
              style={{ color: '#c55a11' }}
            >
              {timeLeft.minutes}
            </span>
            <span className="text-xs text-gray-500 tracking-wider font-medium">MIN</span>
          </div>

          <span className="text-xl font-light text-gray-300">:</span>

          {/* Seconds */}
          <div className="flex items-baseline gap-x-1">
            <span 
              id="seconds" 
              className="font-mono-timer text-2xl font-bold" 
              style={{ color: '#c55a11' }}
            >
              {timeLeft.seconds}
            </span>
            <span className="text-xs text-gray-500 tracking-wider font-medium">SEC</span>
          </div>
        </div>
      </div>
    </header>
  );
}
