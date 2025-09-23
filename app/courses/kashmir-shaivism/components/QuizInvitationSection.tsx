'use client';

import { useEffect, useRef } from 'react';

export default function QuizInvitationSection() {
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

    const elements = document.querySelectorAll('#kashmir-quiz-section-standalone .animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div id="kashmir-quiz-section-standalone">
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 flex justify-center animate-on-scroll">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center animate-fast-pulse">
            <svg className="w-12 h-12 text-amber-400" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 24H50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M14 32H50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M14 40H50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M32 18C36 25, 36 39, 32 46C28 39, 28 25, 32 18Z" stroke="currentColor" strokeWidth="3"/>
              <circle cx="32" cy="32" r="3" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-main mb-6 animate-on-scroll delay-200">
          Let's Find Your <span className="text-accent">Current Rhythm!</span>
        </h2>
        
        <div className="glass-card max-w-3xl mx-auto p-8 md:p-12 animate-on-scroll delay-400">
          <p className="text-lg text-secondary leading-relaxed mb-6">
            Let's find out how much you are in sync with Shiva's Dance. Answer 20 simple questions to see how closely your life aligns with the cosmic rhythm.
          </p>
          
          <ul className="quiz-list text-left max-w-md mx-auto mb-8 text-secondary">
            <li>Identify where your rhythm is out of sync</li>
            <li>Get instant insights into your cosmic alignment</li>
            <li>Receive a personalized path to find your flow</li>
          </ul>
          
          <a 
            href="https://shikshanam.in/how-aligned-are-you-with-shiva/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="quiz-button inline-block font-semibold py-3 px-8 rounded-full text-lg animate-button-bob no-underline"
          >
            Take the Quiz Now →
          </a>
          
          <p className="text-sm text-secondary opacity-70 mt-4">
            Takes only 5 minutes • Completely free • Instant results
          </p>
        </div>
      </div>
    </div>
  );
}
