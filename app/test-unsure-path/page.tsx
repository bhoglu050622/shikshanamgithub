'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import UnsurePathJourney from '@/components/sections/DarshanaCircularVisualization'

export default function UnsurePathDemoPage() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedDarshana, setSelectedDarshana] = useState<string | null>(null)

  // Mock comic assets - in real implementation, these would be actual image URLs
  const comicAssets = {
    basics: '/assets/comics/basics.jpg',
    nyaya: '/assets/comics/nyaya.jpg',
    vaisheshika: '/assets/comics/vaisheshika.jpg',
    samkhya: '/assets/comics/samkhya.jpg',
    yoga: '/assets/comics/yoga.jpg',
    mimamsa: '/assets/comics/mimamsa.jpg',
    vedanta: '/assets/comics/vedanta.jpg'
  }

  // Mock read more links
  const readMoreLinks = {
    basics: '/schools/darshana/basics',
    nyaya: '/schools/darshana/nyaya',
    vaisheshika: '/schools/darshana/vaisheshika',
    samkhya: '/schools/darshana/samkhya',
    yoga: '/schools/darshana/yoga',
    mimamsa: '/schools/darshana/mimamsa',
    vedanta: '/schools/darshana/vedanta'
  }

  const handleSelectDarshana = (darshanaId: string) => {
    setSelectedDarshana(darshanaId)
    console.log('Selected Darshana:', darshanaId)
  }

  const handleQuizOpen = () => {
    setShowQuiz(true)
    console.log('Quiz opened')
  }

  return (
    <>
      
      {/* Demo Header */}
      <section className="py-16 bg-gradient-to-br from-saffron-50/30 via-transparent to-deep-teal-50/30 dark:from-saffron-900/10 dark:via-transparent dark:to-deep-teal-900/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-hero text-indigo-700 dark:text-soft-gold-500 mb-6">
              Unsure Path Journey
            </h1>
            <p className="text-subheading text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto mb-8">
              Interactive storytelling component for the School of Darshana homepage. 
              Follow Maya's journey through the six Darshanas with guided navigation and auto-play features.
            </p>
            
            {/* Demo Controls */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white dark:bg-wisdom-800 rounded-xl p-4 shadow-lg border border-saffron-200/30 dark:border-saffron-400/20">
                <h3 className="font-semibold text-wisdom-800 dark:text-wisdom-200 mb-2">Features</h3>
                <ul className="text-sm text-wisdom-600 dark:text-wisdom-400 space-y-1">
                  <li>• Sequential unlocking</li>
                  <li>• Auto-play mode</li>
                  <li>• Touch swipe gestures</li>
                  <li>• Accessibility support</li>
                  <li>• Reduced motion support</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-wisdom-800 rounded-xl p-4 shadow-lg border border-saffron-200/30 dark:border-saffron-400/20">
                <h3 className="font-semibold text-wisdom-800 dark:text-wisdom-200 mb-2">Responsive</h3>
                <ul className="text-sm text-wisdom-600 dark:text-wisdom-400 space-y-1">
                  <li>• Desktop: Two-column layout</li>
                  <li>• Mobile: Stacked layout</li>
                  <li>• Touch-friendly controls</li>
                  <li>• Optimized for all devices</li>
                </ul>
              </div>
            </div>

            {/* Status Display */}
            {selectedDarshana && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-saffron-100 dark:bg-saffron-900/30 rounded-xl p-4 max-w-md mx-auto"
              >
                <p className="text-saffron-700 dark:text-saffron-300 font-medium">
                  Selected: {selectedDarshana}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Component */}
      <UnsurePathJourney
        onDarshanaClick={handleSelectDarshana}
      />

      {/* Demo Quiz Modal */}
      {showQuiz && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowQuiz(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-white dark:bg-wisdom-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-saffron-200/30 dark:border-saffron-400/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-indigo-700 dark:text-soft-gold-500 mb-4">
                Quiz Integration Demo
              </h3>
              <p className="text-wisdom-600 dark:text-wisdom-400 mb-6">
                This is a demo of the quiz integration. In the real implementation, 
                this would open the actual quiz component.
              </p>
              <div className="space-y-4">
                <div className="bg-saffron-50 dark:bg-saffron-900/20 rounded-xl p-4">
                  <p className="text-sm text-saffron-700 dark:text-saffron-300">
                    <strong>Callback triggered:</strong> onQuizOpen()
                  </p>
                </div>
                <motion.button
                  onClick={() => setShowQuiz(false)}
                  className="btn-primary px-6 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Integration Instructions */}
      <section className="py-16 bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-8 text-center">
              Integration Guide
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Props */}
              <div className="bg-white dark:bg-wisdom-800 rounded-2xl p-6 shadow-lg border border-saffron-200/30 dark:border-saffron-400/20">
                <h3 className="text-xl font-semibold text-wisdom-800 dark:text-wisdom-200 mb-4">
                  Props
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <code className="bg-wisdom-100 dark:bg-wisdom-700 px-2 py-1 rounded text-saffron-600 dark:text-saffron-400">
                      onDarshanaClick
                    </code>
                    <p className="text-wisdom-600 dark:text-wisdom-400 mt-1">
                      Callback when darshana is selected or quiz is opened
                    </p>
                  </div>
                </div>
              </div>

              {/* Usage Example */}
              <div className="bg-white dark:bg-wisdom-800 rounded-2xl p-6 shadow-lg border border-saffron-200/30 dark:border-saffron-400/20">
                <h3 className="text-xl font-semibold text-wisdom-800 dark:text-wisdom-200 mb-4">
                  Usage Example
                </h3>
                <pre className="bg-wisdom-100 dark:bg-wisdom-700 rounded-lg p-4 text-sm overflow-x-auto">
                  <code className="text-wisdom-800 dark:text-wisdom-200">
{`<UnsurePathJourney
  onDarshanaClick={(id) => 
    router.push(\`/schools/darshana/\${id}\`)
  }
/>`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Features List */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">M1</span>
                </div>
                <h4 className="font-semibold text-wisdom-800 dark:text-wisdom-200 mb-2">
                  Static UI Complete
                </h4>
                <p className="text-sm text-wisdom-600 dark:text-wisdom-400">
                  Responsive layout, step nodes, timeline, and comic panels
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-deep-teal-500 to-deep-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">M2</span>
                </div>
                <h4 className="font-semibold text-wisdom-800 dark:text-wisdom-200 mb-2">
                  Animations Ready
                </h4>
                <p className="text-sm text-wisdom-600 dark:text-wisdom-400">
                  Framer Motion animations for all interactions
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">M3</span>
                </div>
                <h4 className="font-semibold text-wisdom-800 dark:text-wisdom-200 mb-2">
                  Auto-play & Controls
                </h4>
                <p className="text-sm text-wisdom-600 dark:text-wisdom-400">
                  Play/pause, navigation, and touch gestures
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  )
}
