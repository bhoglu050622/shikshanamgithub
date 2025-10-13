'use client';

import { motion } from 'framer-motion';
import { HelpCircle, Zap, Brain, Moon, Sparkles, Crown } from 'lucide-react';
import { staggerContainer, questionCardVariants, safeVariants } from '../../motion.config';

const sixQuestions = [
  {
    id: 1,
    icon: HelpCircle,
    sanskrit: 'प्रश्न १',
    title: 'Origin of Beings',
    question: 'From where are all beings born?',
    description: 'Explore the cosmic creation and the source of existence'
  },
  {
    id: 2,
    icon: Zap,
    sanskrit: 'प्रश्न २',
    title: 'Five Pranas',
    question: 'How many deities support the body?',
    description: 'Discover the vital forces that sustain life'
  },
  {
    id: 3,
    icon: Brain,
    sanskrit: 'प्रश्न ३',
    title: 'Origin of Prana',
    question: 'From where does prana originate?',
    description: 'Understand the source and distribution of life force'
  },
  {
    id: 4,
    icon: Moon,
    sanskrit: 'प्रश्न ४',
    title: 'States of Sleep',
    question: 'What sleeps in man?',
    description: 'Explore consciousness through waking, dream, and sleep'
  },
  {
    id: 5,
    icon: Sparkles,
    sanskrit: 'प्रश्न ५',
    title: 'Meditation on Om',
    question: 'What happens to one who meditates on Om?',
    description: 'Learn the fruits of sacred sound meditation'
  },
  {
    id: 6,
    icon: Crown,
    sanskrit: 'प्रश्न ६',
    title: 'Sixteen Parts',
    question: 'Who is the Person of sixteen parts?',
    description: 'Discover the ultimate teaching on Self and liberation'
  }
];

export default function ProblemStrip() {
  return (
    <section className="prashna-problem-strip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B4A] mb-4">
            Six Profound Questions of Existence
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Journey through the fundamental questions that unlock the mysteries of life, consciousness, and liberation
          </p>
        </div>

        <motion.div
          className="prashna-question-grid"
          variants={safeVariants(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {sixQuestions.map((question) => {
            const IconComponent = question.icon;
            return (
              <motion.div
                key={question.id}
                className="prashna-question-card"
                variants={questionCardVariants}
                whileHover="hover"
              >
                <div className="prashna-question-icon">
                  <IconComponent className="w-full h-full" />
                </div>
                <h3 className="prashna-question-title">{question.sanskrit}</h3>
                <h4 className="font-bold text-[#0D3B4A] mb-2">{question.title}</h4>
                <p className="prashna-question-subtitle mb-3 text-sm italic">
                  "{question.question}"
                </p>
                <p className="text-xs text-gray-500">{question.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 italic">
            Click on each question during the course to explore profound Vedantic wisdom
          </p>
        </div>
      </div>
    </section>
  );
}

