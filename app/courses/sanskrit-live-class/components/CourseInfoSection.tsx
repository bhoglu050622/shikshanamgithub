'use client';

import { useEffect, useRef } from 'react';

export default function CourseInfoSection() {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const component = componentRef.current;
    if (!component || component.dataset.initialized) {
      return;
    }
    component.dataset.initialized = 'true';

    const counters = component.querySelectorAll('.feature-title[data-target]');
    const animationDuration = 2000; // 2 seconds

    const animateCounter = (counter: Element) => {
      const targetStr = counter.getAttribute('data-target');
      
      if (targetStr && !isNaN(Number(targetStr))) {
        const target = Number(targetStr);
        const suffix = counter.getAttribute('data-suffix') || '';

        const startAnimation = () => {
          let startTime: number | null = null;

          const step = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;

            if (elapsedTime >= animationDuration) {
              (counter as HTMLElement).innerText = target.toLocaleString() + suffix;
              return;
            }
            
            const progress = elapsedTime / animationDuration;
            const value = Math.floor(progress * target);
            (counter as HTMLElement).innerText = value.toLocaleString() + suffix;
            
            requestAnimationFrame(step);
          };
          
          requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              startAnimation();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });

        observer.observe(counter);
      }
    };

    counters.forEach(animateCounter);
  }, []);

  return (
    <div id="sanskrit-course-widget-container" ref={componentRef}>
      <div className="course-wrapper">
        {/* Main Information Card */}
        <div className="info-card">
          <h1 className="course-title">Speak Sanskrit Fluently with Easy Gurukul Tricks!</h1>
          <div className="pills-container">
            <span className="pill classes">24 Live Classes</span>
            <span className="pill tricks">Gurukul Speaking Tricks</span>
            <span className="pill duration">3-Month Live Course Access+ 1yr Recordings Access</span>
            <span className="pill group">Private Sanskrit Group</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <p className="feature-title red" data-target="108">0</p>
            <p className="feature-description">Seats Only</p>
          </div>
          <div className="feature-card">
            <p className="feature-title blue" data-target="24">0</p>
            <p className="feature-description">Live Sessions</p>
          </div>
          <div className="feature-card">
            <p className="feature-title green" data-target="3">0</p>
            <p className="feature-description">Month Course + 1yr Recordings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
