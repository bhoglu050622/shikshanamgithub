'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock, Lightbulb, Trophy, X } from 'lucide-react';

interface TimelineStep {
  number: number;
  title: string;
  description: string;
  icon: any;
  caseExample: {
    title: string;
    description: string;
    outcome: string;
  };
}

const steps: TimelineStep[] = [
  {
    number: 1,
    title: 'Unlock the Secret Code',
    description: 'Learn each of the 10 strategic principles that Chanakya used to build an empire',
    icon: Unlock,
    caseExample: {
      title: 'The Art of Persuasion in Action',
      description: 'Discover how Chanakya convinced Chandragupta, a commoner, to challenge the mighty Nanda Empire. Learn the psychology behind influential communication and how to apply it in modern negotiations.',
      outcome: 'Apply these persuasion techniques to win stakeholders, close deals, and influence key decisions in your professional life.'
    }
  },
  {
    number: 2,
    title: 'The Code in Action',
    description: 'See real-world applications through historical case studies and modern business scenarios',
    icon: Lightbulb,
    caseExample: {
      title: 'Strategic Intelligence: The Spy Network',
      description: 'Explore how Chanakya built an extensive intelligence network that brought down the Nanda dynasty. Understand ethical competitive intelligence gathering in today\'s business landscape.',
      outcome: 'Implement strategic intelligence frameworks to stay ahead of competition, anticipate market moves, and protect your business interests.'
    }
  },
  {
    number: 3,
    title: 'Conquer the Challenge',
    description: 'Practice with worksheets, implement strategies, and achieve measurable results',
    icon: Trophy,
    caseExample: {
      title: 'Building Your Empire: Implementation',
      description: 'Use the 10+ worksheets and frameworks to create your personalized strategic action plan. Get support from our community and instructors as you apply ancient wisdom to modern challenges.',
      outcome: 'Transform your career and business with proven strategies. Join 3,200+ professionals who have already achieved remarkable results.'
    }
  }
];

export default function HowItWorksTimeline() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B2B3A] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            How It Works
          </h2>
          <p className="text-lg text-[#6C6C6C]">
            A proven 3-step system to master Chanakya's strategic wisdom
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="chanakya-timeline max-w-5xl mx-auto relative">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="chanakya-timeline-step relative">
                  {/* Connector Line - REMOVED for cleaner mobile UI */}

                  {/* Step Content */}
                  <div className="text-center">
                    {/* Icon */}
                    <div className="chanakya-timeline-icon mx-auto mb-6">
                      <IconComponent className="w-10 h-10 text-[#D87A2B]" />
                    </div>

                    {/* Number Badge */}
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-[#0B2B3A] text-white rounded-full font-bold mb-4">
                      {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-[#0B2B3A] mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#6C6C6C] mb-6">
                      {step.description}
                    </p>

                    {/* CTA to expand */}
                    <button
                      onClick={() => setSelectedStep(index)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0B2B3A] to-[#1a3a4a] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-semibold"
                    >
                      <span>View Case Study</span>
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedStep !== null && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedStep(null)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="relative p-8 md:p-10 max-h-[90vh] overflow-y-auto">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedStep(null)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>

                  {/* Content */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0B2B3A] to-[#D87A2B] rounded-full flex items-center justify-center">
                        {steps[selectedStep] && (() => {
                          const IconComponent = steps[selectedStep].icon;
                          return <IconComponent className="w-6 h-6 text-white" />;
                        })()}
                      </div>
                      <div>
                        <p className="text-sm text-[#D87A2B] font-semibold">Step {steps[selectedStep]?.number}</p>
                        <h3 className="text-2xl font-bold text-[#0B2B3A]">
                          {steps[selectedStep]?.caseExample.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-[#0B2B3A] uppercase tracking-wide mb-2">
                        Case Study
                      </h4>
                      <p className="text-[#6C6C6C] leading-relaxed">
                        {steps[selectedStep]?.caseExample.description}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#D87A2B]/10 to-[#0B2B3A]/10 rounded-xl p-6">
                      <h4 className="text-sm font-semibold text-[#0B2B3A] uppercase tracking-wide mb-2">
                        Your Outcome
                      </h4>
                      <p className="text-[#0B2B3A] leading-relaxed font-medium">
                        {steps[selectedStep]?.caseExample.outcome}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedStep(null)}
                      className="w-full py-3 bg-gradient-to-r from-[#0B2B3A] to-[#1a3a4a] text-white font-bold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Got It!
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

