'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Users, BookOpen, Award, Globe, Clock, Star, Heart, Target } from 'lucide-react'

const stats = [
  {
    number: 50000,
    label: 'Learners Enrolled',
    icon: Users,
    color: 'from-golden-olive to-golden-olive/90',
    suffix: '+'
  },
  {
    number: 120,
    label: 'Courses Offered',
    icon: BookOpen,
    color: 'from-deep-maroon to-deep-maroon/90',
    suffix: '+'
  },
  {
    number: 25,
    label: 'Global Reach',
    icon: Globe,
    color: 'from-copper-orange to-copper-orange/90',
    suffix: '+ Countries'
  },
  {
    number: 1000000,
    label: 'Hours of Learning',
    icon: Clock,
    color: 'from-temple-gold to-temple-gold/90',
    suffix: '+'
  }
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Numbers() {
  return (
    <section id="numbers" className="section-padding bg-sand-beige relative overflow-hidden">
      {/* Background Elements - Diya Lights & Conch Shells */}
      <div className="absolute inset-0 -z-10">
        {/* Moving Diya Lights */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-gradient-to-br from-golden-olive/60 to-golden-olive/80 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-br from-deep-maroon/60 to-deep-maroon/80 rounded-full animate-float opacity-50 animation-delay-1000"></div>
        <div className="absolute top-60 left-1/4 w-7 h-7 bg-gradient-to-br from-copper-orange/60 to-copper-orange/80 rounded-full animate-float opacity-55 animation-delay-2000"></div>
        <div className="absolute top-80 right-1/3 w-5 h-5 bg-gradient-to-br from-temple-gold/60 to-temple-gold/80 rounded-full animate-float opacity-40 animation-delay-3000"></div>
        <div className="absolute bottom-40 left-20 w-9 h-9 bg-gradient-to-br from-deep-indigo/60 to-deep-indigo/80 rounded-full animate-float opacity-45 animation-delay-4000"></div>
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-gradient-to-br from-sand-beige/60 to-sand-beige/80 rounded-full animate-float opacity-35 animation-delay-5000"></div>
        
        {/* Conch Shells */}
        <div className="absolute top-32 right-1/4 w-12 h-12 bg-gradient-to-br from-sand-beige/60 to-sand-beige/80 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-32 left-1/3 w-10 h-10 bg-gradient-to-br from-sand-beige/40 to-sand-beige/60 rounded-full animate-pulse opacity-25 animation-delay-2000"></div>
        
        {/* Gradient overlays */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-golden-olive/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-deep-maroon/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-dark-olive mb-6">
            Our Journey in{' '}
            <span className="bg-gradient-to-r from-golden-olive to-deep-maroon bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>
          <p className="text-xl text-deep-maroon max-w-3xl mx-auto">
            Numbers that tell the story of our commitment to preserving and sharing ancient Indian wisdom with the world.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group cursor-pointer"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              <div className="text-dark-olive mb-2">
                <AnimatedCounter value={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-sand-beige font-medium text-sm leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-parchment-ivory rounded-3xl p-8 shadow-xl max-w-4xl mx-auto border border-temple-gold/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-golden-olive to-golden-olive/90 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-olive mb-2">Community Growth</h3>
                <p className="text-deep-maroon text-sm">
                  Our community grows by 500+ new members every month, creating a vibrant ecosystem of learners.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-deep-maroon to-deep-maroon/90 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-olive mb-2">Success Rate</h3>
                <p className="text-deep-maroon text-sm">
                  95% of our students complete their courses and report significant personal growth.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-copper-orange to-copper-orange/90 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-olive mb-2">Global Reach</h3>
                <p className="text-deep-maroon text-sm">
                  Students from 25+ countries are learning ancient Indian wisdom through our platform.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-deep-maroon to-copper-orange rounded-3xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-bold mb-4">
              Be Part of Our Growing Community
            </h3>
            <p className="text-white/90 mb-6">
              Join thousands of learners who are already transforming their lives through ancient wisdom.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-parchment-ivory text-deep-maroon px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Join Shikshanam Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
