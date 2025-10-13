'use client'

import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Lightbulb, Heart, Brain, Star, Sparkles } from 'lucide-react'
import Image from 'next/image'

const journeySteps = [
  {
    id: 1,
    title: "The Question",
    description: "Maya feels lost in life. She wonders: What is my purpose? Why do I suffer? Is there more to existence than just daily routines?",
    icon: Lightbulb,
    color: "from-blue-500 to-blue-600",
    image: "/images/maya-journey/question.jpg", // Placeholder - will use AI-generated later
    position: "left"
  },
  {
    id: 2,
    title: "The Discovery",
    description: "A friend recommends exploring Indian philosophy. Maya discovers the six Darshanas - ancient schools of thought offering different perspectives on life's big questions.",
    icon: Star,
    color: "from-purple-500 to-purple-600",
    image: "/images/maya-journey/discovery.jpg",
    position: "right"
  },
  {
    id: 3,
    title: "The Learning",
    description: "Maya starts with Nyāya to sharpen her thinking, then Sāṅkhya to understand her emotions. Each Darshana reveals a new dimension of wisdom.",
    icon: Brain,
    color: "from-teal-500 to-teal-600",
    image: "/images/maya-journey/learning.jpg",
    position: "left"
  },
  {
    id: 4,
    title: "The Transformation",
    description: "Through Yoga practices and Vedanta wisdom, Maya finds clarity, peace, and purpose. She now lives with intention, understanding both herself and the world.",
    icon: Heart,
    color: "from-saffron-500 to-saffron-600",
    image: "/images/maya-journey/transformation.jpg",
    position: "right"
  }
]

export default function MayasJourney() {
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
            <Sparkles className="w-8 h-8 text-saffron-500 mr-3" />
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500">
              Follow Maya's Journey
            </h2>
            <Sparkles className="w-8 h-8 text-saffron-500 ml-3" />
          </div>
          <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
            See how one person's search for meaning led to profound transformation through the wisdom of Darshanas
          </p>
        </motion.div>

        {/* Journey Timeline */}
        <div className="max-w-6xl mx-auto relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-saffron-500 transform -translate-x-1/2 opacity-30" />

          {/* Journey Steps */}
          <div className="space-y-24">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  step.position === 'right' ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className="flex-1 lg:pr-12">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="card-premium p-8 relative overflow-hidden"
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5`} />
                    
                    {/* Step Number */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                      viewport={{ once: true }}
                      className={`absolute -top-4 ${
                        step.position === 'left' ? '-right-4' : '-left-4'
                      } w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white font-bold text-lg">{step.id}</span>
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                      className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-indigo-700 dark:text-soft-gold-500 mb-4">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Image Side */}
                <div className="flex-1 lg:pl-12">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full aspect-square max-w-md mx-auto"
                  >
                    {/* Placeholder for AI-generated image */}
                    <div className={`w-full h-full bg-gradient-to-br ${step.color} rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden relative`}>
                      {/* Temporary placeholder - replace with actual AI-generated images */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      <step.icon className="w-32 h-32 text-white/40" />
                      <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm rounded-xl p-3">
                        <p className="text-white text-sm font-semibold text-center">
                          Step {step.id}: {step.title}
                        </p>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`absolute -z-10 inset-0 bg-gradient-to-br ${step.color} rounded-3xl blur-2xl`}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-indigo-700 dark:text-soft-gold-500 mb-4">
              Start Your Own Journey
            </h3>
            <p className="text-wisdom-600 dark:text-wisdom-400 mb-6">
              Like Maya, you too can discover profound insights through the six Darshanas. Choose your path and begin your transformation today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('darshana-nyaya')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-gradient-to-r from-saffron-600 to-deep-teal-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
            >
              <span>Explore the Six Darshanas</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

