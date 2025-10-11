'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function EmotionalIntelligenceCoursePage() {
  const [mounted, setMounted] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  const [countersAnimated, setCountersAnimated] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState<{[key: string]: boolean}>({})
  const [showTestimonialModal, setShowTestimonialModal] = useState(false)
  const [testimonialVideoId, setTestimonialVideoId] = useState<string | null>(null)
  const [videoModalSrc, setVideoModalSrc] = useState<string | null>(null)
  const [openModule, setOpenModule] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)

    // Only run on client side
    if (typeof window === 'undefined') return

    // Declare variables outside setTimeout for proper scope
    let animationFrameId: number
    let resizeTimer: NodeJS.Timeout

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {

      // Canvas floating particles animation
      const canvas = document.getElementById('sankhya-canvas') as HTMLCanvasElement
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let particles: Particle[] = []

        function setCanvasSize() {
          const component = document.getElementById('sankhya-hero-component')
          if (!component) return
          const dpr = window.devicePixelRatio || 1
          const rect = component.getBoundingClientRect()
          canvas.width = rect.width * dpr
          canvas.height = rect.height * dpr
          if (ctx) ctx.scale(dpr, dpr)
        }

        class Particle {
          x!: number
          y!: number
          vx!: number
          vy!: number
          size!: number
          color!: string

          constructor() {
            this.reset()
          }

          reset() {
            this.x = Math.random() * (canvas.offsetWidth || 800)
            this.y = Math.random() * (canvas.offsetHeight || 600)
            this.vx = (Math.random() - 0.5) * 0.5
            this.vy = (Math.random() - 0.5) * 0.5
            this.size = Math.random() * 2 + 1
            this.color = `rgba(248, 155, 41, ${Math.random() * 0.5 + 0.1})`
          }

          update() {
            this.x += this.vx
            this.y += this.vy

            if (this.x < -this.size) this.x = (canvas.offsetWidth || 800) + this.size
            if (this.x > (canvas.offsetWidth || 800) + this.size) this.x = -this.size
            if (this.y < -this.size) this.y = (canvas.offsetHeight || 600) + this.size
            if (this.y > (canvas.offsetHeight || 600) + this.size) this.y = -this.size
          }

          draw() {
            if (!ctx) return
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fillStyle = this.color
            ctx.fill()
          }
        }

        function init() {
          setCanvasSize()
          particles = []
          const component = document.getElementById('sankhya-hero-component')
          if (!component) return
          const numberOfParticles = (canvas.offsetWidth * canvas.offsetHeight) / 10000
          for (let i = 0; i < numberOfParticles; i++) {
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

        // Counter animation for EQ Course Info section
        const animateCounters = () => {
          const counters = document.querySelectorAll('.stat-number')
          const animationDuration = 2000 // 2 seconds

          const animateCounter = (counter: Element) => {
            const target = parseInt(counter.getAttribute('data-target') || '0')
            const suffix = counter.getAttribute('data-suffix') || ''

            const startAnimation = () => {
              let startTime: number | null = null

              const step = (currentTime: number) => {
                if (!startTime) {
                  startTime = currentTime
                }

                const elapsedTime = currentTime - startTime

                if (elapsedTime >= animationDuration) {
                  counter.textContent = target.toLocaleString() + suffix
                  return
                }
                
                const progress = elapsedTime / animationDuration
                const value = Math.floor(progress * target)
                counter.textContent = value.toLocaleString() + suffix
                
                requestAnimationFrame(step)
              }
              
              requestAnimationFrame(step)
            }

            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  startAnimation()
                  observer.unobserve(entry.target)
                }
              })
            }, { threshold: 0.5 })

            observer.observe(counter)
          }

          counters.forEach(animateCounter)
        }

        // Start counter animation after a delay
        setTimeout(animateCounters, 1000)
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
    <div className="min-h-screen bg-parchment-ivory transition-colors duration-300 overflow-x-hidden">

      {/* Hero Section */}
      <div id="sankhya-hero-component" className="sankhya-hero-component">
        <canvas id="sankhya-canvas" className="sankhya-canvas"></canvas>
        <div className="hero-wrapper">
          <div className="stats-pills animate-item" style={{ animationDelay: '0s' }}>
            <div className="stat-pill" style={{ whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.3' }}>
              <span className="pill-icon">🔱</span> World's 1st<br/>Vedic EI course
            </div>
            <div className="stat-pill">
              <span className="pill-icon">📊</span> 100+ Global Models Researched
            </div>
            <div className="stat-pill">
              <span className="pill-icon">🎯</span> 30+ Tools for Emotional Mastery
            </div>
          </div>
          
          <div className="center-icon animate-item" style={{ animationDelay: '0.2s' }}></div>

          <h1 className="hero-heading animate-item" style={{ animationDelay: '0.4s' }}>
            Reset Your<br/>Emotions Through<br/>
            <span className="light-text">Ancient Sāṅkhya<br/>Wisdom</span>
          </h1>

          <p className="hero-subheading animate-item" style={{ animationDelay: '0.5s' }}>
            Trapped in emotional confusion? Discover inner clarity through India's most profound philosophical system. Join <strong>Acharya Jamwant</strong> and <strong>Vishal Chaurasia</strong> on a life-changing journey within.
          </p>

          <div className="button-wrapper animate-item" style={{ animationDelay: '0.6s' }}>
            <div className="main-buttons">
              <a 
                href="https://courses.shikshanam.in/courses/Samkhya-Darshan--Emotional-Intelligence-Combo-Course-6868be22998a012a18cc0360?redirectToMicroFE=true" 
                className="hero-button btn-primary"
              >
                🚀 Start Your Transformation -₹2,499
              </a>
              <button 
                className="hero-button btn-secondary"
                onClick={() => setShowVideoModal(true)}
              >
                <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
                Watch Free Preview
              </button>
            </div>
            <a 
              href="https://shikshanam.in/sankhya-philosophy/" 
              className="hero-button btn-tertiary"
            >
              What is Sāṅkhya?
            </a>
          </div>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideoModal && (
            <motion.div 
              className="video-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideoModal(false)}
            >
              <motion.div 
                className="video-modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="video-modal-close"
                  onClick={() => setShowVideoModal(false)}
                >
                  &times;
                </button>
                <iframe 
                  className="video-modal-iframe" 
                  src="https://www.youtube.com/embed/VxoFDmPIpGU?autoplay=1&rel=0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Struggle Section */}
      <div id="struggle-section-component" className="struggle-section-component">
        <div className="struggle-wrapper">
          <h2 className="section-heading">
            Do you often struggle with emotional overwhelm,<br/>
            overthinking, or impulsive responses?
          </h2>
          
          <div className="accordion-container">
            {/* Item 1: Emotional Overwhelm */}
            <div className={`accordion-item ${openAccordion === 0 ? 'is-open' : ''}`}>
              <div 
                className="accordion-header"
                onClick={() => setOpenAccordion(openAccordion === 0 ? null : 0)}
              >
                <div className="question-icon">?</div>
                <div className="question-text-wrapper">
                  <p className="main-question">Are you eating significantly more or less than usual?</p>
                  <span className="see-more-text">
                    {openAccordion === 0 ? 'see less' : 'see more'}
                  </span>
                </div>
              </div>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  <Image 
                    src="/images/courses/emotional-intelligence.webp" 
                    alt="Emotional Overwhelm illustration" 
                    width={400}
                     height={300}
                     loading="lazy"
                     className="w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null
                      target.src = 'https://placehold.co/400x200/f0f0f0/3a2e2e?text=Emotional+Overwhelm'
                    }}
                  />
                  <div className="text-content">
                    <h3>Emotional Overwhelm</h3>
                    <p>Feeling flooded by intense emotions without clear direction.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2: Overthinking Patterns */}
            <div className={`accordion-item ${openAccordion === 1 ? 'is-open' : ''}`}>
              <div 
                className="accordion-header"
                onClick={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
              >
                <div className="question-icon">?</div>
                <div className="question-text-wrapper">
                  <p className="main-question">Are you constantly replaying past conversations or imagining future ones?</p>
                  <span className="see-more-text">
                    {openAccordion === 1 ? 'see less' : 'see more'}
                  </span>
                </div>
              </div>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  <Image
                    src="https://shikshanam.in/wp-content/uploads/2025/06/Overthinking-Patterns-1.png"
                    alt="Overthinking Patterns illustration"
                    width={400}
                    height={300}
                    loading="lazy"
                    className="w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null
                      target.src = 'https://placehold.co/400x200/f0f0f0/3a2e2e?text=Overthinking'
                    }}
                  />
                  <div className="text-content">
                    <h3>Overthinking Patterns</h3>
                    <p>Mental loops that drain energy and cloud judgment.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3: Reactive Responses */}
            <div className={`accordion-item ${openAccordion === 2 ? 'is-open' : ''}`}>
              <div 
                className="accordion-header"
                onClick={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
              >
                <div className="question-icon">?</div>
                <div className="question-text-wrapper">
                  <p className="main-question">Do you often either lash out or completely shut down when stressed?</p>
                  <span className="see-more-text">
                    {openAccordion === 2 ? 'see less' : 'see more'}
                  </span>
                </div>
              </div>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  <Image
                    src="https://shikshanam.in/wp-content/uploads/2025/06/Reactive-Responses-1.png"
                    alt="Reactive Responses illustration"
                    width={400}
                    height={300}
                    loading="lazy"
                    className="w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null
                      target.src = 'https://placehold.co/400x200/f0f0f0/3a2e2e?text=Reactivity'
                    }}
                  />
                  <div className="text-content">
                    <h3>Reactive Responses</h3>
                    <p>Acting from emotion rather than conscious choice.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 4: Inner Conflict */}
            <div className={`accordion-item ${openAccordion === 3 ? 'is-open' : ''}`}>
              <div 
                className="accordion-header"
                onClick={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
              >
                <div className="question-icon">?</div>
                <div className="question-text-wrapper">
                  <p className="main-question">Are you struggling to make a decision or stick with one once it's made?</p>
                  <span className="see-more-text">
                    {openAccordion === 3 ? 'see less' : 'see more'}
                  </span>
                </div>
              </div>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  <Image
                    src="https://shikshanam.in/wp-content/uploads/2025/06/Inner-Turbulence-1.png"
                    alt="Inner Conflict illustration"
                    width={400}
                    height={300}
                    loading="lazy"
                    className="w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null
                      target.src = 'https://placehold.co/400x200/f0f0f0/3a2e2e?text=Conflict'
                    }}
                  />
                  <div className="text-content">
                    <h3>Inner Conflict</h3>
                    <p>A state of mental and emotional unrest.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EQ Course Info Section */}
      <div id="eq-course-widget-container" className="eq-course-widget-container">
        <div className="course-wrapper">
          {/* Main Information Card */}
          <div className="info-card">
            <h1 className="course-title">Emotional Intelligence through the Lens of Vedic Sāṅkhya</h1>
            <p className="course-host">Decode Your Mind with India's oldest Psychological Science</p>
            <div className="pills-container">
              <span className="pill modules">16 Modules</span>
              <span className="pill access">1yr Access</span>
              <span className="pill certificate">Guaranteed Results</span>
              <span className="pill learning-path">Sequential Path Learning</span>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="stats-container">
            <div className="stat-card">
              <p className="stat-number red" data-target="100000" data-suffix="+">
                {countersAnimated ? '100,000+' : '0+'}
              </p>
              <p className="stat-description">Monthly Active Learners</p>
            </div>
            <div className="stat-card">
              <p className="stat-number blue" data-target="500" data-suffix="K+">
                {countersAnimated ? '500K+' : '0K+'}
              </p>
              <p className="stat-description">Minutes Learned Monthly</p>
            </div>
            <div className="stat-card">
              <p className="stat-number green" data-target="95" data-suffix="%">
                {countersAnimated ? '95%' : '0%'}
              </p>
              <p className="stat-description">Success Rate<br/>Student satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Master Teachers Section */}
      <div id="master-teachers-component" className="master-teachers-component">
        <div className="teachers-wrapper">
          <h2 className="main-heading">Meet Your Masters</h2>
          <p className="sub-heading">Get a preview of the profound teachings that await you in this transformative course</p>

          <div className="cards-container">
            {/* Teacher Card 1 */}
            <div className="teacher-card">
              <div 
                className="video-placeholder orange" 
                data-video-id="VxoFDmPIpGU"
                onClick={() => {
                  if (!videoLoaded['VxoFDmPIpGU']) {
                    setVideoLoaded(prev => ({ ...prev, 'VxoFDmPIpGU': true }))
                  }
                }}
              >
                {!videoLoaded['VxoFDmPIpGU'] && (
                  <>
                    <div className="video-pill">Traditional Wisdom</div>
                    <div className="video-timestamp">12:34</div>
                    <div className="play-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                    </div>
                    <div className="tap-now-text">Tap Now</div>
                  </>
                )}
                {videoLoaded['VxoFDmPIpGU'] && (
                  <iframe
                    src="https://www.youtube.com/embed/VxoFDmPIpGU?autoplay=1&rel=0"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <div className="card-content">
                <h3 className="teacher-name">Acharya Jamwant Ji</h3>
                <p className="teacher-title">The Essence of Sānkhya Philosophy</p>
                <p className="teacher-desc">Discover the fundamentals of the Human Emotions and explore the three Guṇas that govern the origin of your Emotional Behaviour</p>
                <div className="stats">
                  <div className="stat-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>
                    <span className="stat-text"><strong>500+</strong> Disciples</span>
                  </div>
                  <div className="stat-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6l5.25 3.15.75-1.23-4-2.42z"></path></svg>
                    <span className="stat-text"><strong>10+</strong> Years</span>
                  </div>
                  <div className="stat-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></svg>
                    <span className="stat-text">Author | 2 Books</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher Card 2 */}
            <div className="teacher-card">
              <div 
                className="video-placeholder blue" 
                data-video-id="kldd4TkWkEU"
                onClick={() => {
                  if (!videoLoaded['kldd4TkWkEU']) {
                    setVideoLoaded(prev => ({ ...prev, 'kldd4TkWkEU': true }))
                  }
                }}
              >
                {!videoLoaded['kldd4TkWkEU'] && (
                  <>
                    <div className="video-pill">Modern Application</div>
                    <div className="video-timestamp">10:45</div>
                    <div className="play-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                    </div>
                    <div className="tap-now-text">Tap Now</div>
                  </>
                )}
                {videoLoaded['kldd4TkWkEU'] && (
                  <iframe
                    src="https://www.youtube.com/embed/kldd4TkWkEU?autoplay=1&rel=0"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <div className="card-content">
                <h3 className="teacher-name">Vishal Chaurasia</h3>
                <p className="teacher-title">Modern Applications of Ancient Wisdom</p>
                <p className="teacher-desc">Learn how to apply Sāṃkhya principles through various activities to overcome modern emotional challenges and build resilience.</p>
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
              </div>
            </div>
          </div>
          
          {/* "Start Your Journey" Button */}
          <a 
            href="https://courses.shikshanam.in/courses/Samkhya-Darshan--Emotional-Intelligence-Combo-Course-6868be22998a012a18cc0360?redirectToMicroFE=true" 
            className="start-journey-btn"
          >
            Start Your Journey
          </a>
        </div>
      </div>

      {/* Creator Review Section */}
      <div id="student-reviews-component" className="student-reviews-component">
        <div className="component-wrapper">
          <h2 className="main-heading">Our Learners Review</h2>
          <p className="sub-heading">Get an inside look at the course experience and the powerful insights you can gain.</p>
          <div className="cards-container">
            {/* Review Card */}
            <div 
              className="review-card" 
              data-video-id="sfi2e8WrGiw"
              onClick={() => {
                setTestimonialVideoId('sfi2e8WrGiw')
                setShowTestimonialModal(true)
              }}
            >
              <div 
                className="video-thumbnail-pocket" 
                style={{ backgroundImage: "url('https://i.ytimg.com/vi/sfi2e8WrGiw/hqdefault.jpg')" }}
              >
                <div className="play-icon-overlay">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                </div>
              </div>
              <div className="reviewer-details">
                <h3 className="student-name">Manogya Tiwari</h3>
                <p className="student-bio">Spiritual Creator</p>
                <div className="star-rating">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                </div>
                <p className="student-quote">"This course masterfully bridges the gap between our ancient cultural heritage and the practical need for emotional intelligence in today's world. A vital experience for any spiritual practitioner or entrepreneur."</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Video Modal */}
      <AnimatePresence>
        {showTestimonialModal && (
          <motion.div
            id="video-modal-overlay"
            className="video-modal-overlay active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowTestimonialModal(false)
                setTestimonialVideoId(null)
              }
            }}
          >
            <motion.div
              id="video-modal-content"
              className="video-modal-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                id="video-modal-close"
                className="video-modal-close"
                onClick={() => {
                  setShowTestimonialModal(false)
                  setTestimonialVideoId(null)
                }}
              >
                &times;
              </button>
              <div id="video-modal-player" className="video-modal-player">
                {testimonialVideoId && (
                  <iframe
                    src={`https://www.youtube.com/embed/${testimonialVideoId}?autoplay=1&rel=0&modestbranding=1`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bonus Features Section */}
      <div id="bonus-features-component" className="bonus-features-component">
        <div className="bonus-wrapper">
          <h2 className="bonus-main-heading">Exclusive Bonus Features! 🎉</h2>
          <p className="bonus-sub-heading">Enhanced learning tools and community support to deepen your practice</p>

          <div className="bonus-cards-container">
            {/* Card 1 */}
            <div className="bonus-card yellow">
              <div className="ribbon-wrapper"><div className="ribbon">BONUS</div></div>
              <div className="bonus-card-content">
                <div className="card-header">
                  <div className="bonus-icon">
                    <Image 
                      src="https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-207.png"
                      alt="Guna Profiler Tool Icon"
                      width={72}
                      height={72}
                      className="animate-all"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.src = 'https://placehold.co/72x72/fdebd0/e67e22?text=Icon'
                      }}
                    />
                  </div>
                  <span className="bonus-pill">Interactive</span>
                </div>
                <h3 className="bonus-title">Guna Profiler Tool</h3>
                <p className="bonus-desc">Personalized assessment to understand your dominant mental qualities</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bonus-card yellow">
              <div className="ribbon-wrapper"><div className="ribbon">BONUS</div></div>
              <div className="bonus-card-content">
                <div className="card-header">
                  <div className="bonus-icon">
                    <Image 
                      src="https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-202.png"
                      alt="Emotional Journal Template Icon"
                      width={72}
                      height={72}
                      className="animate-all"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.src = 'https://placehold.co/72x72/fdebd0/e67e22?text=Icon'
                      }}
                    />
                  </div>
                  <span className="bonus-pill">Downloadable</span>
                </div>
                <h3 className="bonus-title">Emotional Journal Template</h3>
                <p className="bonus-desc">Structured daily practice for emotional awareness and growth</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bonus-card yellow">
              <div className="ribbon-wrapper"><div className="ribbon">BONUS</div></div>
              <div className="bonus-card-content">
                <div className="card-header">
                  <div className="bonus-icon">
                    <Image 
                      src="https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-208.png"
                      alt="Private WhatsApp Group Icon"
                      width={72}
                      height={72}
                      className="animate-all"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.src = 'https://placehold.co/72x72/fdebd0/e67e22?text=Icon'
                      }}
                    />
                  </div>
                  <span className="bonus-pill">Community</span>
                </div>
                <h3 className="bonus-title">Private WhatsApp Group</h3>
                <p className="bonus-desc">Connect with fellow seekers and get ongoing support</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bonus-card blue">
              <div className="ribbon-wrapper"><div className="ribbon">BONUS</div></div>
              <div className="bonus-card-content">
                <div className="card-header">
                  <div className="bonus-icon">
                    <Image 
                      src="https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-210.png"
                      alt="1-Year Access Icon"
                      width={72}
                      height={72}
                      className="animate-all"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.src = 'https://placehold.co/72x72/d6eaf8/3498db?text=Icon'
                      }}
                    />
                  </div>
                  <span className="bonus-pill">1 Year</span>
                </div>
                <h3 className="bonus-title">1-Year Access</h3>
                <p className="bonus-desc">Revisit the teachings whenever you need guidance</p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bonus-card blue">
              <div className="ribbon-wrapper"><div className="ribbon">BONUS</div></div>
              <div className="bonus-card-content">
                <div className="card-header">
                  <div className="bonus-icon">
                    <Image 
                      src="https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-206.png"
                      alt="Certificate of Completion Icon"
                      width={72}
                      height={72}
                      className="animate-all"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.src = 'https://placehold.co/72x72/d6eaf8/3498db?text=Icon'
                      }}
                    />
                  </div>
                  <span className="bonus-pill">Achievement</span>
                </div>
                <h3 className="bonus-title">Certificate of Completion</h3>
                <p className="bonus-desc">Recognition of your journey through ancient wisdom</p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bonus-card blue">
              <div className="ribbon-wrapper"><div className="ribbon">BONUS</div></div>
              <div className="bonus-card-content">
                <div className="card-header">
                  <div className="bonus-icon">
                    <Image 
                      src="https://shikshanam.in/wp-content/uploads/2025/07/icons-features-Recovered-203-1.png"
                      alt="Guna-Based Assessment Icon"
                      width={72}
                      height={72}
                      className="animate-all"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.src = 'https://placehold.co/72x72/d6eaf8/3498db?text=Icon'
                      }}
                    />
                  </div>
                  <span className="bonus-pill">Personalized</span>
                </div>
                <h3 className="bonus-title">Guna-Based Assessment</h3>
                <p className="bonus-desc">
                  A custom "Emotional Roadmap" based on your reflections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Gallery Section */}
      <section className="video-gallery-section">
        <h2>Explore the <span className="light-text">Wisdom</span></h2>
        <div className="gallery-container">
          <button 
            className="nav-arrow prev-arrow" 
            aria-label="Previous"
            onClick={() => {
              if (typeof window !== 'undefined') {
                const scroller = document.querySelector('.video-scroller')
                if (scroller) {
                  const firstCard = scroller.querySelector('.video-card')
                  if (firstCard) {
                    const scrollAmount = (firstCard as HTMLElement).offsetWidth + parseFloat(getComputedStyle(scroller).gap || '0')
                    scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
                  }
                }
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div className="video-scroller">
            {/* Video Card 1 */}
            <div 
              className="video-card" 
              data-video-id="lOR9ZsMt4ug"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const videoId = 'lOR9ZsMt4ug'
                  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                  setVideoModalSrc(youtubeUrl)
                  setShowVideoModal(true)
                  document.body.style.overflow = 'hidden'
                }
              }}
            >
              <div className="video-thumbnail">
                <Image 
                  src="https://img.youtube.com/vi/lOR9ZsMt4ug/sddefault.jpg"
                  alt="Video Thumbnail"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = 'https://placehold.co/600x400/2c2620/fdfaf6?text=Video+Not+Found'
                  }}
                />
                <div className="thumbnail-overlay">
                  <span className="video-overlay-title">The Trap of Work Addiction</span>
                  <span className="video-duration">15:30</span>
                </div>
                <div className="play-icon">
                  <svg viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </div>
              </div>
              <p className="video-title">The Trap of Work Addiction: Why You Can't Relax Anymore</p>
            </div>

            {/* Video Card 2 */}
            <div 
              className="video-card" 
              data-video-id="fOyOmesmUhk"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const videoId = 'fOyOmesmUhk'
                  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                  setVideoModalSrc(youtubeUrl)
                  setShowVideoModal(true)
                  document.body.style.overflow = 'hidden'
                }
              }}
            >
              <div className="video-thumbnail">
                <Image 
                  src="https://img.youtube.com/vi/fOyOmesmUhk/sddefault.jpg"
                  alt="Video Thumbnail"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = 'https://placehold.co/600x400/2c2620/fdfaf6?text=Video+Not+Found'
                  }}
                />
                <div className="thumbnail-overlay">
                  <span className="video-overlay-title">How to Stop Overthinking</span>
                  <span className="video-duration">11:45</span>
                </div>
                <div className="play-icon">
                  <svg viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </div>
              </div>
              <p className="video-title">How to Stop Overthinking</p>
            </div>

            {/* Video Card 3 */}
            <div 
              className="video-card" 
              data-video-id="Y9D3VkB8cQE"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const videoId = 'Y9D3VkB8cQE'
                  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                  setVideoModalSrc(youtubeUrl)
                  setShowVideoModal(true)
                  document.body.style.overflow = 'hidden'
                }
              }}
            >
              <div className="video-thumbnail">
                <Image 
                  src="https://img.youtube.com/vi/Y9D3VkB8cQE/sddefault.jpg"
                  alt="Video Thumbnail"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = 'https://placehold.co/600x400/2c2620/fdfaf6?text=Video+Not+Found'
                  }}
                />
                <div className="thumbnail-overlay">
                  <span className="video-overlay-title">Social Media & The Mind</span>
                  <span className="video-duration">18:22</span>
                </div>
                <div className="play-icon">
                  <svg viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </div>
              </div>
              <p className="video-title">Why Social Media Still Confuses the Mind</p>
            </div>

            {/* Video Card 4 */}
            <div 
              className="video-card" 
              data-video-id="lqVTJewLhPs"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const videoId = 'lqVTJewLhPs'
                  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                  setVideoModalSrc(youtubeUrl)
                  setShowVideoModal(true)
                  document.body.style.overflow = 'hidden'
                }
              }}
            >
              <div className="video-thumbnail">
                <Image 
                  src="https://img.youtube.com/vi/lqVTJewLhPs/sddefault.jpg"
                  alt="Video Thumbnail"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = 'https://placehold.co/600x400/2c2620/fdfaf6?text=Video+Not+Found'
                  }}
                />
                <div className="thumbnail-overlay">
                  <span className="video-overlay-title">Workplace Stress</span>
                  <span className="video-duration">9:10</span>
                </div>
                <div className="play-icon">
                  <svg viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </div>
              </div>
              <p className="video-title">Workplace Stress Hurting Your Personal Life?</p>
            </div>

            {/* Video Card 5 */}
            <div 
              className="video-card" 
              data-video-id="b92bww6ImZo"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const videoId = 'b92bww6ImZo'
                  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                  setVideoModalSrc(youtubeUrl)
                  setShowVideoModal(true)
                  document.body.style.overflow = 'hidden'
                }
              }}
            >
              <div className="video-thumbnail">
                <Image 
                  src="https://img.youtube.com/vi/b92bww6ImZo/sddefault.jpg"
                  alt="Video Thumbnail"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = 'https://placehold.co/600x400/2c2620/fdfaf6?text=Video+Not+Found'
                  }}
                />
                <div className="thumbnail-overlay">
                  <span className="video-overlay-title">Finding Purpose</span>
                  <span className="video-duration">14:05</span>
                </div>
                <div className="play-icon">
                  <svg viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </div>
              </div>
              <p className="video-title">Do Housewives Lose Their True Purpose?</p>
            </div>

            {/* Video Card 6 */}
            <div 
              className="video-card" 
              data-video-id="OambhYsblNI"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const videoId = 'OambhYsblNI'
                  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                  setVideoModalSrc(youtubeUrl)
                  setShowVideoModal(true)
                  document.body.style.overflow = 'hidden'
                }
              }}
            >
              <div className="video-thumbnail">
                <Image 
                  src="https://img.youtube.com/vi/OambhYsblNI/sddefault.jpg"
                  alt="Video Thumbnail"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = 'https://placehold.co/600x400/2c2620/fdfaf6?text=Video+Not+Found'
                  }}
                />
                <div className="thumbnail-overlay">
                  <span className="video-overlay-title">Quitting a Job You Hate</span>
                  <span className="video-duration">12:54</span>
                </div>
                <div className="play-icon">
                  <svg viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </div>
              </div>
              <p className="video-title">How to Find the Courage to Quit a Job You Hate</p>
            </div>

            {/* Video Card 7 */}
            <div 
              className="video-card" 
              data-video-id="90FsCxSpWD0"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const videoId = '90FsCxSpWD0'
                  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                  setVideoModalSrc(youtubeUrl)
                  setShowVideoModal(true)
                  document.body.style.overflow = 'hidden'
                }
              }}
            >
              <div className="video-thumbnail">
                <Image 
                  src="https://img.youtube.com/vi/90FsCxSpWD0/sddefault.jpg"
                  alt="Video Thumbnail"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = 'https://placehold.co/600x400/2c2620/fdfaf6?text=Video+Not+Found'
                  }}
                />
                <div className="thumbnail-overlay">
                  <span className="video-overlay-title">Common Life Problems</span>
                  <span className="video-duration">22:18</span>
                </div>
                <div className="play-icon">
                  <svg viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </div>
              </div>
              <p className="video-title">Most Common Life Problems People Face</p>
            </div>

            {/* Video Card 8 */}
            <div 
              className="video-card" 
              data-video-id="LBqOELB32AM"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const videoId = 'LBqOELB32AM'
                  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                  setVideoModalSrc(youtubeUrl)
                  setShowVideoModal(true)
                  document.body.style.overflow = 'hidden'
                }
              }}
            >
              <div className="video-thumbnail">
                <Image 
                  src="https://img.youtube.com/vi/LBqOELB32AM/sddefault.jpg"
                  alt="Video Thumbnail"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = 'https://placehold.co/600x400/2c2620/fdfaf6?text=Video+Not+Found'
                  }}
                />
                <div className="thumbnail-overlay">
                  <span className="video-overlay-title">Living Alone & Growth</span>
                  <span className="video-duration">10:33</span>
                </div>
                <div className="play-icon">
                  <svg viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </div>
              </div>
              <p className="video-title">Is Living Alone Best for Spiritual Growth?</p>
            </div>
          </div>
          <button 
            className="nav-arrow next-arrow" 
            aria-label="Next"
            onClick={() => {
              if (typeof window !== 'undefined') {
                const scroller = document.querySelector('.video-scroller')
                if (scroller) {
                  const firstCard = scroller.querySelector('.video-card')
                  if (firstCard) {
                    const scrollAmount = (firstCard as HTMLElement).offsetWidth + parseFloat(getComputedStyle(scroller).gap || '0')
                    scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' })
                  }
                }
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </section>

      {/* Course Curriculum Section */}
      <div id="curriculum-component" className="curriculum-component">
        <div className="curriculum-wrapper">
          <div className="curriculum-pill">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Course Curriculum
          </div>
          <h2 className="curriculum-main-heading">A Transformative Learning Journey</h2>
          <p className="curriculum-sub-heading">Eighteen modules designed to guide you from ancient principles to modern, practical application for a balanced life.</p>
          
          <div className="accordion-container">
            {/* Module 0 - Guna Profiler */}
            <div className={`module-item ${openModule === 0 ? 'expanded' : ''}`}>
              <div className="module-header" onClick={() => setOpenModule(openModule === 0 ? null : 0)}>
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Guna Profiler</h3>
                    <span className="module-tag">Self-Discovery</span>
                  </div>
                  <p className="module-desc">Discover Your Guṇa-Based Profile to Start Your Personalised Journey</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>5 mins</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 0</span>
                  <div className="expand-text">
                    <span>{openModule === 0 ? 'Collapse' : 'See More'}</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list" style={{paddingTop: '1rem', borderTop: 'none'}}>
                  <p style={{marginBottom: '1.5rem', textAlign: 'left', color: 'var(--subheading-color)'}}>
                    This simple test will help you identify your dominant Guna (Sattva, Rajas, or Tamas), providing a personalized starting point for your journey.
                  </p>
                  <a 
                    href="https://shikshanam.in/guna-profiler/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="profiler-button" 
                    style={{marginTop: '0'}}
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-6.75 0H7.5" />
                    </svg>
                    <span>Start Guna Profiler Test</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Module 1 - Emotional Intelligence Foundation */}
            <div className={`module-item ${openModule === 1 ? 'expanded' : ''}`}>
              <div className="module-header" onClick={() => setOpenModule(openModule === 1 ? null : 1)}>
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Emotional Intelligence – The Foundation</h3>
                    <span className="module-tag">Self-Awareness</span>
                  </div>
                  <p className="module-desc">Understand the philosophical and practical basis of emotional intelligence.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 1</span>
                  <div className="expand-text">
                    <span>{openModule === 1 ? 'Collapse' : 'See More'}</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Introduction to Emotions & Sāṅkhya Darśana</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Emotional Confusion in Modern Life</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">What are the emotional challenges in your life? How to deal with that?</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 2 - Kāma-Krodha */}
            <div className={`module-item ${openModule === 2 ? 'expanded' : ''}`}>
              <div className="module-header" onClick={() => setOpenModule(openModule === 2 ? null : 2)}>
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Kāma-Krodha (Desire & Anger)</h3>
                    <span className="module-tag">Core Emotions</span>
                  </div>
                  <p className="module-desc">Learn to observe and manage the powerful emotions of desire and anger.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 2</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Desire as the Root of Anger</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Everyday Triggers + Self-Inquiry Practices</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Desire–Reaction Tracker</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 3 - Moha */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Moha (Attachment)</h3>
                    <span className="module-tag">Mindfulness</span>
                  </div>
                  <p className="module-desc">Explore the nature of attachment and the freedom in letting go.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 3</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Nature of Attachment & Letting Go</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Identifying Emotional Dependency</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Liberation Writing</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 4 - Bhaya */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Bhaya (Fear)</h3>
                    <span className="module-tag">Inner Work</span>
                  </div>
                  <p className="module-desc">A deep inquiry into the roots of your fears and how to dissolve them.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 4</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Identify Fears through Guṇas</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Understanding Root Fears & Facing Them</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Fear Inquiry Sheet</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 5 - Īrṣyā */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Īrṣyā (Jealousy)</h3>
                    <span className="module-tag">Self-Love</span>
                  </div>
                  <p className="module-desc">Transform comparison and jealousy into self-gratitude.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 5</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Jealousy as Distorted Self-Perception</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Turning Comparison into Self-Gratitude</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Self-Gratitude Mirror Practice</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 6 - Nāśā */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Nāśā (Craving / Addiction)</h3>
                    <span className="module-tag">Discipline</span>
                  </div>
                  <p className="module-desc">Understand addictive patterns and reclaim your focus.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 6</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Pleasure & Dependence in the Mind</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Dopamine Detox & Focus Rebuilding</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">1-Day Dopamine Fast</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 7 - Ahaṃkāra */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Ahaṃkāra (Ego)</h3>
                    <span className="module-tag">Observation</span>
                  </div>
                  <p className="module-desc">Observe the play of the Gunas within you to understand the ego.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 7</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Ego and Guṇa Dynamics</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Self-Tracking to Reduce Ego Influence</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Track Your Guṇas for 3 Days</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 8 - Lobha */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Lobha (Greed)</h3>
                    <span className="module-tag">Contentment</span>
                  </div>
                  <p className="module-desc">Discover the joy of simplicity and contentment.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 8</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Greed and Inner Insecurity</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Minimalist Living for Mental Peace</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Minimalism Day</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 9 - Sādhanā kā Pāthika Krama */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Sādhanā kā Pāthika Krama (Spiritual Practice Design)</h3>
                    <span className="module-tag">Routine Design</span>
                  </div>
                  <p className="module-desc">Learn to design a consistent and personalized spiritual routine.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 9</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">The Need for Daily Sādhanā</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">How to Build a Realistic Spiritual Routine</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Daily Routine Blueprint</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 10 - Śarīra kī Svasthatā */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Śarīra kī Svasthatā (Body Purity)</h3>
                    <span className="module-tag">Purity</span>
                  </div>
                  <p className="module-desc">Cleanse the body to create a clear and pure mind.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 10</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Body as a Sacred Instrument</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Morning Cleansing for Clarity & Energy</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">15-Minute Morning Cleanse</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 11 - Prāṇa Ūrjā kā Santulana */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Prāṇa Ūrjā kā Santulana (Pranic Balance)</h3>
                    <span className="module-tag">Pranic Balance</span>
                  </div>
                  <p className="module-desc">Balance your vital life-force energy with powerful breathing techniques.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 11</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Balancing Iḍā & Piṅgalā</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Breath as an Emotional Regulator</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Nāḍī Śodhana Practice</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 12 - Manaḥ kī Sthirātā */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Manaḥ kī Sthirātā (Mental Stillness)</h3>
                    <span className="module-tag">Concentration</span>
                  </div>
                  <p className="module-desc">Develop profound concentration and mental stillness.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 12</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">The Role of Stillness in Sāṅkhya</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Trāṭaka & Śāmbhavī for Mental Clarity</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Trāṭaka + Śāmbhavī Mudrā</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 13 - Manaḥ kī Antarmukhatā */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Manaḥ kī Antarmukhatā (Turning Inward)</h3>
                    <span className="module-tag">Introspection</span>
                  </div>
                  <p className="module-desc">Shift your focus from the external to the internal world.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 13</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">The Journey of Inner Observation</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Mantra & Vibration Awareness</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Observe the Inner World</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 14 - Ahaṃkāra kī Śūnyatā */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Ahaṃkāra kī Śūnyatā (Ego Dissolution)</h3>
                    <span className="module-tag">Selflessness</span>
                  </div>
                  <p className="module-desc">Experience the joy of selflessness through acts of service.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 14</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Ego and Selfless Karma</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Anonymous Kindness as Spiritual Practice</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Anonymous Kind Deed / Observe Your Serving Nature</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 15 - Buddhi kī Vyāpakatā */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Buddhi kī Vyāpakatā (Expanded Wisdom)</h3>
                    <span className="module-tag">Action</span>
                  </div>
                  <p className="module-desc">Learn to apply spiritual wisdom to your everyday life challenges.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 15</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Viveka (Discrimination) as Spiritual Maturity</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Applying Learnings to Real Life</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Wisdom in Action</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 16 - Citta kī Śuddhatā */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Citta kī Śuddhatā (Purity of Consciousness)</h3>
                    <span className="module-tag">Final Practice</span>
                  </div>
                  <p className="module-desc">Learn to witness your thoughts and emotions without judgment.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span>3 Lessons</span>
                    </div>
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>25-30 min</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 16</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">The Cleansing of Citta in Sāṅkhya</h4>
                      <p className="lesson-type">Video Class</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🎥</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Silent Observation as Inner Cleanse</h4>
                      <p className="lesson-type">Explainer Video</p>
                    </div>
                  </div>
                  <div className="lesson-item">
                    <div className="lesson-icon">
                      <span>🧘</span>
                    </div>
                    <div className="lesson-info">
                      <h4 className="lesson-title">Observe Your Thoughts and Emotions</h4>
                      <p className="lesson-type">Activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 17 - Final Report */}
            <div className="module-item">
              <div className="module-header">
                <div className="module-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                </div>
                <div className="module-info">
                  <div className="module-title-wrapper">
                    <h3 className="module-title">Antaryatra ka Darpan (Personalized Emotional Journey Report)</h3>
                    <span className="module-tag">Final Report</span>
                  </div>
                  <p className="module-desc">Generate your final report, a mirror to your inner journey, growth, and future path.</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>15 mins</span>
                    </div>
                  </div>
                </div>
                <div className="expand-collapse-trigger">
                  <span className="module-label">Module 17</span>
                  <div className="expand-text">
                    <span>Expand</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="lessons-list">
                  <h4 className="report-activity-title">Activity: Mirror of the Self – Final Guna-Based Assessment</h4>
                  <p style={{textAlign: 'left', color: 'var(--subheading-color)', marginTop: '0.5rem'}}>
                    This detailed report will cover:
                  </p>
                  <ul className="report-details">
                    <li>
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Guna dominance chart over the 16 chapters</span>
                    </li>
                    <li>
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Emotional hotspots (anger, fear, attachment, etc.)</span>
                    </li>
                    <li>
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Growth highlights: what's shifted, what's stable</span>
                    </li>
                    <li>
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Suggested practices for further inner balance</span>
                    </li>
                    <li>
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>A custom "Emotional Roadmap" based on their reflections</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="emotional-mastery-pricing-container" className="emotional-mastery-pricing-container">
        <div className="emp-wrapper">
          <header className="emp-header">
            <span className="emp-tag">✨ Limited Time Offer</span>
            <h1>Transform Your Emotional Life</h1>
            <p>Already tested by 500+ working professionals navigating fast-paced, high-pressure lives.</p>
          </header>
          
          <div className="emp-stats">
            <div className="emp-stat-item">
              <div className="emp-value">500+</div>
              <div className="emp-label">Happy Students</div>
            </div>
            <div className="emp-stat-item">
              <div className="emp-value">4.9<span>★</span></div>
              <div className="emp-label">Average Rating</div>
            </div>
            <div className="emp-stat-item">
              <div className="emp-value">95%</div>
              <div className="emp-label">Completion Rate</div>
            </div>
          </div>

          
          <div className="emp-pricing-cards">
            
            <div className="emp-pricing-card">
              <div className="emp-combo-deal-badge">COMBO DEAL</div>
              <div className="emp-card-header">
                <h2>Combo Program</h2>
                <p>For a complete transformation of mind</p>
              </div>
              <div className="emp-price">
                <span className="emp-current-price">₹3,299</span>
                <span className="emp-original-price">₹4,999</span>
                <div className="emp-save-badge emp-save-badge-combo">Save 34%</div>
              </div>
              <ul className="emp-features">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#16a085" viewBox="0 0 16 16" strokeWidth="2" stroke="white">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.354 5.354-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L6.5 9.793l4.146-4.147a.5.5 0 0 1 .708.708z"/>
                  </svg>
                  <span className="emp-feature-highlight">All 'Core Program' Features, Plus:</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Full 'Samkhya Philosophy' classes
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Combined Community Access
                </li>
              </ul>
              <a 
                href="https://courses.shikshanam.in/courses/Samkhya-Darshan--Emotional-Intelligence-Combo-Course-6868be22998a012a18cc0360?redirectToMicroFE=true" 
                target="_blank" 
                className="emp-cta-button emp-cta-button-combo"
              >
                Choose Combo Program
              </a>
            </div>

            <div className="emp-pricing-card emp-best-value">
              <div className="emp-best-value-badge">BEST VALUE</div>
              <div className="emp-card-header">
                <h2>Core Program</h2>
                <p>Everything you need for emotional mastery</p>
              </div>
              <div className="emp-price">
                <span className="emp-current-price">₹2,499</span>
                <span className="emp-original-price">₹3,999</span>
                <div className="emp-save-badge">Save 38%</div>
              </div>
              <ul className="emp-features">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  16 comprehensive video modules
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Live Q&A sessions with instructors
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Guna Profiler assessment tool
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Advanced emotional journal templates
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Private community access
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Classes completion certificate
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Priority support
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  1 year access
                </li>
              </ul>
              <a 
                href="https://courses.shikshanam.in/single-checkout/6856625dbe54004a30f453c8?pid=p1" 
                target="_blank" 
                className="emp-cta-button emp-cta-button-primary"
              >
                Enroll & Begin Inner Work
              </a>
            </div>

            <div className="emp-pricing-card">
              <div className="emp-ultimate-badge">ULTIMATE</div>
              <div className="emp-card-header">
                <h2>Ultimate Bundle</h2>
                <p>The complete experience with all classes and exclusive books.</p>
              </div>
              <div className="emp-price">
                <span className="emp-current-price">₹3,449</span>
                <span className="emp-original-price">₹7,999</span>
                <div className="emp-save-badge emp-save-badge-ultimate">Save 57%</div>
              </div>
              <ul className="emp-features">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#8e44ad">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>Full 'Emotional Mastery' classes</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#8e44ad">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>Full 'Samkhya Philosophy' classes</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b074">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>Includes 2 companion books by Sadhak Jamwant Ji (Digital): <span className="emp-hindi-text">धैर्य</span> & <span className="emp-hindi-text">विज्ञान तथा अध्यात्म</span>.</span>
                </li>
              </ul>
              <a 
                href="https://courses.shikshanam.in/single-checkout/687b56fc55ab5b6dc3bb51de?pid=p1" 
                target="_blank" 
                className="emp-cta-button emp-cta-button-ultimate"
              >
                Choose Ultimate Bundle
              </a>
            </div>

          </div>

          <div className="emp-footer-stats">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.238 1.276.593.69.758 1.457.76 1.72l-.008.004a.274.274 0 0 1-.273.273H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.5 7a.5.5 0 0 0 0-1h-5a.5.5 0 0 0 0 1h5ZM3.5 4a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2Z"/>
              </svg>
              <span>500+ Enrolled</span>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L8.707 1.5z"/>
                <path d="m13.293 7.293-6-6a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708L8 2.207l5.293 5.293a.5.5 0 0 0 .708-.708z"/>
              </svg>
              <span>Certified classes</span>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              <span>4.9/5 Rating</span>
            </div>
          </div>

        </div>
      </div>

      {/* Shloka Section */}
      <div id="shloka-section-container" className="shloka-section-container">
        <div className="shloka-banner">
          <div className="shloka-container">
            <div className="shloka-symbol">
              <Image 
                src="https://shikshanam.in/wp-content/uploads/2024/03/logo-white-1.png"
                alt="Shikshanam Logo"
                width={100}
                height={100}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div className="divider"></div>
            <div className="shloka-text">
              <p className="shloka-hindi">दु:खेष्वनुद्विग्नमना: सुखेषु विगतस्पृह:।</p>
              <p className="shloka-hindi">वीतरागभयक्रोध: स्थितधीर्मुनिरुच्यते॥</p>
              <p className="shloka-translation">One whose mind remains undisturbed amidst misery, who does not crave for pleasure, and who is free from attachment, fear, and anger, is called stable of mind.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
