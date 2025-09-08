'use client';

import { motion } from 'framer-motion';
import { Brain, Heart, Lightbulb, Target, CheckCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

const outcomes = [
  {
    icon: Brain,
    title: 'Deep Understanding of Patanjali\'s 195 Yoga Sutras',
    description: 'Master the complete philosophy of Yoga as outlined by Maharshi Patanjali',
    color: 'from-saffron-500 to-saffron-600'
  },
  {
    icon: Heart,
    title: 'Practical Mind-Body-Spirit Balance',
    description: 'Learn to apply Yoga principles for holistic well-being in everyday life',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: Lightbulb,
    title: 'Tools for Meditation & Clarity',
    description: 'Develop meditation techniques grounded in traditional wisdom',
    color: 'from-saffron-500 to-saffron-600'
  },
  {
    icon: Target,
    title: 'Confidence to Integrate Yoga Philosophy',
    description: 'Gain the knowledge and confidence to live according to Yoga principles',
    color: 'from-teal-500 to-teal-600'
  }
];

const learningOutcomes = [
  'Understand the fundamental concepts of Yoga philosophy',
  'Apply the eight limbs of Yoga (Ashtanga) in daily life',
  'Develop a personal meditation and mindfulness practice',
  'Recognize and overcome obstacles in spiritual growth',
  'Integrate ancient wisdom with modern lifestyle',
  'Build a strong foundation for advanced spiritual practices'
];

export default function OutcomesSection() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              What You'll Gain
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Transform your understanding of life, consciousness, and spiritual growth through the profound wisdom of Patanjali's Yoga Sutras.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8 hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${outcome.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <outcome.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-high-contrast mb-4">
                  {outcome.title}
                </h3>
                <p className="text-wisdom-600 leading-relaxed">
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="bg-gradient-to-r from-saffron-50 to-teal-50 p-8 rounded-3xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display text-high-contrast mb-4">
                Learning Outcomes
              </h3>
              <p className="text-wisdom-600 max-w-2xl mx-auto">
                By the end of this course, you will have achieved the following learning objectives:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {learningOutcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-wisdom-600 leading-relaxed">{outcome}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-display text-high-contrast mb-6">
                Transform Your Life with Ancient Wisdom
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🧘</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Spiritual Growth</h4>
                  <p className="text-wisdom-600 text-sm">Develop a deeper understanding of consciousness and self-realization</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚖️</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Life Balance</h4>
                  <p className="text-wisdom-600 text-sm">Learn to maintain harmony between body, mind, and spirit</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🌟</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Inner Peace</h4>
                  <p className="text-wisdom-600 text-sm">Cultivate mindfulness and inner tranquility through ancient practices</p>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
