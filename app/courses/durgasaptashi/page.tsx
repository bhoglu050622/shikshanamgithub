'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './durgasaptashi.css'
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink'

export default function DurgasaptashiCoursePage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'photos' | 'video'>('photos')

  useEffect(() => {
    setMounted(true)

    // Only run on client side
    if (typeof window === 'undefined') return

    // Declare variables outside setTimeout for proper scope
    let animationFrameId: number
    let resizeTimer: NodeJS.Timeout

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {

    // Sparkles canvas animation for hero section
    const canvas = document.getElementById('sparkles-canvas') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    const numParticles = 150

    function setCanvasSize() {
      if (!ctx) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    class Particle {
      x!: number
      y!: number
      size!: number
      speedX!: number
      speedY!: number
      opacity!: number
      fadeSpeed!: number
      fadingOut!: boolean

      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * (canvas.offsetWidth || 800)
        this.y = Math.random() * (canvas.offsetHeight || 600)
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
        this.fadeSpeed = Math.random() * 0.01 + 0.005
        this.fadingOut = Math.random() > 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.fadingOut) {
          this.opacity -= this.fadeSpeed
          if (this.opacity <= 0.1) {
            this.fadingOut = false
          }
        } else {
          this.opacity += this.fadeSpeed
          if (this.opacity >= 1) {
            this.fadingOut = true
          }
        }

        if (this.x < 0 || this.x > (canvas.offsetWidth || 800) || this.y < 0 || this.y > (canvas.offsetHeight || 600)) {
          this.reset()
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 223, 100, ${this.opacity})`
        ctx.fill()
      }
    }

    function init() {
      setCanvasSize()
      particles = []
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animationFrameId)
        init()
        animate()
      }, 250)
    })

    init()
    animate()

    // Seats countdown functionality
    const seatsElement = document.getElementById('seats-remaining')
    if (seatsElement && !seatsElement.hasAttribute('data-countdown-started')) {
      seatsElement.setAttribute('data-countdown-started', 'true')
      
      let currentSeats = parseInt(seatsElement.textContent || '50', 10)
      const minSeats = 15 // The lowest number it will go to

      function updateSeats() {
        if (currentSeats > minSeats && seatsElement) {
          currentSeats--
          seatsElement.textContent = currentSeats.toString()
        }

        // Schedule the next update with a random interval between 2-5 seconds
        const randomInterval = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000
        setTimeout(updateSeats, randomInterval)
      }

      // Start the countdown after a short delay
      setTimeout(updateSeats, 2500)
    }

    }, 100) // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(animationFrameId)
      clearTimeout(resizeTimer)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <main className="relative hero-bg bg-cover bg-center md:bg-left min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-0"></div>

        <canvas id="sparkles-canvas" className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"></canvas>

        <div className="container mx-auto px-6 w-full flex justify-center md:justify-end z-20 relative">
          <div className="text-center md:text-left space-y-6 flex flex-col items-center md:items-start w-full max-w-xl md:w-1/2 lg:w-5/12 animate-fade-in pt-20 pb-10 md:py-0">

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-wide"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              <span className="text-white">Live</span>{' '}
              <span className="text-orange-400">Durgāsaptashatī</span>{' '}
              <span className="text-white">Recitation Course</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-200 leading-relaxed"
              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
            >
              Embark on a 3-month sacred journey into the Durga Saptashati — culminating in Navratri and Vijayadashami, and continuing with enriching weekend classes.
            </motion.p>

            <ProtectedExternalLink href="https://courses.shikshanam.in/single-checkout/68c7d21510376604641e2a33?pid=p1">
              <motion.button
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="custom-button text-white font-bold text-base py-4 px-8 rounded-lg inline-flex items-center space-x-2"
              >
                <span>Enroll Now - Limited Seats</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </ProtectedExternalLink>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-sm text-gray-300"
            >
              Course begins soon • Navratri special
            </motion.p>
          </div>
        </div>
      </main>

      {/* Course Overview Section */}
      <section className="bg-white text-gray-800 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center max-w-6xl mx-auto">

            {/* Left Column: Description and Features */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">The Path to Mastery</h2>
                <p className="text-gray-700 leading-relaxed text-base">
                  The <strong className="font-semibold text-gray-900">Durgāsaptaśatī</strong>, a sacred text from the Mārkaṇḍeya Purāṇa, comprises{' '}
                  <strong className="font-semibold text-gray-900">700 powerful verses</strong> celebrating the Divine Mother. This course offers an authentic, immersive experience to learn its recitation with proper pronunciation and reverence, honoring an unbroken lineage of Gurus.
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-4">
                {/* 3 Months Live Class */}
                <div className="bg-gradient-to-br from-sky-50 to-sky-100/60 ring-1 ring-sky-200 p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="bg-white p-2 rounded-full ring-1 ring-sky-200/80 shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-check text-sky-500">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                      <line x1="16" x2="16" y1="2" y2="6"/>
                      <line x1="8" x2="8" y1="2" y2="6"/>
                      <line x1="3" x2="21" y1="10" y2="10"/>
                      <path d="m9 16 2 2 4-4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-sky-900">3 Months of Live Classes</h3>
                    <p className="text-sky-800/80 text-sm">Structured, weekly sessions guide you step-by-step through the verses.</p>
                  </div>
                </div>

                {/* Acharya Led */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 ring-1 ring-amber-200 p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="bg-white p-2 rounded-full ring-1 ring-amber-200/80 shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-check text-amber-500">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <polyline points="16 11 18 13 22 9"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-amber-900">Led by a Gurukul Acharya</h3>
                    <p className="text-amber-800/80 text-sm">Learn directly from an experienced teacher trained in the traditional methods.</p>
                  </div>
                </div>

                {/* Limited Batch */}
                <div className="bg-gradient-to-br from-rose-50 to-rose-100/60 ring-1 ring-rose-200 p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="bg-white p-2 rounded-full ring-1 ring-rose-200/80 shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-round text-rose-500">
                      <path d="M18 21a8 8 0 0 0-12 0"/>
                      <circle cx="12" cy="11" r="3"/>
                      <path d="M12 3a18.2 18.2 0 0 1 4 10.5c0 1.8-1 3.5-2.5 4.5"/>
                      <path d="M8 13.5c-1.5-1-2.5-2.7-2.5-4.5A18.2 18.2 0 0 1 12 3"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-rose-900">Small, Focused Batches</h3>
                    <p className="text-rose-800/80 text-sm">Receive personalized attention and feedback in an interactive learning environment.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Highlight Box */}
            <div className="sacred-glow bg-gradient-to-br from-orange-500 via-red-500 to-red-600 lg:col-span-2 p-8 lg:p-10 rounded-2xl text-center text-white flex flex-col items-center justify-center shadow-xl shadow-orange-300/70">
              <Image
                src="/images/courses/durgasaptashi.webp"
                alt="Divine Mother Devi"
                width={112}
                 height={112}
                 loading="eager"
                 className="w-28 h-28 object-cover rounded-3xl mb-6 border-4 border-white/30 shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://placehold.co/240x240/FBBF24/FFFFFF?text=Devi'
                }}
              />
              <h3 className="text-4xl font-bold font-serif-display text-orange-100 text-shadow">700 Sacred Verses</h3>
              <p className="mt-2 text-orange-100/90 text-lg max-w-xs">
                Divided into 13 profound chapters of divine wisdom and protection.
              </p>
              <ProtectedExternalLink
                href="https://courses.shikshanam.in/single-checkout/68c7d21510376604641e2a33?pid=p1"
                className="mt-8 bg-white text-orange-600 font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl inline-block"
              >
                Begin Your Journey
              </ProtectedExternalLink>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="bg-orange-50 py-20">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 lg:p-16 w-full max-w-6xl mx-auto border border-orange-100/50">

            <header className="text-center mb-16">
              <div className="inline-block bg-orange-100 text-orange-600 p-4 rounded-full mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-marked">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                  <path d="m10 14 2-2 2 2"/>
                </svg>
              </div>
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
                Course Syllabus: <span className="text-orange-600">Durgāsaptaśatī</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                A comprehensive journey through the sacred verses with proper pronunciation and understanding.
              </p>
            </header>

            {/* Preliminary Prayers Section */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 mr-3">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Preliminary Prayers
                </h2>
                <p className="text-gray-600 max-w-4xl mx-auto">Before reciting the main 700 verses, three essential stotras are traditionally chanted to prepare the mind and spirit.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Devi Kavaca */}
                <div className="bg-orange-50/50 border border-orange-200/60 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:border-orange-300 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-100 text-rose-600 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">Devī Kavaca</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">The "armor" of the Goddess; a protective hymn invoking Devi to guard every part of the body and mind.</p>
                </div>

                {/* Argala Stotram */}
                <div className="bg-orange-50/50 border border-orange-200/60 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:border-orange-300 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="9,9h6v6h-6z"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">Argalā Stotram</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">The "bolt" hymn; it unlocks the blessings of prosperity, victory, and supreme well-being.</p>
                </div>

                {/* Kilaka Stotram */}
                <div className="bg-orange-50/50 border border-orange-200/60 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:border-orange-300 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-100 text-sky-600 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12l4 6-10 13L2 9Z"/>
                      <path d="M12 22V9"/>
                      <path d="m3.5 8.5 17 0"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">Kīlaka Stotram</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">The "nail" hymn; it removes obstacles and ensures the fruitfulness of the recitation.</p>
                </div>
              </div>
            </div>

            {/* Thirteen Chapters Section */}
            <div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flower-2 text-orange-500 mr-3">
                    <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1c0 1.1.9 2 2 2h1"/>
                    <path d="M12 5a3 3 0 1 1-3 3m3-3a3 3 0 1 0 3 3m-3-3v1c0 1.1-.9 2-2 2h-1"/>
                    <path d="m12 19-3-3 3-3 3 3-3 3"/>
                    <path d="m19 12-3-3 3-3"/>
                    <path d="m5 12-3 3 3 3"/>
                  </svg>
                  The Thirteen Chapters (700 Shlokas)
                </h2>
              </div>

              <div className="relative mt-8 pl-8 border-l-2 border-orange-200">
                {/* Chapter 1 */}
                <div className="mb-12 relative">
                  <div className="absolute w-6 h-6 bg-white rounded-full -left-[1.85rem] top-1 border-[6px] border-rose-500"></div>
                  <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
                    <p className="font-semibold text-gray-500 text-sm mb-1">Chapter 1</p>
                    <h4 className="font-bold text-lg text-gray-800">Madhu-Kaiṭabha Vadha</h4>
                    <div className="flex items-center text-xs text-rose-700 mt-2 font-medium">
                      100 verses • Overcoming Tamas (Ignorance)
                    </div>
                    <p className="mt-3 text-gray-600 text-sm">The story of Viṣṇu, awakened by Devī, destroying the demons Madhu and Kaiṭabha. Symbolizes removal of inertia and ignorance.</p>
                  </div>
                </div>

                {/* Chapters 2-4 */}
                <div className="mb-12 relative">
                  <div className="absolute w-6 h-6 bg-white rounded-full -left-[1.85rem] top-1 border-[6px] border-amber-500"></div>
                  <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-200/60 shadow-sm">
                    <p className="font-semibold text-gray-500 text-sm mb-1">Chapters 2-4</p>
                    <h4 className="font-bold text-lg text-gray-800">Mahiṣāsura Mardinī Charita</h4>
                    <div className="flex items-center text-xs text-amber-700 mt-2 font-medium">
                      250 verses • Overcoming Rajas (Ego & Pride)
                    </div>
                    <p className="mt-3 text-gray-600 text-sm">The grand battle of Devī with buffalo-demon Mahiṣa. These chapters show Devī's emergence from the powers of all gods and her final victory.</p>
                  </div>
                </div>

                {/* Chapters 5-10 */}
                <div className="mb-12 relative">
                  <div className="absolute w-6 h-6 bg-white rounded-full -left-[1.85rem] top-1 border-[6px] border-sky-500"></div>
                  <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
                    <p className="font-semibold text-gray-500 text-sm mb-1">Chapters 5-10</p>
                    <h4 className="font-bold text-lg text-gray-800">Śumbha-Niśumbha Vadha</h4>
                    <div className="flex items-center text-xs text-sky-700 mt-2 font-medium">
                      300 verses • Overcoming Subtle Ego
                    </div>
                    <p className="mt-3 text-gray-600 text-sm">The longest section: Devī battles asura brothers Śumbha and Niśumbha. The Goddess manifests many forms (Kālī, Cāmuṇḍā) to protect the universe.</p>
                  </div>
                </div>

                {/* Chapters 11-13 */}
                <div className="relative">
                  <div className="absolute w-6 h-6 bg-white rounded-full -left-[1.85rem] top-1 border-[6px] border-green-500"></div>
                  <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-200/60 shadow-sm">
                    <p className="font-semibold text-gray-500 text-sm mb-1">Chapters 11-13</p>
                    <h4 className="font-bold text-lg text-gray-800">Stuti and Phalaśruti</h4>
                    <div className="flex items-center text-xs text-green-700 mt-2 font-medium">
                      50 verses • Receiving Divine Blessings
                    </div>
                    <p className="mt-3 text-gray-600 text-sm">Concluding chapters with praises to Devī and the fruits of recitation, promising protection, success, peace, and spiritual elevation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-orange-50/50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-white shadow-2xl shadow-orange-900/10 rounded-3xl overflow-hidden max-w-5xl mx-auto">

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3">
                <span className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                  Special Navratri Offer
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mt-6 leading-tight">
                Unlock Your Spiritual Potential
              </h2>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                This is more than a course; it's a sacred commitment to yourself. Enroll now to receive exclusive benefits and a special price.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 border-t border-b border-gray-200 py-4">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days text-orange-500 flex-shrink-0">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                    <path d="M8 14h.01"/>
                    <path d="M12 14h.01"/>
                    <path d="M16 14h.01"/>
                    <path d="M8 18h.01"/>
                    <path d="M12 18h.01"/>
                    <path d="M16 18h.01"/>
                  </svg>
                  <span className="font-semibold">Starts: 22nd Sept 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video text-orange-500 flex-shrink-0">
                    <path d="m22 8-6 4 6 4V8Z"/>
                    <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
                  </svg>
                  <span className="font-semibold">30 Live Classes</span>
                </div>
              </div>

              <ul className="mt-8 space-y-5 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <span className="font-semibold">Personalized Guidance</span>
                    <p className="text-gray-500 text-sm">Receive direct mentorship from a traditional Acharya.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <span className="font-semibold">1 Year Access</span>
                    <p className="text-gray-500 text-sm">To all course materials, recordings, and future updates.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <span className="font-semibold">Community Support</span>
                    <p className="text-gray-500 text-sm">Join a vibrant community of fellow seekers on the path.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-8 md:p-12 bg-orange-50/70 flex flex-col justify-center text-center">
              <div className="space-y-2">
                <p className="text-xl text-gray-600">Full Course Value</p>
                <p className="text-3xl font-medium text-gray-400 line-through">₹3999</p>
              </div>

              <div className="my-6">
                <p className="font-serif text-7xl md:text-8xl font-bold text-orange-600">₹2399</p>
              </div>

              <div className="inline-block bg-green-100 text-green-800 font-bold px-5 py-3 rounded-full text-lg shadow-sm border border-green-200">
                Instant Savings of 40% (₹1600)
              </div>

              <ProtectedExternalLink
                href="https://courses.shikshanam.in/single-checkout/68c7d21510376604641e2a33?pid=p1"
                className="group mt-8 w-full bg-orange-500 text-white font-bold text-xl px-8 py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/40 transform hover:-translate-y-1 inline-block text-center"
              >
                Enroll Now & Save ₹1600
                <span className="opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">→</span>
              </ProtectedExternalLink>

              <p className="text-xs text-gray-500 mt-4">
                Secure transaction • Limited-time pre-booking offer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="bg-gradient-to-b from-orange-50 to-rose-50 py-20">
        <div className="container mx-auto px-6 max-w-4xl mx-auto">

          <header className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-300 to-rose-400 rounded-2xl shadow-lg shadow-amber-200/50 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-2">
                <path d="M14 19a6 6 0 0 0-12 0"/>
                <circle cx="8" cy="9" r="4"/>
                <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"/>
              </svg>
            </div>
            <h1 className="font-serif-display text-5xl sm:text-6xl font-bold text-stone-800">Who Can Join?</h1>
            <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
              This sacred course warmly welcomes all sincere seekers on the spiritual path.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Beginners */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-stone-200/80 shadow-lg shadow-stone-900/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sprout text-emerald-700">
                    <path d="M7 20h10"/>
                    <path d="M10 20c0-3.3 1-6.5 3-8a5 5 0 0 1 5 8c0 1-1.2 2-3 2a3 3 0 0 1-3-3c0-1 1-1.5 2-2s2-1.5 2-2c0-2-2-3-4-2-2 1-2 3-1 4-1 0-1 1-2 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-emerald-800">Beginners curious about chanting</h3>
                  <p className="text-stone-600 mt-1">No prior experience needed - learn from the foundation.</p>
                </div>
              </div>
            </div>

            {/* Devotees */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-stone-200/80 shadow-lg shadow-stone-900/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-red-200 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="url(#heart-gradient)" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#e11d48'}} />
                        <stop offset="100%" style={{stopColor: '#f43f5e'}} />
                      </linearGradient>
                    </defs>
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-rose-800">Devotees wanting to connect deeply</h3>
                  <p className="text-stone-600 mt-1">Deepen your spiritual relationship with the Divine Mother.</p>
                </div>
              </div>
            </div>

            {/* Students */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-stone-200/80 shadow-lg shadow-stone-900/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-library text-sky-700">
                    <path d="m16 6 4 14"/>
                    <path d="M12 6v14"/>
                    <path d="M8 8v12"/>
                    <path d="M4 4v16"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-sky-800">Students seeking authentic Vedic learning</h3>
                  <p className="text-stone-600 mt-1">Experience the traditional Gurukula method from home.</p>
                </div>
              </div>
            </div>

            {/* Protection Seekers */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-stone-200/80 shadow-lg shadow-stone-900/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-half text-violet-700">
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                    <path d="M12 22V2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-violet-800">Anyone desiring spiritual protection</h3>
                  <p className="text-stone-600 mt-1">Gain divine protection and positive spiritual vibrations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50/80 backdrop-blur-md border border-amber-200/80 rounded-2xl p-6 flex items-start space-x-4">
            <div className="flex-shrink-0 text-amber-500 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
              </svg>
            </div>
            <div className="text-stone-700">
              <p>
                <strong className="font-semibold text-stone-800">Important:</strong> This course is recommended only for{' '}
                <strong className="font-semibold text-stone-800">strict vegetarians.</strong> According to traditional teachings, non-vegetarians may experience adverse effects when chanting these powerful mantras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Teacher Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12 pb-8 border-b border-amber-200">
            <div className="inline-block p-4 bg-amber-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </div>
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-amber-900">About the Teacher</h2>
            <p className="text-lg text-amber-800 mt-2">Learn from an authentic Gurukula tradition</p>
          </header>

          <div className="bg-white/60 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-xl">
            {/* Profile Info Section */}
            <div className="text-center mb-10">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/09/IMG_20250917_112045.png"
                alt="Acharya Shekhar Chandra Bhatt"
                width={256}
                height={256}
                className="w-52 h-52 md:w-64 md:h-64 object-cover rounded-full mx-auto border-8 border-amber-100 shadow-2xl hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/240x240/FBBF24/FFFFFF?text=Acharya';
                }}
              />
              <h3 className="font-cinzel text-3xl md:text-4xl font-bold text-amber-900 mt-6">Acharya Shekhar Chandra Bhatt</h3>
              <p className="text-amber-700 text-xl mt-1">Gurukula Āchārya & Sanskrit Scholar</p>
              
              <blockquote className="max-w-xl mx-auto mt-6 text-left border-l-4 border-amber-400 bg-amber-50 p-4 rounded-r-lg">
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  Trained in the traditional Gurukul system, our Āchārya has guided many students in Vedic chanting, bringing authenticity and clarity to every mantra.
                </p>
              </blockquote>
            </div>

            {/* Qualifications & Training Section */}
            <div className="border-t border-amber-200 pt-10 grid md:grid-cols-2 gap-x-10 gap-y-8">
              <div>
                <h4 className="text-xl font-bold text-amber-800 flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-amber-600">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  Academic Qualifications
                </h4>
                <ul className="space-y-3 text-gray-700 text-base">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-amber-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span><strong>Master's Degree (Acharya)</strong> in Nyaya Shastra from Central Sanskrit University, New Delhi.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-amber-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span><strong>Bachelor's Degree (Shastri)</strong> in Nyaya Shastra from Central Sanskrit University, New Delhi.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-amber-800 flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-amber-600">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  Traditional Training & Specialization
                </h4>
                <ul className="space-y-3 text-gray-700 text-base">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-amber-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span><strong>Vaidika Training (8 years)</strong> – Sringeri Sri Sharada Peetham Pathashala.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-amber-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span><strong>Specialization</strong> in Bhagavad Gita and Krishna Yajurveda Moolam.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Media Gallery Section */}
            <div className="border-t border-amber-200 mt-10 pt-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-cinzel text-3xl font-bold text-amber-800">Media Gallery</h3>
                <div className="inline-flex items-center bg-purple-100 text-purple-600 text-sm font-medium px-4 py-1 rounded-full">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  Wisdom in Action
                </div>
              </div>
              
              <div className="bg-white/60 p-4 rounded-lg">
                {/* Tabs */}
                <div className="border-b border-amber-300">
                  <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button 
                      className={`whitespace-nowrap py-3 px-1 font-semibold text-base border-b-3 ${activeTab === 'photos' ? 'text-amber-800 border-amber-400' : 'text-gray-500 border-transparent'}`}
                      onClick={() => setActiveTab('photos')}
                    >
                      Photos
                    </button>
                    <button 
                      className={`whitespace-nowrap py-3 px-1 font-semibold text-base border-b-3 ${activeTab === 'video' ? 'text-amber-800 border-amber-400' : 'text-gray-500 border-transparent'}`}
                      onClick={() => setActiveTab('video')}
                    >
                      Videos
                    </button>
                  </nav>
                </div>

                {/* Photos Content */}
                {activeTab === 'photos' && (
                  <div className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Image
                        src="https://shikshanam.in/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-12-at-09.26.59-scaled.jpeg"
                        alt="Gallery Image 1"
                        width={384}
                        height={256}
                        className="w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/600x400/FBBF24/FFFFFF?text=Image+1';
                        }}
                      />
                      <Image
                        src="https://shikshanam.in/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-12-at-09.27.32.jpeg"
                        alt="Gallery Image 2"
                        width={384}
                        height={256}
                        className="w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/600x400/FBBF24/FFFFFF?text=Image+2';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Video Content */}
                {activeTab === 'video' && (
                  <div className="mt-6">
                    <video 
                      className="w-full aspect-video rounded-xl shadow-xl" 
                      controls 
                      poster="https://shikshanam.in/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-12-at-09.26.59-scaled.jpeg"
                      onError={(e) => {
                        const target = e.target as HTMLVideoElement;
                        target.poster = 'https://placehold.co/1280x720/FFFBF5/8B572A?text=Video+Not+Available';
                      }}
                    >
                      <source src="https://shikshanam.in/wp-content/uploads/2025/09/WhatsApp-Video-2025-09-12-at-09.26.59.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12 text-center">
              <ProtectedExternalLink 
                href="https://courses.shikshanam.in/single-checkout/68c7d21510376604641e2a33?pid=p1" 
                className="inline-block bg-amber-800 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-amber-900 transition-all duration-300 transform hover:scale-105"
              >
                Begin Your Journey
              </ProtectedExternalLink>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-8 h-8 bg-white opacity-0 animate-pulse" style={{animationDelay: '0s', animationDuration: '5s'}}></div>
          <div className="absolute top-[20%] left-[85%] w-8 h-8 bg-white opacity-0 animate-pulse" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
          <div className="absolute top-[75%] left-[10%] w-8 h-8 bg-white opacity-0 animate-pulse" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute top-[85%] left-[90%] w-8 h-8 bg-white opacity-0 animate-pulse" style={{animationDelay: '3s', animationDuration: '5s'}}></div>
          <div className="absolute top-[50%] left-[50%] w-8 h-8 bg-white opacity-0 animate-pulse" style={{animationDelay: '4s', animationDuration: '5s'}}></div>
          <div className="absolute top-[40%] left-[5%] w-8 h-8 bg-white opacity-0 animate-pulse" style={{animationDelay: '2.5s', animationDuration: '5s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-amber-900 px-4">
          <div className="mb-6 inline-block p-3 border-2 border-orange-300/80 rounded-full bg-white/60 backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 text-orange-500">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m15.5 8.5-3 3-1.5 1.5-3-3"></path>
              <path d="m12.5 11.5-1.5-1.5"></path>
            </svg>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold drop-shadow-sm">
              Seats are filling fast –
            </h2>
            <h3 className="mt-2 text-2xl md:text-3xl text-orange-600 font-semibold drop-shadow-sm">
              Only <strong className="font-bold">108</strong> sacred spots available
            </h3>
            <p className="mt-4 text-lg text-amber-800/90 max-w-2xl mx-auto">
              Join this exclusive spiritual journey and transform your connection with the Divine Mother.
            </p>
            <ProtectedExternalLink 
              href="https://courses.shikshanam.in/single-checkout/68c7d21510376604641e2a33?pid=p1" 
              className="inline-block mt-8 bg-orange-500 text-white font-bold text-lg px-10 py-3 rounded-xl shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              Reserve Your Seat Now
            </ProtectedExternalLink>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-amber-800/80 text-sm">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 opacity-70">
                  <path d="m12 14 4-4"/>
                  <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
                </svg>
                Live Interactive Sessions
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 opacity-70">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                Traditional Gurukula Method
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 opacity-70">
                  <path d="M12 8V6a2 2 0 0 0-2-2H7.83a2 2 0 0 0-1.42.59L3 8l3.41-3.41a2 2 0 0 1 1.42-.59H10a2 2 0 0 1 2 2v2"/>
                  <path d="M12 16v2a2 2 0 0 1-2 2H7.83a2 2 0 0 1-1.42-.59L3 16l3.41 3.41a2 2 0 0 0 1.42.59H10a2 2 0 0 0 2-2v-2"/>
                  <path d="M9 12H3"/>
                </svg>
                Certificate Included
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-md mx-auto">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg">
              <p id="seats-remaining" className="text-4xl font-bold text-orange-600">50</p>
              <p className="text-amber-800/90">Seats Remaining</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg">
              <p className="text-4xl font-bold text-orange-600">3</p>
              <p className="text-amber-800/90">Month Journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sanskrit Quote Banner */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-white text-3xl md:text-4xl tracking-wide font-sanskrit leading-relaxed">
            या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता।<br />
            नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥
          </h2>
          <p className="text-white text-opacity-90 text-sm md:text-base mt-4 font-vesper">
            "To that Goddess who abides in all beings in the form of pure energy—<br />
            Salutations to Her, Salutations to Her, Salutations to Her, again and again."
          </p>
        </div>
      </section>

      {/* Founder Mission Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8 mb-8 md:mb-12">
            <div className="inline-flex items-center bg-purple-100 text-purple-600 text-sm font-medium px-4 py-1 rounded-full mb-4">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              Wisdom in Action
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-gray-900">Founder's</span> <span className="text-purple-500">Mission</span>
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              To Transform Modern lives with Eternal Wisdom
            </p>
          </div>
          
          <div id="masonry-gallery" className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-01-scaled.png"
                alt="Gallery Image 1"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+1';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-02-scaled.png"
                alt="Gallery Image 2"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+2';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-03-scaled.png"
                alt="Gallery Image 3"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+3';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-04-scaled.png"
                alt="Gallery Image 4"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+4';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-06-scaled.png"
                alt="Gallery Image 5"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+5';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-05-5-scaled.png"
                alt="Gallery Image 6"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+6';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-07-scaled.png"
                alt="Gallery Image 7"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+7';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-16.png"
                alt="Gallery Image 16"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+16';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-13.png"
                alt="Gallery Image 13"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+13';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-12-scaled.png"
                alt="Gallery Image 12"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+12';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-11-scaled.png"
                alt="Gallery Image 11"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+11';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-15.png"
                alt="Gallery Image 15"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+15';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-14-scaled.png"
                alt="Gallery Image 14"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+14';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-08-scaled.png"
                alt="Gallery Image 8"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+8';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-09-4-scaled.png"
                alt="Gallery Image 9"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+9';
                }}
              />
            </div>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-10-3-scaled.png"
                alt="Gallery Image 10"
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+10';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Add more sections as needed */}
    </div>
  )
}
