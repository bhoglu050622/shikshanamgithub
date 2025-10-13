'use client';

import { useEffect, useRef } from 'react';

export default function BonusFeaturesSection() {
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

  const features = [
    {
      icon: "📚",
      title: "Complete Shloka Analysis",
      description: "Detailed explanation of all 18 shlokas with Sanskrit text, transliteration, and meaning."
    },
    {
      icon: "🎯",
      title: "Practical Applications",
      description: "Learn how to apply Upanishadic wisdom in daily life for inner peace and clarity."
    },
    {
      icon: "💬",
      title: "WhatsApp Community",
      description: "Join our exclusive community for discussions, doubts, and spiritual growth."
    },
    {
      icon: "🏆",
      title: "Certificate of Completion",
      description: "Receive a verified certificate upon course completion to showcase your learning."
    },
    {
      icon: "🔄",
      title: "1-Year Access",
      description: "Access the course content forever with all future updates included."
    },
    {
      icon: "📱",
      title: "Mobile App Access",
      description: "Learn on-the-go with our mobile app available for iOS and Android."
    }
  ];

  return (
    <div id="isha-receive-section" ref={sectionRef}>
      <div className="receive-wrapper">
        <h2 className="main-heading">
          What You'll <span className="text-accent">Receive</span>
        </h2>
        <p className="sub-heading">
          Everything you need to understand and apply the profound wisdom of Isha Upanishad in your life.
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">
                <span className="text-4xl">{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
