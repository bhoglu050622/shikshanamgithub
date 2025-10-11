'use client'

import { ReactNode } from 'react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import { LucideIcon } from 'lucide-react'

interface MetaphorCard {
  icon: LucideIcon
  title: string
  concept: string
  description: string
  symbolism: string
}

interface VisualMetaphorProps {
  title: string
  subtitle: string
  metaphors: MetaphorCard[]
  theme: 'warm' | 'cool' | 'earth' | 'cosmic' | 'balanced'
}

const themeGradients = {
  warm: 'from-orange-500 to-amber-500',
  cool: 'from-cyan-500 to-blue-500',
  earth: 'from-amber-600 to-emerald-600',
  cosmic: 'from-purple-500 to-indigo-500',
  balanced: 'from-sky-500 to-blue-500'
}

const themeBg = {
  warm: 'from-orange-50 to-amber-50',
  cool: 'from-cyan-50 to-blue-50',
  earth: 'from-amber-50 to-emerald-50',
  cosmic: 'from-purple-50 to-indigo-50',
  balanced: 'from-sky-50 to-blue-50'
}

const themeBgDark = {
  warm: 'dark:from-orange-900/10 dark:to-amber-900/10',
  cool: 'dark:from-cyan-900/10 dark:to-blue-900/10',
  earth: 'dark:from-amber-900/10 dark:to-emerald-900/10',
  cosmic: 'dark:from-purple-900/10 dark:to-indigo-900/10',
  balanced: 'dark:from-sky-900/10 dark:to-blue-900/10'
}

export default function VisualMetaphor({ title, subtitle, metaphors, theme }: VisualMetaphorProps) {
  const gradient = themeGradients[theme]
  const bgGradient = themeBg[theme]
  const bgGradientDark = themeBgDark[theme]

  return (
    <section className={`py-20 bg-gradient-to-br ${bgGradient} ${bgGradientDark} relative overflow-hidden`}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-gradient-to-tl from-white/40 to-transparent dark:from-white/5 rounded-full blur-3xl" />
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
            {title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </HydrationSafeMotion>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {metaphors.map((metaphor, index) => {
            const Icon = metaphor.icon
            return (
              <HydrationSafeMotion
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 relative overflow-hidden">
                  {/* Hover Gradient Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    {/* Icon Glow */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {metaphor.title}
                    </h3>
                    <div className={`text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-3`}>
                      {metaphor.concept}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {metaphor.description}
                    </p>
                    
                    {/* Symbolism */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        Sacred Symbolism
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-200 italic">
                        {metaphor.symbolism}
                      </p>
                    </div>
                  </div>
                </div>
              </HydrationSafeMotion>
            )
          })}
        </div>
      </div>
    </section>
  )
}

