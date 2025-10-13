'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, UserCheck, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PersonalityTestPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const personalityTests = [
    {
      id: 'guna-profiler',
      title: 'Guna Profiler',
      description: 'Discover your dominant personality traits based on the ancient wisdom of the three Gunas',
      href: '/guna-profiler',
      icon: UserCheck,
      features: ['Sattva, Rajas, Tamas analysis', 'Personalized recommendations', 'Ancient wisdom insights'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'shiva-alignment',
      title: 'How Aligned Are You?',
      description: 'A spiritual mirror reflecting your inner state and alignment with consciousness',
      href: '/how-aligned-are-you',
      icon: Sparkles,
      features: ['Spiritual alignment assessment', 'Consciousness level analysis', 'Sacred path guidance'],
      color: 'from-amber-500 to-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Personality Tests
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover your inner nature through ancient wisdom and modern insights. 
            Choose the test that resonates with your spiritual journey.
          </p>
        </motion.div>

        {/* Test Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {personalityTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <Link href={test.href} className="block">
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${test.color} opacity-10 rounded-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${test.color} mb-6`}>
                      <test.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                      {test.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {test.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8">
                      {test.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center text-yellow-400 font-semibold group-hover:text-yellow-300 transition-colors duration-300">
                      <span>Take the Test</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">About Our Personality Tests</h3>
            <p className="text-gray-300 leading-relaxed">
              Our personality assessments are rooted in ancient Vedic wisdom and modern psychological insights. 
              Each test provides a unique perspective on your inner nature, helping you understand your strengths, 
              challenges, and spiritual path. All data is stored locally on your device for your privacy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

