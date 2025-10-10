'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'

export default function KashmirShaivismCoursePage() {
  useEffect(() => {

    // Floating Particles Logic
    const createParticles = () => {
      const container = document.querySelector('#advaita-hero-scoped .particles-layer');
      if (!container) return;
      container.innerHTML = ''; 
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 6 + 's';
          particle.style.animationDuration = 4 + Math.random() * 4 + 's';
          if (container) {
             container.appendChild(particle);
          }
        }, i * 200);
      }
    };
    createParticles();
    const particleInterval = setInterval(createParticles, 8000);

    // Quiz Section Scroll Animation
    const animatedElements = document.querySelectorAll('.fade-in-up-on-scroll');
    
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
    } else {
      // Fallback for older browsers
      animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // Kashmir Info Section Scroll Animation
    const kashmirAnimatedElements = document.querySelectorAll('#kashmir-info-section-rethemed .animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
      const kashmirObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      kashmirAnimatedElements.forEach(el => kashmirObserver.observe(el));
    } else {
      // Fallback for older browsers
      kashmirAnimatedElements.forEach(el => el.classList.add('is-visible'));
    }


    // Pricing Section Countdown Timer
    const pricingCountdown = () => {
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      if (!hoursEl || !minutesEl || !secondsEl) return;

      const countdownInterval = setInterval(() => {
        const now = new Date();
        const targetTime: Date = new Date(now);
        targetTime.setHours(21, 0, 0, 0);

        if (now.getTime() > targetTime.getTime()) {
          targetTime.setDate(targetTime.getDate() + 1);
        }

        const totalSeconds = (targetTime.getTime() - now.getTime()) / 1000;

        if (totalSeconds < 0) {
          hoursEl.textContent = '00';
          minutesEl.textContent = '00';
          secondsEl.textContent = '00';
          return;
        }
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
      }, 1000);

      return countdownInterval;
    };

    const pricingCountdownInterval = pricingCountdown();


    // Syllabus Section Accordion Functionality - Only for modules, not activities
    const moduleAccordions = document.querySelectorAll('#kashmir-syllabus-accordion .accordion-item');
    
    moduleAccordions.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const toggleText = item.querySelector('.accordion-toggle span');

      if (header && toggleText) {
        header.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');
          
          // Close all other module accordions
          moduleAccordions.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('is-open');
              const otherToggleText = otherItem.querySelector('.accordion-toggle span');
              if (otherToggleText) {
                otherToggleText.textContent = 'Expand';
              }
            }
          });

          // Toggle current item
          item.classList.toggle('is-open', !isOpen);
          toggleText.textContent = !isOpen ? 'Collapse' : 'Expand';
        });
      }
    });

    // Syllabus Section Scroll Animation
    const syllabusAnimatedElements = document.querySelectorAll('#kashmir-syllabus-accordion .animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
      const syllabusObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      syllabusAnimatedElements.forEach(el => syllabusObserver.observe(el));
    } else {
      // Fallback for older browsers
      syllabusAnimatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // Cleanup
    return () => {
      clearInterval(particleInterval);
      if (pricingCountdownInterval) clearInterval(pricingCountdownInterval);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        /* Main container styles */
        #advaita-hero-scoped {
          font-family: 'Inter', sans-serif !important;
          color: rgba(255, 255, 255, 0.9) !important;
          position: relative !important;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 1rem; 
          padding-top: 7rem; /* Added padding to avoid overlap with header */
          min-height: 100vh;
          overflow: hidden; /* Add overflow hidden to the main container */
          --cosmic-gold: #facc15;
          --cosmic-rose: #e11d48;
        }
        
        /* Simplified layering for better compatibility */
        #advaita-hero-scoped .background-layer {
          position: absolute;
          inset: 0;
          z-index: 0; /* Layer 0: The very back */
          background-color: #211f25 !important;
          background-image: radial-gradient(ellipse at center, #45403d 0%, #211f25 80%) !important;
        }
        
        #advaita-hero-scoped .particles-layer {
          position: absolute;
          inset: 0;
          z-index: 1; /* Layer 1: Above background, below content */
          pointer-events: none;
        }

        #advaita-hero-scoped .content-layer {
          position: relative;
          z-index: 2; /* Layer 2: Main content, on top of everything */
        }
        
        #advaita-hero-scoped .particle {
          position: absolute;
          bottom: 0; /* Start particles at the bottom */
          background: #d4af37;
          border-radius: 50%;
          width: 4px;
          height: 4px;
          opacity: 0;
          box-shadow: 0 0 6px #d4af37;
          animation: float-particle-scoped 6s ease-in infinite;
        }

        #advaita-hero-scoped .font-playfair {
          font-family: 'Playfair Display', serif !important;
        }
        #advaita-hero-scoped .font-tiro-hindi {
          font-family: 'Tiro Devanagari Hindi', serif !important;
        }
        
        /* Scoped Text Color Fixes */
        #advaita-hero-scoped h1, #advaita-hero-scoped .text-gray-100 { color: #f3f4f6 !important; }
        #advaita-hero-scoped p, #advaita-hero-scoped .text-gray-400 { color: #9ca3af !important; }
        #advaita-hero-scoped .text-gray-500 { color: #6b7280 !important; }
        #advaita-hero-scoped button.text-black { color: black !important; }
        #advaita-hero-scoped button.text-gray-300 { color: #d1d5db !important; }

        /* New utility classes for the symbol */
        #advaita-hero-scoped .border-cosmic-gold\\/60 { border-color: rgba(250, 204, 21, 0.6) !important; }
        #advaita-hero-scoped .bg-cosmic-gold\\/80 { background-color: rgba(250, 204, 21, 0.8) !important; }
        #advaita-hero-scoped .border-cosmic-rose\\/60 { border-color: rgba(225, 29, 72, 0.6) !important; }

        /* Text glow effect */
        #advaita-hero-scoped .text-glow {
          text-shadow: 0 0 5px rgba(240, 185, 75, 0.3);
        }

        /* Keyframe Animations */
        @keyframes fadeIn-up-scoped {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revolve-scoped {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float-particle-scoped {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes spandaPulse-scoped {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes glowPulse-scoped {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes button-bob-scoped {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        /* Animation Classes */
        #advaita-hero-scoped .animate-fade-in-up { animation: fadeIn-up-scoped 1s ease-out forwards; }
        #advaita-hero-scoped .animate-revolve { animation: revolve-scoped 5s linear infinite; }
        #advaita-hero-scoped .spanda-pulse { animation: spandaPulse-scoped 4s ease-in-out infinite; }
        #advaita-hero-scoped .animate-glow-pulse { animation: glowPulse-scoped 5s ease-in-out infinite; }
        #advaita-hero-scoped .animate-button-bob { animation: button-bob-scoped 0.3s linear infinite; }

        /* Animation Delays */
        #advaita-hero-scoped .delay-200 { animation-delay: 0.2s; }
        #advaita-hero-scoped .delay-400 { animation-delay: 0.4s; }
        #advaita-hero-scoped .delay-600 { animation-delay: 0.6s; }
        #advaita-hero-scoped .delay-800 { animation-delay: 0.8s; }
        #advaita-hero-scoped .delay-1000 { animation-delay: 1s; }

        #advaita-hero-scoped .content-item { opacity: 0; }

        /* Quiz Section Styles */
        #shaiva-quiz-section {
          --cosmic-gold: #f59e0b; 
          --dark-bg: #211f25;
          
          font-family: 'Inter', sans-serif;
          background-color: var(--dark-bg);
          padding: 5rem 1.5rem;
          color: #d1d5db;
          overflow: hidden;
        }

        #shaiva-quiz-section h2 {
          color: #f3f4f6;
          text-shadow: 0 0 8px rgba(245, 158, 11, 0.4); 
        }

        #shaiva-quiz-section .quiz-card {
          background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.03) 70%);
          border: 1px solid rgba(245, 158, 11, 0.2);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
          border-radius: 1rem;
          overflow: hidden;
          display: flex;
          align-items: flex-start;
          padding: 1.5rem;
        }
        
        #shaiva-quiz-section .quiz-card:hover {
           transform: translateY(-5px);
           border-color: rgba(245, 158, 11, 0.4);
        }

        #shaiva-quiz-section .question-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--cosmic-gold);
          color: var(--dark-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin-right: 1rem;
          animation: pulse-effect 1.5s infinite;
        }

        @keyframes pulse-effect {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
          50% { transform: scale(1.05); }
          70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }

        #shaiva-quiz-section .statement-text {
          color: #e5e7eb;
          font-size: 1.125rem;
          line-height: 1.6;
          font-weight: 600;
        }

        .fade-in-up-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in-up-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Kashmir Info Section Styles */
        #kashmir-info-section-rethemed {
          font-family: 'Inter', sans-serif !important;
          background-color: #211f25 !important;
          background-image: radial-gradient(ellipse at center, #45403d 0%, #211f25 80%) !important;
          overflow-x: hidden !important;
          padding: 4rem 1rem;
          position: relative;
          z-index: 5;
        }

        #kashmir-info-section-rethemed .font-playfair { font-family: 'Playfair Display', serif !important; }
        
        #kashmir-info-section-rethemed h2,
        #kashmir-info-section-rethemed h3,
        #kashmir-info-section-rethemed .text-main {
          color: #f3f4f6 !important;
        }
        
        #kashmir-info-section-rethemed .flip-card-back h3 {
          font-family: 'Playfair Display', serif !important;
          font-size: 1.25rem !important;
          font-weight: 700 !important;
          line-height: 1.75rem !important;
        }
        
        #kashmir-info-section-rethemed p,
        #kashmir-info-section-rethemed .text-secondary {
          color: #9ca3af !important;
        }
        
        #kashmir-info-section-rethemed .text-accent {
          color: #f59e0b !important;
        }
        
        #kashmir-info-section-rethemed .info-tag {
          background-color: rgba(245, 158, 11, 0.1);
          color: #f59e0b !important;
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        #kashmir-info-section-rethemed .stat-number {
          font-family: 'Playfair Display', serif !important;
          font-size: 3rem;
          font-weight: 700;
          color: #e5e7eb !important;
        }
        
        #kashmir-info-section-rethemed .stat-label { color: #9ca3af !important; }
        #kashmir-info-section-rethemed .info-title { color: #f3f4f6 !important; font-family: 'Playfair Display', serif !important; }
        #kashmir-info-section-rethemed .info-subtitle { color: #f59e0b !important; }
        
        /* Flip Card Styles */
        .flip-card-container {
          perspective: 1000px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        
        .flip-card-container:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1.5rem;
        }
        
        .flip-card-front {
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .flip-card-back {
          background: rgba(41, 37, 49, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        
        .glass-card {
          background: rgba(41, 37, 49, 0.6);
          border-radius: 1.5rem;
        }

        @keyframes zoom-in-fade-scoped { 
          from { opacity: 0; transform: scale(0.95); } 
          to { opacity: 1; transform: scale(1); } 
        }
        
        #kashmir-info-section-rethemed .animate-on-scroll { 
          opacity: 0;
        }
        
        #kashmir-info-section-rethemed .animate-on-scroll.is-visible {
          animation: zoom-in-fade-scoped 0.8s ease-out forwards;
        }
        
        #kashmir-info-section-rethemed .delay-200 { animation-delay: 0.2s; }
        #kashmir-info-section-rethemed .delay-400 { animation-delay: 0.4s; }
        #kashmir-info-section-rethemed .delay-600 { animation-delay: 0.6s; }

        /* Teacher Section Styles */
        #kashmir-teacher-section {
          font-family: 'Inter', sans-serif !important;
          background-color: #211f25 !important;
          background-image: radial-gradient(ellipse at center, #45403d 0%, #211f25 80%) !important;
          color: #e5e7eb !important;
          padding: 4rem 1rem 8rem 1rem;
          box-sizing: border-box;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        @keyframes fadeInUp-themed {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseEffect-themed {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 20px rgba(245, 158, 11, 0.2); }
          50% { transform: scale(1.05); box-shadow: 0 15px 30px rgba(245, 158, 11, 0.4); }
        }

        #kashmir-teacher-section .teachers-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          max-width: 900px;
          width: 100%;
          text-align: center;
        }

        #kashmir-teacher-section .main-heading {
          font-family: 'Playfair Display', serif !important;
          font-size: 2.5rem;
          font-weight: 700;
          color: #f3f4f6 !important;
          opacity: 0;
          animation: fadeInUp-themed 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        #kashmir-teacher-section .main-heading .text-accent {
          color: #f59e0b !important;
        }

        #kashmir-teacher-section .sub-heading {
          font-size: 1.1rem;
          color: #9ca3af !important;
          max-width: 600px;
          margin-top: -1rem;
          opacity: 0;
          animation: fadeInUp-themed 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
        }

        #kashmir-teacher-section .teacher-card {
          background: rgba(41, 37, 49, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
          opacity: 0;
          animation: fadeInUp-themed 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          width: 100%;
        }
        
        #kashmir-teacher-section .teacher-card:hover {
          transform: translateY(-12px) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        #kashmir-teacher-section .card-grid-container {
          display: grid;
          grid-template-columns: 2fr 3fr;
          align-items: stretch;
        }

        #kashmir-teacher-section .video-placeholder {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          height: 100%;
        }
        #kashmir-teacher-section .teacher-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        #kashmir-teacher-section .teacher-card:hover .teacher-image {
          transform: scale(1.05);
        }
        #kashmir-teacher-section .play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70px;
          height: 70px;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        #kashmir-teacher-section .teacher-card:hover .play-icon {
          transform: translate(-50%, -50%) scale(1.1);
          background-color: rgba(255, 255, 255, 0.3);
        }
        #kashmir-teacher-section .play-icon svg {
          width: 28px;
          height: 28px;
          fill: #ffffff;
          margin-left: 4px;
        }
        
        #kashmir-teacher-section .card-content {
          padding: 2rem;
          text-align: left;
        }
        #kashmir-teacher-section .teacher-name { font-family: 'Playfair Display', serif !important; font-weight: 700; font-size: 1.5rem; color: #ffffff !important; }
        #kashmir-teacher-section .teacher-title { color: #f59e0b !important; font-weight: 600; font-size: 1rem; margin-top: 0.25rem; }
        #kashmir-teacher-section .teacher-desc { color: #9ca3af !important; font-size: 1rem; margin: 1.5rem 0 0 0; line-height: 1.7; }

        #kashmir-teacher-section .stats {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 0;
          margin: 1rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        #kashmir-teacher-section .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        #kashmir-teacher-section .stat-item svg {
          width: 20px;
          height: 20px;
          fill: #f59e0b;
        }
        #kashmir-teacher-section .stat-text {
          font-size: 0.9rem;
          color: #9ca3af !important;
        }
        #kashmir-teacher-section .stat-text strong {
          font-weight: 600;
          color: #ffffff !important;
        }
        
        #kashmir-teacher-section .start-journey-btn {
          display: inline-block;
          margin-top: 2.5rem;
          padding: 1rem 3rem;
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827 !important;
          background: #f59e0b;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.4s ease;
          opacity: 0;
          animation: fadeInUp-themed 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards, pulseEffect-themed 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1) 1.6s;
        }
        #kashmir-teacher-section .start-journey-btn:hover {
          transform: translateY(-5px) scale(1.05);
          filter: brightness(1.1);
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          #kashmir-teacher-section .card-grid-container {
            grid-template-columns: 1fr;
          }
          #kashmir-teacher-section .video-placeholder {
            height: 250px;
          }
          #kashmir-teacher-section .stats {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        /* Bonus Features Section Styles */
        #kashmir-receive-section {
          font-family: 'Inter', sans-serif !important;
          background-color: #211f25 !important;
          background-image: radial-gradient(ellipse at center, #45403d 0%, #211f25 80%) !important;
          color: #e5e7eb !important;
          padding: 4rem 1rem 8rem 1rem;
          box-sizing: border-box;
          width: 100%;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }

        @keyframes card-enter-animation {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.9) rotateX(-20deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
          }
        }
        @keyframes icon-pulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.6));
          }
          50% {
            transform: scale(1.15);
            filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.9));
          }
        }
        @keyframes heading-glow {
            0%, 100% { text-shadow: 0 0 8px rgba(245, 158, 11, 0.6); }
            50% { text-shadow: 0 0 20px rgba(245, 158, 11, 1); }
        }
        @keyframes icon-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        #kashmir-receive-section .receive-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          max-width: 1100px;
          width: 100%;
          text-align: center;
        }

        #kashmir-receive-section .main-heading {
          font-family: 'Playfair Display', serif !important;
          font-size: 2.5rem;
          font-weight: 700;
          color: #f3f4f6 !important;
        }
        #kashmir-receive-section .main-heading .text-accent {
          color: #f59e0b !important;
          animation: heading-glow 3s ease-in-out infinite;
        }

        #kashmir-receive-section .sub-heading {
          font-size: 1.1rem;
          color: #9ca3af !important;
          max-width: 600px;
          margin-top: -1rem;
        }

        #kashmir-receive-section .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          width: 100%;
          margin-top: 2rem;
        }

        #kashmir-receive-section .feature-card {
          background: rgba(41, 37, 49, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 2rem;
          text-align: center;
          opacity: 0;
          animation: card-enter-animation 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        #kashmir-receive-section .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          border-color: rgba(245, 158, 11, 0.5);
        }

        #kashmir-receive-section .feature-icon {
          margin-bottom: 1.5rem;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: icon-float 5s ease-in-out infinite;
        }
        #kashmir-receive-section .feature-icon img {
          height: 100%;
          width: auto;
          object-fit: contain;
        }
        #kashmir-receive-section .feature-card:hover .feature-icon {
          animation: icon-pulse 2s ease-in-out infinite, icon-float 5s ease-in-out infinite;
        }

        #kashmir-receive-section .feature-title {
          font-family: 'Playfair Display', serif !important;
          font-size: 1.25rem;
          font-weight: 700;
          color: #f3f4f6 !important;
          margin-bottom: 0.5rem;
        }

        #kashmir-receive-section .feature-desc {
          color: #9ca3af !important;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        #kashmir-receive-section .feature-card:nth-child(1) { animation-delay: 0.3s; }
        #kashmir-receive-section .feature-card:nth-child(2) { animation-delay: 0.4s; }
        #kashmir-receive-section .feature-card:nth-child(3) { animation-delay: 0.5s; }
        #kashmir-receive-section .feature-card:nth-child(4) { animation-delay: 0.6s; }
        #kashmir-receive-section .feature-card:nth-child(5) { animation-delay: 0.7s; }
        #kashmir-receive-section .feature-card:nth-child(6) { animation-delay: 0.8s; }

        @media (max-width: 992px) {
          #kashmir-receive-section .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          #kashmir-receive-section .features-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Syllabus Section Styles */
        #kashmir-syllabus-accordion {
          font-family: 'Inter', sans-serif !important;
          background-color: #211f25 !important;
          background-image: radial-gradient(ellipse at center, #45403d 0%, #211f25 80%) !important;
          color: #e5e7eb !important;
          padding: 4rem 1rem 8rem 1rem;
          box-sizing: border-box;
          width: 100%;
        }

        #kashmir-syllabus-accordion .syllabus-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          max-width: 1100px; 
          width: 100%;
          margin: 0 auto;
          text-align: center;
        }

        #kashmir-syllabus-accordion .main-heading {
          font-family: 'Playfair Display', serif !important;
          font-size: 2.5rem;
          font-weight: 700;
          color: #f3f4f6 !important;
        }
        #kashmir-syllabus-accordion .main-heading .text-accent {
          color: #f59e0b !important;
        }

        #kashmir-syllabus-accordion .accordion-container {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem; 
        }

        #kashmir-syllabus-accordion .accordion-item, #kashmir-syllabus-accordion .activity-card {
          background: rgba(41, 37, 49, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.3s ease;
          opacity: 1;
          padding: 1.5rem;
          text-align: left;
          display: flex;
          flex-direction: column;
        }
        
        #kashmir-syllabus-accordion .accordion-header {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        #kashmir-syllabus-accordion .accordion-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background-color: rgba(245, 158, 11, 0.1);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f59e0b;
        }
        #kashmir-syllabus-accordion .accordion-icon svg {
          width: 24px;
          height: 24px;
        }
        
        #kashmir-syllabus-accordion .accordion-title-area {
          text-align: left;
          flex-grow: 1;
        }
        #kashmir-syllabus-accordion .accordion-title {
          font-family: 'Playfair Display', serif !important;
          font-size: 1.25rem;
          font-weight: 700;
          color: #f3f4f6 !important;
        }
        #kashmir-syllabus-accordion .accordion-meta {
          font-size: 0.85rem;
          color: #9ca3af !important;
          margin-top: 0.25rem;
        }

        #kashmir-syllabus-accordion .accordion-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #9ca3af !important;
          font-weight: 600;
          font-size: 0.9rem;
        }
        #kashmir-syllabus-accordion .accordion-toggle svg {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }
        #kashmir-syllabus-accordion .accordion-item.is-open .accordion-toggle svg {
          transform: rotate(180deg);
        }

        #kashmir-syllabus-accordion .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease-out, padding 0.5s ease-out;
          flex-grow: 1;
        }
        #kashmir-syllabus-accordion .accordion-item.is-open .accordion-content {
          max-height: 1000px;
          padding-top: 1.5rem;
        }
        
        #kashmir-syllabus-accordion .accordion-content-inner {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        #kashmir-syllabus-accordion .lesson-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-align: left;
        }
        #kashmir-syllabus-accordion .lesson-icon {
          flex-shrink: 0;
          color: #9ca3af;
        }
        #kashmir-syllabus-accordion .lesson-icon svg {
          width: 20px;
          height: 20px;
        }
        #kashmir-syllabus-accordion .lesson-title {
          font-weight: 600;
          font-size: 0.9rem;
          color: #e5e7eb !important;
        }
        
        #kashmir-syllabus-accordion .activity-card {
          border-color: rgba(245, 158, 11, 0.5);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-direction: row;
        }
        #kashmir-syllabus-accordion .activity-card .accordion-icon {
          background-color: rgba(245, 158, 11, 0.2);
        }
        #kashmir-syllabus-accordion .activity-card .feature-desc {
          color: #d1d5db !important;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          #kashmir-syllabus-accordion .accordion-container {
            grid-template-columns: 1fr;
          }
        }

        /* Ensure curriculum items are visible */
        #kashmir-syllabus-accordion .animate-on-scroll {
          opacity: 1 !important;
        }

        /* Interactive Masonry Gallery Styles */
        .masonry-item {
          break-inside: avoid;
          position: relative;
          overflow: hidden;
          border-radius: 0.5rem;
        }
        
        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
        }
        
        .masonry-item:hover .gallery-image {
          transform: scale(1.05);
        }
        
        .wisdom-tag {
          background-color: rgba(124, 58, 237, 0.2);
          color: #a78bfa;
        }


        /* Pricing Section Styles */
        #kashmir-pricing-section {
          font-family: 'Inter', sans-serif !important;
          background-color: #211f25 !important;
          background-image: radial-gradient(ellipse at center, #45403d 0%, #211f25 80%) !important;
          color: #e5e7eb !important;
          padding: 4rem 1rem 8rem 1rem;
          box-sizing: border-box;
          width: 100%;
        }

        #kashmir-pricing-section .pricing-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem; 
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
          text-align: center;
        }

        #kashmir-pricing-section .main-heading {
          font-family: 'Playfair Display', serif !important;
          font-size: 2.5rem;
          font-weight: 700;
          color: #f3f4f6 !important;
        }
        #kashmir-pricing-section .main-heading .text-accent {
          color: #f59e0b !important;
        }

        #kashmir-pricing-section .sub-heading {
          font-size: 1.1rem;
          color: #9ca3af !important;
          max-width: 600px;
          margin-bottom: 2rem;
        }
        
        #kashmir-pricing-section .social-proof {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        #kashmir-pricing-section .proof-item {
          text-align: center;
        }
        #kashmir-pricing-section .proof-number {
          font-size: 1.875rem;
          font-weight: 700;
          color: #f3f4f6 !important;
        }
        #kashmir-pricing-section .proof-number .star {
          color: #f59e0b;
          font-size: 1.5rem;
          vertical-align: middle;
        }
        #kashmir-pricing-section .proof-label {
          font-size: 0.9rem;
          color: #9ca3af !important;
        }

        #kashmir-pricing-section .countdown-container {
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1.5rem 2rem;
          margin-bottom: 3rem;
          width: 100%;
          max-width: 500px;
          text-align: center;
          animation: fadeInUp-themed 0.8s ease-out;
        }
        #kashmir-pricing-section .countdown-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #f3f4f6;
          margin-bottom: 1rem;
        }
        #kashmir-pricing-section .countdown-title .text-accent {
           color: #f59e0b !important;
        }
        #kashmir-pricing-section .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        #kashmir-pricing-section .timer-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #211f25;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          min-width: 60px;
        }
        #kashmir-pricing-section .timer-value {
          font-size: 2rem;
          font-weight: 700;
          color: #f59e0b;
          line-height: 1;
        }
        #kashmir-pricing-section .timer-label {
          font-size: 0.75rem;
          color: #9ca3af;
          text-transform: uppercase;
        }

        #kashmir-pricing-section .pricing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          width: 100%;
          align-items: stretch;
        }

        #kashmir-pricing-section .pricing-card {
          background: rgba(41, 37, 49, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 2.5rem;
          text-align: left;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }
        #kashmir-pricing-section .pricing-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        #kashmir-pricing-section .pricing-card.highlighted {
          border: 2px solid #f59e0b;
        }
        
        #kashmir-pricing-section .highlight-tag {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.25rem 1rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        #kashmir-pricing-section .tag-best-value {
           background: #f59e0b;
           color: #111827 !important;
        }
        #kashmir-pricing-section .tag-combo-deal {
          background: #4f46e5;
          color: #ffffff !important;
        }

        #kashmir-pricing-section .card-title {
          font-family: 'Playfair Display', serif !important;
          font-size: 1.75rem;
          font-weight: 700;
          color: #f3f4f6 !important;
        }
        #kashmir-pricing-section .card-subtitle {
          color: #9ca3af !important;
          margin-bottom: 1.5rem;
          min-height: 40px;
        }
        
        #kashmir-pricing-section .price-container {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        #kashmir-pricing-section .card-price {
          font-size: 2.5rem;
          font-weight: 700;
          color: #f3f4f6 !important;
        }
        #kashmir-pricing-section .original-price {
          font-size: 1.25rem;
          color: #6b7280 !important;
          text-decoration: line-through;
        }
        #kashmir-pricing-section .save-badge {
          background-color: rgba(245, 158, 11, 0.1);
          color: #f59e0b !important;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        #kashmir-pricing-section .features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          flex-grow: 1;
        }
        #kashmir-pricing-section .features-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: #d1d5db !important;
        }
        #kashmir-pricing-section .features-list li svg {
          width: 20px;
          height: 20px;
          color: #f59e0b;
          flex-shrink: 0;
        }
        
        #kashmir-pricing-section .enroll-button {
          display: block;
          width: 100%;
          padding: 0.75rem;
          text-align: center;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        #kashmir-pricing-section .btn-primary {
          background: #f59e0b;
          color: #111827 !important;
        }
        #kashmir-pricing-section .btn-primary:hover {
          filter: brightness(1.1);
          transform: scale(1.05);
        }
        #kashmir-pricing-section .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #f3f4f6 !important;
        }
        #kashmir-pricing-section .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          #kashmir-pricing-section .pricing-grid {
            grid-template-columns: 1fr;
          }
          #kashmir-pricing-section .pricing-card.highlighted {
            transform: scale(1);
          }
        }

        /* Shloka Section Styles */
        #shloka-section-container {
          font-family: 'Inter', sans-serif !important;
          padding: 4rem 1rem !important;
          margin: 0 !important;
          background-color: #211f25 !important;
          background-image: radial-gradient(ellipse at center, #45403d 0%, #211f25 80%) !important;
        }

        #shloka-section-container * {
          box-sizing: border-box !important;
        }

        #shloka-section-container .shloka-banner {
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          padding: 40px !important;
          background: rgba(41, 37, 49, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #f3f4f6 !important;
          border-radius: 20px;
          max-width: 1100px;
          margin: 0 auto;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2) !important;
        }
        
        #shloka-section-container .shloka-container {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 30px !important;
          width: 100%;
        }

        #shloka-section-container .shloka-symbol img {
          width: 50px !important;
          height: auto !important;
          opacity: 0.9;
        }

        #shloka-section-container .divider {
          width: 2px !important;
          height: 110px !important;
          background-color: rgba(245, 158, 11, 0.3) !important;
          border-radius: 1px;
        }

        #shloka-section-container .shloka-text {
          text-align: left !important;
        }

        #shloka-section-container .shloka-hindi {
          margin: 0 !important;
          font-size: 28px !important;
          line-height: 1.8 !important;
          color: #f3f4f6 !important;
          font-family: 'Tiro Devanagari Hindi', serif !important;
          font-weight: 500;
        }

        #shloka-section-container .shloka-translation {
          margin: 15px 0 0 0 !important;
          font-size: 16px !important;
          line-height: 1.6 !important;
          color: #f59e0b !important;
          font-family: 'Inter', sans-serif !important;
          font-weight: 500 !important;
          max-width: 650px;
          opacity: 0.95;
        }

        @media (max-width: 768px) {
          #shloka-section-container .shloka-banner {
            padding: 30px 25px !important;
          }
          #shloka-section-container .shloka-container {
            flex-direction: column !important;
            gap: 20px !important;
          }
          #shloka-section-container .divider {
            width: 150px !important;
            height: 2px !important;
          }
          #shloka-section-container .shloka-text {
            text-align: center !important;
          }
          #shloka-section-container .shloka-hindi {
            font-size: 24px !important;
          }
          #shloka-section-container .shloka-translation {
            font-size: 15px !important;
            max-width: 100%;
          }
        }
      `}</style>


      <div id="advaita-hero-scoped">
        <div className="background-layer"></div>
        <div className="particles-layer"></div>
        <div className="content-layer w-full flex items-center justify-center p-4">
          <div className="text-center flex flex-col items-center p-8 sm:p-12 rounded-2xl max-w-5xl w-full">
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
            <div className="inline-block">
              <h1 className="font-playfair text-4xl lg:text-5xl tracking-tight content-item animate-fade-in-up delay-200 whitespace-nowrap">
                Kashmir Shaiva Darshan
              </h1>
              <h2 className="font-tiro-hindi mt-3 tracking-wider content-item animate-fade-in-up delay-400 text-glow" style={{fontSize: '1.5rem !important', lineHeight: '2rem !important', backgroundImage: 'linear-gradient(to right, #f0b94b, #e59f28)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>
                ब्रह्मांड में घटने वाली प्रत्येक घटना तुम्हारे भीतर भी घट रही है
              </h2>
            </div>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed content-item animate-fade-in-up delay-600">
              And since the universe is Shiva's dance, you face problems when you fall out of rhythm. Find that rhythm and bring your life back into flow.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full content-item animate-fade-in-up delay-800">
              <a href="#kashmir-pricing-section" className="w-full sm:w-auto">
                <button className="bg-gradient-to-b from-[#f0b94b] to-[#e59f28] hover:from-[#e59f28] hover:to-[#d18e22] text-black font-bold py-3 px-8 rounded-lg transition-shadow duration-300 shadow-[0_4px_15px_0px_rgba(229,159,40,0.4)] hover:shadow-[0_4px_20px_0px_rgba(229,159,40,0.6)] w-full sm:w-auto animate-button-bob">
                  Start Your Journey
                </button>
              </a>
              <a href="/how-aligned-are-you" className="w-full sm:w-auto">
                <button className="bg-gray-500 bg-opacity-20 border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors w-full">
                  Take Free Quiz – Find Your Current Rhythm
                </button>
              </a>
            </div>
            <p className="mt-8 text-gray-500 tracking-widest text-sm content-item animate-fade-in-up delay-1000">
              + To know yourself, know the universe! +
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <div id="shaiva-quiz-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight fade-in-up-on-scroll">
              Have You Been Feeling Any of This Lately?
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Item 1 */}
            <div className="quiz-card fade-in-up-on-scroll" style={{transitionDelay: '100ms'}}>
              <div className="question-icon">?</div>
              <p className="statement-text">Time's running out… I'll never reach my dreams.</p>
            </div>
            {/* Item 2 */}
            <div className="quiz-card fade-in-up-on-scroll" style={{transitionDelay: '200ms'}}>
              <div className="question-icon">?</div>
              <p className="statement-text">I want to try… but what if I fail?</p>
            </div>
            {/* Item 3 */}
            <div className="quiz-card fade-in-up-on-scroll" style={{transitionDelay: '300ms'}}>
              <div className="question-icon">?</div>
              <p className="statement-text">I got what I wanted… why am I still not happy?</p>
            </div>
            {/* Item 4 */}
            <div className="quiz-card fade-in-up-on-scroll" style={{transitionDelay: '400ms'}}>
              <div className="question-icon">?</div>
              <p className="statement-text">I don't know enough… everyone else is smarter than me.</p>
            </div>
            {/* Item 5 */}
            <div className="md:col-span-2 flex justify-center fade-in-up-on-scroll" style={{transitionDelay: '500ms'}}>
              <div className="quiz-card w-full md:max-w-lg">
                <div className="question-icon">?</div>
                <p className="statement-text">I'm stuck because of my poor background.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kashmir Info Section - Five Kañcukas */}
      <div id="kashmir-info-section-rethemed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Headline */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-playfair text-main">
              You feel this way because five invisible veils <br /> <span className="text-accent">are limiting you.</span>
            </h2>
          </div>

          {/* Cards Container - Switched to Flexbox for better alignment */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            
            {/* Card 1: Kāla */}
            <div className="flip-card-container animate-on-scroll delay-200 h-96 w-full max-w-sm">
              <div className="flip-card-inner">
                <div className="flip-card-front" style={{backgroundImage: "url('https://shikshanam.in/wp-content/uploads/2025/07/ChatGPT-Image-Jul-23-2025-11_51_55-AM.png')"}} onError={(e) => {
                  e.currentTarget.style.backgroundImage = "url('https://placehold.co/600x400/3A353F/F59E0B?text=Time')";
                }}></div>
                <div className="flip-card-back text-center">
                  <h3 className="text-xl font-bold text-main mb-2">Kāla Kañcuka – Limits Time</h3>
                  <p className="text-secondary text-sm leading-relaxed">Makes you feel there's never enough time.</p>
                </div>
              </div>
            </div>
            
            {/* Card 2: Kalā */}
            <div className="flip-card-container animate-on-scroll delay-400 h-96 w-full max-w-sm">
              <div className="flip-card-inner">
                <div className="flip-card-front" style={{backgroundImage: "url('https://shikshanam.in/wp-content/uploads/2025/07/ChatGPT-Image-Jul-8-2025-01_38_19-PM.png')"}} onError={(e) => {
                  e.currentTarget.style.backgroundImage = "url('https://placehold.co/600x400/3A353F/F59E0B?text=Ability')";
                }}></div>
                <div className="flip-card-back text-center">
                  <h3 className="text-xl font-bold text-main mb-2">Kalā Kañcuka – Limits Ability</h3>
                  <p className="text-secondary text-sm leading-relaxed">Makes you believe you're not capable enough.</p>
                </div>
              </div>
            </div>
            
            {/* Card 3: Rāga */}
            <div className="flip-card-container animate-on-scroll delay-600 h-96 w-full max-w-sm">
              <div className="flip-card-inner">
                <div className="flip-card-front" style={{backgroundImage: "url('https://shikshanam.in/wp-content/uploads/2025/07/ChatGPT-Image-Jul-8-2025-01_30_12-PM.png')"}} onError={(e) => {
                  e.currentTarget.style.backgroundImage = "url('https://placehold.co/600x400/3A353F/F59E0B?text=Bliss')";
                }}></div>
                <div className="flip-card-back text-center">
                  <h3 className="text-xl font-bold text-main mb-2">Rāga Kañcuka – Limits Bliss</h3>
                  <p className="text-secondary text-sm leading-relaxed">Makes you chase things that leave you feeling empty.</p>
                </div>
              </div>
            </div>
            
            {/* Card 4: Vidyā */}
            <div className="flip-card-container animate-on-scroll delay-200 h-96 w-full max-w-sm">
              <div className="flip-card-inner">
                <div className="flip-card-front" style={{backgroundImage: "url('https://shikshanam.in/wp-content/uploads/2025/07/ChatGPT-Image-Jul-23-2025-12_14_40-PM.png')"}} onError={(e) => {
                  e.currentTarget.style.backgroundImage = "url('https://placehold.co/600x400/3A353F/F59E0B?text=Clarity')";
                }}></div>
                <div className="flip-card-back text-center">
                  <h3 className="text-xl font-bold text-main mb-2">Vidyā Kañcuka – Limits Clarity</h3>
                  <p className="text-secondary text-sm leading-relaxed">Makes you doubt your wisdom and self-worth.</p>
                </div>
              </div>
            </div>

            {/* Card 5: Niyati */}
            <div className="flip-card-container animate-on-scroll delay-400 h-96 w-full max-w-sm">
              <div className="flip-card-inner">
                <div className="flip-card-front" style={{backgroundImage: "url('https://shikshanam.in/wp-content/uploads/2025/07/ChatGPT-Image-Jul-8-2025-01_37_35-PM.png')"}} onError={(e) => {
                  e.currentTarget.style.backgroundImage = "url('https://placehold.co/600x400/3A353F/F59E0B?text=Freedom')";
                }}></div>
                <div className="flip-card-back text-center">
                  <h3 className="text-xl font-bold text-main mb-2">Niyati Kañcuka – Limits Freedom</h3>
                  <p className="text-secondary text-sm leading-relaxed">Makes you feel stuck by fate, background, or circumstances.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Teacher Section */}
      <div id="kashmir-teacher-section">
        <div className="teachers-wrapper">
          <h2 className="main-heading">Meet Your <span className="text-accent">Teacher</span></h2>
          <p className="sub-heading">Get a preview of the profound teachings that await you in this transformative course.</p>

          <div className="teacher-card">
            <div className="card-grid-container">
              <div className="video-placeholder" data-video-id="oppR6FUIPno">
                <Image src="https://shikshanam.in/wp-content/uploads/2024/05/1.png" alt="Vishal Chaurasia" width={400} height={500} className="teacher-image" onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://placehold.co/400x500/374151/FFFFFF?text=Video+Not+Found';
                }} />
                <div className="play-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                </div>
              </div>
              <div className="card-content">
                <h3 className="teacher-name">Vishal Chaurasia</h3>
                <p className="teacher-title">Exploring the Heart of Self-Recognition</p>
                <div className="stats">
                  <div className="stat-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path></svg>
                    <span className="stat-text"><strong>1.5M</strong> Subscribers</span>
                  </div>
                  <div className="stat-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.2,5.2 0 0,1 16.2,21.4H7.8C4.6,21.4 2,18.8 2,15.6V7.8A5.2,5.2 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M16.5,5.5A1.5,1.5 0 0,1 18,7A1.5,1.5 0 0,1 16.5,8.5A1.5,1.5 0 0,1 15,7A1.5,1.5 0 0,1 16.5,5.5Z"></path></svg>
                    <span className="stat-text"><strong>450K</strong> Followers</span>
                  </div>
                  <div className="stat-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,2V5H14C13.4,5 13,5.4 13,6V8H16L15.5,11H13V20H10V11H7V8H10V6C10,3.8 11.3,2 14,2H17Z"></path></svg>
                    <span className="stat-text"><strong>500K</strong> Followers</span>
                  </div>
                </div>
                <p className="teacher-desc">An IIT graduate with a profound passion for philosophy, Vishal Chaurasia makes the timeless wisdom of Kashmir Shaivism accessible and relevant for the modern world, focusing on the direct recognition (Pratyabhijñā) of your own divine consciousness.</p>
              </div>
            </div>
          </div>
          
          <a href="#kashmir-pricing-section" className="start-journey-btn">Start Your Journey</a>

        </div>
      </div>

      {/* Exclusive Bonus Features Section */}
      <div id="kashmir-receive-section">
        <div className="receive-wrapper">
          <h2 className="main-heading">Exclusive <span className="text-accent">Bonus Features!</span> 🎉</h2>
          <p className="sub-heading">A complete spiritual education designed for lasting transformation</p>

          <div className="features-grid">
            {/* Card 1: Wisdom Chapters */}
            <div className="feature-card">
              <div className="feature-icon">
                <Image src="https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png" alt="Wisdom Chapters Icon" width={64} height={64} />
              </div>
              <h3 className="feature-title">20 Wisdom-filled Chapters</h3>
              <p className="feature-desc">Comprehensive teachings that blend ancient wisdom with practical application.</p>
            </div>

            {/* Card 2: Transformational Activities */}
            <div className="feature-card">
              <div className="feature-icon">
                <Image src="https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png" alt="Transformational Activities Icon" width={64} height={64} />
              </div>
              <h3 className="feature-title">4 Transformational Activities</h3>
              <p className="feature-desc">Practical exercises to clear mental blocks and make your self-awareness a steady, natural state.</p>
            </div>

            {/* Card 3: Daily Inner Practices */}
            <div className="feature-card">
              <div className="feature-icon">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/3.png" alt="Daily Inner Practices Icon" width={64} height={64} />
              </div>
              <h3 className="feature-title">Daily Inner Practices</h3>
              <p className="feature-desc">Simple yet profound techniques for maintaining Śiva-awareness throughout your day.</p>
            </div>

            {/* Card 4: Sacred Tools */}
            <div className="feature-card">
              <div className="feature-icon">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/4.png" alt="Sacred Tools Icon" width={64} height={64} />
              </div>
              <h3 className="feature-title">Sacred Tools</h3>
              <p className="feature-desc">Journal, Tracker, and Guide to support your inner transformation.</p>
            </div>

            {/* Card 5: Guided Meditations */}
            <div className="feature-card">
              <div className="feature-icon">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/6.png" alt="Guided Meditations Icon" width={64} height={64} />
              </div>
              <h3 className="feature-title">Guided Meditations</h3>
              <p className="feature-desc">Audio practices to help you access deeper states of consciousness and stillness.</p>
            </div>

            {/* Card 6: Premium Additions */}
            <div className="feature-card">
              <div className="feature-icon">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/5.png" alt="Premium Additions Icon" width={64} height={64} />
              </div>
              <h3 className="feature-title">Premium Additions</h3>
              <p className="feature-desc">Exclusive community access and a course completion certificate.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Section */}
      <div id="kashmir-syllabus-accordion">
        <div className="syllabus-wrapper">
          <h2 className="main-heading animate-on-scroll">Course <span className="text-accent">Curriculum</span></h2>

          <div className="accordion-container">
            {/* Module 1 */}
            <div className="accordion-item animate-on-scroll">
              <div className="accordion-header">
                <div className="accordion-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div className="accordion-title-area">
                  <h3 className="accordion-title">Module 1: Discovering Shiva</h3>
                  <div className="accordion-meta"><span>Unveiling the essence of Shiva Tattva</span></div>
                </div>
                <div className="accordion-toggle"><span>Expand</span><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
              </div>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 1: चिति (शिव शक्ति) का प्रयोजन</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 2: विश्व का प्रकटीकरण</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 3: ग्राह्य-ग्राहक भेद</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 4: जीव में संकुचित विश्व</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 5: चिति द्वारा संकोच ग्रहण</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity 1 */}
            <div className="activity-card animate-on-scroll">
              <div className="accordion-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></div>
              <div className="accordion-title-area">
                <h3 className="accordion-title">Transcending KĀLA KANCHUKA</h3>
                <p className="feature-desc">Engage in practices to overcome the limitation of time and experience the eternal now.</p>
              </div>
            </div>

            {/* Module 2 */}
            <div className="accordion-item animate-on-scroll">
              <div className="accordion-header">
                <div className="accordion-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div className="accordion-title-area">
                  <h3 className="accordion-title">Module 2: Separation from Shiva</h3>
                  <div className="accordion-meta"><span>How the One becomes the many</span></div>
                </div>
                <div className="accordion-toggle"><span>Expand</span><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
              </div>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 6: माया का स्वरूप</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 7: चिति के विभिन्न आयाम</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 8: दर्शनों की कल्पित स्थितियाँ</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 9: तीन मलों का आविर्भाव</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 10: जीव के पंचकृत्य</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="activity-card animate-on-scroll">
              <div className="accordion-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></div>
              <div className="accordion-title-area">
                <h3 className="accordion-title">Breaking NIYATI KANCHUKA</h3>
                <p className="feature-desc">Learn techniques to dissolve the illusion of fate and reclaim your creative power.</p>
              </div>
            </div>

            {/* Module 3 */}
            <div className="accordion-item animate-on-scroll">
              <div className="accordion-header">
                <div className="accordion-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div className="accordion-title-area">
                  <h3 className="accordion-title">Module 3: Returning to Shiva</h3>
                  <div className="accordion-meta"><span>Your journey back to its source</span></div>
                </div>
                <div className="accordion-toggle"><span>Expand</span><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
              </div>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 11: पंचकृत्य की अवस्थाएँ</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 12: पंचकृत्य की अज्ञानता</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 13: पंचकृत्य का बोध</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 14: चित्त का ऊर्ध्वगमन</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 15: विषय-बंधनों से आत्मसात</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="activity-card animate-on-scroll">
              <div className="accordion-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></div>
              <div className="accordion-title-area">
                <h3 className="accordion-title">Expanding KALĀ KANCHUKA</h3>
                <p className="feature-desc">Activities designed to move beyond the sense of limited authorship and recognize your infinite potential.</p>
              </div>
            </div>

            {/* Module 4 */}
            <div className="accordion-item animate-on-scroll">
              <div className="accordion-header">
                <div className="accordion-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div className="accordion-title-area">
                  <h3 className="accordion-title">Module 4: Becoming Shiva</h3>
                  <div className="accordion-meta"><span>Merging into ultimate oneness</span></div>
                </div>
                <div className="accordion-toggle"><span>Expand</span><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
              </div>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 16: विदेह एकत्वबोध</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 17: मध्य के विकास से चिदानन्द लाभ</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 18: मध्य विकास के उपाय</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 19: शिव में शाश्वत समाधि</p></div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <div><p className="lesson-title font-tiro-hindi">Chapter 20: शिव का स्वभाव बोध</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity 4 */}
            <div className="activity-card animate-on-scroll">
              <div className="accordion-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></div>
              <div className="accordion-title-area">
                <h3 className="accordion-title">Transcending VIDYA KANCHUKA</h3>
                <p className="feature-desc">Exercises to see beyond limited knowledge and access the universal wisdom within.</p>
              </div>
            </div>

            {/* Final Activity */}
            <div className="activity-card animate-on-scroll">
              <div className="accordion-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></div>
              <div className="accordion-title-area">
                <h3 className="accordion-title">Discovering the Ananda Within</h3>
                <p className="feature-desc">Our capstone activity guides you to the direct experience of the innate bliss of your true nature.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Pricing Section */}
      <div id="kashmir-pricing-section">
        <div className="pricing-wrapper">
          <h2 className="main-heading">Choose Your <span className="text-accent">Sacred Path</span></h2>
          <p className="sub-heading">Invest in your spiritual transformation with confidence</p>

          <div className="social-proof">
            <div className="proof-item">
              <p className="proof-number">1000+</p>
              <p className="proof-label">Happy Students</p>
            </div>
            <div className="proof-item">
              <p className="proof-number">4.9 <span className="star">★</span></p>
              <p className="proof-label">Average Rating</p>
            </div>
            <div className="proof-item">
              <p className="proof-number">95%</p>
              <p className="proof-label">Completion Rate</p>
            </div>
          </div>

          {/* Countdown Timer Start */}
          <div className="countdown-container">
            <h3 className="countdown-title">Limited Time <span className="text-accent">Offer Ends In:</span></h3>
            <div className="countdown-timer">
              <div className="timer-block">
                <span id="hours" className="timer-value">00</span>
                <span className="timer-label">Hours</span>
              </div>
              <div className="timer-block">
                <span id="minutes" className="timer-value">00</span>
                <span className="timer-label">Minutes</span>
              </div>
              <div className="timer-block">
                <span id="seconds" className="timer-value">00</span>
                <span className="timer-label">Seconds</span>
              </div>
            </div>
          </div>
          {/* Countdown Timer End */}

          <div className="pricing-grid">
            {/* Card 1: Ultimate Bundle */}
            <div className="pricing-card">
              <div className="highlight-tag tag-combo-deal">COMBO DEAL</div>
              <h3 className="card-title">Ultimate Bundle</h3>
              <p className="card-subtitle">Kashmir Shaiva Darshan + Advaita Vedanta Darshan</p>
              <div className="price-container">
                <p className="card-price">₹2,999</p>
                <p className="original-price">₹4,999</p>
                <span className="save-badge">Save 40%</span>
              </div>
              <ul className="features-list">
                <li><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg><span>Full 'Kashmir Shaiva Darshan' classes</span></li>
                <li><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg><span>Full 'Advaita Vedanta Darshan' classes</span></li>
                <li><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg><span>Combined Community Access</span></li>
              </ul>
              <a href="https://courses.shikshanam.in/single-checkout/678b5ab8789de93b7ee832bd?pid=p1" className="enroll-button btn-secondary">Enroll Now</a>
            </div>

            {/* Card 2: Full Access */}
            <div className="pricing-card highlighted">
              <div className="highlight-tag tag-best-value">BEST VALUE</div>
              <h3 className="card-title">Full Access</h3>
              <p className="card-subtitle">The complete path to self-recognition.</p>
              <div className="price-container">
                <p className="card-price">₹1,999</p>
                <p className="original-price">₹2,999</p>
                <span className="save-badge">Save 33%</span>
              </div>
              <ul className="features-list">
                <li><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg><span>Full Course Access</span></li>
                <li><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg><span>Guided Meditation Library</span></li>
                <li><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg><span>Daily Inner Practices</span></li>
                <li><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg><span>Private community access</span></li>
                <li><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg><span>Classes completion certificate</span></li>
                <li><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg><span>Priority support</span></li>
                <li><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg><span>1 year access</span></li>
              </ul>
              <a href="https://courses.shikshanam.in/single-checkout/669bb8e2949477460bb34d26?pid=p2" className="enroll-button btn-primary">Enroll Now</a>
            </div>
          </div>
        </div>
      </div>

      {/* Shloka Section */}
      <div id="shloka-section-container">
        <div className="shloka-banner">
          <div className="shloka-container">
            <div className="shloka-symbol">
              <Image src="https://shikshanam.in/wp-content/uploads/2024/03/logo-white-1.png" alt="Shikshanam Logo" width={200} height={60} onError={(e) => e.currentTarget.style.display = 'none'} />
            </div>
            <div className="divider"></div>
            <div className="shloka-text">
              <p className="shloka-hindi">शिवः शक्त्या युक्तो यदि भवति शक्तः प्रभवितुं</p>
              <p className="shloka-hindi">न चेदेवं देवो न खलु कुशलः स्पन्दितुमपि।</p>
              <p className="shloka-translation">United with Śakti, Śiva is endowed with the power to create the universe. Otherwise, He is incapable even of movement. (Soundarya Lahari 1)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Masonry Gallery */}
      <div className="bg-gray-900">
        <div className="container mx-auto p-4 md:p-8">
          <section>
            {/* Heading Section */}
            <div className="text-center py-8 mb-8 md:mb-12">
              <div className="inline-flex items-center wisdom-tag text-sm font-medium px-4 py-1 rounded-full mb-4">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                Wisdom in Action
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span className="text-white">Founder's</span> <span className="text-purple-500">Mission</span>
              </h2>
              <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                To Transform Modern lives with Eternal Wisdom
              </p>
            </div>
            
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-01-scaled.png" alt="Gallery Image 1" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+1'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-02-scaled.png" alt="Gallery Image 2" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+2'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-03-scaled.png" alt="Gallery Image 3" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+3'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-04-scaled.png" alt="Gallery Image 4" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+4'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-06-scaled.png" alt="Gallery Image 5" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+5'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-05-5-scaled.png" alt="Gallery Image 6" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+6'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-07-scaled.png" alt="Gallery Image 7" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+7'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-16.png" alt="Gallery Image 16" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+16'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-13.png" alt="Gallery Image 13" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+13'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-12-scaled.png" alt="Gallery Image 12" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+12'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-11-scaled.png" alt="Gallery Image 11" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+11'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-15.png" alt="Gallery Image 15" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+15'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-14-scaled.png" alt="Gallery Image 14" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+14'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-08-scaled.png" alt="Gallery Image 8" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+8'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-09-4-scaled.png" alt="Gallery Image 9" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+9'} />
              </div>
              <div className="masonry-item">
                <Image src="https://shikshanam.in/wp-content/uploads/2025/07/1-10-3-scaled.png" alt="Gallery Image 10" width={600} height={400} className="gallery-image" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1f2937/a78bfa?text=Image+10'} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
