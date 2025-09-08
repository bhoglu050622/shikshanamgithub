'use client';

import { motion } from 'framer-motion';
import { Brain, Heart, Lightbulb, Target, CheckCircle, HelpCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

const outcomes = [
  {
    icon: Brain,
    title: 'Wisdom & Clarity',
    description: 'Understand foundational Vedic questions and gain profound insights into life\'s mysteries',
    color: 'from-muted-saffron-500 to-muted-saffron-600'
  },
  {
    icon: Heart,
    title: 'Inner Reflection',
    description: 'Develop deeper self-awareness and presence through contemplative practices',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: Lightbulb,
    title: 'Practical Insight',
    description: 'Learn questions that foster lifelong inquiry and clarity in daily life',
    color: 'from-muted-saffron-500 to-muted-saffron-600'
  },
  {
    icon: Target,
    title: 'Spiritual Growth',
    description: 'Embark on a transformative journey toward higher consciousness and understanding',
    color: 'from-teal-500 to-teal-600'
  }
];

const learningOutcomes = [
  'Understand the six fundamental questions of Prashna Upanishad',
  'Apply ancient wisdom to modern life situations',
  'Develop a deeper sense of self-awareness and presence',
  'Learn to ask meaningful questions that lead to spiritual growth',
  'Integrate Upanishadic insights into daily contemplative practice',
  'Build a foundation for advanced spiritual studies'
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
              Transform your understanding of life's deepest questions through the profound wisdom of Prashna Upanishad's six inquiries.
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
          <div className="bg-gradient-to-r from-muted-saffron-50 to-teal-50 p-8 rounded-3xl">
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
                  <div className="w-6 h-6 bg-gradient-to-r from-muted-saffron-500 to-muted-saffron-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
                Transform Your Quest for Clarity
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-muted-saffron-500 to-muted-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🤔</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Deep Inquiry</h4>
                  <p className="text-wisdom-600 text-sm">Learn to ask the right questions that lead to profound understanding</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🧘</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Contemplative Practice</h4>
                  <p className="text-wisdom-600 text-sm">Develop mindfulness and inner reflection through ancient wisdom</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-muted-saffron-500 to-muted-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💡</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Practical Wisdom</h4>
                  <p className="text-wisdom-600 text-sm">Apply timeless insights to modern life challenges and decisions</p>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
