'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink'

interface Feature {
  text: string
  highlight?: boolean
  color?: string
  devanagari?: boolean
}

interface PricingCard {
  badge: string
  badgeColor: 'best' | 'combo' | 'ultimate'
  title: string
  description: string
  currentPrice: string
  originalPrice: string
  savePercentage: string
  features: (string | Feature)[]
  ctaText: string
  ctaLink: string
  isBestValue?: boolean
  id?: string
}

const pricingCards: PricingCard[] = [
  {
    badge: 'COMBO DEAL',
    badgeColor: 'combo',
    title: 'Combo Program',
    description: 'For a complete transformation of mind',
    currentPrice: '₹3,299',
    originalPrice: '₹4,999',
    savePercentage: 'Save 34%',
    features: [
      { text: "All 'Core Program' Features, Plus:", highlight: true },
      "Full 'Samkhya Philosophy' classes",
      'Combined Community Access'
    ],
    ctaText: 'Choose Combo Program',
    ctaLink: '/packages/samkhya-emotional-intelligence'
  },
  {
    badge: 'BEST VALUE',
    badgeColor: 'best',
    title: 'Core Program',
    description: 'Everything you need for emotional mastery',
    currentPrice: '₹2,499',
    originalPrice: '₹3,999',
    savePercentage: 'Save 38%',
    features: [
      '16 comprehensive video modules',
      'Live Q&A sessions with instructors',
      'Guna Profiler assessment tool',
      'Advanced emotional journal templates',
      'Private community access',
      'Classes completion certificate',
      'Priority support',
      '1 year access'
    ],
    ctaText: 'Enroll & Begin Inner Work',
    ctaLink: 'https://courses.shikshanam.in/single-checkout/6856625dbe54004a30f453c8?pid=p1',
    isBestValue: true,
    id: 'enroll-core-program'
  },
  {
    badge: 'ULTIMATE',
    badgeColor: 'ultimate',
    title: 'Ultimate Bundle',
    description: 'The complete experience with all classes and exclusive books.',
    currentPrice: '₹3,449',
    originalPrice: '₹7,999',
    savePercentage: 'Save 57%',
    features: [
      { text: "Full 'Emotional Mastery' classes", color: '#8e44ad' },
      { text: "Full 'Samkhya Philosophy' classes", color: '#8e44ad' },
      { text: 'Includes 2 companion books by Sadhak Jamwant Ji (Digital): धैर्य & विज्ञान तथा अध्यात्म.', devanagari: true }
    ],
    ctaText: 'Choose Ultimate Bundle',
    ctaLink: 'https://courses.shikshanam.in/single-checkout/687b56fc55ab5b6dc3bb51de?pid=p1'
  }
]

export default function PricingSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const targetDate = new Date()
      targetDate.setHours(20, 0, 0, 0)
      
      if (now.getTime() > targetDate.getTime()) {
        targetDate.setDate(targetDate.getDate() + 1)
      }
      
      const distance = targetDate.getTime() - now.getTime()
      
      if (distance > 0) {
        const hours = Math.floor(distance / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        
        setTimeLeft({
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        })
      }
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      id="emotional-mastery-pricing-container"
      className="bg-[#fefbf8] flex justify-center items-center py-12 px-5 overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-[1200px] w-full flex flex-col items-center gap-10 opacity-0 animate-fade-in-container">
        {/* Header */}
        <header className="text-center opacity-0 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="inline-block bg-[#ffe8d6] text-[#d95a00] px-4 py-2 rounded-full text-sm font-medium mb-5">
            ✨ Limited Time Offer
          </span>
          <h1 className="text-5xl md:text-[48px] font-extrabold text-[#2c2c2c] m-0 leading-tight">
            Transform Your Emotional Life
          </h1>
          <p className="text-lg text-[#666] max-w-[600px] mx-auto mt-4 font-normal leading-relaxed">
            Already tested by 500+ working professionals navigating fast-paced, high-pressure lives.
          </p>
        </header>

        {/* Stats */}
        <div className="flex justify-center gap-10 flex-wrap mt-5 opacity-0 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl font-bold text-[#2c2c2c]">500+</div>
            <div className="text-sm text-[#666]">Happy Students</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl font-bold text-[#2c2c2c]">4.9<span className="text-[#ff9900]">★</span></div>
            <div className="text-sm text-[#666]">Average Rating</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl font-bold text-[#2c2c2c]">95%</div>
            <div className="text-sm text-[#666]">Completion Rate</div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-br from-[#ff7e5f] to-[#feb47b] text-white p-6 rounded-2xl text-center w-full max-w-[800px] shadow-lg opacity-0 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="m-0 mb-5 text-lg font-medium tracking-wide">Offer Ends In:</h3>
          <div className="flex justify-center gap-5">
            <div className="flex flex-col">
              <div className="text-5xl font-bold bg-white/20 py-2.5 px-5 rounded-xl min-w-[80px] leading-tight">
                {timeLeft.hours}
              </div>
              <div className="text-sm mt-2 font-medium uppercase">Hours</div>
            </div>
            <div className="flex flex-col">
              <div className="text-5xl font-bold bg-white/20 py-2.5 px-5 rounded-xl min-w-[80px] leading-tight">
                {timeLeft.minutes}
              </div>
              <div className="text-sm mt-2 font-medium uppercase">Minutes</div>
            </div>
            <div className="flex flex-col">
              <div className="text-5xl font-bold bg-white/20 py-2.5 px-5 rounded-xl min-w-[80px] leading-tight">
                {timeLeft.seconds}
              </div>
              <div className="text-sm mt-2 font-medium uppercase">Seconds</div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-wrap justify-center items-stretch gap-8 w-full mt-5">
          {pricingCards.map((card, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-10 w-full max-w-[350px] flex flex-col transition-all duration-300 hover:-translate-y-2.5 hover:shadow-2xl opacity-0 animate-slide-in-up relative ${
                card.isBestValue ? 'border-2 border-[#ff9900] scale-105 hover:scale-105' : 'border border-[#e0e0e0]'
              }`}
              style={{ animationDelay: '0.8s' }}
            >
              {/* Badge */}
              <div 
                className={`absolute -top-4 right-5 text-white px-4 py-2 rounded-full text-sm font-semibold ${
                  card.badgeColor === 'best' ? 'bg-[#ff9900] shadow-[0_5px_10px_rgba(255,153,0,0.4)]' :
                  card.badgeColor === 'combo' ? 'bg-[#16a085] shadow-[0_5px_10px_rgba(22,160,133,0.4)]' :
                  'bg-[#8e44ad] shadow-[0_5px_10px_rgba(142,68,173,0.4)]'
                }`}
              >
                {card.badge}
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-[#2c2c2c] my-2.5 leading-tight">{card.title}</h2>
                <p className="text-base text-[#666] m-0 mb-6 min-h-[48px]">{card.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-extrabold text-[#2c2c2c]">{card.currentPrice}</span>
                <span className="text-lg text-[#999] line-through ml-2.5">{card.originalPrice}</span>
                <div className={`inline-block px-3 py-1.5 rounded-2xl text-sm font-semibold mt-2.5 ${
                  card.badgeColor === 'combo' ? 'bg-[#e8f6f3] text-[#16a085]' :
                  card.badgeColor === 'ultimate' ? 'bg-[#f4ecf7] text-[#8e44ad]' :
                  'bg-[#e6f9f0] text-[#00b074]'
                }`}>
                  {card.savePercentage}
                </div>
              </div>

              <ul className="list-none p-0 m-0 mb-8 flex-grow">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#444] mb-4 text-base">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill={typeof feature === 'object' && feature.highlight ? '#16a085' : typeof feature === 'object' && feature.color ? feature.color : 'none'}
                      viewBox="0 0 24 24" 
                      strokeWidth="2" 
                      stroke={typeof feature === 'object' && feature.highlight ? 'white' : typeof feature === 'object' && feature.color ? feature.color : '#00b074'}
                      className="w-5 h-5 flex-shrink-0 mt-1"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className={typeof feature === 'object' && feature.highlight ? 'font-semibold' : ''} style={typeof feature === 'object' && feature.devanagari ? { fontFamily: "'Tiro Devanagari Hindi', serif" } : {}}>
                      {typeof feature === 'string' ? feature : feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {card.ctaLink.startsWith('/') ? (
                <Link
                  href={card.ctaLink}
                  id={card.id}
                  className={`block w-full p-4 rounded-xl border-none text-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 text-center text-white mt-auto ${
                    card.badgeColor === 'best' ? 'bg-[#ff9900] shadow-[0_5px_15px_rgba(255,153,0,0.3)] hover:bg-[#e68a00]' :
                    card.badgeColor === 'combo' ? 'bg-[#16a085] shadow-[0_5px_15px_rgba(22,160,133,0.3)] hover:bg-[#138d75]' :
                    'bg-[#8e44ad] shadow-[0_5px_15px_rgba(142,68,173,0.3)] hover:bg-[#7d3c98]'
                  }`}
                >
                  {card.ctaText}
                </Link>
              ) : (
                <ProtectedExternalLink
                  href={card.ctaLink}
                  className={`block w-full p-4 rounded-xl border-none text-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 text-center text-white mt-auto ${
                    card.badgeColor === 'best' ? 'bg-[#ff9900] shadow-[0_5px_15px_rgba(255,153,0,0.3)] hover:bg-[#e68a00]' :
                    card.badgeColor === 'combo' ? 'bg-[#16a085] shadow-[0_5px_15px_rgba(22,160,133,0.3)] hover:bg-[#138d75]' :
                    'bg-[#8e44ad] shadow-[0_5px_15px_rgba(142,68,173,0.3)] hover:bg-[#7d3c98]'
                  }`}
                >
                  {card.ctaText}
                </ProtectedExternalLink>
              )}
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-[#666] text-sm mt-5 opacity-0 animate-slide-in-up" style={{ animationDelay: '1s' }}>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.238 1.276.593.69.758 1.457.76 1.72l-.008.004a.274.274 0 0 1-.273.273H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.5 7a.5.5 0 0 0 0-1h-5a.5.5 0 0 0 0 1h5ZM3.5 4a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2Z"/>
            </svg>
            <span>500+ Enrolled</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L8.707 1.5z"/>
              <path d="m13.293 7.293-6-6a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708L8 2.207l5.293 5.293a.5.5 0 0 0 .708-.708z"/>
            </svg>
            <span>Certified classes</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <span>4.9/5 Rating</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInContainer {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-container {
          animation: fadeInContainer 1s ease-out forwards;
        }
        .animate-slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
        @media (max-width: 1100px) {
          .scale-105 {
            transform: scale(1);
          }
          .scale-105:hover {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  )
}

