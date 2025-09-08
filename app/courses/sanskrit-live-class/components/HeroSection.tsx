'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import VideoModal from './VideoModal';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentChar, setCurrentChar] = useState('क');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  // Hindi alphabets array
  const hindiAlphabets = useMemo(() => [
    'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 
    'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 
    'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 
    'ष', 'स', 'ह', 'क्ष', 'त्र', 'ज्ञ'
  ], []);

  // Character cycling effect
  useEffect(() => {
    let charIndex = 0;
    const cycleSpeed = (15 * 1000) / 50; // 50 times in 15 seconds -> 300ms interval
    
    const interval = setInterval(() => {
      charIndex = (charIndex + 1) % hindiAlphabets.length;
      setCurrentChar(hindiAlphabets[charIndex]);
    }, cycleSpeed);

    return () => clearInterval(interval);
  }, []);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      char: string;
      fontSize: number;
      color: string;
    }> = [];

    const hexToRgba = (hex: string, alpha: number) => {
      let r = 0, g = 0, b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
      }
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const setupParticles = () => {
      const component = document.getElementById('sankhya-hero-component');
      if (!component) return;

      canvas.width = component.offsetWidth;
      canvas.height = component.offsetHeight;
      particles = [];

      const particleColor = '#F57C00'; // Deep Orange
      const numberOfParticles = (canvas.width * canvas.height) / 25000;

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          char: hindiAlphabets[Math.floor(Math.random() * hindiAlphabets.length)],
          fontSize: Math.random() * 10 + 8,
          color: hexToRgba(particleColor, Math.random() * 0.1 + 0.12)
        });
      }
    };

    const animateParticles = () => {
      requestAnimationFrame(animateParticles);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        ctx.font = `${p.fontSize}px 'Tiro Devanagari Hindi'`;
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, p.x, p.y);
      });
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setupParticles, 250);
    };

    window.addEventListener('resize', handleResize);
    setupParticles();
    animateParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [hindiAlphabets]);

  const handleVideoClick = () => {
    setVideoId('e4xRSjCn1pU');
    setIsVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
    setVideoId(null);
  };

  return (
    <>
      <div id="sankhya-hero-component">
        <canvas ref={canvasRef} id="sankhya-canvas" />
        <div className="hero-wrapper">
          {/* Stats Pills */}
          <div className="stats-pills animate-item" style={{ animationDelay: '0s' }}>
            <div className="stat-pill">
              <span className="pill-icon">📖</span> Learn in Sanskrit Medium
            </div>
            <div className="stat-pill">
              <span className="pill-icon">💬</span> Speak From Day One
            </div>
            <div className="stat-pill">
              <span className="pill-icon">📝</span> Selection-Based Entry
            </div>
          </div>

          {/* Center Icon */}
          <div className="center-icon animate-item" style={{ animationDelay: '0.2s' }}>
            <span id="hindi-char-cycle">{currentChar}</span>
          </div>

          {/* Hero Heading */}
          <h1 className="hero-heading animate-item" style={{ animationDelay: '0.4s' }}>
            Need a Sanskrit Environment?<br />
            <span className="light-text">Learn & Speak with a<br />Sanskrit Teacher – Live!</span>
          </h1>

          {/* Hero Subheading */}
          <p className="hero-subheading animate-item" style={{ animationDelay: '0.5s' }}>
            Practice Sanskrit in a private circle of handpicked learners & Dharmic creators — alongside <strong>Vishal Chaurasia</strong>, live every weekend!
          </p>

          {/* Button Wrapper */}
          <div className="button-wrapper animate-item" style={{ animationDelay: '0.6s' }}>
            <div className="main-buttons">
              <a 
                href="https://shikshanam.in/sanskrit-live-class/#:~:text=Instructions%20/%20%E0%A4%A8%E0%A4%BF%E0%A4%B0%E0%A5%8D%E0%A4%A6%E0%A5%87%E0%A4%B6-,%3A,-20%20Questions%20/%2020" 
                className="hero-button btn-primary"
              >
                🚀 Start Your Transformation
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-2 font-medium tracking-wide">
              First Batch Starts August 23rd, 2025. Class Timings 07:30- 08:30 PM IST
            </p>
          </div>

          {/* Video Preview Section */}
          <div className="video-preview-wrapper animate-item">
            <div 
              className="video-preview-container" 
              data-video-id="e4xRSjCn1pU"
              onClick={handleVideoClick}
            >
              <Image 
                src="https://img.youtube.com/vi/e4xRSjCn1pU/maxresdefault.jpg" 
                alt="Sanskrit Bhasha Pragya Program Preview" 
                width={1280}
                height={720}
                className="video-preview-thumbnail" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/1280x720/2c2620/fcf8f3?text=Video+Preview';
                }}
              />
              <div className="video-preview-overlay">
                <div className="video-preview-text-top">
                  <h4>Language of Wisdom</h4>
                  <h3>Mastering Sanskrit</h3>
                </div>
                <div className="video-play-button">
                  <i className="fas fa-play"></i>
                </div>
                <div className="video-preview-text-bottom">
                  <p>Start Today</p>
                  <span>Tap to Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal 
        isOpen={isVideoModalOpen}
        videoId={videoId}
        onClose={handleCloseVideo}
      />
    </>
  );
}
