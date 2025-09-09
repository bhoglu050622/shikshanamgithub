'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { testimonials } from '../data/questions'

interface InitialScreenProps {
  onStartQuiz: () => void
  userName: string
}

export default function InitialScreen({ onStartQuiz, userName }: InitialScreenProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  // Background animation setup
  useEffect(() => {
    const canvas = document.getElementById('background-canvas') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: Array<{x: number, y: number, baseRadius: number, alpha: number, dAlpha: number}> = []
    const numStars = 300

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createStars()
    }

    const createStars = () => {
      stars = []
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseRadius: Math.random() * 1.5,
          alpha: Math.random(),
          dAlpha: Math.random() * 0.02 - 0.01
        })
      }
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'hsla(50, 90%, 95%, 0.8)'
      
      stars.forEach(star => {
        star.alpha += star.dAlpha
        if (star.alpha <= 0 || star.alpha >= 1) {
          star.dAlpha *= -1
        }
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.baseRadius, 0, Math.PI * 2)
        ctx.globalAlpha = star.alpha
        ctx.fill()
      })
      
      requestAnimationFrame(drawStars)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    drawStars()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative"
      style={{
        background: 'linear-gradient(135deg, hsl(234, 45%, 13%), hsl(260, 50%, 8%))',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full max-w-4xl"
      >
        {/* Title */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'hsl(43, 45%, 58%)',
            textShadow: '0 0 15px hsla(43, 85%, 70%, 0.4), 0 0 5px hsla(50, 90%, 95%, 0.5)'
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          How Aligned Are You?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl mb-12"
          style={{
            fontFamily: "'Noto Serif', serif",
            color: 'hsl(50, 90%, 95%)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          A spiritual mirror reflecting your inner state
        </motion.p>

        {/* Start Button */}
        <motion.button
          onClick={onStartQuiz}
          className="px-10 py-4 rounded-full font-semibold text-xl transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(45deg, hsl(43, 45%, 58%), hsl(24, 85%, 53%))',
            color: 'hsl(260, 50%, 8%)',
            boxShadow: '0 10px 40px -12px hsla(43, 45%, 58%, 0.3)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          whileHover={{
            boxShadow: '0 0 30px hsla(43, 45%, 58%, 0.2)'
          }}
        >
          Begin the Journey 🔱
        </motion.button>
      </motion.div>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="w-full max-w-4xl mt-16"
      >
        <h2 
          className="text-3xl font-bold mb-8"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'hsl(50, 90%, 95%)'
          }}
        >
          Voices of Awakening
        </h2>
        
        <div className="relative max-w-3xl mx-auto min-h-32 flex items-center justify-center overflow-hidden">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="absolute w-full text-center"
          >
            <p 
              className="text-lg md:text-xl italic leading-relaxed mb-4"
              style={{
                fontFamily: "'Noto Serif', serif",
                color: 'hsla(50, 90%, 95%, 0.7)'
              }}
            >
              "{testimonials[currentTestimonial].quote}"
            </p>
            <span 
              className="text-base font-medium"
              style={{ color: 'hsl(24, 85%, 53%)' }}
            >
              — {testimonials[currentTestimonial].author}
            </span>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
