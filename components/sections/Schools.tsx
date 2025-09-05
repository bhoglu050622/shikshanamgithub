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
    color: 'from-golden-olive to-golden-olive/90',
    hoverColor: 'from-golden-olive/90 to-golden-olive/80',
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
    color: 'from-deep-maroon to-deep-maroon/90',
    hoverColor: 'from-deep-maroon/90 to-deep-maroon/80',
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
    color: 'from-copper-orange to-copper-orange/90',
    hoverColor: 'from-copper-orange/90 to-copper-orange/80',
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
    <section id="schools" className="section-padding bg-sand-beige">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark-olive mb-6">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-golden-olive to-deep-maroon bg-clip-text text-transparent">
              Path of Knowledge
            </span>
          </h2>
          <p className="text-xl text-deep-maroon max-w-3xl mx-auto">
            Each school offers a unique path to knowledge and self-realization. Find the one that resonates with your soul.
          </p>
        </motion.div>

        {/* Schools Horizontal Timeline Layout */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-golden-olive to-deep-maroon rounded-full" />
              
              {schools.map((school, index) => (
                <motion.div
                  key={school.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start mb-16 last:mb-0"
                >
                  {/* Timeline Dot */}
                  <motion.div 
                    className="absolute left-6 w-6 h-6 bg-gradient-to-r from-golden-olive to-deep-maroon rounded-full border-4 border-sand-beige z-10 shadow-lg"
                    whileInView={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  />
                  
                  {/* School Card */}
                  <div className="ml-20 flex-1">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="group cursor-pointer relative overflow-hidden"
                    >
                      <Link href={school.href}>
                        <div className={`bg-gradient-to-br ${school.color} hover:${school.hoverColor} rounded-3xl p-8 text-white transition-all duration-500 shadow-xl hover:shadow-2xl relative overflow-hidden`}>
                          {/* Background Pattern */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-start space-x-6">
                              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                  {school.emoji}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-3">
                                  <h3 className="text-2xl font-bold text-white">
                                    {school.title}
                                  </h3>
                                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                                    {school.subtitle}
                                  </span>
                                </div>
                                <p className="text-white/90 mb-4 leading-relaxed">
                                  {school.description}
                                </p>
                                
                                {/* Features */}
                                <div className="mb-4">
                                  <h4 className="text-sm font-semibold text-white mb-2">
                                    What you'll learn:
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {school.features.map((feature, featureIndex) => (
                                      <span key={featureIndex} className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                
                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-white/10 rounded-2xl">
                                  <div className="text-center">
                                    <div className="text-lg font-bold text-white">{school.stats.students}</div>
                                    <div className="text-xs text-white/80">Students</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-lg font-bold text-white">{school.stats.courses}</div>
                                    <div className="text-xs text-white/80">Courses</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-lg font-bold text-white">{school.stats.teachers}</div>
                                    <div className="text-xs text-white/80">Teachers</div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2 text-white font-medium group-hover:text-white/90 transition-colors">
                                  <span>{school.cta}</span>
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {schools.map((school, index) => (
              <motion.div
                key={school.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${school.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <div className="text-2xl">
                      {school.emoji}
                    </div>
                  </div>
                  {index < schools.length - 1 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-golden-olive to-deep-maroon mt-4"></div>
                  )}
                </div>
                <div className="flex-1">
                  <Link href={school.href}>
                    <div className={`bg-gradient-to-br ${school.color} hover:${school.hoverColor} rounded-3xl p-6 text-white transition-all duration-500 shadow-xl hover:shadow-2xl`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {school.title}
                        </h3>
                        <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {school.subtitle}
                        </span>
                      </div>
                      <p className="text-white/90 mb-4 text-sm leading-relaxed">
                        {school.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {school.features.slice(0, 2).map((feature, featureIndex) => (
                          <span key={featureIndex} className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 text-white text-sm font-medium">
                        <span>{school.cta}</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-parchment-ivory rounded-3xl p-8 shadow-xl max-w-2xl mx-auto border border-temple-gold/20">
            <h3 className="font-display text-2xl font-bold text-dark-olive mb-4">
              Want to explore all schools?
            </h3>
            <p className="text-deep-maroon mb-6">
              Get a comprehensive overview of all three schools and find your perfect learning path.
            </p>
            <Link href="/schools">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-shikshanam-primary px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
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
