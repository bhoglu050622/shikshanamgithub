'use client'

import { motion } from 'framer-motion'
import { BookOpen, Heart, Users, Globe, ArrowRight, Star, Award, Target, Lightbulb, Shield } from 'lucide-react'

const contributionOptions = [
  {
    title: 'Through Knowledge',
    subtitle: 'Contribute Content / Become a Teacher',
    description: 'Share your wisdom and help preserve ancient knowledge for future generations.',
    icon: BookOpen,
    color: 'from-saffron-500 to-saffron-600',
    hoverColor: 'from-saffron-600 to-saffron-700',
    features: [
      'Contribute original content and research',
      'Share traditional knowledge and practices',
      'Help translate ancient texts',
      'Create educational materials'
    ],
    ctaButtons: [
      {
        text: 'Contribute Content',
        icon: BookOpen,
        color: 'bg-saffron-500 hover:bg-saffron-600'
      },
      {
        text: 'Become a Teacher',
        icon: Users,
        color: 'bg-turquoise-500 hover:bg-turquoise-600'
      }
    ],
    stats: {
      contributors: '150+',
      content: '500+',
      languages: '8'
    }
  },
  {
    title: 'Through Support',
    subtitle: 'Choose a Project / Become a Patron',
    description: 'Help us preserve and share ancient wisdom by supporting our various initiatives and projects.',
    icon: Heart,
    color: 'from-turquoise-500 to-turquoise-600',
    hoverColor: 'from-turquoise-600 to-turquoise-700',
    features: [
      'Fund Sanskrit manuscript preservation',
      'Support teacher training programs',
      'Help develop mobile learning apps',
      'Contribute to scholarship programs'
    ],
    ctaButtons: [
      {
        text: 'Choose a Project',
        icon: Target,
        color: 'bg-turquoise-500 hover:bg-turquoise-600'
      },
      {
        text: 'Become a Patron',
        icon: Star,
        color: 'bg-saffron-500 hover:bg-saffron-600'
      }
    ],
    stats: {
      projects: '25+',
      funded: '₹50L+',
      supporters: '2000+'
    }
  }
]

const currentProjects = [
  {
    title: 'Sanskrit Manuscript Digitization',
    description: 'Preserving ancient texts through modern technology',
    progress: 75,
    target: '₹10L',
    raised: '₹7.5L',
    daysLeft: 15,
    category: 'Preservation'
  },
  {
    title: 'Rural Teacher Training',
    description: 'Empowering teachers in remote areas with traditional knowledge',
    progress: 45,
    target: '₹5L',
    raised: '₹2.25L',
    daysLeft: 30,
    category: 'Education'
  },
  {
    title: 'Mobile Learning App',
    description: 'Making ancient wisdom accessible on mobile devices',
    progress: 90,
    target: '₹8L',
    raised: '₹7.2L',
    daysLeft: 8,
    category: 'Technology'
  }
]

export default function Contribute() {
  return (
    <section id="contribute" className="section-padding bg-gradient-to-br from-white to-saffron-50 relative overflow-hidden">
      {/* Background Animation - 3D Donation Box & Pen Writing */}
      <div className="absolute inset-0 -z-10">
        {/* 3D Donation Box Animation */}
        <div className="absolute top-20 right-20 opacity-20">
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-20 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-lg shadow-lg relative"
          >
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-saffron-700 rounded-full"></div>
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-saffron-800 rounded-full"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-14 h-1 bg-saffron-800 rounded-full"></div>
          </motion.div>
        </div>
        
        {/* Pen Writing Animation */}
        <div className="absolute top-40 left-20 opacity-15">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              x: [0, 20, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full relative"
          >
            <div className="absolute -top-2 left-0 w-1 h-4 bg-indigo-600 rounded-full"></div>
            <div className="absolute -top-1 left-1 w-1 h-2 bg-indigo-500 rounded-full"></div>
          </motion.div>
        </div>
        
        {/* Floating Mantra Text */}
        <div className="absolute bottom-20 right-20 opacity-10">
          <motion.div
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-2xl font-display text-saffron-600"
          >
            दानं परमं धर्मः
          </motion.div>
        </div>
        
        {/* Subtle gradient overlays */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-saffron-100/30 to-turquoise-100/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-turquoise-100/30 to-saffron-100/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-wisdom-900 mb-6">
            Be Part of the{' '}
            <span className="bg-gradient-to-r from-saffron-600 to-turquoise-600 bg-clip-text text-transparent">
              Shikshanam Movement
            </span>
          </h2>
          <p className="text-xl text-wisdom-700 max-w-3xl mx-auto">
            Be part of this movement — share knowledge, support a project, or guide as a Guru.
          </p>
        </motion.div>

        {/* Contribution Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          {contributionOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${option.color} hover:${option.hoverColor} rounded-3xl p-8 text-white transition-all duration-300 shadow-xl hover:shadow-2xl h-full`}>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <option.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
                  <p className="text-white font-medium mb-4">{option.subtitle}</p>
                  <p className="text-white leading-relaxed">{option.description}</p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-white">What you can do:</h4>
                  <ul className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
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
                  {Object.entries(option.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold">{value}</div>
                      <div className="text-xs text-white capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  {option.ctaButtons.map((button, buttonIndex) => (
                    <motion.button
                      key={button.text}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full ${button.color} text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg`}
                    >
                      <button.icon className="w-5 h-5" />
                      <span>{button.text}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-serif text-2xl font-bold text-wisdom-900 text-center mb-8">
            Current Projects You Can Support
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-saffron-600 bg-saffron-50 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-xs text-wisdom-500">{project.daysLeft} days left</span>
                </div>
                
                <h4 className="font-bold text-wisdom-900 mb-2 text-lg">{project.title}</h4>
                <p className="text-wisdom-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-wisdom-600">Progress</span>
                    <span className="text-wisdom-900 font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-saffron-500 to-turquoise-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Funding Info */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-xs text-wisdom-500">Raised</div>
                    <div className="font-bold text-wisdom-900">{project.raised}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-wisdom-500">Target</div>
                    <div className="font-bold text-wisdom-900">{project.target}</div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-saffron-600 to-saffron-700 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Support This Project
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-saffron-600 to-turquoise-600 rounded-3xl p-8 text-white max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-bold mb-4">
              Every Contribution Makes a Difference
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Whether you share knowledge, become a teacher, or support our projects financially, you're helping preserve ancient wisdom for future generations.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-saffron-700 px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Explore All Ways to Contribute
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
