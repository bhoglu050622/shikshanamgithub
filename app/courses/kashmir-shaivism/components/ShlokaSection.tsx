'use client';

import { useEffect, useRef } from 'react';

export default function ShlokaSection() {
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

    const elements = document.querySelectorAll('#shloka-section-container .animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <div id="shloka-section-container">
      <div className="shloka-banner animate-on-scroll">
        <div className="shloka-container">
          {/* Symbol/Logo */}
          <div className="shloka-symbol">
            <img 
              src="https://shikshanam.in/wp-content/uploads/2024/03/logo-white-1.png" 
              alt="Shikshanam Logo" 
              onError={handleImageError}
            />
          </div>
          
          {/* Vertical Divider */}
          <div className="divider"></div>
          
          {/* Text container for Hindi and English */}
          <div className="shloka-text">
            <p className="shloka-hindi">शिवः शक्त्या युक्तो यदि भवति शक्तः प्रभवितुं</p>
            <p className="shloka-hindi">न चेदेवं देवो न खलु कुशलः स्पन्दितुमपि।</p>
            
            {/* English Translation */}
            <p className="shloka-translation">
              United with Śakti, Śiva is endowed with the power to create the universe. Otherwise, He is incapable even of movement. (Soundarya Lahari 1)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
