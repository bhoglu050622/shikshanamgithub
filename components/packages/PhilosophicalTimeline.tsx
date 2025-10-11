'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'

interface TimelineStep {
  week: string
  title: string
  description: string
  milestone?: string
}

interface PhilosophicalTimelineProps {
  steps: TimelineStep[]
  accentColor: string
  theme: 'warm' | 'cool' | 'earth' | 'cosmic' | 'balanced'
}

const themeColors = {
  warm: {
    line: 'from-orange-500 to-amber-500',
    dot: 'from-orange-400 to-amber-400',
    glow: 'orange-500/20'
  },
  cool: {
    line: 'from-cyan-500 to-blue-500',
    dot: 'from-cyan-400 to-blue-400',
    glow: 'cyan-500/20'
  },
  earth: {
    line: 'from-amber-600 to-emerald-600',
    dot: 'from-amber-500 to-emerald-500',
    glow: 'emerald-500/20'
  },
  cosmic: {
    line: 'from-purple-500 to-indigo-500',
    dot: 'from-purple-400 to-indigo-400',
    glow: 'purple-500/20'
  },
  balanced: {
    line: 'from-sky-500 to-blue-500',
    dot: 'from-sky-400 to-blue-400',
    glow: 'sky-500/20'
  }
}

export default function PhilosophicalTimeline({ steps, accentColor, theme }: PhilosophicalTimelineProps) {
  const colors = themeColors[theme]
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br ${colors.line} rounded-full blur-3xl`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl ${colors.line} rounded-full blur-3xl`} />
      </div>

      <div className="container mx-auto px-4">
        <HydrationSafeMotion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Your Transformative Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Follow the path of wisdom, step by step, towards deeper understanding
          </p>
        </HydrationSafeMotion>

        <div className="max-w-5xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block">
            <div className={`absolute inset-0 bg-gradient-to-b ${colors.line} opacity-20`} />
            <HydrationSafeMotion
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className={`absolute inset-0 bg-gradient-to-b ${colors.line}`}
            >
              <div />
            </HydrationSafeMotion>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <HydrationSafeMotion
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left`}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 bg-gradient-to-r ${colors.line} text-white`}>
                      {step.week}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:scale-105 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                    {step.milestone && (
                      <div className={`mt-4 pt-4 border-t border-${accentColor}-200 dark:border-${accentColor}-800/30`}>
                        <div className="flex items-center gap-2 text-sm font-medium" style={{ color: accentColor }}>
                          <CheckCircle className="w-4 h-4" />
                          <span>{step.milestone}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <HydrationSafeMotion
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.dot} flex items-center justify-center shadow-lg`}>
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${colors.dot}`} />
                      </div>
                    </div>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-full bg-${colors.glow} blur-xl -z-10 animate-pulse`} />
                  </HydrationSafeMotion>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </HydrationSafeMotion>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

