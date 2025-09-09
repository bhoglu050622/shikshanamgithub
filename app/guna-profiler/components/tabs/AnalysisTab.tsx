'use client'

import { motion } from 'framer-motion'
import { GunaResult } from '../../types/guna-profiler'
import { analysisData } from '../../data/archetypes'

interface AnalysisTabProps {
  result: GunaResult
}

export default function AnalysisTab({ result }: AnalysisTabProps) {
  const { dominantGuna } = result
  const primaryArchetypeCode = result.personalityArchetypeCode.split('-')[0]
  const archAnalysis = analysisData[primaryArchetypeCode as keyof typeof analysisData]
  const problemData = analysisData.problems[dominantGuna]

  if (!archAnalysis || typeof archAnalysis === 'string') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="text-center py-8"
      >
        <p className="text-gray-600">Analysis data is being prepared for your archetype.</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* How Your Gunas Work Together */}
      <div className="p-5 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400">
        <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
          <i className="fas fa-cogs"></i>
          How Your Gunas Work Together
        </h3>
        <p className="text-gray-700 leading-relaxed">{(archAnalysis as any)?.interplay || 'Analysis data not available.'}</p>
      </div>

      {/* Your Path to Balance */}
      <div className="p-5 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-400">
        <h3 className="text-xl font-semibold text-purple-700 mb-3 flex items-center gap-2">
          <i className="fas fa-balance-scale"></i>
          Your Path to Balance
        </h3>
        <p className="text-gray-700 leading-relaxed">{(archAnalysis as any)?.balance || 'Balance guidance not available.'}</p>
      </div>

      {/* Your Hidden Challenge */}
      <div className="p-5 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100 border-l-4 border-pink-400">
        <h3 className="text-xl font-semibold text-pink-700 mb-3 flex items-center gap-2">
          <i className="fas fa-eye"></i>
          Your Hidden Challenge
        </h3>
        <p className="text-gray-700 leading-relaxed">{(archAnalysis as any)?.shadow || 'Shadow work insights not available.'}</p>
      </div>

      {/* Problem and Solution Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Primary Challenge */}
        <div className="p-5 rounded-lg bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400">
          <h3 className="text-xl font-semibold text-red-700 mb-3 flex items-center gap-2">
            <i className="fas fa-exclamation-triangle"></i>
            Your Primary Challenge
          </h3>
          <p className="text-gray-700 leading-relaxed">{problemData.problem}</p>
        </div>

        {/* Path to Growth */}
        <div className="p-5 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400">
          <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
            <i className="fas fa-seedling"></i>
            A Path to Growth
          </h3>
          <p className="text-gray-700 leading-relaxed">{problemData.solution}</p>
        </div>
      </div>

      {/* Deep Dive Analysis */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Understanding Your {result.archetype} Nature
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Strengths */}
          <div className="text-center">
            <div className="text-3xl mb-3">💪</div>
            <h4 className="text-lg font-semibold text-green-600 mb-3">Core Strengths</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {dominantGuna === 'sattva' && (
                <>
                  <li>Clear thinking</li>
                  <li>Inner peace</li>
                  <li>Wisdom & insight</li>
                  <li>Spiritual awareness</li>
                </>
              )}
              {dominantGuna === 'rajas' && (
                <>
                  <li>High energy</li>
                  <li>Goal-oriented</li>
                  <li>Dynamic action</li>
                  <li>Leadership qualities</li>
                </>
              )}
              {dominantGuna === 'tamas' && (
                <>
                  <li>Stability & grounding</li>
                  <li>Patience & endurance</li>
                  <li>Practical approach</li>
                  <li>Reliability</li>
                </>
              )}
            </ul>
          </div>

          {/* Growth Areas */}
          <div className="text-center">
            <div className="text-3xl mb-3">🌱</div>
            <h4 className="text-lg font-semibold text-orange-600 mb-3">Growth Areas</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {dominantGuna === 'sattva' && (
                <>
                  <li>Taking action</li>
                  <li>Practical implementation</li>
                  <li>Engaging with world</li>
                  <li>Physical activity</li>
                </>
              )}
              {dominantGuna === 'rajas' && (
                <>
                  <li>Patience & stillness</li>
                  <li>Inner reflection</li>
                  <li>Sustainable pace</li>
                  <li>Emotional balance</li>
                </>
              )}
              {dominantGuna === 'tamas' && (
                <>
                  <li>Initiative & motivation</li>
                  <li>Embracing change</li>
                  <li>Mental clarity</li>
                  <li>Active engagement</li>
                </>
              )}
            </ul>
          </div>

          {/* Integration Path */}
          <div className="text-center">
            <div className="text-3xl mb-3">🔄</div>
            <h4 className="text-lg font-semibold text-purple-600 mb-3">Integration Path</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Develop other gunas</li>
              <li>Practice balance</li>
              <li>Mindful awareness</li>
              <li>Regular self-reflection</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Practical Application */}
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 text-center">
          Practical Application for Daily Life
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-indigo-700 mb-2">Morning Practices:</h4>
            <ul className="text-sm text-indigo-600 space-y-1">
              {dominantGuna === 'sattva' && (
                <>
                  <li>• Set one concrete daily goal</li>
                  <li>• Include physical movement</li>
                  <li>• Practice grounding exercises</li>
                </>
              )}
              {dominantGuna === 'rajas' && (
                <>
                  <li>• Start with 5 minutes of stillness</li>
                  <li>• Set intention for the day</li>
                  <li>• Practice deep breathing</li>
                </>
              )}
              {dominantGuna === 'tamas' && (
                <>
                  <li>• Energizing morning routine</li>
                  <li>• Exposure to natural light</li>
                  <li>• Set small, achievable goals</li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-700 mb-2">Evening Reflection:</h4>
            <ul className="text-sm text-indigo-600 space-y-1">
              <li>• What did I accomplish today?</li>
              <li>• How did I balance my dominant guna?</li>
              <li>• What can I improve tomorrow?</li>
              <li>• Gratitude for growth moments</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
