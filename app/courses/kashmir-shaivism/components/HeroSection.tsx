'use client';

import { useEffect, useState } from 'react';

interface HeroSectionProps {
  onShowPopup?: () => void;
}

export default function HeroSection({ onShowPopup }: HeroSectionProps) {

  useEffect(() => {
    // Floating Particles Logic
    const createParticles = () => {
      const container = document.querySelector('#kashmir-shaivism-hero-scoped .particles-layer');
      if (!container) return;
      
      container.innerHTML = '';
      
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 6 + 's';
          particle.style.animationDuration = 4 + Math.random() * 4 + 's';
          container.appendChild(particle);
        }, i * 200);
      }
    };

    createParticles();
    const particleInterval = setInterval(createParticles, 8000);

    // Cleanup
    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div id="kashmir-shaivism-hero-scoped">
        <div className="background-layer"></div>
        <div className="particles-layer"></div>
        <div className="content-layer w-full flex items-center justify-center p-4">
          <div className="text-center flex flex-col items-center p-8 sm:p-12 rounded-2xl max-w-5xl w-full">
            {/* Symbol */}
            <div className="mb-8 flex justify-center content-item animate-fade-in-up">
              <div className="relative w-20 h-20">
                <div className="w-full h-full border-2 border-cosmic-gold/60 rounded-full flex items-center justify-center animate-glow-pulse">
                  <div className="w-8 h-8 bg-cosmic-gold/80 rounded-full spanda-pulse"></div>
                </div>
                <div className="absolute inset-0 animate-revolve">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <div className="w-6 h-6 border-2 border-cosmic-rose/60 rounded-full spanda-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="inline-block">
              <h1 className="font-playfair text-4xl lg:text-5xl tracking-tight content-item animate-fade-in-up delay-200 whitespace-nowrap">
                Kashmir Shaiva Darshan
              </h1>
              <h2 
                className="font-tiro-hindi mt-3 tracking-wider content-item animate-fade-in-up delay-400 text-glow"
                style={{
                  fontSize: '1.5rem',
                  lineHeight: '2rem',
                  backgroundImage: 'linear-gradient(to right, #f0b94b, #e59f28)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                ब्रह्मांड में घटने वाली प्रत्येक घटना तुम्हारे भीतर भी घट रही है
              </h2>
            </div>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed content-item animate-fade-in-up delay-600">
              And since the universe is Shiva's dance, you face problems when you fall out of rhythm. Find that rhythm and bring your life back into flow.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full content-item animate-fade-in-up delay-800">
              <a 
                href="https://shikshanam.in/kashmir-shaivism/#:~:text=Invest%20in%20your%20spiritual%20transformation%20with%20confidence" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto"
              >
                <button className="bg-gradient-to-b from-[#f0b94b] to-[#e59f28] hover:from-[#e59f28] hover:to-[#d18e22] text-black font-bold py-3 px-8 rounded-lg transition-shadow duration-300 shadow-[0_4px_15px_0px_rgba(229,159,40,0.4)] hover:shadow-[0_4px_20px_0px_rgba(229,159,40,0.6)] w-full sm:w-auto animate-button-bob">
                  Start Your Journey
                </button>
              </a>
              <button 
                onClick={onShowPopup}
                className="bg-gray-500 bg-opacity-20 border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors w-full sm:w-auto"
              >
                Take Free Quiz – Find Your Current Rhythm
              </button>
            </div>

            {/* Footer Text */}
            <p className="mt-8 text-gray-500 tracking-widest text-sm content-item animate-fade-in-up delay-1000">
              + To know yourself, know the universe! +
            </p>
          </div>
        </div>
      </div>

    </>
  );
}
