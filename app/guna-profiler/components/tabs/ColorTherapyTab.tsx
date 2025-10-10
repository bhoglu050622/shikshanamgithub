'use client'

import { motion } from 'framer-motion'
import { GunaResult } from '../../types/guna-profiler'
import { recommendations } from '../../data/recommendations'

interface ColorTherapyTabProps {
  result: GunaResult
}

export default function ColorTherapyTab({ result }: ColorTherapyTabProps) {
  const { dominantGuna } = result
  const colorData = recommendations.colorTherapy[dominantGuna]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Main Color Therapy Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-3">
          <i className="fas fa-palette"></i>
          <span>{recommendations.colorTitle}</span>
        </h3>
        
        {/* Color Swatches */}
        <div className="flex flex-wrap gap-4 items-center mb-4">
          {colorData.colors.map((color, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto shadow-lg border-2 border-white"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
              <p className="text-sm mt-2 text-gray-600 font-medium">{color.name}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">{colorData.colorInfo}</p>

        <h4 className="font-semibold text-gray-800 mb-2">{recommendations.colorHowTo}</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {colorData.howToUse.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Color Challenge and Solution */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Challenge */}
        <div className="p-5 rounded-lg bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400">
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            {recommendations.colorTherapy.problemTitle}
          </h3>
          <p className="text-gray-700">{colorData.problem}</p>
        </div>

        {/* Solution */}
        <div className="p-5 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            {recommendations.colorTherapy.solutionTitle}
          </h3>
          <p className="text-gray-700">{colorData.solution}</p>
        </div>
      </div>

      {/* Practical Color Applications */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-2xl font-bold text-indigo-800 mb-6 text-center">
          Practical Color Applications for Your {dominantGuna.charAt(0).toUpperCase() + dominantGuna.slice(1)} Nature
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wardrobe */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-indigo-700 mb-3 flex items-center gap-2">
              <i className="fas fa-tshirt"></i>
              Wardrobe Choices
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              {dominantGuna === 'sattva' && (
                <>
                  <p>• White or cream for meditation/yoga</p>
                  <p>• Light blue for clarity and peace</p>
                  <p>• Pastels for daily wear</p>
                  <p>• Add earthy accents for grounding</p>
                </>
              )}
              {dominantGuna === 'rajas' && (
                <>
                  <p>• Red/orange for energy boost</p>
                  <p>• Gold for confidence</p>
                  <p>• Use as accent colors only</p>
                  <p>• Balance with white/blue</p>
                </>
              )}
              {dominantGuna === 'tamas' && (
                <>
                  <p>• Earth tones for stability</p>
                  <p>• Navy blue for trust</p>
                  <p>• Brown for grounding</p>
                  <p>• Add bright accents for energy</p>
                </>
              )}
            </div>
          </div>

          {/* Living Space */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-indigo-700 mb-3 flex items-center gap-2">
              <i className="fas fa-home"></i>
              Living Space
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              {dominantGuna === 'sattva' && (
                <>
                  <p>• Light walls for openness</p>
                  <p>• Natural materials and textures</p>
                  <p>• Minimal, clean design</p>
                  <p>• Plants for earth connection</p>
                </>
              )}
              {dominantGuna === 'rajas' && (
                <>
                  <p>• Vibrant accent walls</p>
                  <p>• Energizing art pieces</p>
                  <p>• Dynamic lighting options</p>
                  <p>• Balance with calm zones</p>
                </>
              )}
              {dominantGuna === 'tamas' && (
                <>
                  <p>• Warm, cozy color scheme</p>
                  <p>• Rich textures and fabrics</p>
                  <p>• Comfortable, grounded furniture</p>
                  <p>• Add light colors for balance</p>
                </>
              )}
            </div>
          </div>

          {/* Workspace */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-indigo-700 mb-3 flex items-center gap-2">
              <i className="fas fa-briefcase"></i>
              Workspace
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              {dominantGuna === 'sattva' && (
                <>
                  <p>• Clean, minimal desk setup</p>
                  <p>• Natural light when possible</p>
                  <p>• White/light blue accessories</p>
                  <p>• Small grounding elements</p>
                </>
              )}
              {dominantGuna === 'rajas' && (
                <>
                  <p>• Energizing desk accessories</p>
                  <p>• Red/orange motivation items</p>
                  <p>• Dynamic, organized layout</p>
                  <p>• Calming elements for balance</p>
                </>
              )}
              {dominantGuna === 'tamas' && (
                <>
                  <p>• Warm, comfortable setup</p>
                  <p>• Earth-toned accessories</p>
                  <p>• Stable, solid furniture</p>
                  <p>• Bright accents for energy</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Color Meditation Practice */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Daily Color Meditation Practice
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-purple-600 mb-3">Morning Color Visualization:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>1. Sit comfortably and close your eyes</p>
              <p>2. Visualize your primary guna color surrounding you</p>
              <p>3. Feel its energy filling your body</p>
              <p>4. Set intention for balanced day</p>
              <p>5. Practice for 5-10 minutes</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-600 mb-3">Evening Color Reflection:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>1. Review your color choices today</p>
              <p>2. Notice how they affected your mood</p>
              <p>3. Visualize balancing colors you need</p>
              <p>4. Plan tomorrow's color intentions</p>
              <p>5. End with gratitude</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <strong>Pro Tip:</strong> Keep a small object in your balancing color nearby. Touch it when you need to shift your energy throughout the day.
          </p>
        </div>
      </div>

      {/* Seasonal Color Adjustments */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
          Seasonal Color Adjustments
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { season: 'Spring', colors: 'Fresh greens, light yellows', energy: 'Renewal & growth' },
            { season: 'Summer', colors: 'Bright blues, whites', energy: 'Expansion & activity' },
            { season: 'Autumn', colors: 'Warm oranges, deep reds', energy: 'Harvest & grounding' },
            { season: 'Winter', colors: 'Deep blues, purples', energy: 'Reflection & rest' }
          ].map((season, index) => (
            <div key={index} className="bg-white rounded-lg p-3 shadow-sm text-center">
              <h4 className="font-semibold text-green-700 mb-2">{season.season}</h4>
              <p className="text-xs text-gray-600 mb-1">{season.colors}</p>
              <p className="text-xs text-green-600 italic">{season.energy}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
