'use client'

import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Heart, ArrowRight, Users, Star, Clock } from 'lucide-react'
import Link from 'next/link'

const schools = [
  {
    title: 'Sanskrit',
    subtitle: 'Ancient Manuscript',
    description: 'Master the ancient language that holds the key to Vedic wisdom, classical literature, and spiritual texts.',
    icon: BookOpen,
    emoji: '📜',
    color: 'from-saffron-500 to-saffron-600',
    hoverColor: 'from-saffron-600 to-saffron-700',
    href: '/schools/sanskrit',
    features: [
      'Grammar & Literature',
      'Vedic Texts',
      'Classical Poetry',
      'Scripture Study'
    ],
    stats: {
      students: '1,200+',
      courses: '25+',
      teachers: '15+'
    },
    cta: 'Join Sanskrit School'
  },
  {
    title: 'Darshan',
    subtitle: 'Temple Meditation',
    description: 'Explore the six classical schools of Indian philosophy and discover the nature of reality, consciousness, and existence.',
    icon: Lightbulb,
    emoji: '🕉',
    color: 'from-deep-teal-500 to-deep-teal-600',
    hoverColor: 'from-deep-teal-600 to-deep-teal-700',
    href: '/schools/darshana',
    features: [
      'Vedanta',
      'Yoga Philosophy',
      'Nyaya & Vaisheshika',
      'Samkhya & Mimamsa'
    ],
    stats: {
      students: '800+',
      courses: '18+',
      teachers: '12+'
    },
    cta: 'Join Darshan School'
  },
  {
    title: 'Self-help',
    subtitle: 'Lotus & Sunrise',
    description: 'Discover practical wisdom from ancient texts to transform your life, relationships, and personal growth.',
    icon: Heart,
    emoji: '🌱',
    color: 'from-indigo-500 to-indigo-600',
    hoverColor: 'from-indigo-600 to-indigo-700',
    href: '/schools/self-help',
    features: [
      'Life Management',
      'Relationship Wisdom',
      'Stress & Anxiety',
      'Purpose & Meaning'
    ],
    stats: {
      students: '2,000+',
      courses: '30+',
      teachers: '20+'
    },
    cta: 'Join Self-help School'
  }
]

export default function Schools() {
  return (
    <section id="schools" className="section-padding bg-gradient-to-br from-sand-50 to-sand-100">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-700 mb-6">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-saffron-600 to-deep-teal-600 bg-clip-text text-transparent">
              Path of Knowledge
            </span>
          </h2>
          <p className="text-xl text-indigo-600 max-w-3xl mx-auto">
            Each school offers a unique path to knowledge and self-realization. Find the one that resonates with your soul.
          </p>
        </motion.div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {schools.map((school, index) => (
            <motion.div
              key={school.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -8, rotateX: 5, rotateY: 5 }}
              className="group cursor-pointer perspective-1000"
            >
              <Link href={school.href}>
                <div className={`bg-gradient-to-br ${school.color} hover:${school.hoverColor} rounded-3xl p-8 text-white transition-all duration-500 shadow-xl hover:shadow-2xl h-full flex flex-col transform-gpu group-hover:rotate-x-2 group-hover:rotate-y-2`}>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {school.emoji}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{school.title}</h3>
                  <p className="text-white/90 font-medium">{school.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-white mb-6 text-center leading-relaxed">
                  {school.description}
                </p>

                {/* Features */}
                <div className="mb-6 flex-1">
                  <h4 className="font-semibold mb-3 text-white">What you'll learn:</h4>
                  <ul className="space-y-2">
                    {school.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-white"
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-3 bg-white/10 rounded-2xl">
                  <div className="text-center">
                    <div className="text-lg font-bold">{school.stats.students}</div>
                    <div className="text-xs text-white">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{school.stats.courses}</div>
                    <div className="text-xs text-white">Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{school.stats.teachers}</div>
                    <div className="text-xs text-white">Teachers</div>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white/20 hover:bg-white/30 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group-hover:bg-white/25"
                >
                  <span>{school.cta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-indigo-700 mb-4">
              Want to explore all schools?
            </h3>
            <p className="text-indigo-600 mb-6">
              Get a comprehensive overview of all three schools and find your perfect learning path.
            </p>
            <Link href="/schools">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-saffron-600 to-deep-teal-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Explore All Schools
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
