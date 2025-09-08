'use client';

import { useState, useEffect } from 'react';

export default function CountdownHeader() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date (7 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-pink-500 text-black text-center py-2 px-4 shadow-lg">
      <div className="flex items-center justify-center gap-4 text-sm font-semibold">
        <span>🔥 Limited Time Offer - Enroll Now!</span>
        <div className="flex items-center gap-2">
          <span>Ends in:</span>
          <div className="flex gap-1">
            <span className="bg-black text-pink-500 px-2 py-1 rounded font-bold">
              {timeLeft.days.toString().padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-black text-pink-500 px-2 py-1 rounded font-bold">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-black text-pink-500 px-2 py-1 rounded font-bold">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-black text-pink-500 px-2 py-1 rounded font-bold">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
