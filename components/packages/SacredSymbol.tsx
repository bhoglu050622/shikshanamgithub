'use client'

import { ReactNode } from 'react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import { LucideIcon } from 'lucide-react'

interface Symbol {
  icon: LucideIcon
  name: string
  sanskritName?: string
  meaning: string
  significance: string
}

interface SacredSymbolProps {
  title: string
  subtitle: string
  symbols: Symbol[]
  theme: 'warm' | 'cool' | 'earth' | 'cosmic' | 'balanced'
}

const themeGradients = {
  warm: 'from-orange-500 to-amber-500',
  cool: 'from-cyan-500 to-blue-500',
  earth: 'from-amber-600 to-emerald-600',
  cosmic: 'from-purple-500 to-indigo-500',
  balanced: 'from-sky-500 to-blue-500'
}

export default function SacredSymbol({ title, subtitle, symbols, theme }: SacredSymbolProps) {
  const gradient = themeGradients[theme]

  return (
    <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Mystical Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sacred-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sacred-pattern)" />
        </svg>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {symbols.map((symbol, index) => {
            const Icon = symbol.icon
            return (
              <HydrationSafeMotion
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-600 text-center relative overflow-hidden">
                  {/* Animated Background Glow */}
                  <HydrationSafeMotion
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: 999999,
                      repeatDelay: 1
                    }}
                  >
                    <div />
                  </HydrationSafeMotion>

                  {/* Icon with Rotation Animation */}
                  <HydrationSafeMotion
                    className="relative mb-4 inline-block"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mx-auto relative`}>
                      <Icon className="w-12 h-12 text-white" />
                      {/* Rotating Ring */}
                      <HydrationSafeMotion className={`absolute inset-0 rounded-full border-2 border-dashed`}
                        style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: 999999, ease: 'linear' }}>
              <div />
            </HydrationSafeMotion>
                    </div>
                  </HydrationSafeMotion>

                  {/* Symbol Name */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {symbol.name}
                  </h3>
                  
                  {/* Sanskrit Name */}
                  {symbol.sanskritName && (
                    <div className={`text-sm font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-3`}>
                      {symbol.sanskritName}
                    </div>
                  )}

                  {/* Meaning */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 italic">
                    {symbol.meaning}
                  </p>

                  {/* Significance */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-600">
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {symbol.significance}
                    </p>
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

