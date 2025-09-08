'use client';

import { useEffect, useRef } from 'react';

export default function InfoSection() {
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

  const flipCards = [
    {
      id: 'avidya',
      title: 'अविद्या – Ignorance',
      description: 'The root cause of all suffering and confusion in life.',
      image: 'https://shikshanam.in/wp-content/uploads/2025/07/ChatGPT-Image-Jul-23-2025-11_51_55-AM.png',
      fallbackText: 'Ignorance',
      delay: 'delay-200'
    },
    {
      id: 'avidya-karma',
      title: 'अविद्या कर्म – Actions in Ignorance',
      description: 'Actions performed without understanding their consequences.',
      image: 'https://shikshanam.in/wp-content/uploads/2025/07/ChatGPT-Image-Jul-8-2025-01_38_19-PM.png',
      fallbackText: 'Actions',
      delay: 'delay-400'
    },
    {
      id: 'vidya',
      title: 'विद्या – Knowledge',
      description: 'The path to liberation through understanding the Self.',
      image: 'https://shikshanam.in/wp-content/uploads/2025/07/ChatGPT-Image-Jul-8-2025-01_30_12-PM.png',
      fallbackText: 'Knowledge',
      delay: 'delay-600'
    },
    {
      id: 'vidya-karma',
      title: 'विद्या कर्म – Actions with Knowledge',
      description: 'Actions performed with wisdom and understanding.',
      image: 'https://shikshanam.in/wp-content/uploads/2025/07/ChatGPT-Image-Jul-23-2025-12_14_40-PM.png',
      fallbackText: 'Wisdom',
      delay: 'delay-200'
    },
    {
      id: 'moksha',
      title: 'मोक्ष – Liberation',
      description: 'The ultimate goal of understanding the nature of reality.',
      image: 'https://shikshanam.in/wp-content/uploads/2025/07/ChatGPT-Image-Jul-8-2025-01_37_35-PM.png',
      fallbackText: 'Liberation',
      delay: 'delay-400'
    }
  ];

  return (
    <div id="isha-info-section-rethemed" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-playfair text-main">
            You feel confused because five fundamental concepts <br /> 
            <span className="text-accent">are misunderstood.</span>
          </h2>
        </div>

        {/* Cards Container */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {flipCards.map((card) => (
            <div 
              key={card.id}
              className={`flip-card-container animate-on-scroll ${card.delay} h-96 w-full max-w-sm`}
            >
              <div className="flip-card-inner">
                <div 
                  className="flip-card-front"
                  style={{
                    backgroundImage: `url('${card.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLDivElement;
                    target.style.backgroundImage = `url(https://placehold.co/600x400/3A353F/EC4899?text=${card.fallbackText})`;
                  }}
                />
                <div className="flip-card-back text-center">
                  <h3 className="text-xl font-bold text-main mb-2">{card.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
