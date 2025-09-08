'use client';

import { useEffect, useRef, useState } from 'react';

export default function PricingSection() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    // Intersection Observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('#kashmir-pricing-section .animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // Countdown Timer Logic
    const updateCountdown = () => {
      const now = new Date();
      let targetTime = new Date(now);
      targetTime.setHours(21, 0, 0, 0);

      // If the current time is past 9 PM, set the target to 9 PM of the next day
      if (now.getTime() > targetTime.getTime()) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const totalSeconds = (targetTime.getTime() - now.getTime()) / 1000;

      if (totalSeconds < 0) {
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      // Calculate hours, minutes, and seconds remaining
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      // Format numbers to always have two digits
      setTimeLeft({
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    };

    // Update immediately and then every second
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="kashmir-pricing-section">
      <div className="pricing-wrapper">
        <h2 className="main-heading animate-on-scroll">
          Choose Your <span className="text-accent">Sacred Path</span>
        </h2>
        <p className="sub-heading animate-on-scroll">
          Invest in your spiritual transformation with confidence
        </p>

        <div className="social-proof animate-on-scroll">
          <div className="proof-item">
            <p className="proof-number">1000+</p>
            <p className="proof-label">Happy Students</p>
          </div>
          <div className="proof-item">
            <p className="proof-number">4.9 <span className="star">★</span></p>
            <p className="proof-label">Average Rating</p>
          </div>
          <div className="proof-item">
            <p className="proof-number">95%</p>
            <p className="proof-label">Completion Rate</p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="countdown-container animate-on-scroll">
          <h3 className="countdown-title">
            Limited Time <span className="text-accent">Offer Ends In:</span>
          </h3>
          <div className="countdown-timer">
            <div className="timer-block">
              <span className="timer-value">{timeLeft.hours}</span>
              <span className="timer-label">Hours</span>
            </div>
            <div className="timer-block">
              <span className="timer-value">{timeLeft.minutes}</span>
              <span className="timer-label">Minutes</span>
            </div>
            <div className="timer-block">
              <span className="timer-value">{timeLeft.seconds}</span>
              <span className="timer-label">Seconds</span>
            </div>
          </div>
        </div>

        <div className="pricing-grid">
          {/* Card 1: Ultimate Bundle */}
          <div className="pricing-card animate-on-scroll">
            <div className="highlight-tag tag-combo-deal">COMBO DEAL</div>
            <h3 className="card-title">Ultimate Bundle</h3>
            <p className="card-subtitle">Kashmir Shaiva Darshan + Advaita Vedanta Darshan</p>
            <div className="price-container">
              <p className="card-price">₹2,999</p>
              <p className="original-price">₹4,999</p>
              <span className="save-badge">Save 40%</span>
            </div>
            <ul className="features-list">
              <li>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Full 'Kashmir Shaiva Darshan' classes</span>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Full 'Advaita Vedanta Darshan' classes</span>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Combined Community Access</span>
              </li>
            </ul>
            <a 
              href="https://courses.shikshanam.in/single-checkout/678b5ab8789de93b7ee832bd?pid=p1" 
              className="enroll-button btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enroll Now
            </a>
          </div>

          {/* Card 2: Full Access */}
          <div className="pricing-card highlighted animate-on-scroll">
            <div className="highlight-tag tag-best-value">BEST VALUE</div>
            <h3 className="card-title">Full Access</h3>
            <p className="card-subtitle">The complete path to self-recognition.</p>
            <div className="price-container">
              <p className="card-price">₹1,999</p>
              <p className="original-price">₹2,999</p>
              <span className="save-badge">Save 33%</span>
            </div>
            <ul className="features-list">
              <li>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Full Course Access</span>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Guided Meditation Library</span>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Daily Inner Practices</span>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Private community access</span>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Classes completion certificate</span>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Priority support</span>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>1 year access</span>
              </li>
            </ul>
            <a 
              href="https://courses.shikshanam.in/single-checkout/669bb8e2949477460bb34d26?pid=p2" 
              className="enroll-button btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
