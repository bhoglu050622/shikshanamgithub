'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Headphones, Users, Gift } from 'lucide-react'

const bonuses = [
  {
    id: 1,
    title: 'Grammar Masterclass',
    subtitle: 'व्याकरण मास्टरक्लास',
    description: 'Special classes for deep understanding of Sanskrit grammar',
    icon: BookOpen,
    value: '₹1,999',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
  },
  {
    id: 2,
    title: 'Shloka Recordings',
    subtitle: 'श्लोक रिकॉर्डिंग',
    description: 'Audio recordings of famous shlokas with pronunciation guide',
    icon: Headphones,
    value: '₹1,499',
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
  },
  {
    id: 3,
    title: 'Exclusive Community',
    subtitle: 'एक्सक्लूसिव कम्युनिटी',
    description: 'Connect with fellow Sanskrit learners and keep learning',
    icon: Users,
    value: '₹999',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
  }
]

export default function BonusesGrid() {
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
          Free Bonuses
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          All these bonuses are included free with the package deal
        </motion.p>
      </div>

      {/* Bonuses Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {bonuses.map((bonus, index) => (
          <motion.div
            key={bonus.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-wisdom-800 dark:to-wisdom-700">
              <CardContent className="p-6 space-y-4 relative overflow-hidden">
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${bonus.bgColor} opacity-50`} />
                
                {/* FREE Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                  className="absolute top-4 right-4 z-10"
                >
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 text-xs font-bold shadow-lg">
                    <Gift className="w-3 h-3 mr-1" />
                    FREE
                  </Badge>
                </motion.div>

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${bonus.color} flex items-center justify-center shadow-lg relative z-10`}
                >
                  <bonus.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="space-y-3 relative z-10">
                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-xl font-semibold text-indigo-900 dark:text-wisdom-50"
                  >
                    {bonus.title}
                  </motion.h3>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="text-sm text-indigo-600 dark:text-wisdom-400 italic font-devanagari"
                  >
                    {bonus.subtitle}
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                    className="text-indigo-700 dark:text-wisdom-200 text-sm leading-relaxed"
                  >
                    {bonus.description}
                  </motion.p>

                  {/* Value */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                    className="flex items-center justify-between pt-2"
                  >
                    <span className="text-lg font-bold text-indigo-900 dark:text-wisdom-50">
                      {bonus.value}
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Free
                    </span>
                  </motion.div>
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

      {/* Total Value */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <Card className="border-2 border-saffron-200 dark:border-saffron-800 bg-gradient-to-r from-saffron-50 to-saffron-100 dark:from-saffron-900/20 dark:to-saffron-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-4">
              <Gift className="w-8 h-8 text-saffron-600 dark:text-saffron-400" />
              <div>
                <p className="text-lg font-semibold text-indigo-900 dark:text-wisdom-50">
                  Total Bonus Value: ₹4,497
                </p>
                <p className="text-sm text-indigo-600 dark:text-wisdom-400">
                  Completely free with package deal
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Updates Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0 }}
        className="text-center"
      >
        <p className="text-sm text-indigo-600 dark:text-wisdom-400">
          <strong>Note:</strong> Regular updates included. New content and features are added regularly.
        </p>
      </motion.div>
    </div>
  )
}
