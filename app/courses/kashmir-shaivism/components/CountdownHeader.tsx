'use client';

import { useEffect, useState } from 'react';

export default function CountdownHeader() {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0, 0);
      
      if (now.getTime() > targetTime.getTime()) {
        targetTime.setDate(targetTime.getDate() + 1);
      }
      
      const timeDifference = targetTime.getTime() - now.getTime();
      
      if (timeDifference <= 0) {
        setTimeLeft('00:00:00');
        return;
      }
      
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      
      setTimeLeft(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="countdown-header">
      <span className="font-semibold">Limited Time Offer!</span> Ends in: 
      <span className="font-bold tracking-wider ml-2">{timeLeft}</span>
    </div>
  );
}
