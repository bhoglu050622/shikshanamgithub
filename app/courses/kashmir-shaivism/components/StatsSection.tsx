'use client';

import { useEffect, useRef } from 'react';

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateCountUp = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.target || '0');
      const suffix = el.dataset.suffix || '';
      const duration = 2000; // 2 seconds
      const frameRate = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const current = target * progress;
        
        // Handle integers and decimals
        if (target % 1 !== 0) {
          el.textContent = current.toFixed(1) + suffix;
        } else {
          el.textContent = Math.round(current).toLocaleString() + suffix;
        }

        if (frame === totalFrames) {
          clearInterval(counter);
          // Ensure final value is exact
          el.textContent = target.toLocaleString() + suffix;
        }
      }, frameRate);
    };

    const animatedElements = sectionRef.current?.querySelectorAll('.content-item');
    
    if (!animatedElements) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate the card itself
            entry.target.classList.add('animate-zoom-in');
            
            // Find and animate the number inside the card
            const numberEl = entry.target.querySelector('.stat-number') as HTMLElement;
            if (numberEl) {
              // Start the number animation after the card starts appearing
              setTimeout(() => animateCountUp(numberEl), 200);
            }
            
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
      animatedElements.forEach(el => {
        el.classList.add('animate-zoom-in');
        const numberEl = el.querySelector('.stat-number') as HTMLElement;
        if (numberEl) {
          setTimeout(() => animateCountUp(numberEl), 200);
        }
      });
    }
  }, []);

  const features = [
    '4+ Hrs. of Content',
    '1-Year Course Access',
    'Whatsapp Community',
    'Live Support Sessions',
    'Certificate of Completion'
  ];

  const stats = [
    {
      number: 1000,
      suffix: '+',
      label: 'Students Enlightened'
    },
    {
      number: 4.9,
      suffix: '/5',
      label: 'Average Rating'
    },
    {
      number: 98,
      suffix: '%',
      label: 'Path Clarity Achieved'
    }
  ];

  return (
    <div id="kashmir-info-section-rethemed" ref={sectionRef}>
      {/* SVG Gradient Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="goldGradientThemed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#facc15', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Info Card */}
        <div className="info-card text-center p-8 md:p-12 mb-12 content-item">
          <div className="mb-6">
            <svg width="40" height="40" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="opacity-95 mx-auto">
              <circle cx="40" cy="40" r="18" fill="url(#goldGradientThemed)" />
            </svg>
          </div>
          <p className="text-2xl md:text-3xl font-playfair text-main leading-snug mb-4">
            With the right guidance, you can <br /> 
            <span className="text-accent uppercase text-3xl md:text-4xl">BREAK ALL 5 LIMITATIONS!</span>
          </p>
          <p className="text-secondary italic mb-8">
            Step by step, we'll help you transcend what's holding you back, with the wisdom of Kashmir Shaivism.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((feature, index) => (
              <span key={index} className="info-tag">{feature}</span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card text-center p-8 content-item delay-${(index + 1) * 200}`}>
              <p 
                className="stat-number" 
                data-target={stat.number} 
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
