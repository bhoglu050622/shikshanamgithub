'use client'

import { useEffect, useRef } from 'react'

interface AnimationWrapperProps {
  children: React.ReactNode
  animationType?: 'particles' | 'floating' | 'sparkles' | 'canvas' | 'logic-flow' | 'question-spiral' | 'atomic-particles' | 'breathing-flow' | 'devanagari-flow' | 'tattva-evolution'
  theme?: string
  className?: string
}

export default function AnimationWrapper({ 
  children, 
  animationType = 'particles', 
  theme = 'default',
  className = ''
}: AnimationWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let animationId: number
    let particles: Particle[] = []

    // Particle class for various animation types
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      fadeSpeed: number
      fadingOut: boolean
      color: string

      constructor(canvas: HTMLCanvasElement, theme: string) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.8 + 0.2
        this.fadeSpeed = Math.random() * 0.02 + 0.01
        this.fadingOut = Math.random() > 0.5
        this.color = getThemeColor(theme)
      }

      update(canvas: HTMLCanvasElement) {
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

        // Reset position if out of bounds
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color.replace('rgb', 'rgba').replace(')', `, ${this.opacity})`)
        ctx.fill()
      }
    }

    // Theme-based color selection
    function getThemeColor(theme: string): string {
      const colors = {
        'chanakya': 'rgb(234, 88, 12)', // Saffron orange
        'samkhya': 'rgb(245, 158, 11)', // Golden
        'isha': 'rgb(20, 184, 166)', // Teal
        'prashna': 'rgb(56, 189, 248)', // Sky blue
        'sanskrit': 'rgb(245, 158, 11)', // Amber
        'vaisheshik': 'rgb(16, 185, 129)', // Emerald
        'yoga': 'rgb(34, 197, 94)', // Green
        'nyaya': 'rgb(147, 51, 234)', // Purple
        'default': 'rgb(255, 223, 100)' // Light gold
      }
      return colors[theme as keyof typeof colors] || colors.default
    }

    if (animationType === 'particles' || animationType === 'sparkles') {
      // Create canvas for particle animation
      const canvas = document.createElement('canvas')
      canvas.style.position = 'absolute'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.pointerEvents = 'none'
      canvas.style.zIndex = '1'
      
      container.appendChild(canvas)

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      function setCanvasSize() {
        const rect = container.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }

      function initParticles() {
        particles = []
        const numParticles = animationType === 'sparkles' ? 80 : 120
        for (let i = 0; i < numParticles; i++) {
          particles.push(new Particle(canvas, theme))
        }
      }

      function animate() {
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles.forEach(particle => {
          particle.update(canvas)
          particle.draw(ctx)
        })
        animationId = requestAnimationFrame(animate)
      }

      setCanvasSize()
      initParticles()
      animate()

      // Handle resize
      const handleResize = () => {
        setCanvasSize()
        initParticles()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(animationId)
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas)
        }
      }
    } else if (animationType === 'floating') {
      // CSS-based floating animation
      const elements = container.querySelectorAll('.floating-element')
      elements.forEach((element, index) => {
        const el = element as HTMLElement
        el.style.animationDelay = `${index * 0.2}s`
        el.style.animationDuration = `${2 + Math.random() * 2}s`
      })
    } else if (animationType === 'logic-flow') {
      // Logic flow animation - similar to particles but with different behavior
      const canvas = document.createElement('canvas')
      canvas.style.position = 'absolute'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.pointerEvents = 'none'
      canvas.style.zIndex = '1'
      
      container.appendChild(canvas)

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      function setCanvasSize() {
        const rect = container.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }

      function initLogicParticles() {
        particles = []
        for (let i = 0; i < 80; i++) {
          particles.push(new Particle(canvas, theme))
        }
      }

      function animateLogicFlow() {
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles.forEach(particle => {
          particle.update(canvas)
          particle.draw(ctx)
        })
        animationId = requestAnimationFrame(animateLogicFlow)
      }

      setCanvasSize()
      initLogicParticles()
      animateLogicFlow()

      // Handle resize
      const handleResize = () => {
        setCanvasSize()
        initLogicParticles()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(animationId)
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas)
        }
      }
    } else if (animationType === 'question-spiral' || animationType === 'atomic-particles' || animationType === 'breathing-flow' || animationType === 'devanagari-flow' || animationType === 'tattva-evolution') {
      // These are all variations of particle animations with different themes
      const canvas = document.createElement('canvas')
      canvas.style.position = 'absolute'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.pointerEvents = 'none'
      canvas.style.zIndex = '1'
      
      container.appendChild(canvas)

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      function setCanvasSize() {
        const rect = container.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }

      function initCustomParticles() {
        particles = []
        const numParticles = animationType === 'sparkles' ? 60 : 100
        for (let i = 0; i < numParticles; i++) {
          particles.push(new Particle(canvas, theme))
        }
      }

      function animateCustomFlow() {
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles.forEach(particle => {
          particle.update(canvas)
          particle.draw(ctx)
        })
        animationId = requestAnimationFrame(animateCustomFlow)
      }

      setCanvasSize()
      initCustomParticles()
      animateCustomFlow()

      // Handle resize
      const handleResize = () => {
        setCanvasSize()
        initCustomParticles()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(animationId)
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas)
        }
      }
    }
  }, [animationType, theme])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
    </div>
  )
}
