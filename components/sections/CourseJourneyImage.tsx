'use client'

import { motion } from 'framer-motion'
import { Target, BookOpen, Zap, Heart, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react'

const journeySteps = [
  {
    step: 0,
    title: "Personality Test",
    description: "Discover your strengths & growth areas",
    icon: Target,
    color: "from-saffron-500 to-saffron-600",
    bgColor: "bg-saffron-100 dark:bg-saffron-900/30"
  },
  {
    step: 1,
    title: "Theory Class",
    description: "Clear concepts with living examples",
    icon: BookOpen,
    color: "from-peacock-green-500 to-peacock-green-600",
    bgColor: "bg-peacock-green-100 dark:bg-peacock-green-900/30"
  },
  {
    step: 2,
    title: "Practical Class",
    description: "Guided activities for real-life application",
    icon: Zap,
    color: "from-lotus-pink-500 to-lotus-pink-600",
    bgColor: "bg-lotus-pink-100 dark:bg-lotus-pink-900/30"
  },
  {
    step: 3,
    title: "Activities",
    description: "Daily/weekly practices you can actually stick to",
    icon: Heart,
    color: "from-deep-teal-500 to-deep-teal-600",
    bgColor: "bg-deep-teal-100 dark:bg-deep-teal-900/30"
  },
  {
    step: 4,
    title: "Transformation Report",
    description: "Track progress with measurable changes",
    icon: TrendingUp,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30"
  }
]

export default function CourseJourneyImage() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50 dark:from-deep-indigo-500 dark:to-wisdom-800">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
            How It Works
          </h2>
          <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
            A structured 5-step journey designed for lasting transformation
          </p>
        </motion.div>

        {/* Journey Diagram */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop: Horizontal Flow */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-saffron-500 via-peacock-green-500 to-indigo-500 transform -translate-y-1/2 opacity-30" />
              
              {/* Steps */}
              <div className="flex items-center justify-between relative z-10">
                {journeySteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center max-w-xs"
                  >
                    {/* Step Number Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                      viewport={{ once: true }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg relative`}
                    >
                      {step.step + 1}
                      {index < journeySteps.length - 1 && (
                        <ArrowRight className="absolute -right-12 w-8 h-8 text-gray-400" />
                      )}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                      viewport={{ once: true }}
                      className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center mb-4 shadow-md`}
                    >
                      <step.icon className={`w-10 h-10 text-gradient-${step.step}`} style={{
                        background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }} />
                    </motion.div>

                    {/* Title & Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <h3 className="text-lg font-bold text-indigo-700 dark:text-soft-gold-500 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical Flow */}
          <div className="lg:hidden space-y-8">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-start space-x-4">
                  {/* Step Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0`}
                  >
                    {step.step + 1}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 bg-white dark:bg-wisdom-800 rounded-2xl p-6 shadow-md">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-indigo-700 dark:text-soft-gold-500">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < journeySteps.length - 1 && (
                  <div className="ml-6 my-2 h-8 w-1 bg-gradient-to-b from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-saffron-100 to-indigo-100 dark:from-saffron-900/30 dark:to-indigo-900/30 rounded-2xl p-8 max-w-3xl mx-auto border-2 border-saffron-200 dark:border-saffron-800">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-soft-gold-500">
                Proven Framework
              </h3>
            </div>
            <p className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed mb-4">
              This structured approach has helped thousands of students achieve lasting personal transformation. 
              Each step builds upon the previous one, ensuring sustainable growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white dark:bg-wisdom-700 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-wisdom-700 dark:text-wisdom-300">Personalized</span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-wisdom-700 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-wisdom-700 dark:text-wisdom-300">Practical</span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-wisdom-700 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-wisdom-700 dark:text-wisdom-300">Measurable</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

