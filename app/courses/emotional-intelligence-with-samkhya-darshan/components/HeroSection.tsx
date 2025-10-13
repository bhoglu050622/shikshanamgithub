'use client'

import { useState, useEffect, useRef } from 'react'
import VideoModal from './VideoModal'

export default function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const component = canvas.parentElement
    if (!component) return

    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
    }> = []

    const hexToRgba = (hex: string, alpha: number) => {
      let r = 0, g = 0, b = 0
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16)
        g = parseInt(hex[2] + hex[2], 16)
        b = parseInt(hex[3] + hex[3], 16)
      } else if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16)
        g = parseInt(hex.slice(3, 5), 16)
        b = parseInt(hex.slice(5, 7), 16)
      }
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    const setupParticles = () => {
      if (!component) return
      canvas.width = component.offsetWidth
      canvas.height = component.offsetHeight
      particles = []
      const particleColor = '#f89b29'
      const numberOfParticles = (canvas.width * canvas.height) / 10000
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color: hexToRgba(particleColor, Math.random() * 0.5 + 0.1)
        })
      }
    }

    const animateParticles = () => {
      requestAnimationFrame(animateParticles)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })
    }

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(setupParticles, 250)
    }

    window.addEventListener('resize', handleResize)
    setupParticles()
    animateParticles()

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <section 
      id="sankhya-hero-component"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-8 bg-[#fdfaf6]"
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        id="sankhya-canvas"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Stats Pills */}
        <div 
          className="flex flex-nowrap overflow-x-auto gap-4 mb-8 pb-2.5 scrollbar-hide animate-fade-in-up justify-center"
          style={{ 
            animationDelay: '0s',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="bg-white border border-[#f0eade] rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm text-sm font-medium text-[#575049] whitespace-normal text-center flex-shrink-0" style={{ lineHeight: '1.3' }}>
            <span className="text-lg">🔱</span> 
            <span>World's 1st<br/>Vedic EI course</span>
          </div>
          <div className="bg-white border border-[#f0eade] rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm text-sm font-medium text-[#575049] whitespace-nowrap flex-shrink-0">
            <span className="text-lg">📊</span> 
            <span>100+ Global Models Researched</span>
          </div>
          <div className="bg-white border border-[#f0eade] rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm text-sm font-medium text-[#575049] whitespace-nowrap flex-shrink-0">
            <span className="text-lg">🎯</span> 
            <span>30+ Tools for Emotional Mastery</span>
          </div>
        </div>

        {/* Center Icon */}
        <div 
          className="w-20 h-20 mx-auto mb-8 flex items-center justify-center animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div 
            className="w-9 h-9 bg-gradient-to-br from-[#f07218] to-[#f89b29] rounded-full"
            style={{
              animation: 'softGlowPulse 0.3s ease-in-out infinite'
            }}
          />
        </div>

        {/* Main Heading */}
        <h1 
          className="text-6xl font-bold text-[#2c2620] mb-8 leading-tight animate-fade-in-up"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            animationDelay: '0.4s' 
          }}
        >
          Reset Your<br/>
          Emotions Through<br/>
          <span 
            className="text-[#c55a11] cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#b92b27] hover:to-[#f07218] hover:bg-clip-text hover:text-transparent"
            style={{ 
              backgroundSize: '200% auto'
            }}
          >
            Ancient Sāṅkhya<br/>
            Wisdom
          </span>
        </h1>

        {/* Subheading */}
        <p 
          className="text-lg text-[#575049] max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up"
          style={{ 
            fontFamily: "'Poppins', sans-serif",
            animationDelay: '0.5s' 
          }}
        >
          Trapped in emotional confusion? Discover inner clarity through India's most profound philosophical system. 
          Join <strong className="text-[#f07218] font-semibold">Acharya Jamwant</strong> and <strong className="text-[#f07218] font-semibold">Vishal Chaurasia</strong> on a life-changing journey within.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col items-center gap-3 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href="#enroll-core-program"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('enroll-core-program');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="px-8 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#f89b29] to-[#f07218] shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl inline-flex items-center gap-2"
              style={{
                fontFamily: "'Poppins', sans-serif",
                animation: 'hero-buttonBob 0.3s ease-in-out infinite'
              }}
            >
              🚀 Start Your Transformation -₹2,499
            </a>
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="px-8 py-3.5 rounded-full text-base font-semibold text-[#2c2620] bg-white border-2 border-[#e0d9d0] transition-all duration-300 hover:transform hover:-translate-y-1 hover:border-[#2c2620] hover:shadow-lg inline-flex items-center gap-2"
              style={{
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Free Preview
            </button>
          </div>
          <a 
            href="https://shikshanam.in/sankhya-philosophy/"
            className="text-[#575049] font-medium hover:text-[#f07218] hover:underline transition-colors duration-300 py-3.5"
            style={{
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            What is Sāṅkhya?
          </a>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        videoId="VxoFDmPIpGU"
        onClose={() => setIsVideoModalOpen(false)}
        title="Emotional Intelligence with Samkhya Darshan Preview"
      />

      <style jsx>{`
        @keyframes hero-fadeInUp {
          from { opacity: 0; transform: translateY(35px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes hero-buttonBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes softGlowPulse {
          0%, 100% { box-shadow: 0 0 20px 5px rgba(248, 155, 41, 0.2); }
          50% { box-shadow: 0 0 35px 15px rgba(248, 155, 41, 0.5); }
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: hero-fadeInUp 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 3rem !important;
          }
          p {
            font-size: 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 2.5rem !important;
          }
          .flex-wrap > * {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
