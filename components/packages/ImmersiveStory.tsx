'use client'

import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import { ArrowRight } from 'lucide-react'

interface StoryPhase {
  label: string
  title: string
  description: string
}

interface ImmersiveStoryProps {
  title: string
  introduction: string
  phases: StoryPhase[]
  conclusion: string
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
  warm: 'from-orange-900/20 via-slate-900 to-amber-900/20',
  cool: 'from-cyan-900/20 via-slate-900 to-blue-900/20',
  earth: 'from-amber-900/20 via-slate-900 to-emerald-900/20',
  cosmic: 'from-purple-900/20 via-slate-900 to-indigo-900/20',
  balanced: 'from-sky-900/20 via-slate-900 to-blue-900/20'
}

export default function ImmersiveStory({ title, introduction, phases, conclusion, theme }: ImmersiveStoryProps) {
  const gradient = themeGradients[theme]
  const bgGradient = themeBg[theme]

  return (
    <section className={`py-24 bg-gradient-to-br ${bgGradient} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <HydrationSafeMotion
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 8,
            repeat: 999999,
            ease: 'easeInOut'
          }}
        >
          <div />
        </HydrationSafeMotion>
        <HydrationSafeMotion
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl ${gradient} rounded-full opacity-10 blur-3xl`}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 10,
            repeat: 999999,
            ease: 'easeInOut'
          }}
        >
          <div />
        </HydrationSafeMotion>
      </div>

      <div className="container mx-auto px-4">
        {/* Title */}
        <HydrationSafeMotion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {title}
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {introduction}
          </p>
        </HydrationSafeMotion>

        {/* Story Phases */}
        <div className="max-w-5xl mx-auto space-y-12">
          {phases.map((phase, index) => (
            <HydrationSafeMotion
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="group relative">
                {/* Phase Number */}
                <div className={`absolute -left-4 md:-left-16 top-0 w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {index + 1}
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl ml-8 md:ml-0">
                  {/* Label */}
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-3 bg-gradient-to-r ${gradient} text-white`}>
                    {phase.label}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {phase.description}
                  </p>

                  {/* Arrow connecting to next phase */}
                  {index < phases.length - 1 && (
                    <HydrationSafeMotion
                      className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2`}
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className={`w-6 h-6 text-gray-500 rotate-90`} />
                    </HydrationSafeMotion>
                  )}
                </div>
              </div>
            </HydrationSafeMotion>
          ))}
        </div>

        {/* Conclusion */}
        <HydrationSafeMotion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${gradient} text-white font-medium text-lg shadow-lg`}>
            {conclusion}
          </div>
        </HydrationSafeMotion>
      </div>
    </section>
  )
}

