'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Play, Lock, CheckCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

const syllabusModules = [
  {
    id: 1,
    title: 'Samadhi Pada (Free Demo Video)',
    description: 'Introduction to Yoga and the nature of consciousness',
    duration: '01:55:28',
    videos: '11 Videos',
    sutras: '51 Sutras',
    topics: [
      'What is Yoga?',
      'Types of Vritti',
      'Abhyas and Vairagya',
      'Samadhi and its types',
      'Swiftness of Attainment',
      'Who is Ishwara?',
      'Obstacles in the Path of Yoga',
      'Methods to Calm the Mind',
      'Characteristic of an Undisturbed Mind',
      'Types of Sampragyaat Samadhi',
      'Sabeej and Nirbeej Samadhi',
      'Revision: Samadhi Pada'
    ],
    isPreview: true
  },
  {
    id: 2,
    title: 'Sadhana Pada',
    description: 'The practice of Yoga and the eight limbs',
    duration: '01:48:42',
    videos: '16 Videos',
    sutras: '55 Sutras',
    topics: [
      'Types of siddhis',
      'Karma samskar',
      'Mool prakriti',
      'Mind-universe relationship',
      'Discriminative knowledge',
      'Kaivalya'
    ],
    isPreview: false
  },
  {
    id: 3,
    title: 'Vibhuti Pada',
    description: 'Supernatural powers and advanced practices',
    duration: '02:06:45',
    videos: '2 Videos',
    sutras: '55 Sutras',
    topics: [
      'Dharna',
      'Dhyaan',
      'Samyam',
      'Samyama outcomes',
      'Siddhis',
      'Advanced siddhis'
    ],
    isPreview: false
  },
  {
    id: 4,
    title: 'Kaivalya Pada',
    description: 'Liberation and the ultimate goal of Yoga',
    duration: '01:51:14',
    videos: '15 Videos',
    sutras: '51 Sutras',
    topics: [
      'Kriya Yoga',
      'Klesha',
      'Deliverance from kleshas',
      'Ashtanga yoga',
      'Yama/niyama',
      'Asana',
      'Pranayama',
      'Benefits of pranayama'
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
              Course Journey — From Sutra 1 to 195
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              The course systematically covers all 195 Yoga Sutras of Maharshi Patanjali, presented in grouped modules for easy learning.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {syllabusModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-premium p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">{module.id}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-high-contrast mb-1">
                          {module.title}
                        </h3>
                        <p className="text-wisdom-600">{module.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {module.isPreview ? (
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
                      <Clock className="w-4 h-4 text-saffron-600" />
                      <span className="text-sm text-wisdom-600">Videos: <span className="font-medium text-high-contrast">{module.videos}</span></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-saffron-600" />
                      <span className="text-sm text-wisdom-600">Duration: <span className="font-medium text-high-contrast">{module.duration}</span></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-wisdom-600">Sutras: <span className="font-medium text-high-contrast">{module.sutras}</span></span>
                    </div>
                  </div>

                  <div className="bg-wisdom-50 p-4 rounded-xl">
                    <h4 className="text-sm font-semibold text-high-contrast mb-2">Key Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, topicIndex) => (
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
          <div className="mt-16 bg-gradient-to-r from-saffron-50 to-teal-50 p-8 rounded-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-display text-high-contrast mb-4">
                Course Structure Overview
              </h3>
              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <h4 className="font-semibold text-high-contrast mb-1">Samadhi Pada</h4>
                  <p className="text-wisdom-600 text-sm">11 Videos</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <h4 className="font-semibold text-high-contrast mb-1">Sadhana Pada</h4>
                  <p className="text-wisdom-600 text-sm">16 Videos</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <h4 className="font-semibold text-high-contrast mb-1">Vibhuti Pada</h4>
                  <p className="text-wisdom-600 text-sm">2 Videos</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                  <h4 className="font-semibold text-high-contrast mb-1">Kaivalya Pada</h4>
                  <p className="text-wisdom-600 text-sm">15 Videos</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-wisdom-600">
                  <span className="font-semibold text-high-contrast">Total: 44 Videos</span> • 
                  <span className="font-semibold text-high-contrast">195 Yoga Sutras</span> • 
                  <span className="font-semibold text-high-contrast">8+ hours</span> of structured lessons
                </p>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
