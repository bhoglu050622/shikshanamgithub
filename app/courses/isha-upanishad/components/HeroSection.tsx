'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-saffron-900 via-saffron-800 to-saffron-700 hero-animated-bg">
      {/* Course Icon Overlay */}
      <div className="absolute inset-0 opacity-5 z-0">
        <Image 
          src="/assets/courses/isha-upanishad.png"
          alt="Isha Upanishad"
          fill
          className="object-contain"
        />
      </div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        {/* Dynamic Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-70 ${mounted ? 'animate-float-particle' : ''}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: `linear-gradient(45deg, #f97316, #ea580c)`,
                boxShadow: `0 0 ${4 + Math.random() * 8}px #f97316`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 6}s`
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-20 ${mounted ? 'animate-orb-float' : ''}`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                background: `radial-gradient(circle, rgba(249, 115, 22, 0.3), transparent)`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${8 + i * 2}s`
              }}
            />
          ))}
        </div>

        {/* Enhanced Rotating Mandala */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-15">
          <div className="w-full h-full border-2 border-saffron-300 rounded-full animate-spin-slow">
            <div className="w-full h-full border border-saffron-400 rounded-full animate-spin-slow-reverse">
              <div className="w-full h-full border border-saffron-500 rounded-full animate-spin-slow">
                <div className="w-full h-full border border-saffron-600 rounded-full animate-spin-slow-reverse">
                  <div className="w-full h-full border border-saffron-700 rounded-full animate-spin-slow">
                    <div className="w-full h-full border border-saffron-800 rounded-full animate-spin-slow-reverse">
                      {/* Inner Sacred Geometry */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                        <div className="w-full h-full border border-saffron-400 rounded-full animate-spin-slow">
                          <div className="w-full h-full border border-saffron-500 rounded-full animate-spin-slow-reverse">
                            <div className="w-full h-full border border-saffron-600 rounded-full animate-spin-slow">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Geometry Patterns */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-32 bg-saffron-400 transform origin-bottom"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                animation: `pulse-gentle 3s ease-in-out infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Enhanced Floating Sanskrit Glyphs */}
        <div className="absolute inset-0">
          {['ॐ', 'अ', 'इ', 'उ', 'ए', 'ओ', 'क', 'ग', 'च', 'ज', 'त', 'न', 'प', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष'].map((glyph, i) => (
            <div
              key={i}
              className={`absolute text-saffron-200 opacity-25 text-5xl font-devanagari ${mounted ? 'animate-glyph-float' : ''}`}
              style={{
                left: `${5 + (i * 4.5)}%`,
                top: `${10 + (i * 4)}%`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${10 + (i * 0.3)}s`,
                textShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
                filter: 'blur(0.5px)'
              }}
            >
              {glyph}
            </div>
          ))}
        </div>

        {/* Om Symbol - Central */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 opacity-30">
          <div className="w-full h-full text-saffron-300 text-8xl font-devanagari animate-pulse-gentle">
            ॐ
          </div>
        </div>

        {/* Enhanced Energy Waves */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className={`absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-saffron-400 to-transparent opacity-30 ${mounted ? 'animate-energy-wave' : ''}`}
              style={{
                top: `${15 + i * 15}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${8 + i * 0.5}s`,
                boxShadow: '0 0 10px rgba(249, 115, 22, 0.3)'
              }}
            />
          ))}
        </div>

        {/* Radial Energy Bursts */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-24 bg-saffron-400 transform origin-bottom"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                animation: `pulse-gentle 4s ease-in-out infinite ${i * 0.3}s`,
                boxShadow: '0 0 8px rgba(249, 115, 22, 0.4)'
              }}
            />
          ))}
        </div>

        {/* Enhanced Central Lotus */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-25">
          <div 
            className={`w-full h-full relative ${mounted ? 'animate-lotus-breathe' : ''}`}
            style={{animationDuration: '5s'}}
          >
            {/* Outer Lotus Petals */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-20 h-10 bg-gradient-to-r from-saffron-300 to-saffron-400 rounded-full transform origin-bottom"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-50%)`,
                  animationDelay: `${i * 0.15}s`,
                  animation: 'lotus-breathe 5s ease-in-out infinite',
                  boxShadow: '0 0 15px rgba(249, 115, 22, 0.3)'
                }}
              />
            ))}
            {/* Inner Lotus Petals */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`inner-${i}`}
                className="absolute w-12 h-6 bg-gradient-to-r from-saffron-400 to-saffron-500 rounded-full transform origin-bottom"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-50%)`,
                  animationDelay: `${i * 0.2}s`,
                  animation: 'lotus-breathe 5s ease-in-out infinite 0.5s',
                  boxShadow: '0 0 10px rgba(249, 115, 22, 0.4)'
                }}
              />
            ))}
            {/* Center */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full"
              style={{
                animation: 'lotus-breathe 5s ease-in-out infinite 1s',
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.6)'
              }}
            />
          </div>
        </div>

        {/* Floating Light Orbs */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 bg-saffron-400 rounded-full opacity-60 ${mounted ? 'animate-orb-float' : ''}`}
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + i * 8}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${6 + i * 0.5}s`,
                boxShadow: '0 0 15px rgba(249, 115, 22, 0.8)'
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-saffron-900/80 via-saffron-800/70 to-saffron-700/80"></div>
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span 
            className={`block text-saffron-300 font-display ${mounted ? 'animate-fade-lift' : ''}`} 
            style={{
              animationDelay: '0.8s',
              textShadow: '0 0 30px rgba(249, 115, 22, 0.5), 0 0 60px rgba(249, 115, 22, 0.3)',
              background: 'linear-gradient(45deg, #f97316, #ea580c, #dc2626)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ईशावास्य उपनिषद्
          </span>
          <span 
            className={`block text-3xl md:text-4xl mt-6 text-saffron-100 ${mounted ? 'animate-fade-lift' : ''}`} 
            style={{
              animationDelay: '1.2s',
              textShadow: '0 0 20px rgba(249, 115, 22, 0.4)',
              fontWeight: '300'
            }}
          >
            आत्म दर्शन की यात्रा पर निकलें !
          </span>
        </h1>

        {/* Enhanced Subtitle */}
        <div 
          className={`text-lg md:text-xl mb-10 max-w-3xl mx-auto ${mounted ? 'animate-fade-lift' : ''}`} 
          style={{
            animationDelay: '1.6s',
            lineHeight: '1.8'
          }}
        >
          <div className="inline-flex flex-col gap-2 bg-white/20 backdrop-blur-md rounded-lg px-6 py-4 border border-white/30">
            <p className="text-white font-semibold">
              <span className="text-saffron-200">Skill Level:</span> Beginner
            </p>
            <p className="text-white font-semibold">
              <span className="text-saffron-200">Language:</span> हिन्दी
            </p>
          </div>
        </div>

        {/* Enhanced Price */}
        <div 
          className={`mb-10 ${mounted ? 'animate-fade-lift' : ''}`} 
          style={{animationDelay: '2s'}}
        >
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-saffron-400/30">
            <span 
              className="text-4xl md:text-5xl font-bold text-saffron-300"
              style={{
                textShadow: '0 0 25px rgba(249, 115, 22, 0.6)',
                background: 'linear-gradient(45deg, #f97316, #ea580c)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              ₹2,999
            </span>
            <span className="text-lg text-saffron-200 ml-3 font-medium line-through opacity-70">₹4,499</span>
          </div>
        </div>

        {/* Enhanced CTAs */}
        <div 
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 ${mounted ? 'animate-fade-lift' : ''}`} 
          style={{animationDelay: '2.4s'}}
        >
          <ProtectedExternalLink href="https://courses.shikshanam.in/single-checkout/6613dc28c07e467c4f550416?pid=p2">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white px-10 py-5 text-xl font-bold rounded-xl shadow-2xl hover:shadow-saffron-500/25 transition-all duration-300 transform hover:scale-105"
              style={{
                boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)'
              }}
            >
              Enroll Now
            </Button>
          </ProtectedExternalLink>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-saffron-400 text-saffron-300 hover:bg-saffron-400 hover:text-white px-10 py-5 text-xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            style={{
              boxShadow: '0 0 20px rgba(249, 115, 22, 0.2)'
            }}
          >
            Watch Free Demo
          </Button>
        </div>

        {/* Enhanced Feature Badges */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto ${mounted ? 'animate-fade-lift' : ''}`} 
          style={{animationDelay: '2.8s'}}
        >
          {[
            { icon: '📹', title: 'Recorded Sessions' },
            { icon: '⏱️', title: '3+ Hrs. Content' },
            { icon: '📜', title: 'All Shlokas Covered' },
            { icon: '🔄', title: 'Free Future Updates' },
            { icon: '📝', title: 'Quizzes & Notes' },
            { icon: '🗓️', title: '1 yr Access' },
            { icon: '🏆', title: 'Certification' },
            { icon: '💬', title: 'WhatsApp Group' },
            { icon: '❓', title: 'Live QnA' },
            { icon: '👥', title: 'Community Access' }
          ].map((feature, i) => (
            <div 
              key={i}
              className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-saffron-400/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
              style={{
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.1)',
                animationDelay: `${2.8 + i * 0.1}s`
              }}
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <span className="text-xs font-semibold text-saffron-200 text-center">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}