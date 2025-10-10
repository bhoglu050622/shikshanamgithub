'use client'

import { motion } from 'framer-motion'
import { GunaResult } from '../../types/guna-profiler'
import { analysisData } from '../../data/archetypes'

interface OverviewTabProps {
  result: GunaResult
}

export default function OverviewTab({ result }: OverviewTabProps) {
  const { scores, percentages, dominantGuna } = result
  const problemData = analysisData.problems[dominantGuna]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Dominant Guna and Problem/Solution */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Problem Box */}
        <div className="p-5 rounded-lg bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400">
          <h3 className="text-xl font-semibold text-red-700 mb-2 flex items-center gap-2">
            <i className="fas fa-exclamation-triangle"></i>
            Your Primary Challenge
          </h3>
          <p className="text-gray-700">{problemData.problem}</p>
        </div>

        {/* Solution Box */}
        <div className="p-5 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400">
          <h3 className="text-xl font-semibold text-green-700 mb-2 flex items-center gap-2">
            <i className="fas fa-lightbulb"></i>
            A Path to Growth
          </h3>
          <p className="text-gray-700">{problemData.solution}</p>
        </div>
      </div>

      {/* Detailed Analysis Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Dominant Guna Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">
              {dominantGuna === 'sattva' ? '☀️' : dominantGuna === 'rajas' ? '🔥' : '🌙'}
            </span>
            Your Dominant Guna: {dominantGuna.charAt(0).toUpperCase() + dominantGuna.slice(1)}
          </h3>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-orange-500 mb-2">
              {percentages[dominantGuna]}%
            </div>
            <p className="text-gray-600">of your responses</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Raw Score:</span>
              <span className="font-semibold">{scores[dominantGuna]} out of 20</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Influence Level:</span>
              <span className="font-semibold">
                {percentages[dominantGuna] > 50 ? 'Very High' : 
                 percentages[dominantGuna] > 40 ? 'High' : 
                 percentages[dominantGuna] > 30 ? 'Moderate' : 'Low'}
              </span>
            </div>
          </div>
        </div>

        {/* Balance Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>⚖️</span>
            Balance Analysis
          </h3>
          <div className="space-y-4">
            {[
              { guna: 'sattva', label: 'Sattva', icon: '☀️', color: 'text-amber-600' },
              { guna: 'rajas', label: 'Rajas', icon: '🔥', color: 'text-pink-600' },
              { guna: 'tamas', label: 'Tamas', icon: '🌙', color: 'text-violet-600' }
            ].map(({ guna, label, icon, color }) => (
              <div key={guna} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{icon}</span>
                  <span className={`font-medium ${color}`}>{label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        guna === 'sattva' ? 'bg-amber-500' :
                        guna === 'rajas' ? 'bg-pink-500' : 'bg-violet-500'
                      }`}
                      style={{ width: `${percentages[guna as keyof typeof percentages]}%` }}
                    />
                  </div>
                  <span className="font-semibold w-12 text-right">
                    {percentages[guna as keyof typeof percentages]}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Balance Interpretation */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm text-blue-800">
              <strong>Balance Insight:</strong> {
                Math.max(...Object.values(percentages)) - Math.min(...Object.values(percentages)) < 20
                  ? "You have a relatively balanced guna profile, which indicates good overall harmony."
                  : Math.max(...Object.values(percentages)) > 50
                  ? `Your ${dominantGuna} dominance suggests strong characteristics in this area, but may benefit from developing other qualities.`
                  : "Your profile shows moderate variation across the gunas, indicating a dynamic personality."
              }
            </p>
          </div>
        </div>
      </div>

      {/* Archetype Summary */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Your Archetype: {result.archetype}
        </h3>
        <p className="text-lg text-gray-700 text-center leading-relaxed">
          {result.description}
        </p>
        <div className="mt-4 text-center">
          <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
            Code: {result.gunaTraitCode}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
