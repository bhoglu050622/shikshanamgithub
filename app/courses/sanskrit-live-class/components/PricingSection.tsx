'use client';

import { useEffect, useState } from 'react';

export default function PricingSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const targetDate = new Date("2025-10-25T00:00:00");
      
      const distance = targetDate.getTime() - now.getTime();

      if (distance < 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="emotional-mastery-pricing-container">
      <div className="emp-wrapper">
        <header className="emp-header">
          <span className="emp-tag">✨ Limited Time Offer</span>
          <h1>Master Conversational Sanskrit in 3 Months</h1>
          <p>A practical, live-class approach to mastering spoken Sanskrit.</p>
        </header>
        
        <div className="emp-stats">
          <div className="emp-stat-item">
            <div className="emp-value">108</div>
            <div className="emp-label">Limited Seats</div>
          </div>
          <div className="emp-stat-item">
            <div className="emp-value">4.9<span>★</span></div>
            <div className="emp-label">Average Rating</div>
          </div>
          <div className="emp-stat-item">
            <div className="emp-value">95%</div>
            <div className="emp-label">Completion Rate</div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="emp-countdown-container">
          <h3>Offer Ends In:</h3>
          <div className="emp-countdown">
            <div className="emp-countdown-item">
              <div id="days" className="emp-countdown-number">{timeLeft.days}</div>
              <div className="emp-countdown-label">Days</div>
            </div>
            <div className="emp-countdown-item">
              <div id="hours" className="emp-countdown-number">{timeLeft.hours}</div>
              <div className="emp-countdown-label">Hours</div>
            </div>
            <div className="emp-countdown-item">
              <div id="minutes" className="emp-countdown-number">{timeLeft.minutes}</div>
              <div className="emp-countdown-label">Minutes</div>
            </div>
            <div className="emp-countdown-item">
              <div id="seconds" className="emp-countdown-number">{timeLeft.seconds}</div>
              <div className="emp-countdown-label">Seconds</div>
            </div>
          </div>
        </div>
        
        <div className="emp-pricing-cards">
          {/* Installment Plan Card */}
          <div className="emp-pricing-card">
            <div className="emp-installment-badge">FLEXIBLE PLAN</div>
            <div className="emp-card-header">
              <h2>Installment Plan</h2>
              <p>Pay in easy monthly installments to get started.</p>
            </div>
            <div className="emp-price">
              <span className="emp-current-price">₹4,499</span>
              <span className="emp-original-price">₹8,499</span>
              <div className="emp-save-badge emp-save-badge-installment">Save 47%</div>
            </div>
            <div className="emp-monthly-price">Only ₹1,499 per month</div>
            <ul className="emp-features">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                24 Live Classes
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Sanskrit Learning Material
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Seats are limited, based on performance
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Private community access
              </li>
            </ul>
            <a 
              href="https://courses.shikshanam.in/single-checkout/68e60a1bc79998642e10ed0d?pid=p3" 
              target="_blank" 
              className="emp-cta-button emp-cta-button-installment"
            >
              Choose Installment Plan
            </a>
          </div>

          {/* One-Time Payment Card */}
          <div id="one-time-payment-card" className="emp-pricing-card emp-best-value">
            <div className="emp-best-value-badge">PRE-BOOKING OFFER</div>
            <div className="emp-card-header">
              <h2>One-Time Payment</h2>
              <p>Pre-book now for an exclusive 40% discount!</p>
            </div>
            <div className="emp-price">
              <span className="emp-current-price">₹2,399</span>
              <span className="emp-original-price">₹3,999</span>
              <div className="emp-save-badge emp-save-badge-otp">Save 40%</div>
            </div>
            <ul className="emp-features">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                24 Live Classes
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Sanskrit Learning Material
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Seats are limited, based on performance
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Private community access
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Classes completion certificate
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                1 year access
              </li>
            </ul>
            <a 
              href="https://courses.shikshanam.in/single-checkout/68e60a1bc79998642e10ed0d?pid=p1" 
              target="_blank" 
              className="emp-cta-button emp-cta-button-primary"
            >
              Enroll Now
            </a>
          </div>
        </div>

        <div className="emp-footer-stats">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L8.707 1.5z"/>
              <path d="m13.293 7.293-6-6a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708L8 2.207l5.293 5.293a.5.5 0 0 0 .708-.708z"/>
            </svg>
            <span>Certified classes</span>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <span>4.9/5 Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
