'use client';

import { useEffect, useRef } from 'react';

export default function QuizInvitationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    
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

  const quizBenefits = [
    "Discover your current spiritual understanding",
    "Get personalized recommendations for your journey",
    "Understand which shlokas resonate with you most",
    "Receive guidance on your next steps"
  ];

  return (
    <div id="isha-quiz-section-standalone" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-playfair text-main mb-4">
            Ready to Discover Your <span className="text-accent">Spiritual Path?</span>
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Take our free quiz to understand your current spiritual state and get personalized guidance for your journey with the Isha Upanishad.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 text-center animate-on-scroll delay-200">
          <div className="mb-8">
            <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white">🧘‍♂️</span>
            </div>
            <h3 className="text-2xl font-playfair text-main mb-4">
              Spiritual Path Assessment
            </h3>
            <p className="text-secondary mb-6">
              Our comprehensive quiz will help you understand where you are in your spiritual journey and what aspects of the Isha Upanishad will benefit you most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {quizBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 text-left">
                <span className="text-pink-400 font-bold text-lg">+</span>
                <span className="text-secondary">{benefit}</span>
              </div>
            ))}
          </div>

          <button className="quiz-button px-8 py-4 rounded-lg font-semibold text-lg animate-button-bob">
            Take Free Spiritual Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
