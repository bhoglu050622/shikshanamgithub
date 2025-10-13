'use client';

import { useEffect, useRef } from 'react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function PricingSection() {
  const observerRef = useRef<IntersectionObserver | null>(null);

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


        <div className="pricing-grid">
          {/* Card 1: Ultimate Bundle */}
          <div className="pricing-card animate-on-scroll">
            <div className="highlight-tag tag-combo-deal">COMBO DEAL</div>
            <h3 className="card-title">Ultimate Bundle</h3>
            <p className="card-subtitle">Kashmir Shaiva Darshan + Advaita Vedanta Darshan</p>
            <div className="price-container">
              <p className="card-price">₹5,499</p>
              <p className="original-price">₹7,998</p>
              <span className="save-badge">Save 31%</span>
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
            <ProtectedExternalLink 
              href="https://courses.shikshanam.in/single-checkout/678b5ab8789de93b7ee832bd?pid=p1" 
              className="enroll-button btn-secondary"
            >
              Enroll Now
            </ProtectedExternalLink>
          </div>

          {/* Card 2: Full Access */}
          <div className="pricing-card highlighted animate-on-scroll">
            <div className="highlight-tag tag-best-value">BEST VALUE</div>
            <h3 className="card-title">Full Access</h3>
            <p className="card-subtitle">The complete path to self-recognition.</p>
            <div className="price-container">
              <p className="card-price">₹3,499</p>
              <p className="original-price">₹5,499</p>
              <span className="save-badge">Save 36%</span>
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
            <ProtectedExternalLink 
              href="https://courses.shikshanam.in/single-checkout/669bb8e2949477460bb34d26?pid=p2" 
              className="enroll-button btn-primary"
            >
              Enroll Now
            </ProtectedExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
}
