'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Play, Lock, CheckCircle, HelpCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

const sixQuestions = [
  {
    id: 1,
    title: 'Origin of Life (Prana & Rayi)',
    hindi: 'जीवन की उत्पत्ति (प्राण और रयि)',
    description: 'Understanding the fundamental forces that create and sustain life',
    duration: '45 minutes',
    topics: [
      'Concept of Prana (life force)',
      'Understanding Rayi (matter)',
      'The cosmic dance of creation',
      'Practical applications in daily life'
    ],
    isPreview: true
  },
  {
    id: 2,
    title: 'Sustaining Elements',
    hindi: 'जीवन के सहारे तत्व',
    description: 'Exploring the elements that maintain and nourish existence',
    duration: '40 minutes',
    topics: [
      'Five elements and their roles',
      'Balance and harmony in nature',
      'Connection with cosmic forces',
      'Living in alignment with natural laws'
    ],
    isPreview: false
  },
  {
    id: 3,
    title: 'Nature of Mind & Life Flow',
    hindi: 'मन की प्रकृति और जीवन प्रवाह',
    description: 'Deep dive into the workings of consciousness and life energy',
    duration: '50 minutes',
    topics: [
      'Understanding the mind-body connection',
      'Flow of consciousness',
      'States of awareness',
      'Meditation and mindfulness practices'
    ],
    isPreview: false
  },
  {
    id: 4,
    title: 'States of Consciousness',
    hindi: 'चेतना की अवस्थाएं',
    description: 'Exploring different levels of awareness and consciousness',
    duration: '45 minutes',
    topics: [
      'Waking, dreaming, and deep sleep states',
      'Transcendent consciousness',
      'Path to higher awareness',
      'Integration of all states'
    ],
    isPreview: false
  },
  {
    id: 5,
    title: 'Meditation on AUM',
    hindi: 'ॐ का ध्यान',
    description: 'The sacred sound and its profound significance in spiritual practice',
    duration: '40 minutes',
    topics: [
      'Meaning and significance of AUM',
      'Vibrational aspects of sound',
      'Meditation techniques',
      'Connection with universal consciousness'
    ],
    isPreview: false
  },
  {
    id: 6,
    title: 'Supreme Being & Conclusion',
    hindi: 'परमात्मा और समापन',
    description: 'Understanding the ultimate reality and the journey\'s culmination',
    duration: '50 minutes',
    topics: [
      'Nature of the Supreme Being',
      'Unity of all existence',
      'Path to self-realization',
      'Living with wisdom and compassion'
    ],
    isPreview: false
  }
];

export default function SyllabusSection() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Course Journey — The Six Questions, The Six Answers
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Explore each of the six profound questions from Prashna Upanishad with detailed explanations and practical insights.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              {sixQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-premium p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-muted-saffron-500 to-muted-saffron-600 rounded-full flex items-center justify-center flex-shrink-0 relative">
                        <span className="text-white font-bold text-xl">{question.id}</span>
                        {/* Mandala ring decoration */}
                        <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
                        <div className="absolute inset-2 border border-white/20 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-high-contrast mb-1">
                          {question.title}
                        </h3>
                        <p className="text-muted-saffron-600 font-medium mb-2">
                          {question.hindi}
                        </p>
                        <p className="text-wisdom-600">{question.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {question.isPreview ? (
                        <div className="flex items-center space-x-2 text-green-600">
                          <Play className="w-4 h-4" />
                          <span className="text-sm font-medium">Preview Available</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-wisdom-500">
                          <Lock className="w-4 h-4" />
                          <span className="text-sm">Enroll to Access</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-saffron-600" />
                      <span className="text-sm text-wisdom-600">Duration: <span className="font-medium text-high-contrast">{question.duration}</span></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-muted-saffron-600" />
                      <span className="text-sm text-wisdom-600">Topics: <span className="font-medium text-high-contrast">{question.topics.length}</span></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-wisdom-600">Format: <span className="font-medium text-high-contrast">Video + Notes</span></span>
                    </div>
                  </div>

                  <div className="bg-wisdom-50 p-4 rounded-xl">
                    <h4 className="text-sm font-semibold text-high-contrast mb-2">Key Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {question.topics.map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="bg-white text-wisdom-600 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 bg-gradient-to-r from-muted-saffron-50 to-teal-50 p-8 rounded-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-display text-high-contrast mb-4">
                The Six Questions Overview
              </h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
                {sixQuestions.map((question, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-muted-saffron-500 to-muted-saffron-600 rounded-full flex items-center justify-center mx-auto mb-3 relative">
                      <span className="text-white font-bold text-lg">{question.id}</span>
                      <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
                    </div>
                    <h4 className="font-semibold text-high-contrast mb-1 text-sm">{question.title}</h4>
                    <p className="text-wisdom-600 text-xs">{question.duration}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-wisdom-600">
                  <span className="font-semibold text-high-contrast">Total: 6 Questions</span> • 
                  <span className="font-semibold text-high-contrast"> 4+ hours</span> of comprehensive lessons
                </p>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
