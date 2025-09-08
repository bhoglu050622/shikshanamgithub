'use client';

import { useEffect, useRef } from 'react';

export default function FoundersMissionSection() {
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

  const missionPoints = [
    "Making ancient wisdom accessible to modern seekers",
    "Bridging the gap between traditional knowledge and contemporary life",
    "Creating authentic spiritual learning experiences",
    "Building a community of conscious individuals"
  ];

  return (
    <div id="founders-mission-section" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-playfair text-white mb-4">
            Our <span className="text-purple-500">Mission</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            At Shikshanam, we believe that ancient wisdom should be accessible to everyone. 
            Our mission is to make the profound teachings of the Upanishads available to modern seekers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="animate-on-scroll">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
              <h3 className="text-xl font-playfair text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                To create a world where ancient wisdom is not just preserved but actively applied 
                to solve modern challenges and guide individuals toward inner peace and fulfillment.
              </p>
              <div className="space-y-3">
                {missionPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-purple-500">•</span>
                    <span className="text-gray-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-on-scroll delay-200">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-8">
              <h3 className="text-xl font-playfair text-white mb-4">Why Isha Upanishad?</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                The Isha Upanishad is one of the most profound texts in Indian philosophy. 
                It addresses fundamental questions about existence, karma, and the nature of reality 
                in just 18 verses, making it perfect for modern learners.
              </p>
              <div className="bg-purple-500/20 rounded-lg p-4">
                <p className="text-purple-300 italic">
                  "All this, whatever moves in this moving world, is enveloped by God. 
                  Therefore, find your enjoyment in renunciation."
                </p>
                <p className="text-gray-400 text-sm mt-2">- Isha Upanishad, Verse 1</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center animate-on-scroll delay-400">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
            <h3 className="text-2xl font-playfair text-white mb-4">Join Our Community</h3>
            <p className="text-gray-300 mb-6">
              Become part of a growing community of spiritual seekers who are applying 
              ancient wisdom to create meaningful change in their lives.
            </p>
            <a 
              href="https://shikshanam.in/isha-upanishad-course/#:~:text=Enroll%20now"
              rel="noopener noreferrer"
            >
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Your Journey Today
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
