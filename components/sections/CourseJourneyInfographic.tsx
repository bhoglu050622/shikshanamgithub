'use client'

import { motion } from 'framer-motion'
import { Target, BookOpen, Zap, Heart, TrendingUp, ArrowRight } from 'lucide-react'

export default function CourseJourneyInfographic() {
  const steps = [
    {
      step: 1,
      title: "Personality Test",
      description: "Discover your strengths & growth areas",
      icon: Target,
      color: "from-saffron-500 to-saffron-600"
    },
    {
      step: 2,
      title: "Theory Class",
      description: "Clear concepts with living examples",
      icon: BookOpen,
      color: "from-peacock-green-500 to-peacock-green-600"
    },
    {
      step: 3,
      title: "Practical Class",
      description: "Guided activities for real-life application",
      icon: Zap,
      color: "from-lotus-pink-500 to-lotus-pink-600"
    },
    {
      step: 4,
      title: "Activities",
      description: "Daily/weekly practices you can actually stick to",
      icon: Heart,
      color: "from-deep-teal-500 to-deep-teal-600"
    },
    {
      step: 5,
      title: "Transformation Report",
      description: "Track progress with measurable changes",
      icon: TrendingUp,
      color: "from-indigo-500 to-indigo-600"
    }
  ]

  return (
    <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
            How These Courses Work
          </h2>
          <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
            A structured 5-step journey from self-discovery to measurable transformation
          </p>
        </motion.div>

        {/* Desktop - Horizontal Flow */}
        <div className="hidden lg:block">
          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-saffron-200 via-peacock-green-200 via-lotus-pink-200 via-deep-teal-200 to-indigo-200 dark:from-saffron-800 dark:via-peacock-green-800 dark:via-lotus-pink-800 dark:via-deep-teal-800 dark:to-indigo-800"></div>
            
            <div className="grid grid-cols-5 gap-4 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="bg-white dark:bg-wisdom-800 rounded-2xl p-6 shadow-lg border border-wisdom-200 dark:border-wisdom-700 hover:shadow-xl transition-all duration-300">
                      {/* Step Number Circle */}
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-saffron-500 to-deep-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {step.step}
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mx-auto mb-4 mt-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="font-bold text-lg text-indigo-700 dark:text-soft-gold-500 mb-2 text-center">
                        {step.title}
                      </h3>
                      <p className="text-sm text-wisdom-600 dark:text-wisdom-400 text-center leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Arrow between steps */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-16 -right-2 transform translate-x-1/2 z-20">
                        <ArrowRight className="w-6 h-6 text-saffron-500" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tablet - 2x3 Grid */}
        <div className="hidden md:block lg:hidden">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-wisdom-800 rounded-2xl p-6 shadow-lg border border-wisdom-200 dark:border-wisdom-700">
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-saffron-500 to-deep-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {step.step}
                    </div>
                    
                    <div className="flex items-start space-x-4 mt-2">
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-indigo-700 dark:text-soft-gold-500 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile - Vertical Stack */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-start space-x-4">
                  {/* Step Number & Icon */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-saffron-500 to-deep-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white dark:bg-wisdom-800 rounded-xl p-4 shadow-lg border border-wisdom-200 dark:border-wisdom-700">
                    <h3 className="font-bold text-lg text-indigo-700 dark:text-soft-gold-500 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Arrow down */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-saffron-500 to-deep-teal-500"></div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

