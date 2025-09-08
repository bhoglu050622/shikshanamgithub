'use client';

import { useEffect, useRef } from 'react';

export default function QuizSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animatedElements = sectionRef.current?.querySelectorAll('.fade-in-up-on-scroll');
    
    if (!animatedElements) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      animatedElements.forEach(el => observer.observe(el));
      
      return () => {
        animatedElements.forEach(el => observer.unobserve(el));
      };
    } else {
      // Fallback for older browsers
      animatedElements.forEach(el => el.classList.add('is-visible'));
    }
  }, []);

  return (
    <div id="shaiva-quiz-section" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight fade-in-up-on-scroll">
            Have You Been Feeling Any of This Lately?
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Item 1 */}
          <div className="quiz-card fade-in-up-on-scroll" style={{ transitionDelay: '100ms' }}>
            <div className="question-icon">?</div>
            <p className="statement-text">Time's running out… I'll never reach my dreams.</p>
          </div>
          
          {/* Item 2 */}
          <div className="quiz-card fade-in-up-on-scroll" style={{ transitionDelay: '200ms' }}>
            <div className="question-icon">?</div>
            <p className="statement-text">I want to try… but what if I fail?</p>
          </div>
          
          {/* Item 3 */}
          <div className="quiz-card fade-in-up-on-scroll" style={{ transitionDelay: '300ms' }}>
            <div className="question-icon">?</div>
            <p className="statement-text">I got what I wanted… why am I still not happy?</p>
          </div>
          
          {/* Item 4 */}
          <div className="quiz-card fade-in-up-on-scroll" style={{ transitionDelay: '400ms' }}>
            <div className="question-icon">?</div>
            <p className="statement-text">I don't know enough… everyone else is smarter than me.</p>
          </div>
          
          {/* Item 5 */}
          <div className="md:col-span-2 flex justify-center fade-in-up-on-scroll" style={{ transitionDelay: '500ms' }}>
            <div className="quiz-card w-full md:max-w-lg">
              <div className="question-icon">?</div>
              <p className="statement-text">I'm stuck because of my poor background.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
