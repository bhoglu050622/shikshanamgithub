'use client'

import { motion } from 'framer-motion'
import { Heart, TrendingUp, Sparkles, Target, Shield, Award, Star, Zap } from 'lucide-react'

const purusharthas = [
  {
    id: 'dharma',
    name: 'Dharma',
    sanskrit: 'धर्म',
    description: 'Righteous Living & Purpose',
    detailedDescription: 'Discover your unique purpose and live in harmony with universal principles. Learn to make ethical choices aligned with your true nature.',
    icon: Shield,
    color: 'from-blue-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20',
    borderColor: 'border-blue-300 dark:border-blue-700',
    iconColor: 'text-blue-600 dark:text-blue-400',
    position: 'top-left'
  },
  {
    id: 'artha',
    name: 'Artha',
    sanskrit: 'अर्थ',
    description: 'Prosperity & Material Success',
    detailedDescription: 'Master the art of creating sustainable wealth and abundance. Learn ancient wisdom for modern success in career and business.',
    icon: TrendingUp,
    color: 'from-green-500 to-green-600',
    gradient: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20',
    borderColor: 'border-green-300 dark:border-green-700',
    iconColor: 'text-green-600 dark:text-green-400',
    position: 'top-right'
  },
  {
    id: 'kama',
    name: 'Kama',
    sanskrit: 'काम',
    description: 'Desire & Fulfillment',
    detailedDescription: 'Understand and channel your desires wisely. Cultivate healthy relationships and experience joy in all aspects of life.',
    icon: Heart,
    color: 'from-pink-500 to-pink-600',
    gradient: 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/20',
    borderColor: 'border-pink-300 dark:border-pink-700',
    iconColor: 'text-pink-600 dark:text-pink-400',
    position: 'bottom-left'
  },
  {
    id: 'moksha',
    name: 'Moksha',
    sanskrit: 'मोक्ष',
    description: 'Liberation & Self-Realization',
    detailedDescription: 'Transcend limitations and discover your highest potential. Experience freedom from suffering and connect with your true self.',
    icon: Sparkles,
    color: 'from-purple-500 to-purple-600',
    gradient: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20',
    borderColor: 'border-purple-300 dark:border-purple-700',
    iconColor: 'text-purple-600 dark:text-purple-400',
    position: 'bottom-right'
  }
]

export default function PurusharhasAnimation() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50 dark:from-deep-indigo-500 dark:to-wisdom-800">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Target className="w-8 h-8 text-saffron-500 mr-3" />
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500">
              The Four Purusharthas
            </h2>
            <Target className="w-8 h-8 text-saffron-500 ml-3" />
          </div>
          <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
            Ancient India's timeless framework for a complete and fulfilling life. Balance these four goals to achieve holistic success and happiness.
          </p>
        </motion.div>

        {/* Purusharthas Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {purusharthas.map((purushartha, index) => (
              <motion.div
                key={purushartha.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <div className={`${purushartha.gradient} border-2 ${purushartha.borderColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden h-full`}>
                  {/* Background Animation */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                      rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${purushartha.color} opacity-10 rounded-full blur-3xl`}
                  />

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ rotate: 360 }}
                    className={`w-20 h-20 bg-gradient-to-br ${purushartha.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative z-10 mx-auto md:mx-0`}
                  >
                    <purushartha.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 text-center md:text-left">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                      className="text-3xl font-bold text-indigo-700 dark:text-soft-gold-500 mb-2"
                    >
                      {purushartha.name}
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                      viewport={{ once: true }}
                      className={`text-2xl font-devanagari ${purushartha.iconColor} mb-3`}
                    >
                      {purushartha.sanskrit}
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                      className="text-lg font-semibold text-indigo-600 dark:text-soft-gold-400 mb-4"
                    >
                      {purushartha.description}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                      viewport={{ once: true }}
                      className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed"
                    >
                      {purushartha.detailedDescription}
                    </motion.p>
                  </div>

                  {/* Decorative Corner Element */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br ${purushartha.color} opacity-20 rounded-full blur-xl`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Integration Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-2xl p-8 max-w-3xl mx-auto border-2 border-saffron-200 dark:border-saffron-800">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-saffron-600 dark:text-saffron-400 mr-2" />
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-soft-gold-500">
                Integrated Approach
              </h3>
              <Star className="w-6 h-6 text-saffron-600 dark:text-saffron-400 ml-2" />
            </div>
            <p className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
              True fulfillment comes from balancing all four Purusharthas. Our courses help you integrate these timeless principles into modern life, creating a path to complete success and inner peace.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6"
            >
              <button className="bg-gradient-to-r from-saffron-600 to-deep-teal-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Start Your Journey</span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Connecting Lines Animation (Desktop Only) */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full max-h-96 pointer-events-none">
          <svg className="w-full h-full opacity-20" viewBox="0 0 800 400">
            <motion.line
              x1="200" y1="100" x2="600" y2="100"
              stroke="currentColor"
              strokeWidth="2"
              className="text-saffron-500"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.line
              x1="200" y1="300" x2="600" y2="300"
              stroke="currentColor"
              strokeWidth="2"
              className="text-deep-teal-500"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.line
              x1="200" y1="100" x2="200" y2="300"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-500"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
            />
            <motion.line
              x1="600" y1="100" x2="600" y2="300"
              stroke="currentColor"
              strokeWidth="2"
              className="text-purple-500"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
            />
            <motion.circle
              cx="400" cy="200" r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-saffron-500"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1, delay: 2 }}
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

