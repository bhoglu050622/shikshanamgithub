'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, MessageCircle, Award, Users } from 'lucide-react'

const outcomes = [
  {
    icon: BookOpen,
    title: 'Read & Write Sanskrit',
    subtitle: 'संस्कृत पढ़ना-लिखना',
    description: 'You will be able to read and write Sanskrit in Devanagari script',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
  },
  {
    icon: MessageCircle,
    title: 'Conversation in Sanskrit',
    subtitle: 'संस्कृत में बातचीत',
    description: 'You will be able to use Sanskrit in daily sentences',
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
  },
  {
    icon: Award,
    title: 'Understand Shlokas',
    subtitle: 'श्लोक समझना',
    description: 'You will understand the meaning and pronunciation of famous shlokas',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
  },
  {
    icon: Users,
    title: 'Cultural Connection',
    subtitle: 'संस्कृति से जुड़ाव',
    description: 'You will feel a deep connection with Indian culture and tradition',
    color: 'from-saffron-500 to-saffron-600',
    bgColor: 'from-saffron-50 to-saffron-100 dark:from-saffron-900/20 dark:to-saffron-800/20'
  }
]

export default function Outcomes() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display text-indigo-900 dark:text-wisdom-50"
        >
          After Course Completion
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          You will be able to do all these things
        </motion.p>
      </div>

      {/* Outcomes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {outcomes.map((outcome, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-6 text-center space-y-4 relative overflow-hidden">
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${outcome.bgColor} opacity-50`} />
                
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${outcome.color} flex items-center justify-center shadow-lg relative z-10`}
                >
                  <outcome.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="space-y-3 relative z-10">
                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="text-lg font-semibold text-indigo-900 dark:text-wisdom-50"
                  >
                    {outcome.title}
                  </motion.h3>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-sm text-indigo-600 dark:text-wisdom-400 italic font-devanagari"
                  >
                    {outcome.subtitle}
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="text-indigo-700 dark:text-wisdom-200 text-sm leading-relaxed"
                  >
                    {outcome.description}
                  </motion.p>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-saffron-500/10 to-saffron-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  initial={false}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-indigo-900 dark:text-wisdom-50">
                Additional Benefits
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-saffron-600 dark:text-saffron-400 mb-2">
                    95%
                  </div>
                  <p className="text-sm text-indigo-700 dark:text-wisdom-200">
                    Success Rate
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-saffron-600 dark:text-saffron-400 mb-2">
                    24/7
                  </div>
                  <p className="text-sm text-indigo-700 dark:text-wisdom-200">
                    Support Available
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-saffron-600 dark:text-saffron-400 mb-2">
                    100%
                  </div>
                  <p className="text-sm text-indigo-700 dark:text-wisdom-200">
                    Satisfaction Guarantee
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
