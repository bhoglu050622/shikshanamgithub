'use client'

import { motion } from 'framer-motion'
import { Heart, TrendingUp, Scale, Sparkles } from 'lucide-react'

export default function PurusarthasInfographic() {
  const purusharthas = [
    {
      name: 'Dharma',
      sanskrit: 'धर्म',
      description: 'Righteousness & Duty',
      icon: Scale,
      color: 'from-indigo-500 to-indigo-600',
      position: 'top'
    },
    {
      name: 'Artha',
      sanskrit: 'अर्थ',
      description: 'Wealth & Prosperity',
      icon: TrendingUp,
      color: 'from-saffron-500 to-saffron-600',
      position: 'left'
    },
    {
      name: 'Kama',
      sanskrit: 'काम',
      description: 'Desire & Fulfillment',
      icon: Heart,
      color: 'from-lotus-pink-500 to-lotus-pink-600',
      position: 'right'
    },
    {
      name: 'Moksha',
      sanskrit: 'मोक्ष',
      description: 'Liberation & Enlightenment',
      icon: Sparkles,
      color: 'from-deep-teal-500 to-deep-teal-600',
      position: 'bottom'
    }
  ]

  return (
    <section className="py-12 bg-gradient-to-br from-saffron-50/30 to-deep-teal-50/30 dark:from-saffron-900/10 dark:to-deep-teal-900/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
            The Four Purusharthas
          </h3>
          <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
            Artha and Kama pursued in accordance with Dharm guide us toward worldly success and fulfillment
          </p>
        </motion.div>

        {/* Desktop Layout - Diamond Pattern */}
        <div className="hidden md:block">
          <div className="relative max-w-4xl mx-auto" style={{ height: '500px' }}>
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-soft-gold-500 to-saffron-500 rounded-full flex items-center justify-center z-10 shadow-lg">
              <span className="text-white font-bold text-lg">पुरुषार्थ</span>
            </div>

            {/* Dharma - Top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2"
            >
              <div className={`bg-gradient-to-r ${purusharthas[0].color} text-white p-6 rounded-2xl shadow-lg min-w-[200px]`}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xl mb-1">{purusharthas[0].name}</h4>
                  <div className="text-2xl font-devanagari mb-2">{purusharthas[0].sanskrit}</div>
                  <p className="text-sm text-white/90">{purusharthas[0].description}</p>
                </div>
              </div>
              {/* Arrow down */}
              <div className="w-1 h-16 bg-gradient-to-b from-indigo-500 to-transparent mx-auto"></div>
            </motion.div>

            {/* Artha - Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-0 transform -translate-y-1/2"
            >
              <div className="flex items-center">
                <div className={`bg-gradient-to-r ${purusharthas[1].color} text-white p-6 rounded-2xl shadow-lg min-w-[200px]`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-xl mb-1">{purusharthas[1].name}</h4>
                    <div className="text-2xl font-devanagari mb-2">{purusharthas[1].sanskrit}</div>
                    <p className="text-sm text-white/90">{purusharthas[1].description}</p>
                  </div>
                </div>
                {/* Arrow right */}
                <div className="h-1 w-16 bg-gradient-to-r from-saffron-500 to-transparent"></div>
              </div>
            </motion.div>

            {/* Kama - Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute top-1/2 right-0 transform -translate-y-1/2"
            >
              <div className="flex items-center">
                {/* Arrow left */}
                <div className="h-1 w-16 bg-gradient-to-l from-lotus-pink-500 to-transparent"></div>
                <div className={`bg-gradient-to-r ${purusharthas[2].color} text-white p-6 rounded-2xl shadow-lg min-w-[200px]`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-xl mb-1">{purusharthas[2].name}</h4>
                    <div className="text-2xl font-devanagari mb-2">{purusharthas[2].sanskrit}</div>
                    <p className="text-sm text-white/90">{purusharthas[2].description}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Moksha - Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            >
              {/* Arrow up */}
              <div className="w-1 h-16 bg-gradient-to-t from-deep-teal-500 to-transparent mx-auto"></div>
              <div className={`bg-gradient-to-r ${purusharthas[3].color} text-white p-6 rounded-2xl shadow-lg min-w-[200px]`}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xl mb-1">{purusharthas[3].name}</h4>
                  <div className="text-2xl font-devanagari mb-2">{purusharthas[3].sanskrit}</div>
                  <p className="text-sm text-white/90">{purusharthas[3].description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="md:hidden space-y-4">
          {purusharthas.map((purushartha, index) => {
            const Icon = purushartha.icon
            return (
              <motion.div
                key={purushartha.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-r ${purushartha.color} text-white p-6 rounded-2xl shadow-lg`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xl mb-1">{purushartha.name}</h4>
                    <div className="text-xl font-devanagari mb-1">{purushartha.sanskrit}</div>
                    <p className="text-sm text-white/90">{purushartha.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

