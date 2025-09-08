'use client'

import { useEffect } from 'react'

export default function EmotionalMasteryPricing() {
  useEffect(() => {
    // Countdown timer functionality
    function initializeCountdown() {
      const hoursEl = document.getElementById('hours')
      const minutesEl = document.getElementById('minutes')
      const secondsEl = document.getElementById('seconds')

      if (!hoursEl || !minutesEl || !secondsEl) return

      const updateCountdown = () => {
        const now = new Date()
        let targetDate = new Date()
        
        // Set target to 8 PM today
        targetDate.setHours(20, 0, 0, 0)

        // If it's already past 8 PM today, set the target to 8 PM tomorrow
        if (now.getTime() > targetDate.getTime()) {
          targetDate.setDate(targetDate.getDate() + 1)
        }

        const distance = targetDate.getTime() - now.getTime()

        if (distance < 0) {
          hoursEl.textContent = "00"
          minutesEl.textContent = "00"
          secondsEl.textContent = "00"
          return
        }

        const hours = Math.floor(distance / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        hoursEl.textContent = hours.toString().padStart(2, '0')
        minutesEl.textContent = minutes.toString().padStart(2, '0')
        secondsEl.textContent = seconds.toString().padStart(2, '0')
      }

      // Initial update
      updateCountdown()
      
      // Set up interval
      const intervalId = setInterval(updateCountdown, 1000)
      
      // Cleanup function
      return () => clearInterval(intervalId)
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeCountdown, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div id="emotional-mastery-pricing-container">
      <div className="emp-wrapper">
        <header className="emp-header">
          <span className="emp-tag">✨ Limited Time Offer</span>
          <h1>Transform Your Emotional Life</h1>
          <p>Already tested by 500+ working professionals navigating fast-paced, high-pressure lives.</p>
        </header>
        
        <div className="emp-stats">
          <div className="emp-stat-item">
            <div className="emp-value">500+</div>
            <div className="emp-label">Happy Students</div>
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
              <div id="hours" className="emp-countdown-number">00</div>
              <div className="emp-countdown-label">Hours</div>
            </div>
            <div className="emp-countdown-item">
              <div id="minutes" className="emp-countdown-number">00</div>
              <div className="emp-countdown-label">Minutes</div>
            </div>
            <div className="emp-countdown-item">
              <div id="seconds" className="emp-countdown-number">00</div>
              <div className="emp-countdown-label">Seconds</div>
            </div>
          </div>
        </div>
        
        <div className="emp-pricing-cards">
          
          <div className="emp-pricing-card">
            <div className="emp-combo-deal-badge">COMBO DEAL</div>
            <div className="emp-card-header">
              <h2>Combo Program</h2>
              <p>For a complete transformation of mind</p>
            </div>
            <div className="emp-price">
              <span className="emp-current-price">₹3,299</span>
              <span className="emp-original-price">₹4,999</span>
              <div className="emp-save-badge emp-save-badge-combo">Save 34%</div>
            </div>
            <ul className="emp-features">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#16a085" viewBox="0 0 16 16" strokeWidth="2" stroke="white"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.354 5.354-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L6.5 9.793l4.146-4.147a.5.5 0 0 1 .708.708z"/></svg>
                <span className="emp-feature-highlight">All 'Core Program' Features, Plus:</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                Full 'Samkhya Philosophy' classes
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                Combined Community Access
              </li>
            </ul>
            <a href="https://courses.shikshanam.in/courses/Samkhya-Darshan--Emotional-Intelligence-Combo-Course-6868be22998a012a18cc0360?redirectToMicroFE=true" target="_blank" className="emp-cta-button emp-cta-button-combo">Choose Combo Program</a>
          </div>

          <div className="emp-pricing-card emp-best-value">
            <div className="emp-best-value-badge">BEST VALUE</div>
            <div className="emp-card-header">
              <h2>Core Program</h2>
              <p>Everything you need for emotional mastery</p>
            </div>
            <div className="emp-price">
              <span className="emp-current-price">₹2,499</span>
              <span className="emp-original-price">₹3,999</span>
              <div className="emp-save-badge">Save 38%</div>
            </div>
            <ul className="emp-features">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                16 comprehensive video modules
              </li>
              <li>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                Live Q&A sessions with instructors
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                Guna Profiler assessment tool
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                Advanced emotional journal templates
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                Private community access
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                Classes completion certificate
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                Priority support
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                1 year access
              </li>
            </ul>
            <a href="https://courses.shikshanam.in/single-checkout/6856625dbe54004a30f453c8?pid=p1" target="_blank" className="emp-cta-button emp-cta-button-primary">Enroll & Begin Inner Work</a>
          </div>

          <div className="emp-pricing-card">
            <div className="emp-ultimate-badge">ULTIMATE</div>
            <div className="emp-card-header">
              <h2>Ultimate Bundle</h2>
              <p>The complete experience with all classes and exclusive books.</p>
            </div>
            <div className="emp-price">
              <span className="emp-current-price">₹3,449</span>
              <span className="emp-original-price">₹7,999</span>
              <div className="emp-save-badge emp-save-badge-ultimate">Save 57%</div>
            </div>
            <ul className="emp-features">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#8e44ad"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                <span>Full 'Emotional Mastery' classes</span>
              </li>
               <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#8e44ad"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                <span>Full 'Samkhya Philosophy' classes</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                <span>Includes 2 companion books by Sadhak Jamwant Ji (Digital): <span className="emp-hindi-text">धैर्य</span> & <span className="emp-hindi-text">विज्ञान तथा अध्यात्म</span>.</span>
              </li>
            </ul>
            <a href="https://courses.shikshanam.in/single-checkout/687b56fc55ab5b6dc3bb51de?pid=p1" target="_blank" className="emp-cta-button emp-cta-button-ultimate">Choose Ultimate Bundle</a>
          </div>

        </div>

        <div className="emp-footer-stats">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.238 1.276.593.69.758 1.457.76 1.72l-.008.004a.274.274 0 0 1-.273.273H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.5 7a.5.5 0 0 0 0-1h-5a.5.5 0 0 0 0 1h5ZM3.5 4a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2Z"/></svg>
            <span>500+ Enrolled</span>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L8.707 1.5z"/><path d="m13.293 7.293-6-6a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708L8 2.207l5.293 5.293a.5.5 0 0 0 .708-.708z"/></svg>
            <span>Certified classes</span>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
            <span>4.9/5 Rating</span>
          </div>
        </div>

      </div>
    </div>
  )
}
