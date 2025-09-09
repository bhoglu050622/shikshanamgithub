'use client'

import { motion } from 'framer-motion'
import { GunaResult } from '../../types/guna-profiler'
import { recommendations } from '../../data/recommendations'

interface RecommendationsTabProps {
  result: GunaResult
}

export default function RecommendationsTab({ result }: RecommendationsTabProps) {
  const { dominantGuna } = result
  const challengeData = recommendations.challenges[dominantGuna]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Dietary Recommendations */}
      <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
          <i className="fas fa-utensils"></i>
          <span>{recommendations.dietaryTitle}</span>
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {recommendations.dietary[dominantGuna].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Activity Recommendations */}
      <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
          <i className="fas fa-running"></i>
          <span>{recommendations.activityTitle}</span>
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {recommendations.activities[dominantGuna].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Challenge and Solution */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center gap-2">
          <i className="fas fa-seedling"></i>
          <span>{recommendations.challengeTitle}</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Challenge */}
          <div className="p-5 rounded-lg bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400">
            <h4 className="text-lg font-semibold text-red-700 mb-2">{recommendations.challengeTitle}</h4>
            <p className="text-gray-700">{challengeData.challenge}</p>
          </div>

          {/* Solution */}
          <div className="p-5 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400">
            <h4 className="text-lg font-semibold text-green-700 mb-2">{recommendations.solutionTitle}</h4>
            <p className="text-gray-700">{challengeData.solution}</p>
          </div>
        </div>
      </div>

      {/* Personalized Action Plan */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-2xl font-bold text-purple-800 mb-4 text-center">
          Your 7-Day Action Plan
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-purple-700 mb-3">This Week's Focus:</h4>
            <div className="space-y-3">
              {dominantGuna === 'sattva' && (
                <>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                    <p className="text-sm text-purple-700">Choose one small idea and break it into 3 actionable steps</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    <p className="text-sm text-purple-700">Add 15 minutes of physical activity daily</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    <p className="text-sm text-purple-700">Practice grounding exercises (walking barefoot, gardening)</p>
                  </div>
                </>
              )}
              {dominantGuna === 'rajas' && (
                <>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                    <p className="text-sm text-purple-700">Schedule 15-minute "do nothing" breaks daily</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    <p className="text-sm text-purple-700">Practice deep breathing before major tasks</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    <p className="text-sm text-purple-700">Set maximum 3 priorities per day</p>
                  </div>
                </>
              )}
              {dominantGuna === 'tamas' && (
                <>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                    <p className="text-sm text-purple-700">Try one new activity this week (new recipe, route, hobby)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    <p className="text-sm text-purple-700">Listen to uplifting music for 20 minutes daily</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    <p className="text-sm text-purple-700">Set one small, achievable goal each morning</p>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-700 mb-3">Daily Tracking:</h4>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-purple-600 mb-3">Rate your progress each evening (1-5):</p>
              <div className="space-y-2 text-xs text-purple-600">
                <div className="flex justify-between border-b border-purple-100 pb-1">
                  <span>Energy Level:</span>
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <div className="flex justify-between border-b border-purple-100 pb-1">
                  <span>Balance Achieved:</span>
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <div className="flex justify-between border-b border-purple-100 pb-1">
                  <span>Action Taken:</span>
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <div className="flex justify-between">
                  <span>Overall Satisfaction:</span>
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lifestyle Integration */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Morning Routine */}
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
            <i className="fas fa-sun"></i>
            Morning Routine
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            {dominantGuna === 'sattva' && (
              <>
                <li>• Light stretching or yoga</li>
                <li>• Set one concrete goal</li>
                <li>• Eat fresh, light breakfast</li>
                <li>• Brief planning session</li>
              </>
            )}
            {dominantGuna === 'rajas' && (
              <>
                <li>• 5 minutes of stillness</li>
                <li>• Deep breathing exercises</li>
                <li>• Balanced breakfast</li>
                <li>• Prioritize top 3 tasks</li>
              </>
            )}
            {dominantGuna === 'tamas' && (
              <>
                <li>• Energizing movement</li>
                <li>• Natural light exposure</li>
                <li>• Warm, nourishing breakfast</li>
                <li>• One inspiring activity</li>
              </>
            )}
          </ul>
        </div>

        {/* Midday Balance */}
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
            <i className="fas fa-balance-scale"></i>
            Midday Balance
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            {dominantGuna === 'sattva' && (
              <>
                <li>• Take action on morning goal</li>
                <li>• Connect with others</li>
                <li>• Physical activity break</li>
                <li>• Practical problem-solving</li>
              </>
            )}
            {dominantGuna === 'rajas' && (
              <>
                <li>• Mindful lunch break</li>
                <li>• Brief meditation/rest</li>
                <li>• Check in with values</li>
                <li>• Gentle pacing</li>
              </>
            )}
            {dominantGuna === 'tamas' && (
              <>
                <li>• Energizing snack</li>
                <li>• Social interaction</li>
                <li>• Change of environment</li>
                <li>• Creative activity</li>
              </>
            )}
          </ul>
        </div>

        {/* Evening Reflection */}
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <h4 className="font-semibold text-purple-600 mb-3 flex items-center gap-2">
            <i className="fas fa-moon"></i>
            Evening Reflection
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Review daily progress</li>
            <li>• Celebrate small wins</li>
            <li>• Plan tomorrow's focus</li>
            <li>• Gratitude practice</li>
            <li>• Prepare for rest</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
